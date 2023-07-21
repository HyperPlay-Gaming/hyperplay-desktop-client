import * as HpStoreUtils from '../utils'
jest.mock('electron')
jest.mock('../../../logger/logger')
jest.mock('../../../logger/logfile')

describe('backend/storeManagers/hyperplay/utils.ts', () => {
  test('getGameInfoFromHpRelease and getHyperPlayStoreRelease should not throw for every game', async () => {
    const releaseMap = await HpStoreUtils.getHyperPlayReleaseMap()
    for (const [projectId, release] of releaseMap.entries()) {
      // just testing if it throws, can add zod type checking for validation as well in the future
      HpStoreUtils.getGameInfoFromHpRelease(release)
      await HpStoreUtils.getHyperPlayStoreRelease(projectId)
    }
  }, 30000)

  test('loadEpicHyperPlayGameInfoMap should not throw', async () => {
    await HpStoreUtils.loadEpicHyperPlayGameInfoMap()
  })
})
