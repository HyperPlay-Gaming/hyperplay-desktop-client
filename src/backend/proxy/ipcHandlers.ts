import { backendEvents } from 'backend/backend_events'
import { PROVIDERS } from 'common/types/proxy-types'
import { clipboard, ipcMain } from 'electron'
import { JsonRpcCallback } from 'common/types'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'
import { trackEvent } from 'backend/metrics/metrics'
import defaultProviderStore from './provider_store'
import { getHpOverlay } from 'backend/overlay'

async function init() {
  try {
    const providers = await import('@hyperplay/providers')
    providers.initBackendEvents(backendEvents, trackEvent)
  } catch (err) {
    logError(`Error initializing providers ${err}`, LogPrefix.HyperPlay)
  }
}

init()

ipcMain?.handle(
  'getConnectionUris',
  async function handleGetConnectionUris(
    event: Electron.IpcMainInvokeEvent,
    providerSelection: PROVIDERS,
    isBootstrapping = false
  ): Promise<string> {
    const extensionProvider = await import('@hyperplay/extension-provider')
    const hpOverlay = await getHpOverlay()
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const api: any = {
      backendEvents,
      updatePopupInOverlay: hpOverlay?.updatePopupInOverlay,
      logError,
      logInfo,
      extensionProvider: extensionProvider.extensionProvider
    }
    const providers = await import('@hyperplay/providers')
    const baseUri = await providers.getConnectionUri(
      providerSelection,
      isBootstrapping,
      api
    )
    const proxyServer = await import('@hyperplay/proxy-server')
    proxyServer.setProvider(providers.provider)
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
    const providers = await import('@hyperplay/providers')
    // this will actually call request on the wrapped EIP1193 provider, not the deprecated send method
    const result = await providers.provider.send(
      args.method,
      args.params ? args.params : []
    )
    return result
  } catch (e) {
    return e
  }
})

ipcMain.handle('sendRequest', async (ev, args: unknown[]) => {
  const providers = await import('@hyperplay/providers')
  // this will actually call request on the wrapped EIP1193 provider, not the deprecated send method
  const [method, ...rest] = args
  const result = await providers.provider.send(method as string, rest)
  return result
})

ipcMain.handle(
  'sendAsyncRequest',
  /* eslint-disable-next-line */
  async (ev, payload: any, callback: JsonRpcCallback) => {
    const providers = await import('@hyperplay/providers')
    const result = await providers.provider.send(
      payload.method,
      payload.params !== undefined ? payload.params : []
    )
    callback(result)
    return result
  }
)

ipcMain.on('copyWalletConnectBaseURIToClipboard', async () => {
  const providers = await import('@hyperplay/providers')
  if (providers.baseUri) clipboard.writeText(providers.baseUri)
})

ipcMain.handle('getConnectedProvider', async () => {
  const providers = await import('@hyperplay/providers')
  return providers.connectedProvider
})

ipcMain.handle('getCurrentWeb3Provider', async () => {
  return defaultProviderStore.get_nodefault('currentWeb3Provider')
})

ipcMain.handle('callOrSendContract', async (e, ...args) => {
  const proxyServer = await import('@hyperplay/proxy-server')
  return proxyServer.callOrSendContract(...args)
})
