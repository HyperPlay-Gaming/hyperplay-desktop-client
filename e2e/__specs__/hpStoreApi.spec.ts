import { existsSync } from 'graceful-fs'
import { AppSettings, GameStatus } from '../../src/common/types'
import { expect, test } from '@playwright/test'
import commonSetup, {
  appNameToMock,
  electronApp,
  hpPage as page,
  withTimeout
} from './common-setup'
import { stat, readdir } from 'fs/promises'
import path, { join } from 'path'
import { ipcMainInvokeHandler } from 'electron-playwright-helpers'

const testTimeout = 120000
const installPartialTimeout = 25000

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

  const appName = appNameToMock
  let tempFolder = ''

  const addGameToLibrary = async (appName: string) => {
    await ipcMainInvokeHandler(electronApp, 'addHyperplayGame', appName)
  }

  test.beforeEach(async () => {
    await addGameToLibrary(appName)
    const configFolder = await electronApp.evaluate(async ({ app }) => {
      // This runs in the main Electron process
      return app.getPath('appData')
    })
    tempFolder = join(configFolder, 'hyperplay', '.temp', appName)
    console.log('tempfolder: ', tempFolder)
    test.setTimeout(testTimeout)
  })

  test.afterEach(async () => {
    // if a test throws, the lock will prevent the test from quitting
    if (!page.isClosed())
      await page.evaluate(async () => {
        window.api.unlock()
      })
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

        const xMbDownloaded = (res, numberOfMb: number) => {
          return async (e, status: GameStatus) => {
            console.log(
              'progress update for download: ',
              JSON.stringify(status, null, 4)
            )
            if (
              status.progress?.bytes &&
              Number.parseFloat(status.progress?.bytes) > numberOfMb
            )
              res()
            else {
              if (status.progress?.bytes)
                console.log(
                  'not enough bytes downloaded yet ',
                  status.progress?.bytes,
                  ' ',
                  Number.parseFloat(status.progress?.bytes) > numberOfMb
                )
            }
          }
        }

        const gameIsPartiallyDownloaded = async () => {
          return new Promise((resolve) => {
            window.api.onProgressUpdate(
              appName,
              xMbDownloaded(resolve, 5 / 1024)
            )
          })
        }

        const gamePartiallYDownloadedPromise = gameIsPartiallyDownloaded()

        window.api.install({
          appName,
          gameInfo,
          runner: 'hyperplay',
          path: defaultInstallPath,
          platformToInstall: 'windows_amd64',
          channelName: 'main'
        })

        const withTimeout = async (
          millis: number,
          /* eslint-disable-next-line */
          promise: Promise<any>,
          rejectOnTimeout = true
        ) => {
          const timeout = new Promise((resolve, reject) =>
            setTimeout(
              () =>
                (rejectOnTimeout ? reject : resolve)(
                  `Timed out after ${millis} ms.`
                ),
              millis
            )
          )
          return Promise.race([promise, timeout])
        }

        await withTimeout(20000, gamePartiallYDownloadedPromise)

        return defaultInstallPath
      },
      [appName]
    )
  }

  const pauseDownload = async () => {
    await page.evaluate(async () => {
      window.api.pauseCurrentDownload()
    })
    await wait(2000)
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
    // download then pause
    console.log('installing')
    await withTimeout(installPartialTimeout, installPartial(appName), false)
    console.log('canceling')
    await cancelDownload(true)
  })

  test('hp store: download, pause, resume, cancel and do not keep files', async () => {
    // download then pause
    console.log('installing')
    await withTimeout(installPartialTimeout, installPartial(appName), false)
    console.log('pausing')
    await pauseDownload()
    console.log('resuming')
    await resumeDownload()
    console.log('canceling')
    await cancelDownload(true)
  })

  test('hp store: download, pause, cancel and do not keep files', async () => {
    // download then pause
    console.log('installing')
    await withTimeout(installPartialTimeout, installPartial(appName), false)
    console.log('pausing')
    await pauseDownload()
    console.log('canceling')
    await cancelDownload(true)
  })
})
