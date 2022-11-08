// these functions are exposed to the BrowserWindow through window.api

import { ipcRenderer } from 'electron'

export const showMMHomePage = async () =>
  ipcRenderer.invoke('showMetaMaskExtensionHomePage')

export const showPopup = async () => {
  return ipcRenderer.invoke('showPopup')
}
