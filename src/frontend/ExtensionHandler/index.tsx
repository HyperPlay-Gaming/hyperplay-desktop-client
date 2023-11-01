import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
  interface Window {
    ethereum: {
      /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
      request: (args: any) => any
      /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
      send: (...args: any) => any
      /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
      sendAsync: (...args: any) => any
      /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
      on: (topic: string, handler: (...args: any) => void) => void
      isConnected: () => boolean
    }
  }
}

const ExtensionHandler = function () {
  const navigate = useNavigate()

  async function handleRequest(
    event: Electron.IpcRendererEvent,
    id: number,
    args: Record<string, unknown>
  ) {
    try {
      console.log('requesting from mm browser ext = ', JSON.stringify(args))
      await waitForConnection()
      const value = await window.ethereum.request(args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during request: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async function handleOpenMMHomePage() {
    navigate('metamaskHome')
  }

  async function handleOpenMMSnapsPage() {
    navigate('metamaskSnaps')
  }

  async function handleOpenMMPortfolioPage(
    event: Electron.IpcRendererEvent,
    pathname: string
  ) {
    navigate('metamaskPortfolio' + pathname)
  }

  async function handleSend(
    event: Electron.IpcRendererEvent,
    id: number,
    args: unknown[]
  ) {
    try {
      await waitForConnection()
      const value = await window.ethereum.send(...args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during send: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async function handleSendAsync(
    event: Electron.IpcRendererEvent,
    id: number,
    args: unknown[]
  ) {
    try {
      await waitForConnection()
      const value = await window.ethereum.sendAsync(...args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during send: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  const bindEthereumListeners = function () {
    /* eslint-disable-next-line */
    window.addEventListener('message', (event: MessageEvent) => {})

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      window.api.extensionOnEvent('accountsChanged', accounts)
    })

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    window.ethereum.on('disconnect', (error: any) => {
      // Relevant issue https://github.com/MetaMask/metamask-extension/issues/13375
      if (error.code === 1013) {
        console.log('MetaMask disconnected from chain. Reconnecting...')
        return
      }
      window.api.extensionOnEvent('disconnect', error)
    })

    window.ethereum.on('connect', (connectInfo: string) => {
      window.api.extensionOnEvent('connect', connectInfo)
    })

    window.ethereum.on('chainChanged', (chainId: number) => {
      window.api.extensionOnEvent('chainChanged', chainId)
    })

    const removeRequestListener =
      window.api.handleMetamaskExtensionRequests(handleRequest)
    const removeOpenMetaMaskHomePageListener =
      window.api.handleOpenMetaMaskHomePage(handleOpenMMHomePage)
    const removeSendListener =
      window.api.handleMetamaskExtensionSends(handleSend)
    const removeSendAsyncListener =
      window.api.handleMetamaskExtensionSendAsyncs(handleSendAsync)
    const removeOpenMetaMaskSnapsPageListener =
      window.api.handleOpenMetaMaskSnapsPage(handleOpenMMSnapsPage)
    const removeOpenMetaMaskPortfolioPageListener =
      window.api.handleOpenMetaMaskPortfolioPage(handleOpenMMPortfolioPage)

    return () => {
      removeRequestListener()
      removeOpenMetaMaskHomePageListener()
      removeSendListener()
      removeSendAsyncListener()
      removeOpenMetaMaskSnapsPageListener()
      removeOpenMetaMaskPortfolioPageListener()
    }
  }

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    let rmListeners = () => {}

    const bindListeners = (): boolean => {
      if (typeof window.ethereum !== 'undefined') {
        rmListeners = bindEthereumListeners()
        return true
      }
      return false
    }

    if (bindListeners()) {
      return () => {
        rmListeners()
      }
    }

    const interval = setInterval(() => {
      console.log('checking for metamask extension...')
      if (typeof window.ethereum !== 'undefined') {
        bindListeners()
        clearInterval(interval)
      }
    }, 2000)
    return () => {
      rmListeners()
      clearInterval(interval)
    }
  }, [])

  return <></>
}

export default ExtensionHandler

async function waitForConnection(): Promise<void> {
  const isConnected = window.ethereum.isConnected()

  if (isConnected) {
    return
  }

  return new Promise((resolve) => {
    window.ethereum.on('connect', resolve)
  })
}
