import { TypeCheckedStoreBackend } from '../../../electron_store'

export type ExtensionStore = {
  extensionMetadata: {
    isInitialized: boolean
  }
}

const store = new TypeCheckedStoreBackend('extensionMetadata', {
  cwd: 'store',
  name: 'extension_metadata_store'
})

export default store
