import { WrapRendererCallback } from 'common/types'
import { ipcRenderer } from 'electron'
import {
  AccountsChangedType,
  ChainChangedType,
  ConnectionRequestRejectedType,
  PROVIDERS,
  WalletConnectedType,
  WalletDisconnectedType
} from 'common/types/proxy-types'

export const handleConnected = (
  callback: WrapRendererCallback<WalletConnectedType>
) => {
  ipcRenderer.on('walletConnected', callback)
  return () => {
    ipcRenderer.removeListener('walletConnected', callback)
  }
}

export const handleDisconnected = (
  callback: WrapRendererCallback<WalletDisconnectedType>
) => ipcRenderer.on('walletDisconnected', callback)

export const handleAccountsChanged = (
  callback: WrapRendererCallback<AccountsChangedType>
) => ipcRenderer.on('accountChanged', callback)

export const handleChainChanged = (
  callback: WrapRendererCallback<ChainChangedType>
) => ipcRenderer.on('chainChanged', callback)

export const getConnectionUris = async (
  providerSelection: PROVIDERS,
  isBootstrapping = false
): Promise<string> => {
  return ipcRenderer.invoke(
    'getConnectionUris',
    providerSelection,
    isBootstrapping
  )
}

export const handleConnectionRequestRejected = (
  callback: WrapRendererCallback<ConnectionRequestRejectedType>
) => {
  ipcRenderer.on('connectionRequestRejected', callback)
  return () => {
    ipcRenderer.removeListener('connectionRequestRejected', callback)
  }
}

export const openHyperplaySite = () => ipcRenderer.send('openHyperplaySite')

export const handleShowInitialToast = (callback: () => void) => {
  ipcRenderer.on('showInitialToast', callback)
}

export const getConnectedProvider = async (): Promise<PROVIDERS> => {
  return ipcRenderer.invoke('getConnectedProvider')
}

export const getCurrentWeb3Provider = async (): Promise<
  PROVIDERS | undefined
> => {
  return ipcRenderer.invoke('getCurrentWeb3Provider')
}

export const callOrSendRequest = async (
  isCall: boolean,
  /* eslint-disable-next-line */
  req: any
) => {
  return ipcRenderer.invoke('callOrSendContract', isCall, req)
}
