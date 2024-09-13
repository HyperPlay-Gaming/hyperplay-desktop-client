import { dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { configStore, icon } from './constants'
import { logInfo } from './logger/logger'
import { isOnline } from './online_monitor'
// to test auto update on windows locally make sure you added the option "verifyUpdateCodeSignature": false
// under build.win in package.json and also change the app version to an old one there

const appSettings = configStore.get_nodefault('settings')
const shouldCheckForUpdates = appSettings?.checkForUpdatesOnStartup === true

autoUpdater.autoDownload = shouldCheckForUpdates
autoUpdater.autoInstallOnAppQuit = false

// check for updates every hour
const checkUpdateInterval = 1 * 60 * 60 * 1000
setInterval(() => {
  if (isOnline() && shouldCheckForUpdates) {
    autoUpdater.checkForUpdates()
  }
}, checkUpdateInterval)

autoUpdater.on('update-available', async (info) => {
  if (!isOnline() || !shouldCheckForUpdates) {
    return
  }
  logInfo('A HyperPlay update is available, downloading it now')
  logInfo(`Version: ${info.version}`)
  logInfo(`Release date: ${info.releaseDate}`)
  logInfo(`Release name: ${info.releaseName}`)
})

// log download progress
autoUpdater.on('download-progress', (progress) => {
  logInfo(`Download speed: ${progress.bytesPerSecond}`)
  logInfo(`Downloaded ${progress.percent.toFixed(2)}%`)
  logInfo(
    `Total downloaded: ${progress.transferred} of ${progress.total} bytes`
  )
})

autoUpdater.on('update-downloaded', async () => {
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
})

autoUpdater.on('error', async (error) => {
  if (!isOnline()) {
    return
  }

  const { response } = await dialog.showMessageBox({
    title: t('box.error.update.title', 'Error Updating'),
    message: t(
      'box.error.update.message',
      `Something went wrong with the update after multiple attempts! Please manually uninstall and reinstall HyperPlay. error: ${JSON.stringify(
        error
      )}`
    ),
    type: 'error',
    buttons: [t('button.cancel', 'Cancel'), t('button.download', 'Download')]
  })

  if (response === 1) {
    shell.openExternal('https://www.hyperplay.xyz/downloads')
  }
})
