import { TypeCheckedStoreFrontend } from '../../helpers/electronStores'

const defaultProviderStore = new TypeCheckedStoreFrontend('providerMetadata', {
  cwd: 'store',
  name: 'default_provider_store'
})

export default defaultProviderStore
