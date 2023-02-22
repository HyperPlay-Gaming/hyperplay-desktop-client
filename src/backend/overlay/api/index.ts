import { WrapRendererCallback } from 'common/types'
import { ipcRenderer } from 'electron'

export const getExtensionId = async () => ipcRenderer.invoke('getExtensionId')

export const handleProxyWebViewInput = (
  cb: WrapRendererCallback<(inputEvent: string) => void>
) => {
  ipcRenderer.on('proxyWebViewInput', cb)
  return () => {
    ipcRenderer.removeListener('proxyWebViewInput', cb)
  }
}

export const handleInjectionSuccess = (
  cb: WrapRendererCallback<() => void>
) => {
  ipcRenderer.on('injectionSuccess', cb)
  return () => {
    ipcRenderer.removeListener('injectionSuccess', cb)
  }
}
