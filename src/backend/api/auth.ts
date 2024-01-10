import { ipcRenderer } from 'electron'

export const getAuthSession = async () => {
  return ipcRenderer.invoke('getAuthSession')
}
