import * as HpStoreUtils from '../utils'
jest.mock('electron')
jest.mock('../../../logger/logger')
jest.mock('../../../logger/logfile')

const TESTS_ENABLED = false
const testIf = (condition: boolean) => (condition ? test : test.skip)

describe('backend/storeManagers/hyperplay/utils.ts', () => {
  testIf(!TESTS_ENABLED)('should do nothing', function () {
    console.log('hyperplay utils tests skipped')
  })

  testIf(TESTS_ENABLED)(
    'getGameInfoFromHpRelease and getHyperPlayStoreRelease should not throw for every game',
    async () => {
      const releaseMap = await HpStoreUtils.getHyperPlayReleaseMap()
      for (const [projectId, release] of releaseMap.entries()) {
        // just testing if it throws, can add zod type checking for validation as well in the future
        HpStoreUtils.getGameInfoFromHpRelease(release)
        await HpStoreUtils.getHyperPlayStoreRelease(projectId)
      }
    },
    30000
  )

  testIf(TESTS_ENABLED)(
    'loadEpicHyperPlayGameInfoMap should not throw',
    async () => {
      await HpStoreUtils.loadEpicHyperPlayGameInfoMap()
    }
  )
})
