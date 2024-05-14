import { TypeCheckedStoreBackend } from 'backend/electron_store'

const defaultProviderStore = new TypeCheckedStoreBackend('providerMetadata', {
  cwd: 'store',
  name: 'default_provider_store'
})

export default defaultProviderStore
