import { PROVIDERS, WalletConnectWeb3Provider } from '../../wallets/types'
import {
  getConnectionUris,
  passEventCallbacks
} from '../../wallets/providerHelper'

export function walletConnected(accounts: string[]) {
  console.log('connected, accts = ', accounts)
}

export function walletDisonnected(code: number, reason: string) {
  console.log('disconnected: ', code, reason)
}

export function accountsChanged(accounts: string[]) {
  console.log('accounts changed to ', accounts)
}

export function chainChanged(chainId: number) {
  console.log('chain changed to ', chainId)
}

passEventCallbacks(
  accountsChanged,
  walletConnected,
  walletDisonnected,
  chainChanged
)

function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

describe.only('tests the proxy server', function () {
  test.only('should log a qr code', async function () {
    await getConnectionUris(PROVIDERS.WALLET_CONNECT)
    await wait(200000)
  }, 240000)
})

export {}
