import { DiskSpaceData } from '../../src/common/types'
import { expect, test } from '@playwright/test'
import { ipcMainInvokeHandler } from 'electron-playwright-helpers'
import { Page } from 'playwright'
import { compareVersions } from 'compare-versions'
import { platform as platformOS } from 'os'
import commonSetup, { electronApp, hpPage } from './common-setup'

test.describe('api e2e test', function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: this is the correct usage
  commonSetup.call(this)

  let page: Page
  test('renders the first page', async () => {
    test.setTimeout(600000)
    page = await hpPage

    const title = await page.title()
    expect(title).toBe('HyperPlay')
  })

  test('gets app, legendary, and gog versions', async () => {
    test.setTimeout(600000)
    const appVersion = await page.evaluate(async () => {
      return window.api.getAppVersion()
    })
    console.log('HyperPlay Version: ', appVersion)
    // check that hyperplay version is newer or equal to 0.2.0
    expect(compareVersions(appVersion, '0.2.0')).toBeGreaterThanOrEqual(0)

    let legendaryVersion = await page.evaluate(async () => {
      return window.api.getLegendaryVersion()
    })
    legendaryVersion = legendaryVersion.trim().split(' ')[0]
    console.log('Legendary Version: ', legendaryVersion)
    expect(compareVersions(legendaryVersion, '0.20.32')).toBeGreaterThanOrEqual(
      0
    )

    const gogdlVersion = await page.evaluate(async () => {
      return window.api.getGogdlVersion()
    })
    console.log('Gogdl Version: ', gogdlVersion)
    expect(compareVersions(gogdlVersion, '0.6')).toBeGreaterThanOrEqual(0)
  })

  test('test ipcMainInvokeHandler', async () => {
    test.setTimeout(600000)
    const platform: DiskSpaceData = (await ipcMainInvokeHandler(
      electronApp,
      'getPlatform'
    )) as DiskSpaceData
    console.log('Platform: ', platform)
    expect(platform).toEqual(platformOS())
  })
})
