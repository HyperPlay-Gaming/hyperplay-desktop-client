import { dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { icon } from './constants'
import { nativeImage } from 'electron'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

autoUpdater.on('update-available', async () => {
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
    shell.openExternal('https://github.com/G7DAO/HyperPlay/releases')
  }
  if (response === 1) {
    autoUpdater.downloadUpdate()
  }
})
autoUpdater.on('update-downloaded', async () => {
  const { response } = await dialog.showMessageBox({
    title: t('box.info.update.title-finished', 'Update Finished'),
    message: t(
      'box.info.update.message-finished',
      'Do you want to restart HyperPlay now?'
    ),
    buttons: [t('box.no'), t('box.yes')]
  })

  if (response === 1) {
    return autoUpdater.quitAndInstall()
  }

  autoUpdater.autoInstallOnAppQuit = true
})

// autoUpdater.on('error', (err) => {
//   dialog.showErrorBox(
//     t('box.error.update.title', 'Update Error'),
//     t(
//       'box.error.update.message',
//       'Something went wrong with the update, please check the logs or try again later!'
//     )
//   )
//   logError(['failed to update', `${err}`], LogPrefix.Backend, false)
// })
