import { TypeCheckedStoreBackend } from 'backend/electron_store'

const defaultProviderStore = new TypeCheckedStoreBackend('providerMetadata', {
  cwd: 'store',
  name: 'x'
})

export default defaultProviderStore
