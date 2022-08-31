import { PROVIDERS } from 'backend/wallets/types'
import { getConnectionUris } from '../../wallets/providerHelper'

describe.only('tests the proxy server', function () {
  test.only('should log a qr code', async function () {
    await getConnectionUris(PROVIDERS.METAMASK_MOBILE)
  }, 240000)
})

export {}
