import { makeAutoObservable, runInAction } from 'mobx'

class ExtensionHandlerState {
  navigateTo: string | null = null

  ethereumListenersBound = false

  async handleRequest(
    event: Electron.IpcRendererEvent,
    id: number,
    args: Record<string, unknown>
  ) {
    try {
      await this.waitForConnection()
      /* eslint-disable-next-line */
      //@ts-ignore
      const value = await window.ethereum?.request(args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during request: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async handleOpenMMHomePage() {
    runInAction(() => {
      this.navigateTo = 'metamaskHome'
    })
  }

  async handleOpenMMSnapsPage() {
    this.navigateTo = 'metamaskSnaps'
  }

  async handleOpenMMPortfolioPage(
    event: Electron.IpcRendererEvent,
    pathname: string
  ) {
    this.navigateTo = 'metamaskPortfolio' + pathname
  }

  async waitForConnection(): Promise<void> {
    const isConnected = window.ethereum?.isConnected()

    if (isConnected) {
      return
    }

    return new Promise((resolve) => {
      /* eslint-disable-next-line */
      //@ts-ignore
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
      /* eslint-disable-next-line */
      //@ts-ignore
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
      /* eslint-disable-next-line */
      //@ts-ignore
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
      console.log('window message received = ', JSON.stringify(event, null, 4))
    })

    /* eslint-disable-next-line */
    //@ts-ignore
    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      window.api.extensionOnEvent('accountsChanged', accounts)
    })

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    window.ethereum?.on('disconnect', (error: any) => {
      // Relevant issue https://github.com/MetaMask/metamask-extension/issues/13375
      if (error.code === 1013) {
        console.log('MetaMask disconnected from chain. Reconnecting...')
        return
      }
      window.api.extensionOnEvent('disconnect', error)
    })

    /* eslint-disable-next-line */
    //@ts-ignore
    window.ethereum?.on('connect', (connectInfo: string) => {
      window.api.extensionOnEvent('connect', connectInfo)
    })

    /* eslint-disable-next-line */
    //@ts-ignore
    window.ethereum?.on('chainChanged', (chainId: number) => {
      window.api.extensionOnEvent('chainChanged', chainId)
    })

    console.log('binding request listener')
    const removeRequestListener = window.api.handleMetamaskExtensionRequests(
      this.handleRequest.bind(this)
    )
    const removeOpenMetaMaskHomePageListener =
      window.api.handleOpenMetaMaskHomePage(
        this.handleOpenMMHomePage.bind(this)
      )
    const removeSendListener = window.api.handleMetamaskExtensionSends(
      this.handleSend.bind(this)
    )
    const removeSendAsyncListener =
      window.api.handleMetamaskExtensionSendAsyncs(
        this.handleSendAsync.bind(this)
      )
    const removeOpenMetaMaskSnapsPageListener =
      window.api.handleOpenMetaMaskSnapsPage(
        this.handleOpenMMSnapsPage.bind(this)
      )
    const removeOpenMetaMaskPortfolioPageListener =
      window.api.handleOpenMetaMaskPortfolioPage(
        this.handleOpenMMPortfolioPage.bind(this)
      )

    this.ethereumListenersBound = true

    return () => {
      removeRequestListener()
      removeOpenMetaMaskHomePageListener()
      removeSendListener()
      removeSendAsyncListener()
      removeOpenMetaMaskSnapsPageListener()
      removeOpenMetaMaskPortfolioPageListener()
    }
  }

  constructor() {
    makeAutoObservable(this)
    const bindListeners = (): boolean => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('binding ehtereum listeners')
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

export default new ExtensionHandlerState()
