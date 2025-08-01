import { sendFrontendMessage } from 'backend/main_window'
import { fetchWithCookie } from 'backend/utils/fetch_with_cookie'
import getPartitionCookies from 'backend/utils/get_partition_cookies'
import { checkG7ConnectionStatus } from 'backend/utils/quests'
import { DEV_PORTAL_URL } from 'common/constants'
import {
  ConfirmClaimParams,
  GenericApiResponse,
  PointsClaimReturn,
  Quest
} from 'common/types'
import { app, ipcMain } from 'electron'

async function fetchQuests({
  projectId,
  status
}: {
  projectId?: string
  status: Quest['status'] | Quest['status'][]
}): Promise<Quest[]> {
  const url = new URL(`${DEV_PORTAL_URL}api/v1/quests`)
  url.searchParams.append(
    'questStatus',
    Array.isArray(status) ? status.join(',') : status
  )
  url.searchParams.append('sortBy', 'start_date')
  url.searchParams.append('order', 'desc')
  if (projectId) {
    url.searchParams.append('projectId', projectId)
  }
  const questMetaResults = await fetch(url)
  if (!questMetaResults.ok) {
    throw await questMetaResults.text()
  }
  let questsMetaJson = await questMetaResults.json()

  if (!app.isPackaged || process.env.DEBUG_HYPERPLAY === 'true') {
    url.searchParams.append('isTest', 'true')
    const testQuestMetaResults = await fetch(url)
    if (!testQuestMetaResults.ok) {
      throw await testQuestMetaResults.text()
    }
    const testQuestsMetaJson = await testQuestMetaResults.json()
    questsMetaJson = questsMetaJson.concat(testQuestsMetaJson)
  }

  return questsMetaJson
}

export async function getQuests(projectId?: string): Promise<Quest[]> {
  return fetchQuests({
    projectId,
    status: ['CLAIMABLE', 'ACTIVE', 'COMPLETED']
  })
}

ipcMain.handle('getQuests', async (e, projectId) => getQuests(projectId))

ipcMain.handle('getQuest', async (e, questId) => {
  const questResult = await fetch(`${DEV_PORTAL_URL}api/v1/quests/${questId}`)
  const questResultJson = await questResult.json()
  return questResultJson
})

ipcMain.handle('getUserPlayStreak', async (e, questId) => {
  const questResultJson = await fetchWithCookie({
    url: `${DEV_PORTAL_URL}api/v1/quests/${questId}/playstreak`,
    method: 'GET'
  })
  return questResultJson
})

ipcMain.handle('getSteamGameMetadata', async (e, gameId) => {
  const result = await fetch(`${DEV_PORTAL_URL}api/v1/steam/games/${gameId}`)
  const resultJson = await result.json()
  return resultJson
})

ipcMain.handle('claimQuestPointsReward', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/points-claim`
  return (await fetchWithCookie({ url, method: 'POST' })) as PointsClaimReturn
})

ipcMain.handle('confirmRewardClaim', async (e, params: ConfirmClaimParams) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/confirm-claim`
  return fetchWithCookie({
    url,
    method: 'POST',
    body: JSON.stringify({
      transactionHash: params.transactionHash,
      signature: params.signature
    })
  })
})

ipcMain.handle('completeExternalTask', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/external-tasks/completed`
  return (await fetchWithCookie({ url, method: 'POST' })) as GenericApiResponse
})

ipcMain.handle('resyncExternalTask', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/external-tasks/re-sync`
  return (await fetchWithCookie({ url, method: 'POST' })) as GenericApiResponse
})

ipcMain.handle('getG7Credits', async () => {
  const url = `${DEV_PORTAL_URL}api/v1/game7/user/total/credits`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.data.credits.toString()
})

ipcMain.handle('getExternalTaskCredits', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/external-tasks/amount`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.data.credits.toString()
})

ipcMain.handle('getPointsBalancesForProject', async (e, projectId) => {
  const url = `${DEV_PORTAL_URL}api/v1/points/project/${projectId}/balance`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response
})

ipcMain.handle('checkG7ConnectionStatus', async () => {
  return checkG7ConnectionStatus()
})

ipcMain.handle('syncPlayStreakWithExternalSource', async (e, params) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/${params.quest_id}/playstreak/sync`
  return fetchWithCookie({
    url,
    method: 'POST',
    body: JSON.stringify(params)
  })
})

ipcMain.handle('getCSRFToken', async () => {
  const url = `${DEV_PORTAL_URL}api/auth/csrf`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.csrfToken
})

ipcMain.handle(
  'checkPendingSync',
  async (e, { wallet, questId }: { wallet: string; questId: number }) => {
    const url = `${DEV_PORTAL_URL}api/v1/quests/${questId}/playstreak/sync?wallet=${wallet}`
    const response = await fetchWithCookie({ url, method: 'GET' })
    return response.hasPendingSync
  }
)

ipcMain.on('openOnboarding', () => {
  sendFrontendMessage('openOnboarding')
})

ipcMain.handle('getActiveWallet', async () => {
  const url = `${DEV_PORTAL_URL}/api/v1/active_wallet`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.walletAddress
})

ipcMain.handle(
  'setActiveWallet',
  async (e, { message, signature }: { message: string; signature: string }) => {
    const url = `${DEV_PORTAL_URL}/api/v1/active_wallet`

    const cookieString = await getPartitionCookies({
      partition: 'persist:auth',
      url: DEV_PORTAL_URL
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookieString
      },
      body: JSON.stringify({ message, signature })
    })

    if (!response.ok) {
      return {
        status: response.status,
        success: false,
        message: await response.text()
      }
    }

    return {
      status: response.status,
      success: true
    }
  }
)

ipcMain.handle('updateActiveWallet', async (e, walletId) => {
  const url = `${DEV_PORTAL_URL}/api/v1/active_wallet`
  await fetchWithCookie({
    url,
    method: 'PUT',
    body: JSON.stringify({ wallet_id: walletId })
  })
})

ipcMain.handle('getGameplayWallets', async () => {
  const url = `${DEV_PORTAL_URL}/api/v1/gameplay_wallets`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.wallets
})

ipcMain.handle('getExternalEligibility', async (e, questId) => {
  const url = `${DEV_PORTAL_URL}/api/v1/quests/${questId}/eligibility/external`

  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Cookie: cookieString
    }
  })

  if (!response.ok) {
    if (response.status === 400) {
      return null
    } else {
      throw new Error(await response.text())
    }
  }

  return response.json()
})

ipcMain.handle('getListingById', async (e, projectId) => {
  const url = `${DEV_PORTAL_URL}/api/v1/listings/${projectId}`

  const response = await fetch(url, {
    method: 'GET'
  })

  if (!response.ok) {
    if (response.status === 400) {
      return null
    } else {
      throw new Error(await response.text())
    }
  }

  return response.json()
})

ipcMain.handle('getExistingSignature', async (e, questId, rewardId) => {
  const url = `${DEV_PORTAL_URL}/api/v1/quests/${questId}/rewards/${rewardId}/pending-signature`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.pendingSignature
})
