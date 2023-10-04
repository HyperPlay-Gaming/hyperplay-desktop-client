import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('authApi', {
  closeAuthModal: () => {
    ipcRenderer.sendToHost('closeAuthModal')
  },
  reportAccountNotConnected: () => {
    ipcRenderer.sendToHost('auth:accountNotConnected')
  },
  reportAccountConnected: () => {
    ipcRenderer.sendToHost('auth:accountConnected')
  },
  openExternalUrl: (url: string) => {
    ipcRenderer.send('openExternalUrl', url)
  }
})
