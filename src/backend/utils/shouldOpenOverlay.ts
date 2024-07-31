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
  return { gameIsEpicForwarderOnHP, hyperPlayListing }
}

export async function launchingGameShouldOpenOverlay(gameInfo?: GameInfo) {
  if (!gameInfo) {
    return { shouldOpenOverlay: false }
  }
  const { gameIsEpicForwarderOnHP, hyperPlayListing } =
    await gameIsEpicForwarderOnHyperPlay(gameInfo)
  const gameIsDirectOnHyperPlay = gameInfo.runner === 'hyperplay'
  const gameIsSideloadedWithWeb3 =
    gameInfo.runner === 'sideload' && !!gameInfo.web3?.supported
  return {
    shouldOpenOverlay:
      gameIsEpicForwarderOnHP ||
      gameIsDirectOnHyperPlay ||
      gameIsSideloadedWithWeb3,
    gameIsEpicForwarderOnHP,
    hyperPlayListing
  }
}
