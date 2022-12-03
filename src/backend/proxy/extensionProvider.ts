import { EventEmitter } from 'node:events'
import { ipcMain, BrowserWindow } from 'electron'
import { JsonRpcPayload, JsonRpcResponse } from 'web3-core-helpers'
import { AbstractProvider, RequestArguments } from 'web3-core/types'

let mainWindow: BrowserWindow
const providerEvents: EventEmitter = new EventEmitter()

ipcMain.on('extensionOnEvent', (e: any, topic: string, ...args: any[]) => {
  providerEvents.emit(topic, ...args)
})

const returnExtensionRequestEvents: EventEmitter = new EventEmitter()
let requestId = 0

ipcMain.on('returnExtensionRequest', (e: any, id: number, value: any) => {
  returnExtensionRequestEvents.emit(
    'returnExtensionRequest:' + id.toString(),
    value
  )
})

export class ExtensionProvider implements AbstractProvider {
  connected = false

  constructor() {
    providerEvents.on('connect', () => {
      this.connected = true
    })
    providerEvents.on('disconnect', () => {
      this.connected = false
    })
  }

  sendAsync(
    payload: JsonRpcPayload,
    callback?: (
      error: Error | null,
      result?: JsonRpcResponse
    ) => Promise<unknown> | void
  ) {
    console.log('called sendAsync in extension provider')
  }

  async request(args: RequestArguments): Promise<any> {
    const currentRequestId = requestId
    ++requestId
    mainWindow.webContents.send(
      'metamaskExtensionRequest',
      currentRequestId,
      args
    )

    return new Promise((res, rej) => {
      returnExtensionRequestEvents.on(
        'returnExtensionRequest:' + currentRequestId.toString(),
        (value) => {
          res(value)
          //could remove listener to returnExtensionRequestEvents here
        }
      )
    })
  }

  on(topic: string, callback: (...cbArgs: any[]) => void) {
    providerEvents.on(topic, callback)
  }

  isConnected() {
    return true
  }
}

export const extensionProvider: ExtensionProvider = new ExtensionProvider()

//called from main
export function initExtensionProvider(mainWindowInit: BrowserWindow) {
  mainWindow = mainWindowInit
}
