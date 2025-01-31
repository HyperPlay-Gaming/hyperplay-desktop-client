import store from './store'
import { HyperPlayAPI } from '@hyperplay/utils'
import './backendEventHandlers'
import './ipcHandler'
import { LogPrefix, logError } from 'backend/logger/logger'
import { getInjectedProviderSession } from 'backend/injected_provider_window'

export const initExtension = async function (api: HyperPlayAPI) {
  try {
    const extensionImporter = await import('@hyperplay/extension-importer')
    const isInitialized = store.get('isInitialized', false)
    extensionImporter.initExtension(
      api,
      getInjectedProviderSession(),
      isInitialized
    )
  } catch (err) {
    logError(`Error initializing extension ${err}`, LogPrefix.HyperPlay)
  }
}
