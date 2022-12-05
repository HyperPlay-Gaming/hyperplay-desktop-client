import { WrapRendererCallback } from '../../../common/types'
import { PROXY_TOPICS } from '../types'
import { ipcRenderer } from 'electron'
import {
  AccountsChangedType,
  WalletConnectedType,
  WalletDisconnectedType,
  ChainChangedType,
  ConnectionRequestRejectedType,
  PROVIDERS,
  UrisReturn
} from '../commonProxyTypes'

export const handleConnected = (
  callback: WrapRendererCallback<WalletConnectedType>
) => {
  ipcRenderer.on(PROXY_TOPICS.WALLET_CONNECTED, callback)
  return () => {
    ipcRenderer.removeListener(PROXY_TOPICS.WALLET_CONNECTED, callback)
  }
}

export const handleDisconnected = (
  callback: WrapRendererCallback<WalletDisconnectedType>
) => ipcRenderer.on(PROXY_TOPICS.WALLET_DISCONNECTED, callback)

export const handleAccountsChanged = (
  callback: WrapRendererCallback<AccountsChangedType>
) => ipcRenderer.on(PROXY_TOPICS.ACCOUNT_CHANGED, callback)

export const handleChainChanged = (
  callback: WrapRendererCallback<ChainChangedType>
) => ipcRenderer.on(PROXY_TOPICS.CHAIN_CHANGED, callback)

export const getConnectionUris = async (
  providerSelection: PROVIDERS
): Promise<UrisReturn> =>
  ipcRenderer.invoke(PROXY_TOPICS.GET_CONNECTION_URIS, providerSelection)

export const handleConnectionRequestRejected = (
  callback: WrapRendererCallback<ConnectionRequestRejectedType>
) => {
  ipcRenderer.on(PROXY_TOPICS.CONNECTION_REQUEST_REJECTED, callback)
  return () => {
    ipcRenderer.removeListener(
      PROXY_TOPICS.CONNECTION_REQUEST_REJECTED,
      callback
    )
  }
}

export const openHyperplaySite = () => ipcRenderer.send('openHyperplaySite')
