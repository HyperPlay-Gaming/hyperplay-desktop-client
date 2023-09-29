import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('authApi', {
  closeAuthModal: () => {
    ipcRenderer.sendToHost('closeAuthModal')
  },
  openExternalUrl: (url: string) => {
    ipcRenderer.send('openExternalUrl', url)
  }
})
