import { ipcRenderer } from 'electron'

export const getExtensionId = async () => ipcRenderer.invoke('getExtensionId')