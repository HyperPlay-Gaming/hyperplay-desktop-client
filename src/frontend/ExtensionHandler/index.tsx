import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ExtensionHandler = function () {
  const navigate = useNavigate()

  async function handleRequest(
    event: Event,
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

  async function handleSend(event: Event, id: number, args: unknown[]) {
    try {
      await waitForConnection()
      const value = await window.ethereum.send(...args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.error(`error during send: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async function handleSendAsync(event: Event, id: number, args: unknown[]) {
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
    window.addEventListener('message', (event: MessageEvent) => {
      console.log('window message received = ', JSON.stringify(event, null, 4))
    })

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      window.api.extensionOnEvent('accountsChanged', accounts)
    })

    window.ethereum.on('disconnect', (error: Error) => {
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
    return () => {
      removeRequestListener()
      removeOpenMetaMaskHomePageListener()
      removeSendListener()
      removeSendAsyncListener()
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
