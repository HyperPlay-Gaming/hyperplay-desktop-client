import { EventEmitter } from 'node:events'
import { Readable } from 'node:stream';
import { open, ZipFile } from 'yauzl'
import { mkdirSync, createWriteStream, rmSync } from 'graceful-fs'
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
  private readStream: Readable | null = null
  private canceled = false
  private totalSize = 0
  private processedSize = 0
  private startTime = Date.now()
  private lastUpdateTime = Date.now()
  private dataDelay = 1000

  private zipFileInstance: ZipFile | null = null;
  private extractionPromise: Promise<boolean | void> | null = null
  private resolveExtraction: ((value: boolean) => void) | null = () => null
  private rejectExtraction: ((reason: Error) => void) | null = () => null

  /**
   * Creates an instance of ExtractZipService.
   * @param {string} zipFile - The path to the ZIP file.
   * @param {string} destinationPath - The path where the extracted files should be saved.
   */
  constructor(private zipFile: string, private destinationPath: string) {
    super()
  }

  /**
   * Checks if the extraction process was canceled.
   * @returns {boolean} - True if the extraction was canceled, false otherwise.
   */
  get isCanceled(): boolean {
    return this.canceled
  }

  /**
   * Get if is paused or not
   * @returns {boolean} - Current state
   */
  get isPaused(): boolean {
    return this.readStream?.isPaused() || false
  }

  /**
   * Gets the source ZIP file path.
   * @returns {string} - The path to the ZIP file.
   */
  get source(): string {
    return this.zipFile
  }

  /**
   * Gets the destination path where files will be extracted.
   * @returns {string} - The destination path.
   */
  get destination(): string {
    return this.destinationPath
  }

  /**
   * Pause the extraction process.
   * @returns {void}
   */
  public pause(): void {
    if (!this.isPaused) {
      this.readStream?.pause()
    }
  }

  /**
   * Resume the extraction process.
   * @returns {Promise<boolean | void>}
   */
  public async resume(): Promise<boolean | void> {
    if (!this.extractionPromise) {
      throw new Error('Extraction has not started or has already completed.')
    }

    if (this.isPaused) {
      this.readStream?.resume()
    }

    return this.extractionPromise
  }

  /**
   * Cancels the extraction process.
   * @returns {void}
   */
  public cancel() {
    this.canceled = true
    this.readStream?.unpipe();

    this.readStream?.destroy(new Error('Extraction canceled'))

    if (this.zipFileInstance && this.zipFileInstance.isOpen) {
      this.zipFileInstance.close();
    }
    
    this.onCancel()
  }

  /**
   * Computes the progress of the extraction process.
   * @private
   * @returns {ExtractZipProgressResponse} - The progress details.
   */
  private computeProgress(): ExtractZipProgressResponse {
    const progressPercentage = Math.min(
      100,
      (this.processedSize / this.totalSize) * 100
    )
    const elapsedTime = (Date.now() - this.startTime) / 1000
    const speed = this.processedSize / elapsedTime

    return {
      progressPercentage,
      speed,
      totalSize: this.totalSize,
      processedSize: this.processedSize
    }
  }

  /**
   * Handles data events during extraction.
   * @private
   * @param {number} chunkLength - The length of the data chunk being processed.
   */
  private onData(chunkLength: number) {
    if (this.canceled) {
      return
    }

    this.processedSize += chunkLength
    const currentTime = Date.now()

    // Make always sure to have a delay, unless it will be too much spam + performance issues eventually,
    // especially on electron with webContents.send*
    if (currentTime - this.lastUpdateTime > this.dataDelay) {
      this.emit('progress', this.computeProgress())
      this.lastUpdateTime = currentTime
    }
  }

  /**
   * Handles end events after extraction completes.
   * @private
   */
  private onEnd() {
    if (this.isCanceled) {
      return
    }

    this.emit('end', this.computeProgress())

    rmSync(this.source, { recursive: true, force: true });

    this.removeAllListeners()
  }

  /**
   * Handles cancel events during extraction.
   * @private
   */
  private onCancel() {
    this.emit('canceled')

    rmSync(this.source, { recursive: true, force: true });

    this.removeAllListeners()
  }

  /**
   * Handles error events during extraction.
   * @private
   * @param {Error} error - The error that occurred.
   */
  private onError(error: Error) {
    this.emit('error', error)

    rmSync(this.source, { recursive: true, force: true });

    this.removeAllListeners()
  }

  /**
   * Extracts the ZIP file to the specified destination.
   * @returns {Promise<void>} - A promise that resolves when the extraction is complete.
   */
  async extract() {
    this.extractionPromise = new Promise<boolean | void>((resolve, reject) => {
      this.resolveExtraction = resolve
      this.rejectExtraction = reject

      open(this.zipFile, { lazyEntries: true, autoClose: true }, (err, file: ZipFile) => {
        if (err) {
          this.rejectExtraction?.(err)
          return
        }

        this.totalSize = file.fileSize

        file.readEntry()
        file.emit('end')

        file.on('entry', (entry) => {
          if (this.canceled) {
            file.close()
            return
          }

          if (/\/$/.test(entry.fileName)) {
            // Directory file names end with '/'
            mkdirSync(join(this.destinationPath, entry.fileName), {
              recursive: true
            })
            file.readEntry()
          } else {
            // Ensure parent directory exists
            mkdirSync(
              join(
                this.destinationPath,
                entry.fileName.split('/').slice(0, -1).join('/')
              ),
              { recursive: true }
            )

            file.openReadStream(entry, (err, readStream) => {
              if (err && this.rejectExtraction) {
                this.rejectExtraction(err)
                return
              }

              this.zipFileInstance = file;
              this.readStream = readStream
              const writeStream = createWriteStream(
                join(this.destinationPath, entry.fileName)
              )
              readStream.pipe(writeStream)
              readStream.on('data', (chunk) => {
                this.onData(chunk.length)
              })
              writeStream.on('close', () => {
                if (this.isCanceled) {
                  file.emit('end')

                  return
                }
                file.readEntry()
              })
            })
          }
        })

        file.once('end', () => {
          if (this.isCanceled) {
            this.rejectExtraction?.(new Error('Extraction was canceled'))

            return
          }

          this.onEnd()

          this.resolveExtraction?.(true)
        })

        file.once('error', (error) => {
          this.onError(error);
        });
      })
    }).catch((error) => {
      this.onError(error)
    })
    try {
      return await this.extractionPromise
    } catch (error: unknown) {
      this.rejectExtraction?.(error as Error)
    } finally {
      this.zipFileInstance = null;
      this.extractionPromise = null
      this.resolveExtraction = null
      this.rejectExtraction = null
    }

    return false
  }
}
