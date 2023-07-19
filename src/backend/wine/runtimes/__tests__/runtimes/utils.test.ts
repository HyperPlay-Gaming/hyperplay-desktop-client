import { join, dirname } from 'path'
import graceful_fs, { existsSync, readFileSync } from 'graceful-fs'
import axios from 'axios'
import child_process from 'child_process'
import { downloadFile, extractTarFile } from '../../util'
import { dirSync } from 'tmp'
import { platform } from 'os'

const testUrl =
  'https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/releases/download/v2.3.9/Heroic-2.3.9.AppImage'
const testTarFilePath = join(__dirname, 'test_data/TestArchive.tar.xz')
const testTarFileWithSubfolder = join(
  __dirname,
  'test_data/ArchiveWithSubfolder.tar.xz'
)

afterEach(jest.restoreAllMocks)

const shouldSkip = platform() !== 'linux'
const skipMessage = 'not on linux so skipping test'
const emptyTest = () =>
  it('should do nothing', () => {
    console.log('running empty test')
  })

describe('downloadFile', () => {
  if (shouldSkip) {
    console.log(skipMessage)
    emptyTest()
    return
  }
  it('Success', async () => {
    const expectedData = readFileSync(testTarFilePath)

    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: expectedData
    })
    jest
      .spyOn(graceful_fs, 'writeFile')
      .mockImplementation(
        (path, data, callback: (err: NodeJS.ErrnoException | null) => void) => {
          callback(null)
        }
      )

    const tmpFileName = '/tmp/someFile'
    await expect(downloadFile(testUrl, tmpFileName)).resolves.toBeUndefined()
    expect(graceful_fs.writeFile).toBeCalledWith(
      tmpFileName,
      expectedData,
      expect.anything()
    )
  })

  it('Axios error', async () => {
    expect.assertions(1)

    jest.spyOn(axios, 'get').mockRejectedValue({
      toJSON: () => '{ "message": "Some error message" }'
    })

    await expect(downloadFile(testUrl, '')).rejects.toEqual(
      Error(
        `Failed to download ${testUrl}: { "message": "Some error message" }`
      )
    )
  })

  it('HTTP error', async () => {
    expect.assertions(1)

    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 404,
      data: {}
    })
    await expect(downloadFile(testUrl, '')).rejects.toEqual(
      Error(`Failed to download ${testUrl}: HTTP error code 404`)
    )
  })

  it('writeFile error', async () => {
    const expectedData = readFileSync(
      join(__dirname, 'test_data/TestArchive.tar.xz')
    )

    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: expectedData
    })

    jest.spyOn(graceful_fs, 'writeFile').mockImplementation((fn, data, cb) => {
      cb({ stack: 'Mocked error stack' } as Error)
    })

    await expect(downloadFile(testUrl, '')).rejects.toEqual(
      Error('Failed to save downloaded data to file: Mocked error stack')
    )
  })
})

describe('extractTarFile', () => {
  if (shouldSkip) {
    console.log(skipMessage)
    emptyTest()
    return
  }
  it('Success without strip', async () => {
    const tmpDir = dirSync({ unsafeCleanup: true })
    jest.spyOn(child_process, 'spawn')

    await expect(
      extractTarFile(testTarFilePath, 'application/x-xz', {
        extractedPath: tmpDir.name
      })
    ).resolves.toEqual(0)

    // Check if the extraction worked
    expect(existsSync(join(tmpDir.name, 'empty'))).toBe(true)
    // Just to be safe, check if the args passed to tar are correct
    expect(child_process.spawn).toBeCalledWith('tar', [
      '--directory',
      tmpDir.name,
      '-Jxf',
      testTarFilePath
    ])
  })

  // Largely the same as the test above
  it('Success with strip', async () => {
    const tmpDir = dirSync({ unsafeCleanup: true })
    jest.spyOn(child_process, 'spawn')

    await expect(
      extractTarFile(testTarFileWithSubfolder, 'application/x-xz', {
        extractedPath: tmpDir.name,
        strip: 1
      })
    ).resolves.toEqual(0)

    expect(existsSync(join(tmpDir.name, 'empty'))).toBe(true)
    expect(child_process.spawn).toBeCalledWith('tar', [
      '--directory',
      tmpDir.name,
      '--strip-components',
      '1',
      '-Jxf',
      testTarFileWithSubfolder
    ])
  })

  it('Success without pre-defined extraction dir', async () => {
    let child: child_process.ChildProcess
    jest.spyOn(child_process, 'spawn').mockImplementation(() => {
      child = new child_process.ChildProcess()
      return child
    })

    jest.spyOn(graceful_fs, 'mkdirSync').mockImplementation()

    const promise = extractTarFile(testTarFilePath, 'application/x-xz')
    child!.emit('close', 0)
    await expect(promise).resolves.toEqual(0)
    expect(graceful_fs.mkdirSync).toBeCalledWith(
      join(dirname(testTarFilePath), 'TestArchive'),
      { recursive: true }
    )
  })

  it('File does not exist', async () => {
    expect.assertions(1)

    jest.spyOn(graceful_fs, 'existsSync').mockReturnValue(false)

    await expect(extractTarFile(testTarFilePath, '')).rejects.toEqual(
      Error('Specified file does not exist: ' + testTarFilePath)
    )
  })

  it('Invalid contentType', async () => {
    expect.assertions(1)

    // Don't create archive extraction directory
    jest.spyOn(graceful_fs, 'mkdirSync').mockImplementation()

    // Let's try extracting a PDF file :^)
    await expect(
      extractTarFile(testTarFilePath, 'application/pdf')
    ).rejects.toEqual(Error('Unrecognized content_type: application/pdf'))
  })

  it('Spawn error', async () => {
    // I've tried basically everything under the sun to get this into a helper function,
    // everything either results in `child` being undefined or a deadlock. If someone successfully
    // creates a helper to mock spawn, they deserve at least a medal
    let child: child_process.ChildProcess
    jest.spyOn(child_process, 'spawn').mockImplementation(() => {
      child = new child_process.ChildProcess()
      return child
    })

    jest.spyOn(graceful_fs, 'mkdirSync').mockImplementation()

    const promise = extractTarFile(testTarFilePath, 'application/x-xz')
    child!.emit('error', Error('Some error'))
    await expect(promise).rejects.toEqual(Error('Some error'))
  })
})
