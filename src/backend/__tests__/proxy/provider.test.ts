import { PROVIDERS, wait } from '../../../common/types/proxy-types'
import {
  getConnectionUris,
  passEventCallbacks
} from '../../proxy/providerHelper'
import {
  accountsChanged,
  walletConnected,
  walletDisconnected,
  chainChanged,
  connectionRequestRejected
} from '../../__mocks__/providerCallbacks'

passEventCallbacks(
  accountsChanged,
  walletConnected,
  walletDisconnected,
  chainChanged,
  connectionRequestRejected
)

describe('MANUAL tests for the provider helper', function () {
  test('should do nothing', function () {})
  // test('should log a qr code and/or uri link', async function () {
  //   await getConnectionUris(PROVIDERS.WALLET_CONNECT)
  //   await wait(200000)
  // }, 60000)
})

export {}
