import { sendFrontendMessage } from './../main_window'
import { hpLibraryStore } from './electronStore'
import {
  GameInfo,
  HyperPlayGameOS,
  HyperPlayInstallInfo,
  HyperPlayRelease
} from 'common/types'
import axios from 'axios'
import path from 'path'
import { logInfo, LogPrefix, logError } from 'backend/logger/logger'
import { handleArchAndPlatform } from './utils'
import * as fs from 'fs'
import { getGameInfo } from './games'

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

export const getHyperPlayGameInstallInfo = (
  appName: string,
  platformToInstall: HyperPlayGameOS
): HyperPlayInstallInfo | null => {
  const gameInfo = getGameInfo(appName)
  if (!gameInfo || !gameInfo.releaseMeta) {
    return null
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
    return null
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
