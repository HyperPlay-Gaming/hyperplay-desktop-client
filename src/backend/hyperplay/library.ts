import { getMainWindow, sendFrontendMessage } from './../main_window'
import { existsSync, mkdirSync, rmSync, readdirSync } from 'graceful-fs'

import { hpInstalledGamesStore, hpLibraryStore } from './electronStore'
import {
  GameInfo,
  HyperPlayGameOS,
  HyperPlayInstallInfo,
  HyperPlayRelease,
  InstalledInfo,
  PlatformInfo
} from 'common/types'
import { isMac, isWindows } from 'backend/constants'
import { downloadFileWithAxios, getFileSize, spawnAsync } from 'backend/utils'
import axios from 'axios'
import { notify } from 'backend/dialog/dialog'
import path, { join } from 'path'
import { logInfo, LogPrefix, logError } from 'backend/logger/logger'
import { getAppSettings } from 'backend/sideload/games'
import {
  addShortcuts,
  removeShortcuts
} from 'backend/shortcuts/shortcuts/shortcuts'
import { handleArchAndPlatform } from './utils'
import {
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import { GameConfig } from 'backend/game_config'
import * as fs from 'fs'

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

export function getHyperPlayGameInfo(appName: string): GameInfo {
  logInfo(`Getting game info for ${appName}`, LogPrefix.HyperPlay)
  const appInfo = hpLibraryStore
    .get('games', [])
    .find((app) => app.app_name === appName)

  if (!appInfo) {
    throw new Error('App not found in library')
  }

  return appInfo
}

async function downloadGame(
  appName: string,
  installPath: string,
  platformInfo: PlatformInfo
): Promise<void> {
  const appInfo = getHyperPlayGameInfo(appName)

  if (!appInfo || !appInfo.releaseMeta) {
    throw new Error('App not found in library')
  }

  logInfo(`Downloading zip file`, LogPrefix.HyperPlay)

  // we might need a helper function to deal with the different platforms
  const window = getMainWindow()

  if (!window || !platformInfo.external_url) {
    throw new Error('DownloadUrl not found')
  }

  // prevent from the next download being named eg. "game (1).zip"
  try {
    rmSync(path.join(installPath, platformInfo.name))
    // eslint-disable-next-line no-empty
  } catch (e) {}

  try {
    await downloadFileWithAxios(
      platformInfo.external_url,
      `${installPath}/${platformInfo.name}`,
      createAbortController(appName),
      (totalBytes, downloadedBytes, progress) => {
        window.webContents.send(`progressUpdate-${appName}`, {
          appName,
          status: 'installing',
          runner: 'hyperplay',
          progress: {
            percent: progress,
            bytes: downloadedBytes,
            folder: installPath
          }
        })
      }
    )
    deleteAbortController(appName)
  } catch (error) {
    deleteAbortController(appName)
    throw error
  }

  window.webContents.send('gameStatusUpdate', {
    appName,
    status: 'done'
  })
}

function updateAltExecutableIfUnrealGame(
  appName: string,
  dirpath: string,
  execName: string
) {
  const binExec = path.join(
    dirpath,
    `./${execName}/Binaries/Win64/${execName}-Win64-Shipping.exe`
  )
  if (fs.existsSync(binExec)) {
    return binExec
  }
  return ''
}

export async function installHyperPlayGame({
  appName,
  dirpath,
  platformToInstall
}: {
  appName: string
  dirpath: string
  platformToInstall: 'Windows' | 'linux' | 'Mac' | 'Browser'
}): Promise<{
  status: 'error' | 'done' | 'abort'
  error?: string | undefined
}> {
  if (!existsSync(dirpath) && platformToInstall !== 'Browser') {
    mkdirSync(dirpath, { recursive: true })
  }

  const { title, releaseMeta } = getHyperPlayGameInfo(appName)

  if (!releaseMeta) {
    return { status: 'error', error: 'Release meta not found' }
  }

  logInfo(`Installing ${title} to ${dirpath}...`, LogPrefix.HyperPlay)

  // download the zip file
  try {
    const platformInfo =
      releaseMeta.platforms[
        handleArchAndPlatform(platformToInstall, releaseMeta)
      ]
    await downloadGame(appName, dirpath, platformInfo)
    const zipFile = path.join(dirpath, platformInfo.name)
    const destinationPath = path.join(dirpath, title)
    let executable = path.join(destinationPath, platformInfo.executable)
    const install_size = getFileSize(platformInfo.installSize)

    try {
      if (isWindows) {
        await spawnAsync('powershell', [
          'Expand-Archive',
          '-LiteralPath',
          `'${zipFile}'`,
          '-DestinationPath',
          `'${destinationPath}'`
        ])

        await installDistributables(destinationPath)
      } else {
        // extract the zip file and overwrite existing files
        const { code, stderr } = await spawnAsync('unzip', [
          '-o',
          zipFile,
          '-d',
          destinationPath
        ])
        if (code !== 0) {
          throw new Error(stderr)
        }
      }
      rmSync(zipFile)

      if (isMac && executable.endsWith('.app')) {
        const macAppExecutable = readdirSync(
          join(executable, 'Contents', 'MacOS')
        )[0]
        executable = join(executable, 'Contents', 'MacOS', macAppExecutable)
      }

      const binExecFullPath = updateAltExecutableIfUnrealGame(
        appName,
        path.dirname(executable),
        path.basename(executable).split('.')[0]
      )

      const installedInfo: InstalledInfo = {
        install_path: destinationPath,
        executable: binExecFullPath === '' ? executable : binExecFullPath,
        install_size,
        is_dlc: false,
        version: releaseMeta.name,
        platform: platformToInstall
      }

      const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
      const gameIndex = currentLibrary.findIndex(
        (value) => value.app_name === appName
      )
      const currentInstalled = hpInstalledGamesStore.get('installed', [])
      currentInstalled.push(installedInfo)
      hpInstalledGamesStore.set('installed', currentInstalled)
      currentLibrary[gameIndex].install = installedInfo
      currentLibrary[gameIndex].is_installed = true

      hpLibraryStore.set('games', currentLibrary)

      notify({
        title,
        body: `Installed`
      })

      sendFrontendMessage('refreshLibrary', 'hyperplay')
    } catch (error) {
      logInfo('Error while extracting game', LogPrefix.HyperPlay)
      return { status: 'error', error: `${error}` }
    }
    return { status: 'done' }
  } catch (error) {
    logInfo('Error while downloading and extracting game', LogPrefix.HyperPlay)
    return {
      status: 'error',
      error: `${error}`
    }
  }
}

const rmAppFromHyperPlayStore = (appName: string) => {
  const currentStore = hpLibraryStore.get('games', [])
  const newStore = currentStore.filter((game) => game.app_name !== appName)
  hpLibraryStore.set('games', newStore)
}

export async function uninstallHyperPlayGame(
  appName: string,
  shouldRemovePrefix: boolean
) {
  const appInfo = getHyperPlayGameInfo(appName)
  if (!appInfo) return

  if (appInfo.install.platform === 'web') {
    rmAppFromHyperPlayStore(appName)
    sendFrontendMessage('refreshLibrary', 'hyperplay')
    return
  }

  if (!appInfo.install.install_path) {
    return
  }

  // remove game folder from install path
  const installPath = appInfo.install.install_path
  const gameFolder = path.join(installPath, appInfo.folder_name)

  rmSync(gameFolder, { recursive: true, force: true })

  // only remove the game from the store if the platform is web
  if (appInfo.install.platform === 'web') {
    rmAppFromHyperPlayStore(appName)
  }

  // remove game from installed games store
  const currentInstalled = hpInstalledGamesStore.get('installed', [])
  const newInstalled = currentInstalled.filter(
    (game) => game.executable !== appInfo.install.executable
  )
  hpInstalledGamesStore.set('installed', newInstalled)

  // change is_installed to false
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex(
    (value) => value.app_name === appName
  )
  currentLibrary[gameIndex].is_installed = false
  hpLibraryStore.set('games', currentLibrary)

  if (shouldRemovePrefix) {
    const { winePrefix } = await getAppSettings(appName)

    logInfo(`Removing prefix ${winePrefix}`, LogPrefix.Backend)
    if (existsSync(winePrefix)) {
      // remove prefix if exists
      rmSync(winePrefix, { recursive: true })
    }
  }

  setTimeout(() => {
    sendFrontendMessage('refreshLibrary', 'hyperplay')
  })
}

export async function addGameShortcuts(
  appName: string,
  fromMenu?: boolean
): Promise<void> {
  return addShortcuts(getHyperPlayGameInfo(appName), fromMenu)
}

export async function removeGameShortcuts(appName: string): Promise<void> {
  return removeShortcuts(getHyperPlayGameInfo(appName))
}

const installDistributables = async (gamePath: string) => {
  const distFolder = path.join(gamePath, 'dist')
  if (!existsSync(distFolder)) {
    return
  }

  const files = readdirSync(distFolder)
  const executables = files.filter((file) => file.endsWith('.exe'))

  for await (const executable of executables) {
    await spawnAsync(path.join(gamePath, 'dist', executable), [])
  }
}

export const getHyperPlayGameInstallInfo = (
  appName: string,
  platformToInstall: HyperPlayGameOS
): HyperPlayInstallInfo | null => {
  const gameInfo = getHyperPlayGameInfo(appName)
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
