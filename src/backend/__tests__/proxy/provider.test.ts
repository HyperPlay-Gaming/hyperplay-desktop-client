import { PROVIDERS, WalletConnectWeb3Provider } from '../../proxy/types'
import {
  getConnectionUris,
  passEventCallbacks
} from '../../proxy/providerHelper'
import {
  accountsChanged,
  walletConnected,
  walletDisonnected,
  chainChanged,
  wait
} from '../../__mocks__/providerCallbacks'

passEventCallbacks(
  accountsChanged,
  walletConnected,
  walletDisonnected,
  chainChanged
)

describe('MANUAL tests for the provider helper', function () {
  test('should log a qr code and/or uri link', async function () {
    await getConnectionUris(PROVIDERS.WALLET_CONNECT)
    await wait(200000)
  }, 240000)
})

export {}
