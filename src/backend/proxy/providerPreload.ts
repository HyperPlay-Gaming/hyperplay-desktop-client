import { RequestArguments } from 'common/typedefs/ipcBridge'
import { JsonRpcCallback } from 'common/types'
import { contextBridge, ipcRenderer, webFrame } from 'electron'

/**
 * @dev Extension must be removed prior to loading a page with this preload script.
 * Otherwise window.ethereum in the MM content script will replace the window.ethereum exposed here
 */
interface onEventsEnabledMap {
  [key: string]: boolean
}

const onEventsEnabled: onEventsEnabledMap = {}

const enabledTopics = [
  'accountsChanged',
  'connect',
  'message',
  'disconnect',
  'chainChanged'
]

/* eslint-disable @typescript-eslint/no-explicit-any */
const listenToRendererCalls = (fxn: string, topic: string, cb: any) => {
  if (!enabledTopics.includes(topic)) {
    throw `Tried to listen to ${topic} through window.ethereum!`
  }
  if (!onEventsEnabled[topic]) {
    ipcRenderer.send('enableOnEvents', topic)
    onEventsEnabled[topic] = true
  }
  ipcRenderer[fxn]('providerApi' + topic, (ev: any, ...args: any[]) => {
    cb(...args)
  })
}

const provRequest = async (args: RequestArguments) => {
  const x = await ipcRenderer.invoke('providerRequest', args)
  if (
    x !== null &&
    x !== 'undefined' &&
    typeof x === 'object' &&
    Object.hasOwn(x, 'data') &&
    Object.hasOwn(x.data, 'originalError')
  ) {
    throw x.data.originalError
  }
  return x
}

const sendRequest = async (...args: unknown[]) => {
  const result = (await ipcRenderer.invoke('sendRequest', args)) as object
  if (Object.hasOwn(result, 'error')) {
    throw result[0].error.message
  }
  return result[0].result
}

const sendAsyncRequest = async (payload: any, callback: JsonRpcCallback) => {
  const x = await ipcRenderer.invoke('sendAsyncRequest', payload, callback)
  return x
}

const providerApi = {
  provider: {
    request: async (args: RequestArguments) => {
      return provRequest(args)
    },
    send: async (...args: unknown[]) => {
      return sendRequest(...args)
    },
    sendAsync: async (payload: any, callback: JsonRpcCallback) => {
      return sendAsyncRequest(payload, callback)
    },
    once: (topic: string, cb: any) => {
      listenToRendererCalls('once', topic, cb)
    },
    on: (topic: string, cb: any) => {
      listenToRendererCalls('on', topic, cb)
    },
    off: (topic: string, cb: any) => {
      ipcRenderer.off('providerApi' + topic, cb)
    },
    addListener: (topic: string, cb: any) => {
      listenToRendererCalls('addListener', topic, cb)
    },
    removeListener: (topic: string, cb: any) => {
      ipcRenderer.removeListener('providerApi' + topic, cb)
    },
    removeAllListeners: (topic: string) => {
      ipcRenderer.removeAllListeners('providerApi' + topic)
    },
    enable: async () => {
      const args: RequestArguments = {
        method: 'eth_requestAccounts'
      }
      return provRequest(args)
    }
  }
}

contextBridge?.exposeInMainWorld('providerApi', providerApi)

function initProvider() {
  async function exposeWindowEthereum() {
    console.log('exposing window ethereum')
    if (!Object.hasOwn(window, 'ethereum')) {
      const windowAny = window as any
      windowAny.ethereum = {
        request: windowAny.providerApi.provider.request,
        send: windowAny.providerApi.provider.send,
        sendAsync: windowAny.providerApi.provider.sendAsync,
        once: windowAny.providerApi.provider.once,
        on: windowAny.providerApi.provider.on,
        off: windowAny.providerApi.provider.off,
        addListener: windowAny.providerApi.provider.addListener,
        removeListener: windowAny.providerApi.provider.removeListener,
        removeAllListeners: windowAny.providerApi.provider.removeAllListeners,
        isMetaMask: true,
        enable: windowAny.providerApi.provider.enable,
        selectedAddress: undefined,
        accounts: undefined
      }

      windowAny.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('accounts changed', accounts)
        windowAny.ethereum.selectedAddress = accounts[0]
        windowAny.ethereum.accounts = accounts
      })

      const acct = await windowAny.ethereum.request({ method: 'eth_accounts' })
      windowAny.ethereum.selectedAddress =
        acct && acct.length > 0 ? acct[0] : ''
      windowAny.ethereum.accounts = acct
    }
  }

  exposeWindowEthereum()
  const ev = new Event('ethereum#initialized')
  window.dispatchEvent(ev)
}

const exposeWindowEthereumProvider = `(${initProvider.toString()})()`
webFrame.executeJavaScript(exposeWindowEthereumProvider)
