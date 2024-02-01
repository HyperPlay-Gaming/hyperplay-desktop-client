import { ipcRenderer } from 'electron'
import { DEV_PORTAL_URL } from '../../common/constants'

export const getAuthSession = async () => {
  return ipcRenderer.invoke('getAuthSession')
}

export const signInWithProvider = (provider: string) =>
  ipcRenderer.send('openExternalUrl', `${DEV_PORTAL_URL}/oauth/${provider}`)
