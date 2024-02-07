import { contextBridge, ipcRenderer, webFrame } from 'electron'
import { DEV_PORTAL_URL } from '../common/constants'

const removeBackground = `
document.onreadystatechange = function(e)
{
  if (document.readyState === 'interactive')
  {
    const styles = 'body, html { background: transparent !important } div.layout-root { padding: 0px !important; padding-top: 10px !important; }'
    const styleSheet = document.createElement('style')
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
};
`

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

webFrame.executeJavaScript(removeBackground)
