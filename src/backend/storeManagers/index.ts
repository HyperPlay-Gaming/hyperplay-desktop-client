import * as HyperPlayGameManager from 'backend/storeManagers/hyperplay/games'
import * as SideloadGameManager from 'backend/storeManagers/sideload/games'
import * as GOGGameManager from 'backend/storeManagers/gog/games'
import * as LegendaryGameManager from 'backend/storeManagers/legendary/games'
import * as NileGameManager from 'backend/storeManagers/nile/games'

import * as HyperPlayLibraryManager from 'backend/storeManagers/hyperplay/library'
import * as SideloadLibraryManager from 'backend/storeManagers/sideload/library'
import * as GOGLibraryManager from 'backend/storeManagers/gog/library'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'
import * as NileLibraryManager from 'backend/storeManagers/nile/library'
import { GameManager, LibraryManager } from 'common/types/game_manager'

import { logInfo, RunnerToLogPrefixMap } from 'backend/logger/logger'

import { addToQueue } from 'backend/downloadmanager/downloadqueue'
import { DMQueueElement, GameInfo, Runner } from 'common/types'
import { ipcMain } from 'electron'
import { sendFrontendMessage } from 'backend/main_window'
import { loadEpicHyperPlayGameInfoMap } from './hyperplay/utils'
import { isGameAvailable } from 'backend/api/helpers'
import { notify } from '../dialog/dialog'
import i18next from 'i18next'

const MAX_GAMES_UPDATE_NOTIFICATIONS = 3

export const gameManagerMap: Record<Runner, GameManager> = {
  hyperplay: HyperPlayGameManager,
  sideload: SideloadGameManager,
  gog: GOGGameManager,
  legendary: LegendaryGameManager,
  nile: NileGameManager
}

export const libraryManagerMap: Record<Runner, LibraryManager> = {
  hyperplay: HyperPlayLibraryManager,
  sideload: SideloadLibraryManager,
  gog: GOGLibraryManager,
  legendary: LegendaryLibraryManager,
  nile: NileLibraryManager
}

function getDMElement(gameInfo: GameInfo, appName: string) {
  const {
    install: { install_path, platform },
    runner
  } = gameInfo
  const dmQueueElement: DMQueueElement = {
    params: {
      appName,
      gameInfo,
      runner,
      path: install_path!,
      platformToInstall: platform!
    },
    type: 'update',
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }
  return dmQueueElement
}

export function autoUpdate(runner: Runner, gamesToUpdate: string[]) {
  const logPrefix = RunnerToLogPrefixMap[runner]
  gamesToUpdate.forEach(async (appName) => {
    const { ignoreGameUpdates } = await gameManagerMap[runner].getSettings(
      appName
    )
    const gameInfo = gameManagerMap[runner].getGameInfo(appName)
    const gameAvailable = await isGameAvailable({ appName, runner })

    if (!gameAvailable) {
      logInfo(`Skipping auto-update for ${gameInfo.title}`, logPrefix)
      return
    }

    if (!ignoreGameUpdates) {
      logInfo(`Auto-Updating ${gameInfo.title}`, logPrefix)
      const dmQueueElement: DMQueueElement = getDMElement(gameInfo, appName)
      addToQueue(dmQueueElement)
      // remove from the array to avoid downloading the same game twice
      gamesToUpdate = gamesToUpdate.filter((game) => game !== appName)
    } else {
      logInfo(`Skipping auto-update for ${gameInfo.title}`, logPrefix)
    }
  })
  return gamesToUpdate
}

// We only check hyperplay games for updates
export async function sendGameUpdatesNotifications() {
  const gamesToUpdate: string[] = []
  const allGames = await libraryManagerMap.hyperplay.listUpdateableGames()
  const gamesToCheck = allGames.slice(0, MAX_GAMES_UPDATE_NOTIFICATIONS)

  const gameSettings = await Promise.all(
    gamesToCheck.map(async (game) => gameManagerMap.hyperplay.getSettings(game))
  )

  const notifiableGames = gamesToCheck.filter(async (_game, index) => {
    const { ignoreGameUpdates } = gameSettings[index]
    return !ignoreGameUpdates
  })

  gamesToUpdate.push(...notifiableGames)

  if (gamesToUpdate.length === 0) {
    return
  }

  const leadGameInfo = gameManagerMap.hyperplay.getGameInfo(gamesToUpdate[0])

  const title = i18next.t(
    'gameUpdateNotifications.title',
    'Game Updates Available'
  )

  let body = ''

  if (gamesToUpdate.length > 1) {
    body = i18next.t(
      'gameUpdateNotifications.body.multiple',
      `${leadGameInfo.title} and other games are ready to update.`,
      { gameName: leadGameInfo.title }
    )
  } else {
    body = i18next.t(
      'gameUpdateNotifications.body.single',
      `There is an update ready for ${leadGameInfo.title}.`,
      { gameName: leadGameInfo.title }
    )
  }

  notify({ title, body })
}

export async function initStoreManagers() {
  await LegendaryLibraryManager.initLegendaryLibraryManager()
  await GOGLibraryManager.refresh()
  await NileLibraryManager.initNileLibraryManager()
  loadEpicHyperPlayGameInfoMap()
}

ipcMain.once('frontendReady', async () => {
  sendFrontendMessage('refreshLibrary', 'hyperplay')
})
