import { QueryCache, QueryClient } from '@tanstack/query-core'
import { getQuests } from 'backend/ipcHandlers/quests'
import { getHyperPlayNameToReleaseMap } from 'backend/storeManagers/hyperplay/utils'
import { GameInfo } from 'common/types'

export async function gameIsEpicForwarderOnHyperPlay(gameInfo: GameInfo) {
  const gameNameMap = await getHyperPlayNameToReleaseMap()
  let hyperPlayListing = undefined
  const gameInfoTitle = gameInfo.title.toLowerCase()
  const gameIsEpicForwarderOnHP =
    gameInfo.runner === 'legendary' && gameNameMap.has(gameInfoTitle)
  if (gameIsEpicForwarderOnHP) {
    hyperPlayListing = gameNameMap.get(gameInfoTitle)
  }
  return { hyperPlayListing, gameIsEpicForwarderOnHP }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
      retry: 1 // Retry failed request once
    }
  }
})

export async function launchingGameShouldOpenOverlay(gameInfo?: GameInfo) {
  if (!gameInfo) {
    return { shouldOpenOverlay: false }
  }
  const { hyperPlayListing, gameIsEpicForwarderOnHP } =
    await gameIsEpicForwarderOnHyperPlay(gameInfo)
  const gameIsDirectOnHyperPlay = gameInfo.runner === 'hyperplay'
  const gameIsSideloadedWithWeb3 =
    gameInfo.runner === 'sideload' && !!gameInfo.web3?.supported

  const quests = await queryClient.fetchQuery({
    queryKey: ['getQuests'],
    queryFn: async () => getQuests(gameInfo.app_name)
  })
  const gameHasAnActiveQuest =
    quests.findIndex((val) => val.project_id === gameInfo.app_name) >= 0

  return {
    shouldOpenOverlay:
      gameIsDirectOnHyperPlay ||
      gameIsSideloadedWithWeb3 ||
      gameIsEpicForwarderOnHP ||
      gameHasAnActiveQuest,
    hyperPlayListing
  }
}
