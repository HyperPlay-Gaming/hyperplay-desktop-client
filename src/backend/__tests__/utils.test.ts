import * as utils from '../utils'
import { getExecutableAndArgs, copyRecursiveAsync } from '../utils'
import { mkdir, writeFile, symlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { rimraf } from 'rimraf'
import os from 'os'
import * as fs from 'fs'

jest.mock('electron')
jest.mock('../logger/logger')
jest.mock('../logger/logfile')
jest.mock('../dialog/dialog')
jest.mock('backend/vite_constants', () => ({
  VITE_IPFS_API: 'https://ipfs.io/ipfs/'
}))
jest.mock('backend/flags/flags', () => ({
  VITE_LD_ENVIRONMENT_ID: '123'
}))

describe('backend/utils.ts', () => {
  test('quoteIfNeccessary', () => {
    const testCases = new Map<string, string>([
      ['path/without/spaces', 'path/without/spaces'],
      ['path/with /spaces', '"path/with /spaces"'],
      ['"path/quoted/without/spaces"', '"path/quoted/without/spaces"'],
      ['"path/quoted/with /spaces"', '"path/quoted/with /spaces"']
    ])

    testCases.forEach((expectString, inputString) => {
      expect(utils.quoteIfNecessary(inputString)).toStrictEqual(expectString)
    })
  })

  test('removeQuotesIfNeccessary', () => {
    const testCases = new Map<string, string>([
      ['path/without/quotes', 'path/without/quotes'],
      ['"path/with/quotes"', 'path/with/quotes']
    ])

    testCases.forEach((expectString, inputString) => {
      expect(utils.removeQuoteIfNecessary(inputString)).toStrictEqual(
        expectString
      )
    })
  })

  test('semverGt', () => {
    // target: vx.x.x or vx.x.x-beta.x
    // base: x.x.x or x.x.x-beta.x

    const testCases = new Map<{ target: string; base: string }, boolean>([
      [{ target: 'v2.3.10', base: '2.4.0-beta.1' }, false],
      [{ target: 'v2.3.10', base: '2.4.0' }, false],
      [{ target: 'v2.3.10', base: '2.3.9' }, true],
      [{ target: 'v2.3.10', base: '2.3.9-beta.3' }, true],
      [{ target: 'v2.4.0-beta.1', base: '2.3.10' }, true],
      [{ target: 'v2.4.0-beta.1', base: '2.4.0' }, false],
      [{ target: 'v2.4.0-beta.2', base: '2.4.0-beta.1' }, true],
      [{ target: 'v2.4.0-beta.1', base: '2.4.0-beta.2' }, false],
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      [{ target: undefined as any, base: undefined as any }, false]
    ])

    testCases.forEach((expectValue, versions) => {
      expect(
        utils.testingExportsUtils.semverGt(versions.target, versions.base)
      ).toBe(expectValue)
    })
  })

  test('test getting epic games title from url', () => {
    expect(
      utils.getTitleFromEpicStoreUrl(
        'https://store.epicgames.com/en-US/p/fall-guys'
      )
    ).toEqual('fall-guys')
    expect(
      utils.getTitleFromEpicStoreUrl(
        'https://www.epicgames.com/store/product/tear-of-time-lost-memory-add761'
      )
    ).toEqual('tear-of-time-lost-memory-add761')
    expect(
      utils.getTitleFromEpicStoreUrl(
        'https://store.epicgames.com/en-US/p/fortnite'
      )
    ).toEqual('fortnite')
  })

  describe('calculateEta', () => {
    const getBytesFromMB = (sizeInMB: number) => sizeInMB * 1024 * 1024
    test('normal download seconds', () => {
      const downloadedMB = 10
      const totalSizeMB = 100
      const downloadSpeedMB = 10
      const etaString = utils.calculateEta(
        getBytesFromMB(downloadedMB),
        getBytesFromMB(downloadSpeedMB),
        getBytesFromMB(totalSizeMB)
      )
      expect(etaString).toEqual(expect.stringMatching(/00:00:0[8,9]/))
    })

    test('downloaded > total size', () => {
      const downloadedMB = 105
      const totalSizeMB = 100
      const downloadSpeedMB = 10
      const etaString = utils.calculateEta(
        getBytesFromMB(downloadedMB),
        getBytesFromMB(downloadSpeedMB),
        getBytesFromMB(totalSizeMB)
      )
      expect(etaString).toEqual('00:00:00')
    })

    test('with last progress time 4 seconds ago', () => {
      const downloadedMB = 10
      const totalSizeMB = 100
      const downloadSpeedMB = 10
      const lastProgressTime = Date.now().valueOf() - 1000 * 4
      const etaString = utils.calculateEta(
        getBytesFromMB(downloadedMB),
        getBytesFromMB(downloadSpeedMB),
        getBytesFromMB(totalSizeMB),
        lastProgressTime
      )
      expect(etaString).toEqual(expect.stringMatching(/00:00:0[4,5]/))
    })

    test('normal download minutes', () => {
      const downloadedMB = 100
      const totalSizeMB = 1000
      const downloadSpeedMB = 10
      const etaString = utils.calculateEta(
        getBytesFromMB(downloadedMB),
        getBytesFromMB(downloadSpeedMB),
        getBytesFromMB(totalSizeMB)
      )
      expect(etaString).toEqual(expect.stringMatching(/00:01:[29,30]/))
    })

    test('normal download hours', () => {
      const downloadedMB = 100
      const totalSizeMB = 100000
      const downloadSpeedMB = 10
      const etaString = utils.calculateEta(
        getBytesFromMB(downloadedMB),
        getBytesFromMB(downloadSpeedMB),
        getBytesFromMB(totalSizeMB)
      )
      expect(etaString).toEqual(expect.stringMatching(/02:46:[29,30]/))
    })
  })

  describe('bytesToSize', () => {
    test('Bytes', () => {
      expect(utils.bytesToSize(0)).toEqual('0 Bytes')
      expect(utils.bytesToSize(10)).toEqual('10 Bytes')
      expect(utils.bytesToSize(112)).toEqual('112 Bytes')
    })

    test('Kilobytes', () => {
      expect(utils.bytesToSize(1024)).toEqual('1 KB')
      expect(utils.bytesToSize(1025)).toEqual('1 KB')
      expect(utils.bytesToSize(2059)).toEqual('2.01 KB')
    })

    test('Megabytes', () => {
      expect(utils.bytesToSize(1024 * 1024)).toEqual('1 MB')
      expect(utils.bytesToSize(1025 * 1024)).toEqual('1 MB')
      expect(utils.bytesToSize(2059 * 1024)).toEqual('2.01 MB')
    })

    test('Gigabytes', () => {
      expect(utils.bytesToSize(1024 * 1024 * 1029)).toEqual('1 GB')
      expect(utils.bytesToSize(1025 * 1024 * 2056)).toEqual('2.01 GB')
      expect(utils.bytesToSize(2059 * 1024 * 3045)).toEqual('5.98 GB')
    })

    test('Terabytes', () => {
      expect(utils.bytesToSize(1024 * 1024 * 1029 * 44000)).toEqual('43.18 TB')
      expect(utils.bytesToSize(1025 * 1024 * 2056 * 21010)).toEqual('41.24 TB')
      expect(utils.bytesToSize(2059 * 1024 * 3045 * 4000)).toEqual('23.36 TB')
    })
  })

  describe('getExecutableAndArgs', () => {
    it('should correctly parse executable with .exe extension and arguments', () => {
      const input = 'path/to/executable.exe --arg1 --arg2'
      const expected = {
        executable: 'path/to/executable.exe',
        launchArgs: '--arg1 --arg2'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .exe extension and arguments with backward slashes', () => {
      const input = '\\path\\to\\executable.exe --arg1 --arg2'
      const expected = {
        executable: '\\path\\to\\executable.exe',
        launchArgs: '--arg1 --arg2'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .exe extension and no arguments', () => {
      const input = 'path/to/application.exe'
      const expected = {
        executable: 'path/to/application.exe',
        launchArgs: ''
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .app extension and no arguments', () => {
      const input = 'path/to/application.app'
      const expected = {
        executable: 'path/to/application.app',
        launchArgs: ''
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .app extension and arguments with spaces', () => {
      const input =
        'path/to/app li ca tion.app/Contents/MacOS/application --arg1 "arg"'
      const expected = {
        executable: 'path/to/app li ca tion.app/Contents/MacOS/application',
        launchArgs: '--arg1 "arg"'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .bin extension and single argument', () => {
      const input = 'path/to/executable.bin -arg'
      const expected = {
        executable: 'path/to/executable.bin',
        launchArgs: '-arg'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should return empty strings if no executable is found', () => {
      const input = ''
      const expected = {
        executable: '',
        launchArgs: ''
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with .sh extension and multiple arguments', () => {
      const input = 'path/to/script.sh -arg1 --arg2 /arg3'
      const expected = {
        executable: 'path/to/script.sh',
        launchArgs: '-arg1 --arg2 /arg3'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should handle case sensitivity in extensions', () => {
      const input = 'path/to/Executable.EXE --option'
      const expected = {
        executable: 'path/to/Executable.EXE',
        launchArgs: '--option'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should correctly parse executable with spaces', () => {
      const input = 'path/t o/exec utable.exe --arg1 --arg2'
      const expected = {
        executable: 'path/t o/exec utable.exe',
        launchArgs: '--arg1 --arg2'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should handle simple executable name without args', () => {
      const input = 'executable.exe'
      const expected = {
        executable: 'executable.exe',
        launchArgs: ''
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should handle simple executable name with args', () => {
      const input = 'steam --no-browser'
      const expected = {
        executable: 'steam',
        launchArgs: '--no-browser'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should handle absolute path from /usr/bin', () => {
      const input = '/usr/bin/steam --no-browser'
      const expected = {
        executable: '/usr/bin/steam',
        launchArgs: '--no-browser'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })

    it('should handle absolute path from /usr/local/bin', () => {
      const input = '/usr/local/bin/custom-launcher --fullscreen'
      const expected = {
        executable: '/usr/local/bin/custom-launcher',
        launchArgs: '--fullscreen'
      }
      expect(getExecutableAndArgs(input)).toEqual(expected)
    })
  })

  describe('copyRecursiveAsync', () => {
    const testDir = join(os.tmpdir(), `test-copy-${Date.now()}`)
    const sourceDir = join(testDir, 'source')
    const destDir = join(testDir, 'dest')

    beforeEach(async () => {
      jest.useFakeTimers({ advanceTimers: true })
      await mkdir(sourceDir, { recursive: true })
      await mkdir(destDir, { recursive: true })
    })

    afterEach(async () => {
      jest.clearAllTimers() // Clear pending timers
      jest.useRealTimers() // Restore real timers
      await rimraf(testDir)
    })

    it('should copy a single file', async () => {
      const testFile = join(sourceDir, 'test.txt')
      const destFile = join(destDir, 'test.txt')
      await writeFile(testFile, 'test content')

      await copyRecursiveAsync(testFile, destFile)

      expect(existsSync(destFile)).toBe(true)
    })

    it('should copy a directory recursively', async () => {
      const subDir = join(sourceDir, 'subdir')
      const testFile = join(subDir, 'test.txt')
      await mkdir(subDir, { recursive: true })
      await writeFile(testFile, 'test content')

      await copyRecursiveAsync(sourceDir, join(destDir, 'source'))

      expect(existsSync(join(destDir, 'source/subdir/test.txt'))).toBe(true)
    })

    it('should skip symbolic links', async () => {
      const testFile = join(sourceDir, 'test.txt')
      const linkFile = join(sourceDir, 'link.txt')
      await writeFile(testFile, 'test content')
      await symlink(testFile, linkFile)

      await copyRecursiveAsync(linkFile, join(destDir, 'link.txt'))

      expect(existsSync(join(destDir, 'link.txt'))).toBe(false)
    })

    it('should throw on timeout', async () => {
      const COPY_TIMEOUT_MS = 30000
      const testFile = join(sourceDir, 'test.txt')
      await writeFile(testFile, 'test content')

      // Mock the copyFile function to simulate a slow operation
      const mockCopyFile = jest
        .spyOn(fs.promises, 'copyFile')
        .mockImplementation(async () => {
          return new Promise((resolve) => {
            setTimeout(resolve, COPY_TIMEOUT_MS + 1000)
          })
        })

      const destFile = join(destDir, 'test.txt')

      // Start the copy operation but don't await it yet
      const copyPromise = copyRecursiveAsync(testFile, destFile)

      // Advance timers to trigger timeout
      jest.advanceTimersByTime(COPY_TIMEOUT_MS + 100)

      // Now check if it throws
      await expect(copyPromise).rejects.toThrow('Timeout')

      // Restore original implementation
      mockCopyFile.mockRestore()
    })
  })
})
