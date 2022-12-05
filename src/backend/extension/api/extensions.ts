import { WrapRendererCallback } from 'common/types'
import { MetamaskExtensionRequest } from 'backend/proxy/commonProxyTypes'
// these functions are exposed to the BrowserWindow through window.api

import { ipcRenderer } from 'electron'

export const showMMHomePage = async () =>
  ipcRenderer.invoke('showMetaMaskExtensionHomePage')

export const showPopup = async () => {
  return ipcRenderer.invoke('showPopup')
}

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

export const returnExtensionRequest = (requestId: number, args: any) => {
  ipcRenderer.send('returnExtensionRequest', requestId, args)
}
