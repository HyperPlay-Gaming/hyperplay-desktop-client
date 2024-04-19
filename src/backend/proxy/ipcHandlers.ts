import { backendEvents } from 'backend/backend_events'
import { PROVIDERS } from 'common/types/proxy-types'
import { clipboard, ipcMain } from 'electron'
import {
  baseUri,
  getConnectionUri,
  provider,
  initBackendEvents,
  connectedProvider
} from '@hyperplay/providers'
import { JsonRpcCallback } from 'common/types'
import { logError, logInfo } from 'backend/logger/logger'
import { HyperPlayAPI } from '@hyperplay/providers/dist/types'
import { callOrSendContract, setProvider } from '@hyperplay/proxy-server'
import { extensionProvider } from 'backend/hyperplay-extension-helper/extensionProvider'
import { updatePopupInOverlay } from 'backend/hyperplay-overlay'
import { trackEvent } from 'backend/metrics/metrics'
import defaultProviderStore from './provider_store'

initBackendEvents(backendEvents, trackEvent)

ipcMain?.handle(
  'getConnectionUris',
  async function handleGetConnectionUris(
    event: Electron.IpcMainInvokeEvent,
    providerSelection: PROVIDERS,
    isBootstrapping = false
  ): Promise<string> {
    const api: HyperPlayAPI = {
      backendEvents,
      updatePopupInOverlay,
      logError,
      logInfo,
      extensionProvider
    }
    const baseUri = await getConnectionUri(
      providerSelection,
      isBootstrapping,
      api
    )
    setProvider(provider)
    return baseUri
  }
)

ipcMain.on('enableOnEvents', (ev, topic) => {
  /**
   * backend events listens to the upstream raw providers
   * since ethers.js does not use the on method of these eip1193 providers
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  backendEvents.on(topic, (...args: any[]) => {
    try {
      if (!ev.sender.isDestroyed()) {
        ev?.sender?.send('providerApi' + topic, ...args)
      }
    } catch (err) {
      logError(
        `Error when sending backend events to provider preload with topic ${topic}. Error: ${err}`
      )
    }
  })
})

// electron cannot handle errors thrown here in the preload script
// so we catch and return the error object, then check and rethrow in preload
ipcMain.handle('providerRequest', async (ev, args) => {
  try {
    // this will actually call request on the wrapped EIP1193 provider, not the deprecated send method
    const result = await provider.send(
      args.method,
      args.params ? args.params : []
    )
    return result
  } catch (e) {
    return e
  }
})

ipcMain.handle('sendRequest', async (ev, args: unknown[]) => {
  // this will actually call request on the wrapped EIP1193 provider, not the deprecated send method
  const result = await provider.send('send', args)
  return result
})

ipcMain.handle(
  'sendAsyncRequest',
  /* eslint-disable-next-line */
  async (ev, payload: any, callback: JsonRpcCallback) => {
    const result = await provider.send(
      payload.method,
      payload.params !== undefined ? payload.params : []
    )
    callback(result)
    return result
  }
)

ipcMain.on('copyWalletConnectBaseURIToClipboard', () => {
  if (baseUri) clipboard.writeText(baseUri)
})

ipcMain.handle('getConnectedProvider', async () => {
  return connectedProvider
})

ipcMain.handle('getCurrentWeb3Provider', async () => {
  return defaultProviderStore.get_nodefault('currentWeb3Provider')
})

ipcMain.handle('callOrSendContract', async (e, ...args) => {
  return callOrSendContract(...args)
})
