import fs, { rmSync } from 'fs'
import { getMainWindow, sendFrontendMessage } from './../main_window'
import { existsSync } from 'graceful-fs'

import { hpLibraryStore } from './electronStore'
import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  InstalledInfo
} from 'common/types'
import { isWindows } from 'backend/constants'
import { downloadFile, getFileSize, spawnAsync } from 'backend/utils'
import axios from 'axios'
import { notify } from 'backend/dialog/dialog'
import path from 'path'
import { logInfo, LogPrefix } from 'backend/logger/logger'
import { getAppSettings } from 'backend/sideload/games'
import {
  addShortcuts,
  removeShortcuts
} from 'backend/shortcuts/shortcuts/shortcuts'

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
    web3: { supported: true },
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
    app_name: data._id,
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
  platformToInstall: AppPlatforms
): Promise<void> {
  try {
    const appInfo = getHyperPlayGameInfo(appName)

    if (!appInfo || !appInfo.releaseMeta) {
      throw new Error('App not found in library')
    }

    const { releaseMeta: platforms } = appInfo

    // we might need a helper function to deal with the different platforms
    const downloadUrl = platforms[platformToInstall].external_url
    const window = getMainWindow()

    if (!window || !downloadUrl) {
      throw new Error('Window or downloadUrl not found')
    }

    // prevent from the next download being named eg. "game (1).zip"
    try {
      fs.rmSync(
        path.join(
          installPath,
          appInfo.releaseMeta.platforms[platformToInstall].name
        )
      )
      // eslint-disable-next-line no-empty
    } catch (e) {}

    await downloadFile(
      downloadUrl,
      installPath,
      (downloadedBytes, totalBytes, progress) => {
        window.webContents.send('gameStatusUpdate', {
          appName,
          status: 'installing',
          progress: {
            percent: progress,
            folder: installPath
          }
        })
        console.log(
          `Downloaded ${downloadedBytes} bytes out of ${totalBytes} (${progress}% complete)`
        )
      }
    )

    window.webContents.send('gameStatusUpdate', {
      appName,
      status: 'done'
    })
  } catch (e) {
    console.log(e)
  }
}

export async function installHyperPlayGame({
  appName,
  dirpath,
  platformToInstall
}: {
  appName: string
  dirpath: string
  platformToInstall: AppPlatforms
}): Promise<{
  status: 'error' | 'done' | 'abort'
  error?: string | undefined
}> {
  if (!existsSync(dirpath) && platformToInstall !== 'web') {
    return { status: 'error', error: 'Path does not exist' }
  }

  const { title, releaseMeta } = getHyperPlayGameInfo(appName)

  if (!releaseMeta) {
    return { status: 'error', error: 'Release meta not found' }
  }

  // download the zip file
  try {
    await downloadGame(appName, dirpath, platformToInstall)
    const gameInfo = releaseMeta.platforms[platformToInstall]
    const zipFile = path.join(dirpath, gameInfo.name)
    const destinationPath = path.join(dirpath, title)
    const executable = path.join(destinationPath, gameInfo.executable)
    const install_size = getFileSize(
      releaseMeta.platforms[platformToInstall].installSize
    )

    if (isWindows) {
      await spawnAsync('powershell', [
        'Expand-Archive',
        '-LiteralPath',
        zipFile,
        '-DestinationPath',
        destinationPath
      ])

      await installDistributables(destinationPath)
    } else {
      await spawnAsync('unzip', [dirpath, title])
    }

    const installedInfo: InstalledInfo = {
      install_path: destinationPath,
      executable,
      install_size,
      is_dlc: false,
      version: releaseMeta.name,
      platform: platformToInstall
    }

    const currentLibrary = hpLibraryStore.get('games', [])
    const gameIndex = currentLibrary.findIndex(
      (value) => value.app_name === appName
    )
    currentLibrary[gameIndex].install = installedInfo
    currentLibrary[gameIndex].is_installed = true

    hpLibraryStore.set('games', currentLibrary)

    fs.rmSync(zipFile)

    notify({
      title,
      body: `Installed`
    })

    sendFrontendMessage('refreshLibrary', 'hyperplay')
    return { status: 'done' }
  } catch (error) {
    return { status: 'error', error: `${error}` }
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
  rmAppFromHyperPlayStore(appName)

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

export async function addAppShortcuts(
  appName: string,
  fromMenu?: boolean
): Promise<void> {
  return addShortcuts(getHyperPlayGameInfo(appName), fromMenu)
}

export async function removeAppShortcuts(appName: string): Promise<void> {
  return removeShortcuts(getHyperPlayGameInfo(appName))
}

const installDistributables = async (gamePath: string) => {
  const distFolder = path.join(gamePath, 'dist')
  if (!fs.existsSync(distFolder)) {
    return
  }

  const files = fs.readdirSync(distFolder)
  const executables = files.filter((file) => file.endsWith('.exe'))

  for await (const executable of executables) {
    await spawnAsync(path.join(gamePath, 'dist', executable), [])
  }
}

export const getHyperPlayGameInstallInfo = (
  appName: string,
  platformToInstall: AppPlatforms
) => {
  console.log('getHyperPlayGameInstallInfo', appName, platformToInstall)
  const gameInfo = getHyperPlayGameInfo(appName)
  if (!gameInfo || !gameInfo.releaseMeta) {
    return null
  }
  const info = gameInfo.releaseMeta.platforms[platformToInstall]
  const download_size = info.downloadSize
  const install_size = info.installSize
  return { game: info, manifest: { download_size, install_size } }
}
