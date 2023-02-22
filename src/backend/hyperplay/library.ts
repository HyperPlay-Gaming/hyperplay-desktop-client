import Axios from 'axios'
import { createWriteStream, existsSync } from 'graceful-fs'

import { libraryStore } from './electronStore'
import { AppPlatforms } from 'common/types'
import { isWindows } from 'backend/constants'
import { spawnAsync } from 'backend/utils'

async function downloadApp(fileUrl: string, outputLocationPath: string) {
  const writer = createWriteStream(outputLocationPath)

  return Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream'
  }).then(async (response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error: unknown = null
      writer.on('error', (err) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(true)
        }
      })
    })
  })
}

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

  await downloadApp(downloadUrl, installPath)

  if (!existsSync(installPath)) {
    return
  }

  // extract and remove the zip file on the installPath
  if (isWindows) {
    await spawnAsync('powershell', ['Expand-Archive', installPath, projectName])
  } else {
    await spawnAsync('unzip', [installPath, projectName])
  }
}
