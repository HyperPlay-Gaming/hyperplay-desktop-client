/* eslint-disable  @typescript-eslint/no-explicit-any */
let connectedResolve: any

export const getConnectedPromise = async function () {
  return new Promise((resolve) => {
    connectedResolve = resolve
  })
}

export function walletConnected(accounts: string[]) {
  console.log('renderer receives: connected, accts = ', accounts)
  connectedResolve()
}

export function walletDisconnected(code: number, reason: string) {
  console.log('renderer receives: disconnected: ', code, reason)
}

export function accountsChanged(accounts: string[]) {
  console.log('renderer receives: accounts changed to ', accounts)
  connectedResolve()
}

export function chainChanged(chainId: number) {
  console.log('renderer receives: chain changed to ', chainId)
}

export function connectionRequestRejected() {
  console.log('renderer receives: connection request rejected ')
}
