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
  getHyperPlayReleaseMap,
  handleArchAndPlatform,
  refreshGameInfoFromHpRelease
} from './utils'
import { getGameInfo as getGamesGameInfo } from './games'
import { getValistListingApiUrl, qaToken } from 'backend/constants'

export async function addGameToLibrary(projectId: string) {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const sameGameInLibrary = currentLibrary.find((val) => {
    return val.app_name === projectId
  })

  if (sameGameInLibrary !== undefined) {
    logWarning(
      `Cannot add game to library since game is already added to the library!`
    )
    return
  }

  const listingUrl = getValistListingApiUrl(projectId)

  const getConfig =
    qaToken !== '' ? { headers: { Authorization: `Bearer ${qaToken}` } } : {}
  const res = await axios.get<HyperPlayRelease>(listingUrl, getConfig)

  const data = res.data
  const gameInfo = getGameInfoFromHpRelease(data)
  hpLibraryStore.set('games', [...currentLibrary, gameInfo])
}

export const getInstallInfo = async (
  appName: string,
  platformToInstall: InstallPlatform,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lang = 'en',
  channelNameToInstall = 'main'
): Promise<HyperPlayInstallInfo | undefined> => {
  const gameInfo = getGamesGameInfo(appName)

  if (
    gameInfo.channels === undefined ||
    gameInfo.channels[channelNameToInstall].release_meta === undefined
  ) {
    console.error(
      'Channels or Release Meta were undefined in getInstallInfo for HyperPlay Library Manager'
    )
    return undefined
  }

  const releaseMeta = gameInfo.channels[channelNameToInstall].release_meta

  logInfo(`Getting install info for ${gameInfo.title}`, LogPrefix.HyperPlay)

  const requestedPlatform = handleArchAndPlatform(
    platformToInstall,
    releaseMeta
  )

  const info = releaseMeta.platforms[requestedPlatform]

  if (info === undefined) {
    console.error(
      'Info was undefined in getInstallInfo for HyperPlay Library Manager'
    )
    return undefined
  }

  if (!info) {
    logError(
      `No install info for ${appName} and ${requestedPlatform}`,
      LogPrefix.HyperPlay
    )
    return undefined
  }
  const download_size = info.downloadSize ? parseInt(info.downloadSize) : 0
  const install_size = info.installSize ? parseInt(info.installSize) : 0
  return {
    game: {
      ...info,
      owned_dlc: [],
      launch_options: []
    },
    manifest: {
      download_size,
      install_size,
      disk_size: install_size,
      url: info.external_url
    }
  }
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
      const gameData = hpStoreGameMap.get(gameId)

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
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  appName: string,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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

    if (val.channels && val.install.channelName && val.install.platform) {
      if (!Object.hasOwn(val.channels, val.install.channelName)) {
        console.error(`
        Cannot find installed channel name in channels. 
        The channel name may have been changed by the remote.
        To continue to receive game updates, uninstall and reinstall this game: ${val.title}`)
      }
      if (
        val.install.version !==
          val.channels[val.install.channelName].release_meta.name
            ?.toLowerCase()
            .replaceAll(' ', '') ||
        ''
      ) {
        updateableGames.push(val.app_name)
      }
    } else {
      console.error(
        `Error in listUpdateableGames: val.channels ${val.channels} or val.install.channelName ${val.install.channelName} or val.install.platform ${val.install.platform} is undefined'`
      )
    }
  })

  function gameIsInstalled(val: GameInfo) {
    return Object.keys(val.install).length > 0
  }

  return updateableGames
}

/* eslint-disable @typescript-eslint/no-unused-vars */
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
/* eslint-enable @typescript-eslint/no-unused-vars */
