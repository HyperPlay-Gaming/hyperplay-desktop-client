import {
  walletConnectedHandler,
  walletDisconnectedHandler,
  accountsChangedHandler,
  chainChangedHandler,
  PROXY_TOPICS
} from 'common/types/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { PROVIDERS, UrisReturn } from './proxy/types'

contextBridge.exposeInMainWorld('proxyServer', {
  handleConnected: (callback: walletConnectedHandler) =>
    ipcRenderer.on(PROXY_TOPICS.WALLET_CONNECTED, callback),
  handleDisconnected: (callback: walletDisconnectedHandler) =>
    ipcRenderer.on(PROXY_TOPICS.WALLET_DISCONNECTED, callback),
  handleAccountsChanged: (callback: accountsChangedHandler) =>
    ipcRenderer.on(PROXY_TOPICS.ACCOUNT_CHANGED, callback),
  handleChainChanged: (callback: chainChangedHandler) =>
    ipcRenderer.on(PROXY_TOPICS.CHAIN_CHANGED, callback),
  getConnectionUris: async (
    providerSelection: PROVIDERS
  ): Promise<UrisReturn> =>
    ipcRenderer.invoke(PROXY_TOPICS.GET_CONNECTION_URIS, providerSelection)
})
