import { ipcRenderer } from 'electron'
import { DEV_PORTAL_URL } from '../../common/constants'

export const getAuthSession = async () => {
  return ipcRenderer.invoke('getAuthSession')
}

export const logOut = async () => {
  await ipcRenderer.invoke('logOut')
  ipcRenderer.emit('logOut')
}

export const signInWithProvider = (provider: string) =>
  ipcRenderer.send('openExternalUrl', `${DEV_PORTAL_URL}/oauth/${provider}`)

export const authConnected = () => ipcRenderer.send('authConnected')
export const authDisconnected = () => ipcRenderer.send('authDisconnected')

export const handleAuthEvent = (
  onChange: (e: Electron.IpcRendererEvent, name: string) => void
) => {
  ipcRenderer.on('authEvent', onChange)
  return () => {
    ipcRenderer.removeListener('authEvent', onChange)
  }
}
