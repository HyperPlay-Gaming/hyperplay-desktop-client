import { EventEmitter } from 'node:events'
import yauzl from 'yauzl'
import { resolve } from 'path'
import { mkdirSync } from 'graceful-fs'
import { ExtractZipService } from '../ExtractZipService'
import { vi, beforeEach, describe, expect, it, afterEach } from 'vitest'

const returnDataMockup = {
  progressPercentage: 0,
  speedInBytesPerSec: 0,
  totalSizeInBytes: 1000,
  processedSizeInBytes: 500
}
vi.mock('yauzl', () => ({
  open: vi.fn()
}))
vi.mock('@sentry/electron', () => ({
  captureException: vi.fn()
}))
vi.mock('graceful-fs', () => ({
  ...vi.requireActual('graceful-fs'),
  mkdirSync: vi.fn(),
  createWriteStream: () => ({
    pipe: vi.fn((writeStream) => writeStream),
    once: vi.fn(),
    on: vi.fn((event, streamCallback) => {
      if (event === 'close') {
        streamCallback()
      } else if (event === 'data') {
        streamCallback(new Array(500).fill(0))
      } else if (event === 'error') {
        streamCallback(new Error('Error'))
      } else if (event === 'end') {
        streamCallback()
      }
    })
  }),
  rm: vi.fn(),
  rmSync: vi.fn(),
  copyFileSync: vi.fn()
}))
const yauzlMockupLib = (
  fileName = 'test.zip',
  withError?: boolean,
  fileSize = 1000
) => {
  const error = withError ? new Error('Error example') : null

  const stream = {
    _read: () => null,
    destroyed: false,
    pipe: vi.fn((args) => args),
    unpipe: vi.fn(),
    destroy: vi.fn(() => {
      stream.destroyed = true
    }),
    resume: vi.fn(),
    pause: vi.fn(),
    on: vi.fn(
      (
        event: string,
        streamCallback: (...args: unknown[]) => ReadableStream
      ) => {
        if (event === 'close') {
          streamCallback()
        } else if (event === 'data') {
          if (stream.destroyed) {
            return
          }
          streamCallback(new Array(500).fill(0))
        } else if (event === 'error') {
          streamCallback(new Error('Error'))
        } else if (event === 'end') {
          if (stream.destroyed) {
            return
          }
          streamCallback()
        }
      }
    )
  }

  const mockZipFile = {
    fileSize,
    readEntry: vi.fn(),
    close: vi.fn(),
    isOpen: true,
    once: vi.fn((event, streamCallback) => {
      if (event === 'end') {
        streamCallback()
      } else if (event === 'error') {
        streamCallback()
      }
    }),
    on: vi.fn((event, entryCallback) => {
      if (event === 'entry') {
        entryCallback({
          fileName,
          uncompressedSize: 1000,
          compressedSize: 600
        })
      }
    }),
    openReadStream: vi.fn((entry, openReadStreamCallback) => {
      openReadStreamCallback(error, stream)
    })
  }

  ;(yauzl.open as vi.Mock).mockImplementation(
    (_path, _options, yauzlOpenCallback) => {
      yauzlOpenCallback(error, mockZipFile)
    }
  )

  const makeFakeProgress = () => {
    for (let i = 0; i < 1000; i++) {
      stream.on.mock.calls[stream.on.mock.calls.length - 1][1](
        Buffer.alloc(500)
      )
    }
  }

  return {
    openReadStream: mockZipFile.openReadStream,
    zipFile: mockZipFile,
    makeFakeProgress,
    stream
  }
}

describe('ExtractZipService', () => {
  let extractZipService: ExtractZipService
  const zipFile = resolve('./src/backend/__mocks__/test.zip')
  const destinationPath = resolve('./src/backend/__mocks__/test')

  beforeEach(() => {
    yauzlMockupLib('test.zip', false)
    vi.useFakeTimers()
    extractZipService = new ExtractZipService(zipFile, destinationPath)
    extractZipService.getUncompressedSize = async () => Promise.resolve(15000)
  }, 1000)

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('should have `source` and `destination` always available', () => {
    expect(extractZipService).toBeInstanceOf(EventEmitter)
    expect(extractZipService.source).toBe(zipFile)
    expect(extractZipService.destination).toBe(destinationPath)
  })

  it('should emit progress events', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = vi.fn()
    extractZipService.on('progress', progressListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(progressListener).toHaveBeenCalled()
    })
  })

  it('should emit end event on successful extraction', async () => {
    const endListener = vi.fn()
    extractZipService.on('finished', endListener)

    await extractZipService.extract()

    expect(endListener).toHaveBeenCalled()
  })

  it('should emit error event on extraction failure', async () => {
    yauzlMockupLib('test.zip', true)
    const error = 'Mock example'
    const mockEventListener = vi.fn()
    extractZipService.on('error', mockEventListener)

    process.nextTick(async () => {
      await expect(extractZipService.extract()).rejects.toThrow(error)
      expect(mockEventListener).toHaveBeenCalled()
      expect(mockEventListener).toHaveBeenCalledWith(error)
    })
  })

  it('should cancel extraction when cancel is called', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const endListener = vi.fn()
    const progressListener = vi.fn()
    const onCanceledListener = vi.fn()
    extractZipService.on('finished', endListener)
    extractZipService.on('progress', progressListener)
    extractZipService.on('canceled', onCanceledListener)

    extractZipService.extract()
    extractZipService.cancel()

    process.nextTick(() => {
      makeFakeProgress()

      expect(progressListener).not.toHaveBeenCalled()
      expect(endListener).not.toHaveBeenCalled()
      expect(onCanceledListener).toHaveBeenCalled()
    })
  })

  it('should have the state as canceled once is canceled', () => {
    extractZipService.extract()
    extractZipService.cancel()

    expect(extractZipService.isCanceled).toBe(true)
  })

  it('should have the state as pause once is paused', () => {
    extractZipService.extract()
    extractZipService.pause()

    expect(extractZipService.isPaused).toBe(true)
  })

  it('should have the state as resume once is resumed', async () => {
    extractZipService.extract()
    await extractZipService.resume()

    expect(extractZipService.isPaused).toBe(false)
  })

  it('should handle directory entry', async () => {
    yauzlMockupLib('directory/test.zip', false)

    const endListener = vi.fn()
    extractZipService.on('finished', endListener)

    await extractZipService.extract()

    expect(mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining('directory'),
      expect.anything()
    )
    expect(endListener).toHaveBeenCalled()
  })

  it('should emit correct progress values', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = vi.fn(() => returnDataMockup)
    extractZipService.on('progress', progressListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(progressListener).toHaveBeenCalledWith(
        expect.objectContaining({
          progressPercentage: 50,
          speedInBytesPerSec: expect.any(Number),
          totalSizeInBytes: 1000,
          processedSizeInBytes: 500
        })
      )
    })
  })

  it('should emit correct end values', async () => {
    const endListener = vi.fn(() => returnDataMockup)
    extractZipService.on('finished', endListener)

    await extractZipService.extract()

    process.nextTick(() => {
      expect(endListener).toHaveBeenCalledWith(
        expect.objectContaining({
          progressPercentage: 50,
          speedInBytesPerSec: expect.any(Number),
          totalSizeInBytes: 1000,
          processedSizeInBytes: 500
        })
      )
    })
  })

  it('should emit correct pause values', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const pausedListener = vi.fn(() => returnDataMockup)
    extractZipService.on('paused', pausedListener)

    extractZipService.extract()
    extractZipService.pause()

    process.nextTick(() => {
      makeFakeProgress()

      expect(pausedListener).toHaveBeenCalledWith(
        expect.objectContaining({
          progressPercentage: 50,
          speedInBytesPerSec: expect.any(Number),
          totalSizeInBytes: 1000,
          processedSizeInBytes: 500
        })
      )
    })
  })

  it('should emit correct resume values', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const resumedListener = vi.fn(() => returnDataMockup)
    extractZipService.on('resumed', resumedListener)

    extractZipService.extract()
    extractZipService.pause()

    process.nextTick(() => {
      makeFakeProgress()

      expect(resumedListener).toHaveBeenCalledWith(
        expect.objectContaining({
          progressPercentage: 50,
          speedInBytesPerSec: expect.any(Number),
          totalSizeInBytes: 1000,
          processedSizeInBytes: 500
        })
      )
    })
  })

  it('should not continue the progress upon paused', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = vi.fn()
    extractZipService.on('progress', progressListener)

    extractZipService.extract()
    extractZipService.pause()

    makeFakeProgress()

    expect(progressListener).not.toHaveBeenCalled()
  })

  it('should continue the progress after resumed', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = vi.fn()
    extractZipService.on('progress', progressListener)

    extractZipService.extract()
    extractZipService.pause()

    process.nextTick(() => {
      extractZipService.resume()

      makeFakeProgress()

      expect(progressListener).toHaveBeenCalled()
    })
  })

  it('should extract files successfully', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const onProgress = vi.fn()
    const onEnd = vi.fn()
    extractZipService.on('progress', onProgress)
    extractZipService.on('finished', onEnd)

    await extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(onProgress).toHaveBeenCalled()
      expect(onEnd).toHaveBeenCalled()
      expect(mkdirSync).toHaveBeenCalled()
    })
  })

  it('should throttle emit progress', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const mockEventListener = vi.fn()
    extractZipService.on('progress', mockEventListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(mockEventListener).toHaveBeenCalledTimes(1)
    })
  })

  it('should clear all event listeners after finished, canceled or error', () => {
    const removeAllListenersSpy = vi.spyOn(
      extractZipService,
      'removeAllListeners'
    )

    extractZipService.extract()

    expect(removeAllListenersSpy).toHaveBeenCalled()

    removeAllListenersSpy.mockRestore()
  })

  it('Should fail validation if the zip file does not exist for extracting', async () => {
    const error = 'Zip file not found'
    const service = new ExtractZipService('noneexisting.zip', destinationPath)
    const mockEventListener = vi.fn()
    service.on('error', mockEventListener)

    process.nextTick(async () => {
      await expect(service.extract()).rejects.toThrow(error)
      expect(mockEventListener).toHaveBeenCalled()
      expect(mockEventListener).toHaveBeenCalledWith(error)
    })
  })

  it('Should fail validation if ascii is part of the file name for extracting', async () => {
    const error = 'Zip file name contain ascii'
    const service = new ExtractZipService(
      '谷���新道ひばりヶ�.zip',
      destinationPath
    )
    const mockEventListener = vi.fn()
    service.on('error', mockEventListener)

    process.nextTick(async () => {
      await expect(service.extract()).rejects.toThrow(error)
      expect(mockEventListener).toHaveBeenCalled()
      expect(mockEventListener).toHaveBeenCalledWith(error)
    })
  })
})
