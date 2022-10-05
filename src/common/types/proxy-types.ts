import WCTypes from '@walletconnect/types'
type ApiType = typeof import('../../backend/api').default

declare global {
  interface Window {
    api: ApiType
  }
}

export interface IMobileRegistryEntryWithQrLink
  extends WCTypes.IMobileRegistryEntry {
  qrCodeLink: string
}

export interface UrisReturn {
  [key: string]: IMobileRegistryEntryWithQrLink
}

export enum PROVIDERS {
  METAMASK_MOBILE,
  WALLET_CONNECT
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
