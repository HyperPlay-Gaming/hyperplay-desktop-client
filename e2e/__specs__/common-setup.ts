import '../../src/common/types/proxy-types'
import { Page, test } from '@playwright/test'
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers'
import { ElectronApplication, _electron as electron } from 'playwright'

export let electronApp: ElectronApplication
export let hpPage: Page

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

export const appNameToMock =
  '0xb5b77decf0bbeb40a2b9c5c85efc9e4dd72985fc9080733857bd7c2afc702f43'

export const launchApp = async () => {
  process.env.CI = 'e2e'
  process.env.MOCK_DOWNLOAD_URL = `http://127.0.0.1:8081/download/kosium`
  process.env.APP_NAME_TO_MOCK = appNameToMock
  if (process.env.TEST_PACKAGED === 'true') {
    console.log('Testing packaged build')
    // must run pnpm run dist:<platform> prior to test
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
  // electronApp
  //   .process()
  //   .stdout?.on('data', (data) => console.log(`main process stdout: ${data}`))
  // electronApp
  //   .process()
  //   .stderr?.on('data', (error) => console.log(`main process stderr: ${error}`))

  // electronApp.on('window', async (page) => {
  //   const filename = page.url()?.split('/').pop()
  //   console.log(`Window opened: ${filename} page url ${page.url()}`)

  //   // capture errors
  //   page.on('pageerror', (error) => {
  //     console.error(error)
  //   })
  //   // capture console messages
  //   page.on('console', (msg) => {
  //     console.log(msg.text())
  //   })
  // })

  const hpPagePromise = new Promise<Page>((res, rej) => {
    async function getPageTitle(page_i: Page) {
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

    /**
     * @dev Note that this will throw the following error on the electronApp.close function call
     * Error during electronApp.waitForEvent(window): Error: electronApplication.waitForEvent: Target page, context or browser has been closed
     */
    electronApp
      .waitForEvent('window', {
        predicate: async (page_i: Page) => {
          return getPageTitle(page_i)
        },
        timeout: 360000
      })
      .catch((err) => {
        console.log(`Error during electronApp.waitForEvent(window): ${err}`)
      })

    for (const windowPage of electronApp.windows()) {
      console.log(`Window already opened with page url ${windowPage.url()}`)
      getPageTitle(windowPage)
    }
  })

  console.log('Waiting for HyperPlay window to open...')
  hpPage = await hpPagePromise
  console.log('Waiting for electron app to be ready...')
  await electronApp.evaluate(async ({ app }) => {
    await app.whenReady()
  })
  console.log('Electron app is ready for testing!')
}

async function launchMockBackend() {
  try {
    const mockBackend = await import('@hyperplay/mock-backend')
    await mockBackend.connectedPromise
  } catch (err) {
    console.error(`Error launching mock backend for e2e test setup ${err}`)
  }
}

export default function setup(timeout = 120000): void {
  test.beforeAll(async () => {
    await launchMockBackend()
  })

  test.beforeEach(async () => {
    test.setTimeout(timeout)
    await launchApp()
  })

  test.afterEach(async () => {
    try {
      await electronApp?.close()
    } catch (err) {
      console.error(
        `Error while closing electron app in after each hook ${err}`
      )
    }
  })
}
