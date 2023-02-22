import { getMainWindow } from './../main_window'
import { existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import { AppPlatforms } from 'common/types'
import { isWindows } from 'backend/constants'
import { spawnAsync } from 'backend/utils'
import { download } from 'electron-dl'

export async function install(
  appName: string,
  installPath: string,
  platformToInstall: AppPlatforms
) {
  const appInfo = libraryStore.get_nodefault(appName)

  if (!appInfo) {
    return
  }

  const {
    releaseMeta: { platforms },
    projectName
  } = appInfo
  const downloadUrl = platforms[platformToInstall].external_url
  const fileName = platforms[platformToInstall].name
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
      await extract(projectName, fileName)
    }
  })
}

async function extract(fileName: string, dirpath: string) {
  if (!existsSync(dirpath)) {
    return
  }

  // extract and remove the zip file on the installPath
  if (isWindows) {
    await spawnAsync('powershell', ['Expand-Archive', dirpath, fileName])
  } else {
    await spawnAsync('unzip', [dirpath, fileName])
  }
}
