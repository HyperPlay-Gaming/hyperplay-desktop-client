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
      const value = await window.ethereum.request(args)
      window.api.returnExtensionRequest(id, value)
    } catch (err) {
      console.log(`error during request: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  async function handleOpenMMHomePage() {
    navigate('metamaskHome')
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
    return () => {
      removeRequestListener()
      removeOpenMetaMaskHomePageListener()
    }
  }

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    let rmListeners = () => {}
    const interval = setInterval(() => {
      console.log('checking for metamask extension...')
      if (typeof window.ethereum !== 'undefined') {
        console.log('metamask extension found!')
        rmListeners = bindEthereumListeners()
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
