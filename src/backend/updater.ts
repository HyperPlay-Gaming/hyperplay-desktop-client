import { dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { t } from 'i18next'

import { configStore, icon, isLinux, isMac } from './constants'
import { logError, logInfo, LogPrefix } from './logger/logger'
import { captureException } from '@sentry/electron'
import { getFileSize } from './utils'
import { ClientUpdateStatuses } from '@hyperplay/utils'
import { trackEvent } from './metrics/metrics'
import { homedir } from 'os'
import { join } from 'path'
import { rm } from 'fs/promises'
// to test auto update on windows locally make sure you added the option "verifyUpdateCodeSignature": false
// under build.win in package.json and also change the app version to an old one there

const appSettings = configStore.get_nodefault('settings')
const shouldCheckForUpdates = appSettings?.checkForUpdatesOnStartup === true
let newVersion: string

autoUpdater.autoDownload = shouldCheckForUpdates && !isLinux
autoUpdater.autoInstallOnAppQuit = true

let isAppUpdating = false
let hasUpdated = false
let updateAttempts = 0
const MAX_UPDATE_ATTEMPTS = 5

// check for updates every hour
const checkUpdateInterval = 1 * 1000 * 60 * 60
setInterval(async () => {
  if (shouldCheckForUpdates && !hasUpdated && !isAppUpdating) {
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

  if (!shouldCheckForUpdates) {
    logInfo(
      'New update available, but user has disabled auto updates',
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
  logInfo('App update is downloaded')
  hasUpdated = true

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

  // To avoid false positives, we should not show the error dialog if the app has already updated successfully
  if (hasUpdated) {
    return
  }

  const errorMessage = getErrorMessage(error.message)
  logError(`Error updating HyperPlay: ${errorMessage}`, LogPrefix.AutoUpdater)

  // will remove cached updates when it fails to avoid corrupted updates
  await removeCachedUpdatesFolder()

  updateAttempts++

  if (updateAttempts < MAX_UPDATE_ATTEMPTS) {
    logInfo(
      `Retrying update attempt ${updateAttempts + 1}/${MAX_UPDATE_ATTEMPTS}`,
      LogPrefix.AutoUpdater
    )
    setTimeout(() => {
      autoUpdater.checkForUpdates()
    }, 5000)
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

async function removeCachedUpdatesFolder() {
  // remove hyperplay-updates folder from cache directory
  // on macOS: /Users/<username>/Library/Caches/hyperplay-updates
  // on Windows: C:\Users\<username>\AppData\Local\hyperplay-updates
  const macOSPath = join(homedir(), 'Library', 'Caches', 'hyperplay-updates')
  const windowsPath = join(homedir(), 'AppData', 'Local', 'hyperplay-updates')

  try {
    await rm(isMac ? macOSPath : windowsPath, { recursive: true })
  } catch (error) {
    logError(
      `Error removing cached updates folder: ${error}`,
      LogPrefix.AutoUpdater
    )
  }
}

const commonDownloadErrors: Record<string, () => string> = {
  ERR_NETWORK_CHANGED: () =>
    t(
      'box.error.update.networkChanged',
      'Network changed. Please check your internet connection.'
    ),
  ERR_INTERNET_DISCONNECTED: () =>
    t(
      'box.error.update.internetDisconnected',
      'Internet disconnected. Please check your internet connection.'
    ),
  ERR_CONNECTION_RESET: () =>
    t(
      'box.error.update.connectionReset',
      'Connection reset. Please check your internet connection.'
    ),
  ERR_CONNECTION_CLOSED: () =>
    t(
      'box.error.update.connectionClosed',
      'Connection closed. Please check your internet connection.'
    ),
  ERR_CONNECTION_TIMED_OUT: () =>
    t(
      'box.error.update.connectionTimedOut',
      'Connection timed out. Please check your internet connection.'
    ),
  ERR_NAME_NOT_RESOLVED: () =>
    t(
      'box.error.update.nameNotResolved',
      'Name not resolved. Please check your internet connection.'
    ),
  ERR_CONNECTION_REFUSED: () =>
    t(
      'box.error.update.connectionRefused',
      'Connection refused. Please check your internet connection.'
    ),
  ERR_SSL_PROTOCOL_ERROR: () =>
    t(
      'box.error.update.sslProtocolError',
      'SSL protocol error. Please check your system time and date or open a ticket with HyperPlay support.'
    ),
  ERR_CERT_AUTHORITY_INVALID: () =>
    t(
      'box.error.update.certAuthorityInvalid',
      'Certificate authority invalid. Please check your system time and date or open a ticket with HyperPlay support.'
    ),
  ERR_NETWORK_ACCESS_DENIED: () =>
    t(
      'box.error.update.networkAccessDenied',
      'Network access denied. Please check your internet connection.'
    ),
  ERR_PROXY_CONNECTION_FAILED: () =>
    t(
      'box.error.update.proxyConnectionFailed',
      'Proxy connection failed. Please check your proxy settings.'
    ),
  ERR_CONNECTION_ABORTED: () =>
    t(
      'box.error.update.connectionAborted',
      'Connection aborted. Please check your internet connection.'
    ),
  ERR_ADDRESS_UNREACHABLE: () =>
    t(
      'box.error.update.addressUnreachable',
      'Address unreachable. Please check your internet connection.'
    ),
  ERR_CERT_DATE_INVALID: () =>
    t(
      'box.error.update.certDateInvalid',
      'Certificate date invalid. Please check your system time and date or open a ticket with HyperPlay support.'
    ),
  ERR_HTTP2_SERVER_REFUSED_STREAM: () =>
    t(
      'box.error.update.http2ServerRefusedStream',
      'HTTP2 server refused stream. Please check your internet connection.'
    ),
  ERR_EMPTY_RESPONSE: () =>
    t(
      'box.error.update.emptyResponse',
      'Empty response. Please check your internet connection.'
    ),
  ERR_FAILED: () =>
    t(
      'box.error.update.failed',
      'Download Failed. Please check your internet connection.'
    )
}

function getErrorMessage(error: string): string {
  const trimmedError = error.replace('net::', '').trim()
  if (
    Object.prototype.hasOwnProperty.call(commonDownloadErrors, trimmedError)
  ) {
    return commonDownloadErrors[trimmedError]()
  } else {
    return error
  }
}
