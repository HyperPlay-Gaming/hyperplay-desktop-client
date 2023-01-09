/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'

const ExtensionHandler = function () {
  async function handleRequest(_event: any, id: number, args: any) {
    try {
      console.log('requesting from mm browser ext = ', JSON.stringify(args))
      const value = await window.ethereum.request(args)
      window.api.returnExtensionRequest(id, value)
    } catch (err: any) {
      console.log(`error during request: ${err}`)
      window.api.errorExtensionRequest(id, err)
    }
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log('window message received = ', JSON.stringify(event, null, 4))
    })

    let removeRequestListener: undefined | (() => void)

    window.api.getExtensionMetadata().then((metadata) => {
      if (metadata.isInitialized) {
        handleExtensionHooks()
      } else {
        window.api.onMetaMaskInstalled(handleExtensionHooks)
      }
    })

    function handleExtensionHooks() {
      console.log('handleExtensionHooks executed')
      if (typeof window.ethereum !== 'undefined') {
        console.log('handleExtensionHooks hooked')
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          window.api.extensionOnEvent('accountsChanged', accounts)
        })

        window.ethereum.on('disconnect', (error: any) => {
          window.api.extensionOnEvent('disconnect', error)
        })

        window.ethereum.on('connect', (connectInfo: any) => {
          window.api.extensionOnEvent('connect', connectInfo)
        })

        window.ethereum.on('chainChanged', (chainId: number) => {
          window.api.extensionOnEvent('chainChanged', chainId)
        })

        removeRequestListener =
          window.api.handleMetamaskExtensionRequests(handleRequest)
      } else {
        console.log('MetaMask is not installed!')
      }
    }
    /* eslint-disable @typescript-eslint/no-empty-function*/
    return () => removeRequestListener && removeRequestListener()
  }, [])

  return <></>
}

export default ExtensionHandler
