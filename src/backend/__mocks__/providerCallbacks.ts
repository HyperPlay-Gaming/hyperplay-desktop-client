import { backendEvents } from './../backend_events'
import { PROVIDERS } from '../../common/types/proxy-types'
/* eslint-disable  @typescript-eslint/no-explicit-any */
let connectedResolve: any

export const getConnectedPromise = async function () {
  return new Promise((resolve) => {
    connectedResolve = resolve
  })
}

backendEvents.on('walletConnected', function (accounts: string[]) {
  console.log('renderer receives: connected, accts = ', accounts)
  connectedResolve()
})

backendEvents.on('walletDisconnected', function (code: number, reason: string) {
  console.log('renderer receives: disconnected: ', code, reason)
})

backendEvents.on('connectionRequestRejected', function () {
  console.log('renderer receives: connection request rejected ')
})

backendEvents.on('chainChanged', function (chainId: number) {
  console.log('renderer receives: chain changed to ', chainId)
})

backendEvents.on(
  'accountsChanged',
  function (accounts: string[], provider: PROVIDERS) {
    console.log('renderer receives: accounts changed to ', accounts, provider)
    connectedResolve()
  }
)
