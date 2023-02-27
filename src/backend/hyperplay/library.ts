import fs from 'fs';
// import { addNewApp } from './../api/library'
import { getMainWindow, sendFrontendMessage } from './../main_window'
import { existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import { AppPlatforms, HyperPlayRelease } from 'common/types'
import { isWindows } from 'backend/constants'
import { spawnAsync } from 'backend/utils'
import { GlobalConfig } from 'backend/config'
import { download } from 'electron-dl'
import { getAppInfo, removeApp, addNewApp } from 'backend/sideload/games'
import axios from 'axios'
import { notify } from 'backend/dialog/dialog'
import path from 'path'

export async function addGame(appId: string) {
  const res = await axios.get<HyperPlayRelease[]>(`https://developers.hyperplay.xyz/api/listings?id=${appId}`)

  const data = res.data[0]
  libraryStore.set(data._id, data)

  if (data.releaseMeta.platforms.web) {
    return install(data, '', 'web')
  }

  const installPath = GlobalConfig.get().getSettings().defaultInstallPath

  await downloadGame(appId, installPath, 'windows_amd64')
}

export async function downloadGame(
  appName: string,
  installPath: string,
  platformToInstall: AppPlatforms
) {
  const appInfo = libraryStore.get_nodefault(appName)

  if (!appInfo) {
    return
  }

  const {
    releaseMeta: { platforms }
  } = appInfo
  const downloadUrl = platforms[platformToInstall].external_url
  const window = getMainWindow()

  if (!window || !downloadUrl) {
    return
  }

  // prevent from the next download being named eg. "game (1).zip"
  fs.rmSync(path.join(installPath, appInfo.releaseMeta.platforms[platformToInstall].name))

  await download(window, downloadUrl, {
    directory: installPath,
    onProgress: (progress) => {
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
  await install(appInfo, installPath, platformToInstall)
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
  const isBrowser = platformToInstall === 'web'
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
    web3: { supported: true },
  }

  if (isBrowser) {
    addNewApp({
      ...game,
      install: {
        executable: '',
        platform: 'Browser'
      },
      browserUrl: gameInfo.external_url
    })
  }

  if (isWindows && !isBrowser) {
    await spawnAsync('powershell', ['Expand-Archive', '-LiteralPath', zipFile, '-DestinationPath', destinationPath])

    await installDistributables(destinationPath)
  } else if (!isBrowser) {
    await spawnAsync('unzip', [dirpath, projectName])
  }

  if (!isBrowser) {
    fs.rmSync(zipFile)

    addNewApp({
      ...game,
      install: {
        executable: executeable,
        platform: platformToInstall
      },
      browserUrl: ''
    })
  }

  notify({
    title,
    body: `Installed`
  })

  sendFrontendMessage('refreshLibrary', 'sideload')
}

export function uninstall(appName: string, shouldRemovePrefix: boolean) {
  const appInfo = getAppInfo(appName)
  if (!appInfo) {
    return
  }
  removeApp({
    appName,
    shouldRemovePrefix,
    deleteFiles: appInfo.install.platform !== 'Browser'
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