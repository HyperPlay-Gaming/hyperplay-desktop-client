import { ipcRenderer, IpcRendererEvent } from 'electron'

export const startOverlay = () => ipcRenderer.send('start')
export const injectOverlay = (title: string) =>
  ipcRenderer.send('inject', title)

export const handleOsrImage = (
  callback: (event: IpcRendererEvent, arg: { image: string }) => void
) => {
  ipcRenderer.on('osrImage', callback)
  return () => {
    ipcRenderer.removeListener('osrImage', callback)
  }
}
