export type walletConnectedHandler = (
  event: Electron.IpcRendererEvent,
  accounts: string[]
) => void

export type walletDisconnectedHandler = (
  event: Electron.IpcRendererEvent,
  code: number,
  reason: string
) => void

export type accountsChangedHandler = (
  event: Electron.IpcRendererEvent,
  accounts: string[]
) => void

export type chainChangedHandler = (
  event: Electron.IpcRendererEvent,
  chainId: number
) => void

export enum PROXY_TOPICS {
  WALLET_CONNECTED = 'wallet-connected',
  WALLET_DISCONNECTED = 'wallet-disconnected',
  ACCOUNT_CHANGED = 'account-changed',
  CHAIN_CHANGED = 'chain-changed',
  GET_CONNECTION_URIS = 'get-connection-uris'
}
