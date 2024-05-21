import { ipcRenderer } from 'electron'
import { MetaMaskInitMethod, ImportableBrowser } from '@hyperplay/utils'
import { MetamaskExtensionRequest } from 'common/types/proxy-types'
import { WrapRendererCallback } from 'common/types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const extensionOnEvent = (topic: string, ...args: any[]) => {
  ipcRenderer.send('extensionOnEvent', topic, ...args)
}

export const handleMetamaskExtensionRequests = (
  callback: WrapRendererCallback<MetamaskExtensionRequest>
) => {
  ipcRenderer.on('metamaskExtensionRequest', callback)
  return () => {
    ipcRenderer.removeListener('metamaskExtensionRequest', callback)
  }
}

export const handleMetamaskExtensionSends = (
  callback: WrapRendererCallback<MetamaskExtensionRequest>
) => {
  ipcRenderer.on('metamaskExtensionSend', callback)
  return () => {
    ipcRenderer.removeListener('metamaskExtensionSend', callback)
  }
}

export const handleMetamaskExtensionSendAsyncs = (
  callback: WrapRendererCallback<MetamaskExtensionRequest>
) => {
  ipcRenderer.on('metamaskExtensionSendAsync', callback)
  return () => {
    ipcRenderer.removeListener('metamaskExtensionSendAsync', callback)
  }
}

export const returnExtensionRequest = (requestId: number, args: any) => {
  ipcRenderer.send('returnExtensionRequest', requestId, args)
}

export const errorExtensionRequest = (requestId: number, error: any) => {
  ipcRenderer.send('errorExtensionRequest', requestId, error)
}

export const handleSetBadgeTextInRenderer = (
  cb: WrapRendererCallback<(text: string) => void>
) => {
  ipcRenderer.on('setBadgeTextInRenderer', cb)
  return () => {
    ipcRenderer.removeListener('setBadgeTextInRenderer', cb)
  }
}

export const importMetaMask = async (
  mmInitMethod: MetaMaskInitMethod,
  dbPath?: string | null,
  browser?: ImportableBrowser
) => ipcRenderer.invoke('importMetaMask', mmInitMethod, dbPath, browser)

export const getMetaMaskImportOptions = async () =>
  ipcRenderer.invoke('getMetaMaskImportOptions')

export const isExtensionInitialized = async () =>
  ipcRenderer.invoke('isExtensionInitialized')

export const handleMetaMaskImportError = (
  cb: WrapRendererCallback<(code: string) => void>
) => {
  ipcRenderer.on('importMetaMaskError', cb)
  return () => {
    ipcRenderer.removeListener('importMetaMaskError', cb)
  }
}

export const createNewMetaMaskWallet = (mmInitMethod: MetaMaskInitMethod) => {
  ipcRenderer.send('createNewMetaMaskWallet', mmInitMethod)
}

export const handleOpenMetaMaskHomePage = (
  cb: WrapRendererCallback<(pathname: string) => void>
) => {
  ipcRenderer.on('openMetaMaskHomePage', cb)
  return () => {
    ipcRenderer.removeListener('openMetaMaskHomePage', cb)
  }
}

export const handleOpenMetaMaskSnapsPage = (
  cb: WrapRendererCallback<() => void>
) => {
  ipcRenderer.on('openMetaMaskSnapsPage', cb)
  return () => {
    ipcRenderer.removeListener('openMetaMaskSnapsPage', cb)
  }
}

export const handleOpenMetaMaskPortfolioPage = (
  cb: WrapRendererCallback<(pathname: string) => void>
) => {
  ipcRenderer.on('openMetaMaskPortfolioPage', cb)
  return () => {
    ipcRenderer.removeListener('openMetaMaskPortfolioPage', cb)
  }
}

export const getExtensionId = async () => ipcRenderer.invoke('getExtensionId')

export const getImportFolderPath = async () => {
  return ipcRenderer.invoke('getImportFolderPath')
}
