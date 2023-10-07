import {
  AppleGamingWikiInfo,
  WikiInfo,
  PCGamingWikiInfo
} from '../../../common/types'
import { wikiGameInfoStore } from '../electronStore'
import { getWikiGameInfo } from '../wiki_game_info'
import * as PCGamingWiki from '../pcgamingwiki/utils'
import * as AppleGamingWiki from '../applegamingwiki/utils'
import { logError } from '../../logger/logger'

jest.mock('electron-store')
jest.mock('../../logger/logfile')
jest.mock('../../logger/logger')
jest.mock('../../constants', () => {
  return {
    isMac: true
  }
})

describe('getWikiGameInfo', () => {
  test('use cached data', async () => {
    const mockPCGamingWiki = jest
      .spyOn(PCGamingWiki, 'getInfoFromPCGamingWiki')
      .mockResolvedValue(testPCGamingWikiInfo)
    const mockAppleGamingWiki = jest
      .spyOn(AppleGamingWiki, 'getInfoFromAppleGamingWiki')
      .mockResolvedValue(testAppleGamingWikiInfo)

    wikiGameInfoStore.set('The Witcher 3', testExtraGameInfo)

    const result = await getWikiGameInfo('The Witcher 3')

    // Date can sometimes get off by 1 second during tests causing false negatives
    // This strict checks properties other than datetime which checks within 5 seconds
    if (result !== null) {
      const { timestampLastFetch: resultTimestampLastFetch, ...resultNoDate } =
        result
      const { timestampLastFetch: testTimestampLastFetch, ...testNoDate } =
        testExtraGameInfo
      const resultDate = Date.parse(resultTimestampLastFetch)
      const testDate = Date.parse(testTimestampLastFetch)
      expect(resultDate - testDate).toBeLessThan(5000)
      expect(resultNoDate).toStrictEqual(testNoDate)
    }

    expect(mockPCGamingWiki).not.toBeCalled()
    expect(mockAppleGamingWiki).not.toBeCalled()
  })

  test('cached data outdated', async () => {
    const oneMonthAgo = new Date(testExtraGameInfo.timestampLastFetch)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const mockPCGamingWiki = jest
      .spyOn(PCGamingWiki, 'getInfoFromPCGamingWiki')
      .mockResolvedValue(testPCGamingWikiInfo)
    const mockAppleGamingWiki = jest
      .spyOn(AppleGamingWiki, 'getInfoFromAppleGamingWiki')
      .mockResolvedValue(testAppleGamingWikiInfo)

    wikiGameInfoStore.set('The Witcher 3', {
      ...testExtraGameInfo,
      timestampLastFetch: oneMonthAgo.toString()
    })

    const result = await getWikiGameInfo('The Witcher 3', '1234')

    // Date can sometimes get off by 1 second during tests causing false negatives
    // This strict checks properties other than datetime which checks within 5 seconds
    if (result !== null) {
      const { timestampLastFetch: resultTimestampLastFetch, ...resultNoDate } =
        result
      const { timestampLastFetch: testTimestampLastFetch, ...testNoDate } =
        testExtraGameInfo
      const resultDate = Date.parse(resultTimestampLastFetch)
      const testDate = Date.parse(testTimestampLastFetch)
      expect(resultDate - testDate).toBeLessThan(5000)
      expect(resultNoDate).toStrictEqual(testNoDate)
    }

    expect(mockPCGamingWiki).toBeCalled()
    expect(mockAppleGamingWiki).toBeCalled()
  })

  test('catches throws', async () => {
    jest
      .spyOn(PCGamingWiki, 'getInfoFromPCGamingWiki')
      .mockRejectedValueOnce(new Error('Failed'))

    wikiGameInfoStore.clear()

    const result = await getWikiGameInfo('The Witcher 3')
    expect(result).toBeNull()
    expect(logError).toBeCalledWith(
      [
        'Was not able to get ExtraGameInfo data for The Witcher 3',
        Error('Failed')
      ],
      'ExtraGameInfo'
    )
  })
})

const testAppleGamingWikiInfo = {
  crossoverRating: 'perfect',
  crossoverLink: 'the-witcher-3-wild-hunt'
} as AppleGamingWikiInfo

const testPCGamingWikiInfo = {
  steamID: '100',
  metacritic: {
    score: '10',
    urlid: 'the-witcher-3-wild-hunt'
  },
  opencritic: {
    score: '22',
    urlid: '463/the-witcher-3-wild-hunt'
  },
  igdb: {
    score: '40',
    urlid: 'the-witcher-3-wild-hunt'
  },
  direct3DVersions: ['11', '12']
} as PCGamingWikiInfo

const testExtraGameInfo = {
  timestampLastFetch: Date(),
  pcgamingwiki: testPCGamingWikiInfo,
  applegamingwiki: testAppleGamingWikiInfo
} as WikiInfo
