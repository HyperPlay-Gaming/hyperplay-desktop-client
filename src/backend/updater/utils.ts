import { isMac } from 'backend/constants'
import { logError, LogPrefix } from 'backend/logger/logger'
import { rm } from 'fs/promises'
import { t } from 'i18next'
import { homedir } from 'os'
import { join } from 'path'

export async function removeCachedUpdatesFolder() {
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

export function getErrorMessage(error: string): string {
  const trimmedError = error.replace('net::', '').trim()
  if (
    Object.prototype.hasOwnProperty.call(commonDownloadErrors, trimmedError)
  ) {
    return commonDownloadErrors[trimmedError]()
  } else {
    return error
  }
}
