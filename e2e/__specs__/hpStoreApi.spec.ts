import { AppSettings, GameStatus } from '../../src/common/types'
import { expect, test } from '@playwright/test'
import { Page } from 'playwright'
import commonSetup, { electronApp, hpPage } from './common-setup'
import { stat, readdir } from 'fs/promises'
import path, { join } from 'path'

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
  const appName = '63f8a8c7069b92b74c52d1a3'
  let tempFolder = ''

  test.beforeAll(async () => {
    const configFolder = await electronApp.evaluate(async ({ app }) => {
      // This runs in the main Electron process
      return app.getPath('appData')
    })
    tempFolder = join(configFolder, 'hyperplay', '.temp', appName)
    console.log('tempfolder: ', tempFolder)
  })

  const cancelDownload = async () => {
    await page.evaluate(async () => {
      //cancel download
      console.log('cancelling')
      window.api.cancelDownload(true)
      // await window.api.kill(appName, 'hyperplay')
      // await window.api.removeTempDownloadFiles(appName)
      // window.api.removeFromDMQueue(appName)
    })
  }

  const installPartial = async (appName: string) => {
    // download then pause
    await page.evaluate(
      async ([appName]) => {
        const { defaultInstallPath }: AppSettings =
          await window.api.requestAppSettings()

        console.log('default install path = ' + defaultInstallPath)

        const gameInfo = await window.api.getGameInfo(appName, 'hyperplay')

        console.log('installing')
        await window.api.install({
          appName,
          gameInfo,
          runner: 'hyperplay',
          path: defaultInstallPath,
          platformToInstall: 'windows_amd64'
        })

        const xMbDownloaded = (res, numberOfMb: number) => {
          return async (e, status: GameStatus) => {
            // console.log(JSON.stringify(status, null, 4))
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

  const pauseDownload = async (tempFolder: string) => {
    await page.evaluate(async () => {
      console.log('pausing')
      window.api.pauseCurrentDownload()
    })
    //check if download is actually paused
    const downloadDirSize = await dirSize(tempFolder)
    await wait(1000)
    const downloadDirSizeAfterWait = await dirSize(tempFolder)
    expect(downloadDirSize).toEqual(downloadDirSizeAfterWait)
  }

  const resumeDownload = async () => {
    await page.evaluate(async () => {
      console.log('resuming')
      window.api.resumeCurrentDownload()
    })
  }

  test.only('hp store: download then cancel and do not keep files', async () => {
    test.setTimeout(600000)
    page = await hpPage

    // download then pause
    await installPartial(appName)
    await cancelDownload()

    console.log('waiting...')
    await wait(10000)

    //quit app because easyDL does not free all files on clean until app is closed
    await electronApp.evaluate(async ({ app }) => {
      app.quit()
    })

    await wait(6000)

    //check that downloaded files are removed
    const downloadDirSizeAfterCancel = await dirSize(tempFolder)
    expect(downloadDirSizeAfterCancel).toEqual(0)
  })
})
