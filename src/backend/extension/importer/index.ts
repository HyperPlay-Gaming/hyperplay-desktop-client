import { session } from 'electron'
import store from './store'
import { HyperPlayAPI } from '@hyperplay/utils'
import './backendEventHandlers'
import './ipcHandler'

export const initExtension = async function (api: HyperPlayAPI) {
  const extensionImporter = await import('@hyperplay/extension-importer')
  const isInitialized = store.get('isInitialized', false)
  extensionImporter.initExtension(api, session.defaultSession, isInitialized)
}
