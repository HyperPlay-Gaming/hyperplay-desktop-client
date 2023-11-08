import { EventEmitter } from 'node:events'
import yauzl from 'yauzl'
import { resolve } from 'path'
import { mkdirSync } from 'graceful-fs'
import { ExtractZipService } from '../ExtractZipService'

const returnDataMockup = {
  progressPercentage: 0,
  speed: 0,
  totalSize: 1000,
  processedSize: 500
}

jest.mock('yauzl', () => ({
  open: jest.fn()
}))
jest.mock('graceful-fs', () => ({
  mkdirSync: jest.fn(),
  createWriteStream: () => ({
    pipe: jest.fn((writeStream) => writeStream),
    once: jest.fn(),
    on: jest.fn((event, streamCallback) => {
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
  rm: jest.fn(),
  rmSync: jest.fn(),
  copyFileSync: jest.fn()
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
    pipe: jest.fn((args) => args),
    unpipe: jest.fn(),
    destroy: jest.fn(() => {
      stream.destroyed = true
    }),
    resume: jest.fn(),
    pause: jest.fn(),
    on: jest.fn(
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
    readEntry: jest.fn(),
    close: jest.fn(),
    isOpen: true,
    once: jest.fn((event, streamCallback) => {
      if (event === 'end') {
        streamCallback()
      } else if (event === 'error') {
        streamCallback()
      }
    }),
    on: jest.fn((event, entryCallback) => {
      if (event === 'entry') {
        entryCallback({
          fileName,
          uncompressedSize: 1000,
          compressedSize: 600
        })
      }
    }),
    openReadStream: jest.fn((entry, openReadStreamCallback) => {
      openReadStreamCallback(error, stream)
    })
  }

  ;(yauzl.open as jest.Mock).mockImplementation(
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
    jest.useFakeTimers('modern')
    extractZipService = new ExtractZipService(zipFile, destinationPath)
    extractZipService.getUncompressedSize = async () => Promise.resolve(15000)
  }, 1000)

  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  it('should have `source` and `destination` always available', () => {
    expect(extractZipService).toBeInstanceOf(EventEmitter)
    expect(extractZipService.source).toBe(zipFile)
    expect(extractZipService.destination).toBe(destinationPath)
  })

  it('should emit progress events', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = jest.fn()
    extractZipService.on('progress', progressListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(progressListener).toHaveBeenCalled()
    })
  })

  it('should emit end event on successful extraction', async () => {
    const endListener = jest.fn()
    extractZipService.on('finished', endListener)

    await extractZipService.extract()

    expect(endListener).toHaveBeenCalled()
  })

  it('should emit error event on extraction failure', async () => {
    yauzlMockupLib('test.zip', true)

    const errorListener = jest.fn()
    extractZipService.on('error', errorListener)

    extractZipService.extract()

    expect.objectContaining(new Error('Mock example'))
  })

  it('should cancel extraction when cancel is called', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const endListener = jest.fn()
    const progressListener = jest.fn()
    const onCanceledListener = jest.fn()
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

    const endListener = jest.fn()
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

    const progressListener = jest.fn(() => returnDataMockup)
    extractZipService.on('progress', progressListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(progressListener).toHaveBeenCalledWith(
        expect.objectContaining({
          processedSize: 500,
          progressPercentage: 50,
          speed: expect.any(Number),
          totalSize: 1000
        })
      )
    })
  })

  it('should emit correct end values', async () => {
    const endListener = jest.fn(() => returnDataMockup)
    extractZipService.on('finished', endListener)

    await extractZipService.extract()

    process.nextTick(() => {
      expect(endListener).toHaveBeenCalledWith(
        expect.objectContaining({
          processedSize: 500,
          progressPercentage: 50,
          speed: expect.any(Number),
          totalSize: 1000
        })
      )
    })
  })

  it('should emit correct pause values', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const pausedListener = jest.fn(() => returnDataMockup)
    extractZipService.on('paused', pausedListener)

    extractZipService.extract()
    extractZipService.pause()

    process.nextTick(() => {
      makeFakeProgress()

      expect(pausedListener).toHaveBeenCalledWith(
        expect.objectContaining({
          processedSize: 500,
          progressPercentage: 50,
          speed: expect.any(Number),
          totalSize: 1000
        })
      )
    })
  })

  it('should emit correct resume values', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const resumedListener = jest.fn(() => returnDataMockup)
    extractZipService.on('resumed', resumedListener)

    extractZipService.extract()
    extractZipService.pause()

    process.nextTick(() => {
      makeFakeProgress()

      expect(resumedListener).toHaveBeenCalledWith(
        expect.objectContaining({
          processedSize: 500,
          progressPercentage: 50,
          speed: expect.any(Number),
          totalSize: 1000
        })
      )
    })
  })

  it('should not continue the progress upon paused', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = jest.fn()
    extractZipService.on('progress', progressListener)

    extractZipService.extract()
    extractZipService.pause()

    makeFakeProgress()

    expect(progressListener).not.toHaveBeenCalled()
  })

  it('should continue the progress after resumed', async () => {
    const { makeFakeProgress } = yauzlMockupLib('test.zip')

    const progressListener = jest.fn()
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

    const onProgress = jest.fn()
    const onEnd = jest.fn()
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

    const mockEventListener = jest.fn()
    extractZipService.on('progress', mockEventListener)

    extractZipService.extract()

    process.nextTick(() => {
      makeFakeProgress()

      expect(mockEventListener).toHaveBeenCalledTimes(1)
    })
  })

  it('should clear all event listeners after finished, canceled or error', () => {
    const removeAllListenersSpy = jest.spyOn(
      extractZipService,
      'removeAllListeners'
    )

    extractZipService.extract()

    expect(removeAllListenersSpy).toHaveBeenCalled()

    removeAllListenersSpy.mockRestore()
  })
})
