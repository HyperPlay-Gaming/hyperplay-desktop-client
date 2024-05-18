import { hpApi } from 'backend/utils/hyperplay_api'
import './ipcHandler'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'

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
