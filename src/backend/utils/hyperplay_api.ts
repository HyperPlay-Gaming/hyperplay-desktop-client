import { HyperPlayAPI } from '@hyperplay/utils'
import { captureException } from '@sentry/electron'
import { backendEvents } from 'backend/backend_events'
import {
  appConfigFolder,
  configFolder,
  fixAsarPath,
  icon,
  publicDir
} from 'backend/constants'
import {
  errorExtensionRequestEvents,
  providerEvents,
  providerRequests,
  returnExtensionRequestEvents
} from 'backend/extension/provider/emitters'
import { toggleOverlay, updatePopupInOverlay } from 'backend/hyperplay-overlay'
import { removePopup } from 'backend/hyperplay-overlay/model'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'
import { getMainWindow } from 'backend/main_window'
import { openUrlOrFile } from 'backend/utils'

export const hpApi: HyperPlayAPI = {
  backendEvents,
  updatePopupInOverlay,
  logError: (msg: string) => logError(msg, LogPrefix.HyperPlay),
  logInfo: (msg: string) => logInfo(msg, LogPrefix.HyperPlay),
  extensionProvider: undefined,
  getMainWindowId: () => getMainWindow()?.id ?? -1,
  openMetaMaskHomePage: () =>
    getMainWindow()?.webContents.send('openMetaMaskHomePage'),
  openMetaMaskSnapsPage: () =>
    getMainWindow()?.webContents.send('openMetaMaskSnapsPage'),
  /* eslint-disable-next-line */
  openMetaMaskPortfolioPage: (...args: any) =>
    getMainWindow()?.webContents.send('openMetaMaskPortfolioPage', ...args),
  setBadgeTextInRenderer: (text: string) =>
    getMainWindow()?.webContents.send('setBadgeTextInRenderer', text),
  openUrl: async (url: string) => openUrlOrFile(url),
  captureException,
  configFolder,
  appConfigFolder,
  publicDir,
  fixAsarPath,
  eventsToCloseMetaMaskPopupOn: [],
  appIconPath: icon,
  providerEvents,
  returnExtensionRequestEvents,
  errorExtensionRequestEvents,
  providerRequests,
  toggleOverlay: toggleOverlay,
  removePopup: () => {
    const mainWindow = getMainWindow()
    if (mainWindow) {
      removePopup(mainWindow.id)
    }
  }
}

async function initHyperPlayAPI() {
  try {
    const extensionProvPackage = await import('@hyperplay/extension-provider')
    hpApi.extensionProvider = extensionProvPackage.extensionProvider
    logInfo('HyperPlayAPI initialized', LogPrefix.HyperPlay)
  } catch (err) {
    logError(`Error iniitalizing HyperPlayAPI ${err}`, LogPrefix.HyperPlay)
  }
}

initHyperPlayAPI()
