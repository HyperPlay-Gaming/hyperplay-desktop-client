import { EventEmitter } from 'node:events'
import { Readable } from 'node:stream'
import { open, ZipFile, Entry } from 'yauzl'
import { mkdirSync, createWriteStream, rmSync } from 'graceful-fs'
import { captureException } from '@sentry/electron'
import { join } from 'path'

export interface ExtractZipProgressResponse {
  /** Percentage of extraction progress. */
  progressPercentage: number
  /** Speed of extraction in bytes per second. */
  speed: number
  /** Total size of the ZIP file in bytes. */
  totalSize: number
  /** Size of the ZIP content processed so far in bytes. */
  processedSize: number
}

/**
 * Service class to handle extraction of ZIP files.
 * @extends {EventEmitter}
 */
export class ExtractZipService extends EventEmitter {
  #readStream: Readable | null = null
  #zipFile = ''
  #destinationPath = ''
  #canceled = false
  #paused = false
  #totalSize = 0
  #processedSize = 0
  #startTime = Date.now()
  #lastUpdateTime = Date.now()
  #dataDelay = 1000

  #zipFileInstance: ZipFile | null = null
  #extractionPromise: Promise<boolean | void> | null = null
  #resolveExtraction: ((value: boolean) => void) | null = null
  #rejectExtraction: ((reason: Error | unknown) => void) | null = null

  /**
   * Creates an instance of ExtractZipService.
   * @param {string} zipFile - The path to the ZIP file.
   * @param {string} destinationPath - The path where the extracted files should be saved.
   */
  constructor(zipFile: string, destinationPath: string) {
    super()

    this.#zipFile = zipFile
    this.#destinationPath = destinationPath
    this.#resolveExtraction = () => null
    this.#rejectExtraction = () => null
  }

  /**
   * Checks if the extraction process was canceled.
   * @returns {boolean} - True if the extraction was canceled, false otherwise.
   */
  get isCanceled(): boolean {
    return this.#canceled
  }

  /**
   * Get if is paused or not
   * @returns {boolean} - Current state
   */
  get isPaused(): boolean {
    return this.#paused
  }

  /**
   * Gets the source ZIP file path.
   * @returns {string} - The path to the ZIP file.
   */
  get source(): string {
    return this.#zipFile
  }

  /**
   * Gets the destination path where files will be extracted.
   * @returns {string} - The destination path.
   */
  get destination(): string {
    return this.#destinationPath
  }

  /**
   * Check if can progress
   * @returns {boolean}
   */
  get #canProgress(): boolean {
    return !(this.#canceled || this.#paused)
  }

  /**
   * Pause the extraction process.
   * @returns {void}
   */
  public pause(): void {
    if (!this.isPaused) {
      this.#paused = true

      this.#readStream?.pause()

      this.emit('paused', this.#computeProgress())
    }
  }

  /**
   * Resume the extraction process.
   * @returns {Promise<boolean | void>}
   */
  public async resume(): Promise<boolean | void> {
    if (!this.#extractionPromise) {
      throw new Error('Extraction has not started or has already completed.')
    }

    if (this.isPaused) {
      this.#paused = false

      this.#readStream?.resume()
    }

    this.emit('resumed', this.#computeProgress())

    return this.#extractionPromise
  }

  /**
   * Cancels the extraction process.
   * @returns {void}
   */
  public cancel() {
    if (!this.#zipFileInstance?.isOpen) {
      throw new Error('Extraction has not started or has already completed.')
    }

    this.#canceled = true

    this.#readStream?.unpipe()

    this.#readStream?.destroy(new Error('Extraction canceled'))

    if (this.#zipFileInstance && this.#zipFileInstance.isOpen) {
      this.#zipFileInstance.close()
    }

    this.emit('canceled')

    rmSync(this.source, { recursive: true, force: true })

    this.removeAllListeners()
  }

  /**
   * Computes the progress of the extraction process.
   * @private
   * @returns {ExtractZipProgressResponse} - The progress details.
   */
  #computeProgress(): ExtractZipProgressResponse {
    const progressPercentage = Math.min(
      100,
      (this.#processedSize / this.#totalSize) * 100
    )
    const elapsedTime = (Date.now() - this.#startTime) / 1000
    const speed = this.#processedSize / elapsedTime

    return {
      progressPercentage,
      speed,
      totalSize: this.#totalSize,
      processedSize: this.#processedSize
    }
  }

  /**
   * Handles data events during extraction.
   * @private
   * @param {number} chunkLength - The length of the data chunk being processed.
   */
  #onData(chunkLength: number) {
    if (!this.#canProgress) {
      return
    }

    this.#processedSize += chunkLength
    const currentTime = Date.now()

    // Make always sure to have a delay, unless it will be too much spam + performance issues eventually,
    // especially on electron with webContents.send*
    if (currentTime - this.#lastUpdateTime > this.#dataDelay) {
      this.emit('progress', this.#computeProgress())
      this.#lastUpdateTime = currentTime
    }
  }

  /**
   * Handles end events after extraction completes.
   * @private
   */
  #onEnd() {
    if (this.isCanceled) {
      return
    }

    this.emit('finished', this.#computeProgress())

    rmSync(this.source, { recursive: true, force: true })

    this.removeAllListeners()
  }

  /**
   * Handles error events during extraction.
   * @private
   * @param {Error} error - The error that occurred.
   */
  #onError(error: Error) {
    this.emit('error', error)

    rmSync(this.source, { recursive: true, force: true })

    this.removeAllListeners()
  }

  /**
   * Get uncompressed size
   * @param {string} - The zipfile to check the sizeof
   * @returns {Promise<number>} - The total uncompressed size
   */
  async getUncompressedSize(zipFile: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let totalUncompressedSize = 0

      open(
        zipFile,
        { lazyEntries: true, autoClose: true },
        (err: unknown, file: ZipFile) => {
          if (err) {
            reject(err)
            return
          }

          file.readEntry()
          file.on('entry', (entry: Entry) => {
            if (!/\/$/.test(entry.fileName)) {
              totalUncompressedSize += entry.uncompressedSize
            }

            file.readEntry()
          })

          file.on('end', () => {
            resolve(totalUncompressedSize)
          })

          file.on('error', (err: Error) => {
            this.#onError(err)
            resolve(0)
          })
        }
      )
    }).catch(() => 0)
  }

  /**
   * Extracts the ZIP file to the specified destination.
   * @returns {Promise<boolean | void>} - A promise that resolves when the extraction is complete.
   */
  async extract() {
    this.#extractionPromise = new Promise<boolean>((resolve, reject) => {
      this.#resolveExtraction = resolve
      this.#rejectExtraction = reject

      open(
        this.#zipFile,
        { lazyEntries: true, autoClose: true },
        (err: unknown, file: ZipFile) => {
          if (err) {
            this.#rejectExtraction?.(err)
            return
          }

          this.#zipFileInstance = file

          this.#zipFileInstance.readEntry()

          this.#zipFileInstance.on('entry', (entry: Entry) => {
            if (this.isCanceled) {
              this.#zipFileInstance?.close()
              return
            }

            if (/\/$/.test(entry.fileName)) {
              // Directory file names end with '/'
              mkdirSync(join(this.#destinationPath, entry.fileName), {
                recursive: true
              })
              this.#zipFileInstance?.readEntry()
            } else {
              // Ensure parent directory exists
              mkdirSync(
                join(
                  this.#destinationPath,
                  entry.fileName.split('/').slice(0, -1).join('/')
                ),
                { recursive: true }
              )

              this.#zipFileInstance?.openReadStream(
                entry,
                (err: unknown, readStream: Readable) => {
                  if (err && this.#rejectExtraction) {
                    this.#rejectExtraction(err)
                    return
                  }

                  this.#readStream = readStream
                  const writeStream = createWriteStream(
                    join(this.#destinationPath, entry.fileName)
                  )
                  this.#readStream.pipe(writeStream)
                  this.#readStream.on('data', (chunk: unknown[]) => {
                    this.#onData(chunk.length)
                  })
                  writeStream.once('close', () => {
                    if (this.isCanceled) {
                      return
                    }
                    this.#zipFileInstance?.readEntry()
                  })
                }
              )
            }
          })

          this.#zipFileInstance.once('end', () => {
            if (this.isCanceled) {
              return
            }

            this.#onEnd()

            this.#resolveExtraction?.(true)
          })

          this.#zipFileInstance.once('error', this.#onError.bind(this))
        }
      )
    }).catch(this.#onError.bind(this))
    try {
      this.#totalSize = await this.getUncompressedSize(this.#zipFile)
      return await this.#extractionPromise
    } catch (error) {
      this.#rejectExtraction?.(error)
      captureException(error)
    } finally {
      this.#zipFileInstance = null
      this.#extractionPromise = null
      this.#resolveExtraction = null
      this.#rejectExtraction = null
    }
  }
}
