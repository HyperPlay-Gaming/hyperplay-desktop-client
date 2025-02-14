import { ipcMain } from 'electron'
import {
  errorExtensionRequestEvents,
  providerEvents,
  returnExtensionRequestEvents
} from './emitters'
import { getInjectedBrowserWindow } from 'backend/injected_provider_window'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
ipcMain.on('extensionOnEvent', (e: any, topic: string, ...args: any[]) => {
  providerEvents.emit(topic, ...args)
})

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
ipcMain.on('returnExtensionRequest', (e: any, id: number, value: any) => {
  returnExtensionRequestEvents.emit(
    'returnExtensionRequest:' + id.toString(),
    value
  )
})

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
ipcMain.on('errorExtensionRequest', (e: any, id: number, value: any) => {
  errorExtensionRequestEvents.emit(
    'errorExtensionRequest:' + id.toString(),
    value
  )
})

ipcMain.prependListener('reloadApp', async () => {
  const extensionProvider = await import('@hyperplay/extension-provider')
  if (extensionProvider.extensionProvider !== undefined) {
    extensionProvider.extensionProvider.connectionPromise = undefined
  }
})

providerEvents.on(
  'request',
  (method: string, currentRequestId: number, args: unknown) => {
    getInjectedBrowserWindow()?.webContents.send(method, currentRequestId, args)
  }
)
