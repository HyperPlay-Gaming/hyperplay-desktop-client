import { makeAutoObservable } from 'mobx'

class InjectedProviderHandler {
  ethereumListenersBound = false

  async handleRequest(
    event: Electron.IpcRendererEvent,
    id: number,
    args: Record<string, unknown>
  ) {
    try {
      await this.waitForConnection()
      // @ts-expect-error TODO: fix window.ethereum typings
      const value = await window.ethereum?.request(args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during request: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async waitForConnection(): Promise<void> {
    const isConnected = window.ethereum?.isConnected()

    if (isConnected) {
      return
    }

    return new Promise((resolve) => {
      // @ts-expect-error TODO: fix window.ethereum typings
      window.ethereum?.on('connect', resolve)
    })
  }

  async handleSend(
    event: Electron.IpcRendererEvent,
    id: number,
    args: unknown[]
  ) {
    try {
      await this.waitForConnection()
      // @ts-expect-error TODO: fix window.ethereum typings
      const value = await window.ethereum?.send(...args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during send: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async handleSendAsync(
    event: Electron.IpcRendererEvent,
    id: number,
    args: unknown[]
  ) {
    try {
      await this.waitForConnection()
      // @ts-expect-error TODO: fix window.ethereum typings
      const value = await window.ethereum?.sendAsync(...args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during send: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  bindEthereumListeners() {
    window.addEventListener('message', (event: MessageEvent) => {
      /**
       * An {"isTrusted": true} message is sent every few seconds and spams the logs.
       * This makes debugging difficult in Sentry so we filter these out.
       */
      if (
        event !== undefined &&
        Object.hasOwn(event, 'isTrusted') &&
        Object.keys(event).length === 1
      ) {
        return
      }
    })

    // @ts-expect-error TODO: fix window.ethereum typings
    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      window.api.extensionOnEvent('accountsChanged', accounts)
    })

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    window.ethereum?.on('disconnect', (error: any) => {
      // Relevant issue https://github.com/MetaMask/metamask-extension/issues/13375
      if (error.code === 1013) {
        const reconnectingMessage =
          'MetaMask disconnected from chain. Reconnecting...'
        window.api.logInfo(reconnectingMessage)
        console.log(reconnectingMessage)
        return
      }
      window.api.extensionOnEvent('disconnect', error)
    })

    // @ts-expect-error TODO: fix window.ethereum typings
    window.ethereum?.on('connect', (connectInfo: string) => {
      window.api.extensionOnEvent('connect', connectInfo)
    })

    // @ts-expect-error TODO: fix window.ethereum typings
    window.ethereum?.on('chainChanged', (chainId: number) => {
      window.api.extensionOnEvent('chainChanged', chainId)
    })

    const removeRequestListener = window.api.handleMetamaskExtensionRequests(
      this.handleRequest.bind(this)
    )
    const removeSendListener = window.api.handleMetamaskExtensionSends(
      this.handleSend.bind(this)
    )
    const removeSendAsyncListener =
      window.api.handleMetamaskExtensionSendAsyncs(
        this.handleSendAsync.bind(this)
      )

    this.ethereumListenersBound = true

    return () => {
      removeRequestListener()
      removeSendListener()
      removeSendAsyncListener()
    }
  }

  constructor() {
    makeAutoObservable(this)
    const bindListeners = (): boolean => {
      if (typeof window.ethereum !== 'undefined') {
        const bindingMessage = 'binding ethereum listeners'
        console.log(bindingMessage)
        window.api.logInfo(bindingMessage)
        this.bindEthereumListeners()
        return true
      }
      return false
    }

    if (bindListeners()) {
      return
    }

    const interval = setInterval(() => {
      console.log('checking for metamask extension...')
      if (typeof window.ethereum !== 'undefined') {
        bindListeners()
        clearInterval(interval)
      }
    }, 2000)
  }
}

export default new InjectedProviderHandler()
