import { WrapRendererCallback } from 'common/types'
import { ipcRenderer } from 'electron'

export const getExtensionId = async () => ipcRenderer.invoke('getExtensionId')

export const handleDomReady = (cb: WrapRendererCallback<() => void>) => {
  ipcRenderer.on('dom-ready', cb)
  return () => {
    ipcRenderer.removeListener('dom-ready', cb)
  }
}
