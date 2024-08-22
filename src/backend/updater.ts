import { dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { configStore, icon } from './constants'
import { logError, LogPrefix, logInfo } from './logger/logger'
import { isOnline } from './online_monitor'

const appSettings = configStore.get_nodefault('settings')
const shouldCheckForUpdates = appSettings?.checkForUpdatesOnStartup === true

autoUpdater.autoDownload = shouldCheckForUpdates
autoUpdater.autoInstallOnAppQuit = false

// check for updates every 6 hours
const interval = 1000 * 60 * 60 * 6
setInterval(() => {
  if (shouldCheckForUpdates) {
    autoUpdater.checkForUpdates()
  }
}, interval)

autoUpdater.on('update-available', async () => {
  if (!isOnline() || !shouldCheckForUpdates) {
    return
  }

  logInfo('App update is available, downloading it now')
  autoUpdater.downloadUpdate()
})

// log download progress
autoUpdater.on('download-progress', (progress) => {
  logInfo(`Download speed: ${progress.bytesPerSecond}`)
  logInfo(`Downloaded ${progress.percent}%`)
  logInfo(
    `Total downloaded: ${progress.transferred} of ${progress.total} bytes`
  )

  // TODO: use it in the future for progress bar on frontend if needed
  /*   sendFrontendMessage(`progressUpdate-hyperplay`, {
    appName: 'hyperplay',
    runner: 'hyperplay',
    status: 'downloading',
    progress: {
      percent: progress.percent,
      downloadedBytes: progress.transferred,
      downloadSize: progress.total,
      downloadSpeed: progress.bytesPerSecond,
      diskWriteSpeed: progress.bytesPerSecond
    }
  }) */
})

let didNotRestart = false
const showUpdateMessage = async () => {
  logInfo('App update is downloaded')
  const { response } = await dialog.showMessageBox({
    title: t('box.info.update.appUpdated', 'HyperPlay was updated'),
    message: t(
      'box.info.update.appUpdated-message',
      'HyperPlay was updated. Do you want to update and restart HyperPlay now?'
    ),
    buttons: [t('box.no'), t('box.yes')],
    icon: icon
  })

  if (response === 1) {
    return autoUpdater.quitAndInstall()
  }

  autoUpdater.autoInstallOnAppQuit = true
  didNotRestart = true
}

const timeToShowUpdateMessageAgain = 24 * 60 * 60 * 1000
autoUpdater.on('update-downloaded', async () => {
  showUpdateMessage()
  if (didNotRestart) {
    // Schedule to show the message again after 24 hours if the user did not update
    setTimeout(showUpdateMessage, timeToShowUpdateMessageAgain)
  }
})

const MAX_UPDATE_ATTEMPTS = 5
let updateAttempts = 0

autoUpdater.on('error', async (error) => {
  if (!isOnline()) {
    return
  }

  updateAttempts++

  if (updateAttempts < MAX_UPDATE_ATTEMPTS) {
    return
  }

  logError(
    ['Failed to update after ' + MAX_UPDATE_ATTEMPTS + ' attempts: ', error],
    LogPrefix.Backend
  )
  const { response } = await dialog.showMessageBox({
    title: t('box.error.update.title', 'Error Updating'),
    message: t(
      'box.error.update.message',
      'Something went wrong with the update after multiple attempts! Please manually uninstall and reinstall HyperPlay.'
    ),
    type: 'error',
    buttons: [t('button.cancel', 'Cancel'), t('button.download', 'Download')]
  })

  if (response === 1) {
    shell.openExternal('https://www.hyperplay.xyz/downloads')
  }

  updateAttempts = 0
})
