import { ipcRenderer } from 'electron'

export const getPopupUrl = async () => ipcRenderer.invoke('getPopupUrl')