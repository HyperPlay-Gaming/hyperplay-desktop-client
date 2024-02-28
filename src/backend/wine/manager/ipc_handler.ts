import { ipcMain } from 'electron'
import { ProgressInfo, State } from 'common/types'
import {
  installWineVersion,
  removeWineVersion,
  updateWineVersionInfos
} from './utils'
import { logError, LogPrefix } from '../../logger/logger'
import {
  createAbortController,
  deleteAbortController
} from '../../utils/aborthandler/aborthandler'
import { sendFrontendMessage } from '../../main_window'
import { isWindows } from 'backend/constants'

ipcMain.handle('installWineVersion', async (_e, release) => {
  if (isWindows) {
    return 'error'
  }
  const onProgress = (state: State, progress?: ProgressInfo) => {
    sendFrontendMessage('progressOfWineManager' + release.version, {
      state,
      progress
    })
  }
  const result = await installWineVersion(
    release,
    onProgress,
    createAbortController(release.version).signal
  )
  deleteAbortController(release.version)
  return result ?? 'error'
})

ipcMain.handle('refreshWineVersionInfo', async (e, fetch?) => {
  if (isWindows) {
    return
  }
  try {
    await updateWineVersionInfos(fetch)
    return
  } catch (error) {
    logError(error, LogPrefix.WineDownloader)
    return
  }
})

ipcMain.handle('removeWineVersion', async (e, release) =>
  removeWineVersion(release)
)
