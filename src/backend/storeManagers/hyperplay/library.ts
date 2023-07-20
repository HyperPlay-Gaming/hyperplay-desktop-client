import { hpLibraryStore } from './electronStore'
import {
  CallRunnerOptions,
  ExecResult,
  GameInfo,
  HyperPlayInstallInfo,
  HyperPlayRelease,
  InstallPlatform
} from 'common/types'
import axios from 'axios'
import { logInfo, LogPrefix, logError, logWarning } from 'backend/logger/logger'
import {
  getGameInfoFromHpRelease,
  handleArchAndPlatform,
  refreshGameInfoFromHpRelease
} from './utils'
import { getGameInfo as getGamesGameInfo } from './games'
import testJson from './test.json'

async function getHyperPlayReleaseMap() {
  const hpStoreGameReleases = (
    await axios.get<HyperPlayRelease[]>(
      'https://developers.hyperplay.xyz/api/listings'
    )
  ).data
  interface hpStoreGameMapType {
    [key: string]: HyperPlayRelease | undefined
  }
  const hpStoreGameMap: hpStoreGameMapType = {}

  hpStoreGameReleases.forEach((val) => {
    hpStoreGameMap[val._id] = val
  })

  // TODO: Remove after hp store upgrades to new data structure including channels and releases
  hpStoreGameMap['63f685cd069b92b74c6d5778'] = testJson
  return hpStoreGameMap
}

export async function addGameToLibrary(appId: string) {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const sameGameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appId
  })

  if (sameGameInLibrary !== undefined) {
    logWarning(
      `Cannot add game to library since game is already added to the library!`
    )
    return
  }

  let data = testJson as HyperPlayRelease

  // TODO: Remove after hp store upgrades to new data structure including channels and releases
  if (appId !== '63f685cd069b92b74c6d5778') {
    const res = await axios.get<HyperPlayRelease[]>(
      `https://developers.hyperplay.xyz/api/listings?id=${appId}`
    )

  const data = res.data[0]
  const gameInfo = getGameInfoFromHpRelease(data)
  hpLibraryStore.set('games', [...currentLibrary, gameInfo])
}

export const getInstallInfo = async (
  appName: string,
  platformToInstall: InstallPlatform
): Promise<HyperPlayInstallInfo | undefined> => {
  const gameInfo = getGamesGameInfo(appName)
  if (!gameInfo || !gameInfo.releaseMeta) {
    return undefined
  }

  logInfo(`Getting install info for ${gameInfo.title}`, LogPrefix.HyperPlay)

  const requestedPlatform = handleArchAndPlatform(
    platformToInstall,
    gameInfo.releaseMeta
  )

  const info = gameInfo.releaseMeta.platforms[requestedPlatform]

  if (!info) {
    logError(
      `No install info for ${appName} and ${requestedPlatform}`,
      LogPrefix.HyperPlay
    )
    return undefined
  }
  const download_size = parseInt(info.downloadSize)
  const install_size = parseInt(info.installSize)
  return {
    game: info,
    manifest: {
      download_size,
      install_size,
      disk_size: install_size,
      url: info.external_url
    }
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */

export function installState(appName: string, state: boolean) {
  logWarning(`installState not implemented on HyperPlay Library Manager`)
}

/**
 * Refreshes the game info for a game
 * @param appId the id of the game
 * @param data the data used to update the GameInfo with
 * @returns void
 **/
export function refreshHPGameInfo(appId: string, data: HyperPlayRelease) {
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex((val) => val.app_name === appId)
  if (gameIndex === -1) {
    return
  }
  const currentInfo = currentLibrary[gameIndex]

  const gameInfo: GameInfo = refreshGameInfoFromHpRelease(currentInfo, data)

  currentLibrary[gameIndex] = gameInfo
  return hpLibraryStore.set('games', currentLibrary)
}

const defaultExecResult = {
  stderr: '',
  stdout: ''
}

/**
 * Refreshes the entire library
 * this is only used when the user clicks the refresh button
 * in the library
 **/
export async function refresh() {
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const currentLibraryIds = currentLibrary.map((val) => val.app_name)
  const hpStoreGameMap = await getHyperPlayReleaseMap()

  for (const gameId of currentLibraryIds) {
    try {
      let gameData = hpStoreGameMap[gameId]

      // TODO: Remove after hp store upgrades to new data structure including channels and releases
      if (gameId === '63f685cd069b92b74c6d5778') {
        gameData = testJson
      }

      if (!gameData) {
        logWarning(
          `Could not find game with appId = ${gameId} in API, maybe this game was delisted`,
          LogPrefix.HyperPlay
        )
        throw new Error('GameId not find in API')
      }

      refreshHPGameInfo(gameId, gameData)
    } catch (err) {
      logError(
        `Could not refresh HyperPlay Game with appId = ${gameId} due to ${err}}`,
        LogPrefix.HyperPlay
      )
    }
  }
  return defaultExecResult
}

export function getGameInfo(
  appName: string,
  forceReload?: boolean
): GameInfo | undefined {
  logWarning(`getGameInfo not implemented on HyperPlay Library Manager`)
  return undefined
}

/* returns array of app names (i.e. _id's) for game releases that are out of date
 * a game's app name is only returned if the game is installed
 * since library release data is updated on each app launch
 */
export async function listUpdateableGames(): Promise<string[]> {
  const listingMap = await getHyperPlayReleaseMap()

  const updateableGames: string[] = []
  const currentHpLibrary = hpLibraryStore.get('games', [])

  currentHpLibrary.map((val) => {
    if (
      val.install.platform === 'web' ||
      !val.is_installed ||
      !gameIsInstalled(val)
    ) {
      return
    }

    if (!gameIsInstalled(val)) return

    // handle the new gameinfo structure with channels and releases
    if (val.channels && val.install.channelName) {
      if (!Object.hasOwn(val.channels, val.install.channelName)) {
        console.error(`
        Cannot find installed channel name in channels. 
        The channel name may have been changed by the remote.
        To continue to receive game updates, uninstall and reinstall this game: ${val.title}`)
      }
      if (
        val.install.version !== val.channels[val.install.channelName].version
      ) {
        updateableGames.push(val.app_name)
      }
    }
    // handle the case where gameinfo is still using the deprecated data structure
    else if (val.install.version !== listingMap[val.app_name]?.releaseName) {
      updateableGames.push(val.app_name)
    }
  })

  function gameIsInstalled(val: GameInfo) {
    return Object.keys(val.install).length > 0
  }

  return updateableGames
}

export async function runRunnerCommand(
  commandParts: string[],
  abortController: AbortController,
  options?: CallRunnerOptions
): Promise<ExecResult> {
  logWarning(`runRunnerCommand not implemented on HyperPlay Library Manager`)
  return { stdout: '', stderr: '' }
}

export async function changeGameInstallPath(
  appName: string,
  newPath: string
): Promise<void> {
  logWarning(
    `changeGameInstallPath not implemented on HyperPlay Library Manager`
  )
}
