import { addNewApp } from './../api/library'
import { getMainWindow } from './../main_window'
import { existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import { AppPlatforms, HyperPlayRelease } from 'common/types'
import { isWindows } from 'backend/constants'
import { spawnAsync } from 'backend/utils'
import { download } from 'electron-dl'

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
    },
    onCompleted: async () => {
      window.webContents.send('gameStatusUpdate', {
        appName,
        status: 'done'
      })
      await install(appInfo, installPath, platformToInstall)
    }
  })
}

async function install(
  appInfo: HyperPlayRelease,
  dirpath: string,
  platformToInstall: AppPlatforms
) {
  if (!existsSync(dirpath)) {
    return
  }

  const {
    projectName,
    _id,
    projectMeta: { name: title },
    releaseMeta: { image: art_cover, platforms }
  } = appInfo
  const gameInfo = platforms[platformToInstall]

  // extract and remove the zip file on the installPath
  if (isWindows) {
    await spawnAsync('powershell', ['Expand-Archive', dirpath, projectName])
    return addNewApp({
      app_name: _id,
      runner: 'sideload',
      title,
      install: {
        executable: gameInfo.executable,
        platform: platformToInstall
      },
      art_cover,
      is_installed: true,
      art_square: art_cover,
      canRunOffline: true,
      web3: { supported: true },
      browserUrl: '' // TODO: add browserUrl
    })
  } else {
    await spawnAsync('unzip', [dirpath, projectName])
  }
}
