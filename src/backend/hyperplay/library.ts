import fs from 'fs'
import { getMainWindow, sendFrontendMessage } from './../main_window'
import { existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import { AppPlatforms, HyperPlayRelease } from 'common/types'
import { isWindows, isLinux } from 'backend/constants'
import { spawnAsync } from 'backend/utils'
import { GlobalConfig } from 'backend/config'
import { download } from 'electron-dl'
import { getAppInfo, removeApp, addNewApp } from 'backend/sideload/games'
import axios from 'axios'
import { notify } from 'backend/dialog/dialog'
import path from 'path'
import { addToQueue, initQueue } from 'backend/downloadmanager/downloadqueue'

export async function addGame(appId: string) {
  const res = await axios.get<HyperPlayRelease[]>(
    `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  )

  const data = res.data[0]
  libraryStore.set(data._id, data)

  const { installPath, executable, platform } = getInfo(data)

  if (data.releaseMeta.platforms.web) {
    return install(data, '', 'web')
  }

  addNewApp({
    app_name: data._id,
    runner: 'hyperplay',
    title: data.projectMeta.name,
    art_cover: data.releaseMeta.image,
    is_installed: true as const,
    art_square: data.releaseMeta.image,
    canRunOffline: true,
    web3: { supported: true },
    install: {
      executable: executable,
      platform: platform
    },
    browserUrl: ''
  })

  addToQueue({
    type: 'install',
    startTime: 0,
    endTime: 0,
    addToQueueTime: Date.now(),
    params: {
      appName: data._id,
      runner: 'hyperplay',
      platformToInstall: platform,
      path: installPath,
      gameInfo: {
        thirdPartyManagedApp: undefined,
        app_name: data._id,
        runner: 'hyperplay' as const,
        title: data.projectMeta.name,
        art_cover: data.releaseMeta.image,
        is_installed: false,
        cloud_save_enabled: false,
        namespace: '',
        developer: data.accountName,
        store_url: `https://store.hyperplay.xyz/game/${data.projectName}`,
        folder_name: data.projectName,
        save_folder: '',
        is_mac_native: false,
        is_linux_native: false,
        art_square: data.releaseMeta.image,
        canRunOffline: true,
        web3: { supported: true },
        install: {
          executable: executable,
          platform: 'Windows'
        },
        browserUrl: '',
        extra: {
          about: {
            description: data.projectMeta.short_description,
            longDescription: data.projectMeta.description
          },
          reqs: [],
          storeUrl: `https://store.hyperplay.xyz/game/${data.projectName}`
        }
      }
    }
  })

  initQueue()

  sendFrontendMessage('refreshLibrary', 'hyperplay')
}

export async function downloadGame(
  appName: string
  // installPath: string,
  // platformToInstall: AppPlatforms
): Promise<{ status: 'error' | 'done' }> {
  try {
    const appInfo = libraryStore.get_nodefault(appName)

    if (!appInfo) {
      throw new Error('App not found in library')
    }

    const { installPath, platform } = getInfo(appInfo)

    const {
      releaseMeta: { platforms }
    } = appInfo
    const downloadUrl = platforms[platform].external_url
    const window = getMainWindow()

    if (!window || !downloadUrl) {
      throw new Error('Window or downloadUrl not found')
    }

    // prevent from the next download being named eg. "game (1).zip"
    try {
      fs.rmSync(
        path.join(installPath, appInfo.releaseMeta.platforms[platform].name)
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
    await install(appInfo, installPath, 'windows_amd64')

    return { status: 'done' }
  } catch (e) {
    console.log(e)
    return { status: 'error' }
  }
}

async function install(
  appInfo: HyperPlayRelease,
  dirpath: string,
  platformToInstall: AppPlatforms
) {
  if (!existsSync(dirpath) && platformToInstall !== 'web') {
    return
  }

  const {
    projectName,
    _id,
    projectMeta: { name: title },
    releaseMeta: { image: art_cover, platforms }
  } = appInfo
  const gameInfo = platforms[platformToInstall]
  const zipFile = path.join(dirpath, gameInfo.name)
  const destinationPath = path.join(dirpath, projectName)
  const executeable = path.join(destinationPath, gameInfo.executable)

  const game = {
    app_name: _id,
    runner: 'sideload' as const,
    title,
    art_cover,
    is_installed: true as const,
    art_square: art_cover,
    canRunOffline: true,
    web3: { supported: true }
  }

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
    await spawnAsync('unzip', [dirpath, projectName])
  }

  fs.rmSync(zipFile)

  addNewApp({
    ...game,
    install: {
      executable: executeable,
      platform: platformToInstall
    },
    browserUrl: ''
  })

  notify({
    title,
    body: `Installed`
  })

  sendFrontendMessage('refreshLibrary', 'sideload')
}

export function uninstall(appName: string, shouldRemovePrefix: boolean) {
  // TODO: Method doesn't get called
  const appInfo = getAppInfo(appName)

  if (!appInfo) {
    return
  }

  removeApp({
    appName,
    shouldRemovePrefix,
    deleteFiles: appInfo.install.platform !== 'Browser'
  })

  setTimeout(() => {
    sendFrontendMessage('refreshLibrary', 'sideload')
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

const getInfo = (data: HyperPlayRelease) => {
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
