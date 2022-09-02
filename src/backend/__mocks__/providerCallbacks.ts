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

export function walletDisonnected(code: number, reason: string) {
  console.log('renderer receives: disconnected: ', code, reason)
}

export function accountsChanged(accounts: string[]) {
  console.log('renderer receives: accounts changed to ', accounts)
}

export function chainChanged(chainId: number) {
  console.log('renderer receives: chain changed to ', chainId)
}

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}
