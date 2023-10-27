import { contextBridge, ipcRenderer } from 'electron'
import { DEV_PORTAL_URL } from '../common/constants'

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
  openProviderOAuthLink: (provider: string) => {
    ipcRenderer.send('openExternalUrl', `${DEV_PORTAL_URL}/oauth/${provider}`)
  }
})

ipcRenderer.on('auth:retryWalletConnection', () => {
  window.dispatchEvent(new CustomEvent('auth:retryWalletConnection'))
})
