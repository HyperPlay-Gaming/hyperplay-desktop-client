import React, { useEffect, useState } from 'react'

const ExtensionHandler = function () {
  const [ethereumDefined, setEthereumDefined] = useState(false)

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

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      console.log('window message received = ', JSON.stringify(event, null, 4))
    })

    if (typeof window.ethereum !== 'undefined') {
      setEthereumDefined(true)
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
      return () => {
        removeRequestListener()
      }
    } else {
      console.log('MetaMask is not installed!')
    }
    /* eslint-disable @typescript-eslint/no-empty-function*/
    return () => {}
  }, [])

  useEffect(() => {
    if (!ethereumDefined) {
      const interval = setInterval(() => {
        console.log('checking for metamask extension...')
        if (typeof window.ethereum !== 'undefined') {
          console.log('metamask extension found!')
          setEthereumDefined(true)
          clearInterval(interval)
        }
      }, 2000)
    }
  }, [ethereumDefined])

  return <></>
}

export default ExtensionHandler
