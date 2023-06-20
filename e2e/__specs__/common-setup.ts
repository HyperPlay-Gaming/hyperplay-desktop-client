import '../../src/common/types/proxy-types'
import { Page, test } from '@playwright/test'
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers'
import { ElectronApplication, _electron as electron } from 'playwright'

export let electronApp: ElectronApplication
export let hpPage: Promise<Page>

export const withTimeout = async (
  millis: number,
  /* eslint-disable-next-line */
  promise: Promise<any>,
  rejectOnTimeout = true
) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(
      () =>
        (rejectOnTimeout ? reject : resolve)(`Timed out after ${millis} ms.`),
      millis
    )
  )
  return Promise.race([promise, timeout])
}

export const launchApp = async () => {
  process.env.CI = 'e2e'
  process.env.MOCK_DOWNLOAD_URL = `http://127.0.0.1:8080/download/kosium`
  if (process.env.TEST_PACKAGED === 'true') {
    console.log('Testing packaged build')
    // must run yarn dist:<platform> prior to test
    const latestBuild = findLatestBuild('dist')
    const appInfo = parseElectronApp(latestBuild)
    console.log(
      'app info main = ',
      appInfo.main,
      '\napp info exe = ',
      appInfo.executable
    )

    electronApp = await electron.launch({
      args: [appInfo.main],
      executablePath: appInfo.executable
    })
  } else {
    console.log('Testing unpackaged build')
    electronApp = await electron.launch({
      args: ['.', '--no-sandbox']
    })
  }

  // this pipes the main process std out to test std out
  electronApp
    .process()
    .stdout?.on('data', (data) => console.log(`main process stdout: ${data}`))
  electronApp
    .process()
    .stderr?.on('data', (error) => console.log(`main process stderr: ${error}`))

  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename} page url ${page.url()}`)

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })

  hpPage = new Promise((res, rej) => {
    const getPageTitle = async (page_i: Page) => {
      try {
        const title = await withTimeout(15000, page_i.title())
        if (title === 'HyperPlay' && page_i.url().includes('?view=App')) {
          res(page_i)
          return true
        }
      } catch (err) {
        console.log(`Error getting title: ${err}`)
      }
      return false
    }

    electronApp
      .waitForEvent('window', {
        predicate: async (page_i: Page) => {
          return getPageTitle(page_i)
        },
        timeout: 360000
      })
      .catch((err) => {
        console.log(`Error during electronApp.waitForEvent(window): ${err}`)
        rej(err)
      })

    for (const windowPage of electronApp.windows()) {
      console.log(`Window already opened with page url ${windowPage.url()}`)
      getPageTitle(windowPage)
    }
  })
}

export default function setup(): void {
  test.beforeEach(async () => {
    test.setTimeout(120000)
    await launchApp()
  })

  test.afterEach(async () => {
    await electronApp.close()
  })
}
