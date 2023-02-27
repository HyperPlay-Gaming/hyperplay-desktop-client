import fs, { rmSync } from 'fs'
import { getMainWindow, sendFrontendMessage } from './../main_window'
import { existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  InstalledInfo
} from 'common/types'
import { isWindows, isLinux } from 'backend/constants'
import { spawnAsync } from 'backend/utils'
import { GlobalConfig } from 'backend/config'
import { download } from 'electron-dl'
import axios from 'axios'
import { notify } from 'backend/dialog/dialog'
import path from 'path'
import { logInfo, LogPrefix } from 'backend/logger/logger'
import { getAppSettings } from 'backend/sideload/games'

export async function addGame(appId: string) {
  const res = await axios.get<HyperPlayRelease[]>(
    `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  )

  const data = res.data[0]

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
    is_installed: false,
    cloud_save_enabled: false,
    namespace: '',
    developer: data.accountName,
    store_url: `https://store.hyperplay.xyz/game/${data.projectName}`,
    folder_name: data.projectName,
    save_folder: '',
    is_mac_native: false,
    is_linux_native: false,
    canRunOffline: false,
    install: {},
    releaseMeta: data.releaseMeta
  }

  const currentLibrary = libraryStore.get('games', [])
  libraryStore.set('games', [...currentLibrary, gameInfo])
}

export function getGameInfo(appName: string): GameInfo {
  const appInfo = libraryStore
    .get('library', [])
    .find((app) => app.app_name === appName)

  if (!appInfo) {
    throw new Error('App not found in library')
  }

  return appInfo
}

export async function downloadGame(
  appName: string,
  installPath: string,
  platformToInstall: AppPlatforms
): Promise<void> {
  try {
    const appInfo = getGameInfo(appName)

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

    await download(window, downloadUrl, {
      directory: installPath,
      onProgress: (progress) => {
        console.log(progress)
        window.webContents.send('gameStatusUpdate', {
          appName,
          status: 'installing',
          progress: {
            percent: progress.percent,
            folder: installPath
          }
        })
      }
    })

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

  const { title, releaseMeta } = getGameInfo(appName)

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

    const installedInfo: InstalledInfo = {
      install_path: destinationPath,
      executable,
      install_size: '1GB',
      is_dlc: false,
      version: releaseMeta.name,
      platform: platformToInstall
    }

    const currentLibrary = libraryStore.get('games', [])
    const gameIndex = currentLibrary.findIndex(
      (value) => value.app_name === appName
    )
    currentLibrary[gameIndex].install = installedInfo
    currentLibrary[gameIndex].is_installed = true

    libraryStore.set('games', currentLibrary)

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

export async function uninstall(appName: string, shouldRemovePrefix: boolean) {
  const appInfo = getGameInfo(appName)

  if (!appInfo || !appInfo.install.install_path) {
    return
  }

  // remove game folder from install path
  const installPath = appInfo.install.install_path
  const gameFolder = path.join(installPath, appInfo.folder_name)

  rmSync(gameFolder, { recursive: true, force: true })
  const currentStore = libraryStore.get('games', [])
  const newStore = currentStore.filter((game) => game.app_name !== appName)
  libraryStore.set('games', newStore)

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

// not sure if we need that anymore
export const getInstallInfo = (data: HyperPlayRelease) => {
  const installPath = GlobalConfig.get().getSettings().defaultInstallPath
  const destinationPath = path.join(installPath, data.projectName)
  const executable = path.join(
    destinationPath,
    data.releaseMeta.platforms.windows_amd64.executable
  )

  const architecture = process.arch.replace('x', 'amd')
  const platform =
    (isWindows ? 'windows_' : isLinux ? 'linux_' : 'darwin_') + architecture

  return {
    installPath,
    destinationPath,
    executable,
    platform: platform as AppPlatforms
  }
}
