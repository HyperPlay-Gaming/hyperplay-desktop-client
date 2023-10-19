type ApiType = typeof import('../../backend/api').default

declare global {
  interface Window {
    api: ApiType
  }
}

export enum PROVIDERS {
  METAMASK_MOBILE = 'MetaMaskMobile',
  WALLET_CONNECT = 'WalletConnect',
  METAMASK_EXTENSION = 'MetaMaskExtension',
  UNCONNECTED = 'Unconnected'
}

export type AccountsChangedType = (accounts: string[]) => void
export type WalletConnectedType = (accounts: string[]) => void
export type WalletDisconnectedType = (code: number, reason: string) => void
export type ChainChangedType = (chainId: number) => void
export type ConnectionRequestRejectedType = () => void

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

export interface OverlayWindowState {
  ignoreInput: boolean
  state?: 'show' | 'hide'
}
