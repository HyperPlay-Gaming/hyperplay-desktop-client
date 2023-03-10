import { sendFrontendMessage } from './../main_window'
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
import path from 'path'
import { logInfo, LogPrefix, logError, logWarning } from 'backend/logger/logger'
import { handleArchAndPlatform } from './utils'
import * as fs from 'fs'
import { getGameInfo as getGamesGameInfo } from './games'

export async function addGameToLibrary(appId: string) {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const sameGameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appId
  })

  if (sameGameInLibrary !== undefined) {
    return
  }

  const res = await axios.get<HyperPlayRelease[]>(
    `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  )

  const data = res.data[0]

  const isWebGame = Object.hasOwn(data.releaseMeta.platforms, 'web')

  const gameInfo: GameInfo = {
    app_name: data._id,
    extra: {
      about: {
        description: data.projectMeta.description,
        shortDescription: data.projectMeta.short_description
      },
      reqs: [
        {
          minimum: JSON.stringify(data.projectMeta.systemRequirements),
          recommended: JSON.stringify(data.projectMeta.systemRequirements),
          title: data.projectMeta.name
        }
      ],
      storeUrl: `https://store.hyperplay.xyz/game/${data.projectName}`
    },
    thirdPartyManagedApp: undefined,
    web3: { supported: true },
    runner: 'hyperplay',
    title: data.projectMeta.name,
    art_cover: data.releaseMeta.image,
    art_square: data.projectMeta.main_capsule,
    is_installed: Boolean(data.releaseMeta.platforms.web),
    cloud_save_enabled: false,
    namespace: '',
    developer: data.accountName,
    store_url: `https://store.hyperplay.xyz/game/${data.projectName}`,
    folder_name: data.projectName,
    save_folder: '',
    is_mac_native: false,
    is_linux_native: false,
    canRunOffline: false,
    install: isWebGame ? { platform: 'web' } : {},
    releaseMeta: data.releaseMeta
  }

  if (isWebGame) {
    gameInfo.browserUrl = data.releaseMeta.platforms.web.external_url
  }

  hpLibraryStore.set('games', [...currentLibrary, gameInfo])

  sendFrontendMessage('refreshLibrary')
}

export function getBinExecIfExists(executable: string) {
  const dirpath = path.dirname(executable)
  const execName = path.basename(executable).split('.')[0]
  const binExec = path.join(
    dirpath,
    `./${execName}/Binaries/Win64/${execName}-Win64-Shipping.exe`
  )
  if (fs.existsSync(binExec)) {
    return binExec
  }
  return ''
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
  const download_size = info.downloadSize
  const install_size = info.installSize
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

export async function updateAllGames() {
  return []
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function getGames(fullRefresh?: boolean) {
  logWarning(`getGames not implemented on HyperPlay Library Manager`)
  return []
}

export function installState(appName: string, state: boolean) {
  logWarning(`installState not implemented on HyperPlay Library Manager`)
}

export async function refresh() {
  logWarning(`refresh not implemented on HyperPlay Library Manager`)
  return null
}

export function refreshInstalled() {
  logWarning(`refreshInstalled not implemented on HyperPlay Library Manager`)
}

export function getGameInfo(
  appName: string,
  forceReload?: boolean
): GameInfo | undefined {
  logWarning(`getGameInfo not implemented on HyperPlay Library Manager`)
  return undefined
}

export async function listUpdateableGames(): Promise<string[]> {
  logWarning(`listUpdateableGames not implemented on HyperPlay Library Manager`)
  return []
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

export function hasGame(appName: string) {
  logWarning(`hasGame not implemented on HyperPlay Library Manager`)
  return false
}
