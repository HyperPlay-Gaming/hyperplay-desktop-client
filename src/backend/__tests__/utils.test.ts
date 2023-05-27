import axios from 'axios'
import { app } from 'electron'
import { extractZip } from '../../backend/utils'
import { logError } from '../logger/logger'
import * as utils from '../utils'
import { test_data } from './test_data/github-api-heroic-test-data.json'
import path from 'path'
import {
  copyFileSync,
  createWriteStream,
  existsSync,
  readFileSync,
  rmSync,
  rmdirSync,
  renameSync
} from 'graceful-fs'

jest.mock('electron')
jest.mock('../logger/logger')
jest.mock('../logger/logfile')
jest.mock('../dialog/dialog')

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

  describe('getLatestReleases', () => {
    test('Simple version', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(test_data)
      jest.spyOn(app, 'getVersion').mockReturnValueOnce('2.4.0')

      const releases = await utils.getLatestReleases()
      expect(releases).toMatchInlineSnapshot(`
        Array [
          Object {
            "body": "2.5.2 HOTFIX #2 Release",
            "html_url": "https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/releases/tag/v2.5.2",
            "id": 200,
            "name": "2.5.2 HOTFIX #2",
            "prerelease": false,
            "published_at": "2022-12-14T10:53:29Z",
            "tag_name": "v2.5.2",
            "type": "stable",
          },
          Object {
            "body": "2.6.0 Beta Release",
            "html_url": "https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/releases/tag/v2.6.0-beta.1",
            "id": 100,
            "name": "2.6.0 Beta",
            "prerelease": true,
            "published_at": "2022-13-14T10:53:29Z",
            "tag_name": "v2.6.0-beta.1",
            "type": "beta",
          },
        ]
      `)
    })

    test('Complex version', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(test_data)
      jest.spyOn(app, 'getVersion').mockReturnValueOnce('2.5.5-beta.3')

      const releases = await utils.getLatestReleases()
      expect(releases).toMatchInlineSnapshot(`
        Array [
          Object {
            "body": "2.6.0 Beta Release",
            "html_url": "https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/releases/tag/v2.6.0-beta.1",
            "id": 100,
            "name": "2.6.0 Beta",
            "prerelease": true,
            "published_at": "2022-13-14T10:53:29Z",
            "tag_name": "v2.6.0-beta.1",
            "type": "beta",
          },
        ]
      `)
    })

    test('Empty version', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(test_data)
      jest.spyOn(app, 'getVersion').mockReturnValueOnce('')

      const releases = await utils.getLatestReleases()
      expect(releases).toMatchInlineSnapshot(`Array []`)
    })

    test('Fetching available releases fails', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue('Failed to fetch!')

      const releases = await utils.getLatestReleases()
      expect(logError).toBeCalledWith(
        ['Error when checking for updates', 'Failed to fetch!'],
        'Backend'
      )
      expect(releases).toMatchInlineSnapshot(`Array []`)
    })
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
      expect(etaString).toEqual('00:00:09')
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
      expect(etaString).toEqual('00:00:05')
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
      expect(etaString).toEqual('00:01:30')
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
      expect(etaString).toEqual('02:46:30')
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

  describe('extractZip', () => {
    let testCopyZipPath: string
    let destFilePath: string

    beforeEach(() => {
      const testZipPath = path.resolve('./src/backend/__mocks__/test.zip')
      //copy zip because extract will delete it
      testCopyZipPath = path.resolve('./src/backend/__mocks__/test2.zip')
      copyFileSync(testZipPath, testCopyZipPath)
      destFilePath = path.resolve('./src/backend/__mocks__/test')
    })

    afterEach(async () => {
      const extractPromise = utils.extractZip(testCopyZipPath, destFilePath)
      await extractPromise
      expect(extractPromise).resolves

      const testTxtFilePath = path.resolve(destFilePath, './test.txt')
      console.log('checking dest file path ', testTxtFilePath)
      expect(existsSync(testTxtFilePath)).toBe(true)

      const testMessage = readFileSync(testTxtFilePath).toString()
      console.log('unzipped file contents: ', testMessage)
      expect(testMessage).toEqual('this is a test message')

      //extract deletes the zip file used to extract async so we wait and then check
      await utils.wait(100)
      expect(existsSync(testCopyZipPath)).toBe(false)

      //clean up test
      rmSync(testTxtFilePath)
      rmdirSync(destFilePath)
      expect(existsSync(testTxtFilePath)).toBe(false)
      expect(existsSync(destFilePath)).toBe(false)
    })

    test('extract a normal test zip', async () => {
      console.log('extracting test.zip')
    })

    test('extract a test zip with non ascii characters', async () => {
      const renamedZipFilePath = path.resolve(
        './src/backend/__mocks__/谷���新道ひばりヶ�.zip'
      )
      renameSync(testCopyZipPath, renamedZipFilePath)
      testCopyZipPath = renamedZipFilePath
    })

    it('should throw an error if the zip file does not exist', async () => {
      await expect(
        extractZip('nonexistent.zip', destFilePath)
      ).rejects.toThrow()
    })
  })
})
