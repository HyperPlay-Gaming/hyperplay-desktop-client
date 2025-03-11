import { app, dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { icon, isLinux } from '../constants'
import { logError, logInfo, LogPrefix } from '../logger/logger'
import { captureException } from '@sentry/electron'
import { getFileSize } from '../utils'
import { ClientUpdateStatuses } from '@hyperplay/utils'
import { trackEvent } from '../metrics/metrics'
import { getErrorMessage, removeCachedUpdatesFolder } from './utils'
// to test auto update on windows locally make sure you added the option verifyUpdateCodeSignature: false
// under build.win in electron-builder.yml and also change the app version to an old one there

let newVersion: string

autoUpdater.autoDownload = !isLinux
autoUpdater.autoInstallOnAppQuit = true

let isAppUpdating = false
let hasUpdated = false
let hasReportedDownloadStart = false

let updateAttempts = 0
const MAX_UPDATE_ATTEMPTS = 10
// check for updates every 3 hours
const checkUpdateInterval = 3 * 1000 * 60 * 60

setInterval(async () => {
  if (!hasUpdated && !isAppUpdating) {
    logInfo('Checking for client updates...', LogPrefix.AutoUpdater)
    await autoUpdater.checkForUpdates()
  }
}, checkUpdateInterval)

autoUpdater.on('update-available', async (info) => {
  if (isAppUpdating && hasUpdated) {
    logInfo(
      'New update available, but user has already updated the app',
      LogPrefix.AutoUpdater
    )
    return
  }

  newVersion = info.version

  trackEvent({
    event: 'Client Update Notified',
    properties: {
      currentVersion: autoUpdater.currentVersion.version,
      newVersion
    }
  })

  logInfo(
    'A HyperPlay update is available, downloading it now',
    LogPrefix.AutoUpdater
  )
  logInfo(`Version: ${info.version}`, LogPrefix.AutoUpdater)
  logInfo(`Release date: ${info.releaseDate}`, LogPrefix.AutoUpdater)
  logInfo(`Release name: ${info.releaseName}`, LogPrefix.AutoUpdater)
})

// log download progress
autoUpdater.on('download-progress', (progress) => {
  isAppUpdating = true

  // Track download start only once
  if (!hasReportedDownloadStart) {
    trackEvent({
      event: 'Downloading Client Update',
      properties: {
        currentVersion: autoUpdater.currentVersion.version,
        newVersion
      }
    })
    hasReportedDownloadStart = true
  }

  logInfo(
    'Downloading HyperPlay update...' +
      `Download speed: ${progress.bytesPerSecond}, ` +
      `Downloaded: ${progress.percent.toFixed(2)}%, ` +
      `Total downloaded: ${getFileSize(progress.transferred)} of ${getFileSize(
        progress.total
      )} bytes`,
    LogPrefix.AutoUpdater
  )
})

autoUpdater.on('update-downloaded', async () => {
  logInfo('The App update was downloaded', LogPrefix.AutoUpdater)
  hasUpdated = true
  isAppUpdating = false
  hasReportedDownloadStart = false // Reset for potential future updates

  trackEvent({
    event: 'Client Update Downloaded',
    properties: {
      currentVersion: autoUpdater.currentVersion.version,
      newVersion
    }
  })

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
  logInfo('User chose not to update the app for now.', LogPrefix.AutoUpdater)
})

autoUpdater.on('error', async (error) => {
  isAppUpdating = false
  const isNewVersion = newVersion !== app.getVersion()

  // To avoid false positives, we should not show the error dialog if the app has already updated successfully
  if (hasUpdated || !isNewVersion) {
    return
  }

  const errorMessage = getErrorMessage(error.message)
  logError(`Error updating HyperPlay: ${errorMessage}`, LogPrefix.AutoUpdater)

  // will remove cached updates when it fails to avoid corrupted updates
  if (updateAttempts > 3) {
    await removeCachedUpdatesFolder()
  }

  updateAttempts++

  if (updateAttempts < MAX_UPDATE_ATTEMPTS) {
    logInfo(
      `Retrying update attempt ${updateAttempts + 1}/${MAX_UPDATE_ATTEMPTS}`,
      LogPrefix.AutoUpdater
    )
    setTimeout(() => {
      autoUpdater.checkForUpdates()
    }, 6000)
    return
  }

  trackEvent({
    event: 'Client Update Error',
    properties: {
      currentVersion: autoUpdater.currentVersion.version,
      newVersion,
      error: error.message
    }
  })

  captureException(error, {
    tags: {
      event: 'Client Update Error',
      currentVersion: autoUpdater.currentVersion.version,
      newVersion,
      totalAttempts: MAX_UPDATE_ATTEMPTS
    }
  })

  updateAttempts = 0

  const { response } = await dialog.showMessageBox({
    title: t('box.error.update.message', 'Error Updating'),
    message: t(
      'box.error.update.body',
      `Something went wrong with the update after multiple attempts! Please check the error message below or reinstall HyperPlay. error: {{error}}`,
      { error: errorMessage }
    ),
    type: 'error',
    buttons: [t('button.cancel', 'Cancel'), t('button.download', 'Download')]
  })

  if (response === 1) {
    shell.openExternal('https://www.hyperplay.xyz/downloads')
  }
})

export function isClientUpdating(): ClientUpdateStatuses {
  if (hasUpdated) {
    return 'updated'
  }
  return isAppUpdating ? 'updating' : 'idle'
}
