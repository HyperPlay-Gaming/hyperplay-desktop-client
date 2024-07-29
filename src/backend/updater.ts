import { dialog, shell, nativeImage } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { icon } from './constants'
import { logError, LogPrefix, logInfo } from './logger/logger'
import { isOnline } from './online_monitor'

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

// check for updates every 12 hours
const interval = 1000 * 60 * 60 * 12
setInterval(() => {
  autoUpdater.checkForUpdates()
}, interval)

autoUpdater.on('update-available', async () => {
  if (!isOnline()) {
    return
  }

  logInfo('App update is available')
  const { response, checkboxChecked } = await dialog.showMessageBox({
    title: t('box.info.update.title', 'HyperPlay'),
    message: t('box.info.update.message', 'There is a new Version available!'),
    detail: t(
      'box.info.update.detail',
      'Do you want to download the update in the background?'
    ),
    checkboxLabel: t('box.info.update.changelog', 'Open changelog'),
    checkboxChecked: false,
    icon: nativeImage.createFromPath(icon),
    buttons: [t('box.no'), t('box.yes')]
  })
  if (checkboxChecked) {
    shell.openExternal(
      'https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/releases'
    )
  }
  if (response === 1) {
    autoUpdater.downloadUpdate()
  }
})

autoUpdater.on('update-downloaded', async () => {
  if (!isOnline()) {
    return
  }

  logInfo('App update is downloaded')
  const { response } = await dialog.showMessageBox({
    title: t('box.info.update.title-finished', 'Update Finished'),
    message: t(
      'box.info.update.message-finished',
      'Do you want to restart HyperPlay now?'
    ),
    buttons: [t('box.no'), t('box.yes')],
    icon: icon
  })

  if (response === 1) {
    return autoUpdater.quitAndInstall()
  }

  autoUpdater.autoInstallOnAppQuit = true
})

autoUpdater.on('error', async (error) => {
  if (!isOnline()) {
    return
  }

  logError(['Failed to update ', error], LogPrefix.Backend)
  const { response } = await dialog.showMessageBox({
    title: t('box.error.update.title', 'Error Updating'),
    message: t(
      'box.error.update.message',
      'Something went wrong with the update! Please manually uninstall and reinstall HyperPlay.'
    ),
    type: 'error',
    buttons: [t('button.cancel', 'Cancel'), t('button.download', 'Download')]
  })
  if (response === 1) {
    shell.openExternal('https://www.hyperplay.xyz/downloads')
  }
})
