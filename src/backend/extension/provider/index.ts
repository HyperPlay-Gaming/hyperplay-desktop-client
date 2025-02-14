import { hpApi } from 'backend/utils/hyperplay_api'
import './ipcHandler'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'
import { providerRequests } from './emitters'
import { getInjectedBrowserWindow } from 'backend/injected_provider_window'

async function initExtensionProvider() {
  try {
    const extensionProvider = await import('@hyperplay/extension-provider')
    extensionProvider.initExtensionProvider(hpApi)
    logInfo('Extension provider initialized', LogPrefix.HyperPlay)
  } catch (err) {
    logError(
      `Error initializing extension provider ${err}`,
      LogPrefix.HyperPlay
    )
  }
}

initExtensionProvider()

providerRequests.on('request', (method, ...args) => {
  const win = getInjectedBrowserWindow()
  if (win === null) {
    throw 'tried to send a provider request to injected provider browser window but it is not initialized yet!'
  }
  win.webContents.send(method, ...args)
})
