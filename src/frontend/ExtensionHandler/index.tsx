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

    const unsubscribeFunctions: (() => void)[] = []

    window.api.getExtensionMetadata().then((metadata) => {
      if (metadata.isInitialized) {
        handleExtensionHooks()
      }
    })

    const handleAccountsChanged = (accounts: string[]) =>
      window.api.extensionOnEvent('accountsChanged', accounts)

    const handleDisconnect = (error: any) =>
      window.api.extensionOnEvent('disconnect', error)

    const handleConnect = (connectInfo: any) => {
      window.api.extensionOnEvent('connect', connectInfo)
    }

    const handleChainChanged = (chainId: number) =>
      window.api.extensionOnEvent('chainChanged', chainId)

    function handleExtensionHooks() {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('disconnect', handleDisconnect)
        window.ethereum.on('connect', handleConnect)
        window.ethereum.on('chainChanged', handleChainChanged)

        unsubscribeFunctions.push(
          window.api.handleMetamaskExtensionRequests(handleRequest),
          () => {
            // double useEffect in devMode can cause side effects if improperly cleaned up
            window.ethereum.removeListener(
              'accountsChanged',
              handleAccountsChanged
            )
            window.ethereum.removeListener('disconnect', handleDisconnect)
            window.ethereum.removeListener('connect', handleConnect)
            window.ethereum.removeListener('chainChanged', handleChainChanged)
          }
        )
      } else {
        console.error('MetaMask is not installed!')
      }
    }
    /* eslint-disable @typescript-eslint/no-empty-function */
    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => {
        unsubscribe()
      })
    }
  }, [])

  return <></>
}

export default ExtensionHandler
