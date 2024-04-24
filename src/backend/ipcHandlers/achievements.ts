import { logError, LogPrefix } from 'backend/logger/logger'
import { Achievement } from 'common/types'
import { ipcMain } from 'electron'
import * as Sentry from '@sentry/electron'
import { DEV_PORTAL_URL } from 'common/constants'
import { URLSearchParams } from 'url'
import getPartitionCookies from 'backend/utils/get_partition_cookies'
import './quests'

const ACHIEVEMENTS_API_ENDPOINT = `${DEV_PORTAL_URL}api/achievements/v1`

function getAddress(playerAddress: string) {
  const randomAddress = '0x0000000000000000000000000000000000000000'
  const addr = playerAddress ? playerAddress : randomAddress
  return addr
}

ipcMain.handle(
  'getSummaryAchievements',
  async (e, { store, sort, page, pageSize = 100, playerAddress }) => {
    if (store === 'HYPERPLAY' || store === 'EPIC') {
      return { data: [], currentPage: page, totalPages: 0 }
    }

    try {
      const cookieString = await getPartitionCookies({
        partition: 'persist:auth',
        url: DEV_PORTAL_URL
      })
      const url =
        `${ACHIEVEMENTS_API_ENDPOINT}/summary?` +
        new URLSearchParams({
          store,
          playerAddress: getAddress(playerAddress),
          sort,
          // TODO: uncomment this line after api adds status: "ALL" back
          // status: filter,
          page,
          pageSize
        })

      const data = await fetch(url, {
        method: 'GET',
        headers: {
          Cookie: cookieString
        }
      })
      const dataJson = await data.json()

      const achievements = dataJson.data.gameSummaries.map(
        (val: {
          _id: string
          gameId: number
          gameName: string
          gameImageURL: string
          mintedAchievements: number
          totalGameAchievements: number
          totalAchievementsOwned: number
          status: string
        }) => ({
          id: val._id,
          gameId: val.gameId,
          gameName: val.gameName,
          gameImageURL: val.gameImageURL,
          mintedAchievementCount: val.mintedAchievements,
          totalAchievementCount: val.totalGameAchievements,
          mintableAchievementsCount: val.totalAchievementsOwned,
          isNewAchievement: val.status === 'NEW'
        })
      )

      return {
        data: achievements,
        totalPages: dataJson.totalPages
      }
    } catch (error) {
      logError(error, LogPrefix.Achievements)
      Sentry.captureException(error)
      return {
        data: [],
        totalPages: 0
      }
    }
  }
)

ipcMain.handle(
  'getIndividualAchievements',
  async (
    e,
    { sort, page, playerAddress, pageSize = 100, store, playerStoreId, gameId }
  ) => {
    try {
      const url =
        `${ACHIEVEMENTS_API_ENDPOINT}/summary/game/${gameId}?` +
        new URLSearchParams({
          store,
          playerStoreId,
          pageSize,
          page,
          sort,
          status: 'NEW',
          // TODO: uncomment this line after api adds status: "ALL" back
          // status: filter,
          playerAddress: getAddress(playerAddress)
        })

      const cookieString = await getPartitionCookies({
        partition: 'persist:auth',
        url: DEV_PORTAL_URL
      })

      const data = await fetch(url, {
        method: 'GET',
        headers: {
          Cookie: cookieString
        }
      })
      const dataJson = await data.json()

      const { achievements, totalPages } = dataJson.data ?? {}

      return {
        data: achievements.map((ach: { _id: string }) => ({
          ...ach,
          id: ach._id
        })) as Achievement[],
        currentPage: page,
        totalPages
      }
    } catch (error) {
      logError(error, LogPrefix.Achievements)
      Sentry.captureException(error)
      return {
        data: [],
        currentPage: page,
        totalPages: 0
      }
    }
  }
)

ipcMain.handle('getAchievementsStats', async (e, options) => {
  const { store, playerStoreId } = options

  try {
    const url =
      `${ACHIEVEMENTS_API_ENDPOINT}/summary/achievements/stats?` +
      new URLSearchParams({
        store,
        playerStoreId
      })

    const cookieString = await getPartitionCookies({
      partition: 'persist:auth',
      url: DEV_PORTAL_URL
    })

    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: cookieString
      }
    })
    const dataJson = await data.json()

    return {
      newAchievements: dataJson.data.totalNewAchievements,
      mintedAchievements: dataJson.data.totalMintedAchievements,
      totalAchievements: dataJson.data.totalAchievements,
      totalGames: dataJson.data.totalGames,
      numFreeMints: dataJson.data.freeMints
    }
  } catch (error) {
    logError(error, LogPrefix.Achievements)
    Sentry.captureException(error)
    return {
      newAchievements: 0,
      mintedAchievements: 0,
      totalAchievements: 0,
      totalGames: 0,
      numFreeMints: 0
    }
  }
})

ipcMain.handle('syncAchievements', async () => {
  try {
    const url = `${ACHIEVEMENTS_API_ENDPOINT}/jobs/steam?store=STEAM`

    const cookieString = await getPartitionCookies({
      partition: 'persist:auth',
      url: DEV_PORTAL_URL
    })

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookieString
      },
      body: JSON.stringify({
        syncOnChain: true
      })
    })
    const dataJson = await data.json()
    return dataJson.data.requestId
  } catch (error) {
    logError(error, LogPrefix.Achievements)
    Sentry.captureException(error)
  }
})

ipcMain.handle('getSyncProgress', async (e, requestId) => {
  try {
    const url =
      `${ACHIEVEMENTS_API_ENDPOINT}/jobs/steam/${requestId}?` +
      new URLSearchParams({
        syncOnChain: 'true',
        store: 'STEAM'
      })

    const cookieString = await getPartitionCookies({
      partition: 'persist:auth',
      url: DEV_PORTAL_URL
    })

    const data = await fetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookieString
      }
    })
    const dataJson = await data.json()
    return dataJson.data.progress
  } catch (error) {
    logError(error, LogPrefix.Achievements)
    Sentry.captureException(error)
  }
})
