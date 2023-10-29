import { EventEmitter } from 'node:events'
import yauzl from 'yauzl'
import { resolve } from 'path'
import { mkdirSync } from 'graceful-fs'
import { ExtractZipService } from '../../services/ExtractZipService'

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
      }
    })
  }),
  rm: jest.fn(),
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
    pipe: jest.fn((args) => args),
    on: jest.fn(
      (
        event: string,
        streamCallback: (...args: unknown[]) => ReadableStream
      ) => {
        if (event === 'close') {
          streamCallback()
        } else if (event === 'data') {
          streamCallback(new Array(500).fill(0))
        } else if (event === 'error') {
          streamCallback(new Error('Error'))
        }
      }
    )
  }

  const mockZipFile = {
    fileSize,
    readEntry: jest.fn(),
    close: jest.fn(),
    once: jest.fn((event, streamCallback) => {
      if (event === 'end') {
        streamCallback()
      }
    }),
    on: jest.fn((event, entryCallback) => {
      if (event === 'entry') {
        entryCallback({
          fileName,
          uncompressedSize: 1000
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

  return {
    openReadStream: mockZipFile.openReadStream,
    zipFile: mockZipFile,
    stream
  }
}

describe('ExtractZipService', () => {
  let extractZipService: ExtractZipService
  const zipFile = resolve('./src/backend/__mocks__/test.zip')
  const destinationPath = resolve('./src/backend/__mocks__/test')

  beforeEach((done) => {
    yauzlMockupLib('test.zip', false)
    extractZipService = new ExtractZipService(zipFile, destinationPath)
    setTimeout(done, 1000)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('should have `source` and `destination` always available', () => {
    it('should initialize properly', () => {
      expect(extractZipService).toBeInstanceOf(EventEmitter)
      expect(extractZipService.source).toBe(zipFile)
      expect(extractZipService.destination).toBe(destinationPath)
    })
  })

  it('should emit progress events', async () => {
    const progressListener = jest.fn()
    extractZipService.on('progress', progressListener)

    await extractZipService.extract()

    expect(progressListener).toHaveBeenCalled()
  })

  it('should emit end event on successful extraction', async () => {
    const endListener = jest.fn()
    extractZipService.on('end', endListener)

    await extractZipService.extract()

    expect(endListener).toHaveBeenCalled()
  })

  it('should emit error event on extraction failure', async () => {
    yauzlMockupLib('test.zip', true)

    const errorListener = jest.fn()
    extractZipService.on('error', errorListener)

    await extractZipService.extract()

    expect(errorListener).toHaveBeenCalledWith(
      expect.objectContaining(new Error('Mock example'))
    )
  })

  it('should cancel extraction when cancel is called', async () => {
    const endListener = jest.fn()
    const progressListener = jest.fn()
    extractZipService.on('end', endListener)
    extractZipService.on('progress', progressListener)

    extractZipService.cancel()

    await extractZipService.extract()

    expect(endListener).not.toHaveBeenCalled()
    expect(progressListener).not.toHaveBeenCalled()
  })

  it('should have the state as canceled once is canceled', async () => {
    extractZipService.extract()
    extractZipService.cancel()

    expect(extractZipService.isCanceled).toBe(true)
  })

  it('should handle directory entry', async () => {
    yauzlMockupLib('directory/test.zip', false)

    const endListener = jest.fn()
    extractZipService.on('end', endListener)

    await extractZipService.extract()

    expect(mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining('directory'),
      expect.anything()
    )
    expect(endListener).toHaveBeenCalled()
  })

  it('should emit correct progress values', async () => {
    const progressListener = jest.fn(() => returnDataMockup)
    extractZipService.on('progress', progressListener)

    await extractZipService.extract()

    expect(progressListener).toHaveBeenCalledWith(
      expect.objectContaining({
        processedSize: 500,
        progressPercentage: 50,
        speed: expect.any(Number),
        totalSize: 1000
      })
    )
  })

  it('should emit correct end values', async () => {
    const endListener = jest.fn(() => returnDataMockup)
    extractZipService.on('end', endListener)

    await extractZipService.extract()

    expect(endListener).toHaveBeenCalledWith(
      expect.objectContaining({
        processedSize: 500,
        progressPercentage: 50,
        speed: expect.any(Number),
        totalSize: 1000
      })
    )
  })

  it('should extract files successfully', async () => {
    const onProgress = jest.fn()
    const onEnd = jest.fn()
    extractZipService.on('progress', onProgress)
    extractZipService.on('end', onEnd)

    await extractZipService.extract()

    expect(onProgress).toHaveBeenCalled()
    expect(onEnd).toHaveBeenCalled()
    expect(mkdirSync).toHaveBeenCalled()
  })

  it('should throttle emit progress', async () => {
    const { stream } = yauzlMockupLib('test.zip')

    const mockEventListener = jest.fn()
    extractZipService.on('progress', mockEventListener)

    await extractZipService.extract()

    for (let i = 0; i < 10; i++) {
      stream.on.mock.calls[stream.on.mock.calls.length - 1][1](
        Buffer.alloc(500)
      )
    }

    expect(mockEventListener).toHaveBeenCalledTimes(1)
  })
})
