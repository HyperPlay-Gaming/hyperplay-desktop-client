import { existsSync } from 'graceful-fs'
import { AppSettings, GameStatus } from '../../src/common/types'
import { expect, test } from '@playwright/test'
import { Page } from 'playwright'
import commonSetup, { electronApp, hpPage, withTimeout } from './common-setup'
import { stat, readdir } from 'fs/promises'
import path, { join } from 'path'
import { ipcMainInvokeHandler } from 'electron-playwright-helpers'

const dirSize = async (directory) => {
  const files = await readdir(directory)
  const stats = files.map(async (file) => stat(path.join(directory, file)))

  return (await Promise.all(stats)).reduce(
    (accumulator, { size }) => accumulator + size,
    0
  )
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

test.describe('hp store api tests', function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: this is the correct usage
  commonSetup.call(this)

  let page: Page
  const appName = '64742e70e61cddebcbb7bd68'
  let tempFolder = ''

  const addGameToLibrary = async (appName: string) => {
    await ipcMainInvokeHandler(electronApp, 'addHyperplayGame', appName)
  }

  test.beforeEach(async () => {
    page = await hpPage
    await addGameToLibrary(appName)
    const configFolder = await electronApp.evaluate(async ({ app }) => {
      // This runs in the main Electron process
      return app.getPath('appData')
    })
    tempFolder = join(configFolder, 'hyperplay', '.temp', appName)
    console.log('tempfolder: ', tempFolder)
  })

  // NOTE: if rmDownloadedFiles true, this will close the app
  const cancelDownload = async (rmDownloadedFiles: boolean) => {
    await page.evaluate(
      async ([rmDownloadedFiles]) => {
        window.api.cancelDownload(rmDownloadedFiles)
      },
      [rmDownloadedFiles]
    )

    if (rmDownloadedFiles) {
      console.log('waiting...')
      await wait(10000)

      //quit app because easyDL does not free all files on clean until app is closed
      await electronApp.evaluate(async ({ app }) => {
        app.quit()
      })

      await wait(5000)

      //check that downloaded files are removed
      if (existsSync(tempFolder)) {
        const downloadDirSizeAfterCancel = await dirSize(tempFolder)
        console.log('downloadDirSizeAfterCancel: ', downloadDirSizeAfterCancel)
        expect(downloadDirSizeAfterCancel).toEqual(0)
      } else {
        console.log('temp folder does not exist after cancelling download')
      }
    }
  }

  const installPartial = async (appName: string) => {
    // download then pause
    await page.evaluate(
      async ([appName]) => {
        const { defaultInstallPath }: AppSettings =
          await window.api.requestAppSettings()

        console.log('default install path = ' + defaultInstallPath)

        const gameInfo = await window.api.getGameInfo(appName, 'hyperplay')

        await window.api.install({
          appName,
          gameInfo,
          runner: 'hyperplay',
          path: defaultInstallPath,
          platformToInstall: 'windows_amd64'
        })

        const xMbDownloaded = (res, numberOfMb: number) => {
          return async (e, status: GameStatus) => {
            console.log(JSON.stringify(status, null, 4))
            if (
              status.progress?.bytes &&
              Number.parseInt(status.progress?.bytes) > numberOfMb
            )
              res()
          }
        }

        const gameIsPartiallyDownloaded = async () => {
          return new Promise((resolve) => {
            // window.api.handleGameStatus(xMbDownloaded(resolve, 10))
            window.api.onProgressUpdate(appName, xMbDownloaded(resolve, 10))
          })
        }

        await gameIsPartiallyDownloaded()
        return defaultInstallPath
      },
      [appName]
    )
  }

  const pauseDownload = async () => {
    await page.evaluate(async () => {
      window.api.pauseCurrentDownload()
    })
    //check if download is actually paused
    const downloadDirSize = await dirSize(tempFolder)
    await wait(1000)
    const downloadDirSizeAfterWait = await dirSize(tempFolder)
    console.log(
      'pause downloadDirSize: ',
      downloadDirSize,
      ' downloadDirSizeAfterWait: ',
      downloadDirSizeAfterWait
    )
    expect(downloadDirSize).toEqual(downloadDirSizeAfterWait)
  }

  const resumeDownload = async () => {
    await page.evaluate(async () => {
      window.api.resumeCurrentDownload()
    })
    //check if download is actually resumed
    const downloadDirSize = await dirSize(tempFolder)
    //do not decrease this wait time. easydl downloads in chunks and compresses so it takes a while to see the size increase
    await wait(10000)
    const downloadDirSizeAfterWait = await dirSize(tempFolder)
    console.log(
      'resume downloadDirSize: ',
      downloadDirSize,
      ' downloadDirSizeAfterWait: ',
      downloadDirSizeAfterWait
    )
    expect(downloadDirSize).toBeLessThan(downloadDirSizeAfterWait)
  }

  test('hp store: download then cancel and do not keep files', async () => {
    test.setTimeout(600000)

    // download then pause
    console.log('installing')
    await withTimeout(10000, installPartial(appName))
    console.log('canceling')
    await cancelDownload(true)
  })

  test('hp store: download, pause, resume, cancel and do not keep files', async () => {
    test.setTimeout(600000)

    // download then pause
    console.log('installing')
    await withTimeout(10000, installPartial(appName))
    console.log('pausing')
    await pauseDownload()
    console.log('resuming')
    await resumeDownload()
    await wait(5000)
    console.log('canceling')
    await cancelDownload(true)
  })

  test('hp store: download, pause, cancel and do not keep files', async () => {
    test.setTimeout(600000)

    // download then pause
    console.log('installing')
    await withTimeout(10000, installPartial(appName))
    console.log('pausing')
    await pauseDownload()
    await wait(5000)
    console.log('canceling')
    await cancelDownload(true)
  })
})
