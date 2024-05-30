import { HyperPlayAPI } from '@hyperplay/utils'
import { captureException } from '@sentry/electron'
import { backendEvents } from 'backend/backend_events'
import {
  appConfigFolder,
  configFolder,
  fixAsarPath,
  icon,
  publicDir
} from 'backend/constants/folders'
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
import defaultProviderStore from 'backend/proxy/provider_store'
import { openUrlOrFile } from 'backend/utils'
import {
  DESCRIPTION,
  EXTENSION_NOTIFICATION,
  INITIAL_TOAST,
  TITLE
} from 'frontend/screens/TransactionNotification/constants'

function setMainWindowOnTop() {
  getMainWindow()?.restore()
  getMainWindow()?.focus()
  getMainWindow()?.moveTop()
}

export const hpApi: HyperPlayAPI = {
  backendEvents,
  updatePopupInOverlay,
  logError: (msg: string) => logError(msg, LogPrefix.HyperPlay),
  logInfo: (msg: string) => logInfo(msg, LogPrefix.HyperPlay),
  extensionProvider: undefined,
  getMainWindowId: () => getMainWindow()?.id ?? -1,
  /* eslint-disable-next-line */
  openMetaMaskHomePage: (...args: any) => {
    setMainWindowOnTop()
    getMainWindow()?.webContents.send('openMetaMaskHomePage', ...args)
  },
  openMetaMaskSnapsPage: () => {
    setMainWindowOnTop()
    getMainWindow()?.webContents.send('openMetaMaskSnapsPage')
  },
  /* eslint-disable-next-line */
  openMetaMaskPortfolioPage: (...args: any) => {
    setMainWindowOnTop()
    getMainWindow()?.webContents.send('openMetaMaskPortfolioPage', ...args)
  },
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
  },
  getMetaMaskExtensionId: async () => {
    const extensionImporter = await import('@hyperplay/extension-importer')
    return extensionImporter?.getExtensionId() ?? ''
  },
  getCurrentWeb3Provider: () => {
    return defaultProviderStore.get_nodefault('currentWeb3Provider')
  },
  i18n: {
    transactions: {
      TITLE: TITLE,
      DESCRIPTION: DESCRIPTION,
      EXTENSION_NOTIFICATION: EXTENSION_NOTIFICATION,
      INITIAL_TOAST: INITIAL_TOAST
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
