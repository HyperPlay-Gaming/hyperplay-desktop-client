import React, { Reducer, useEffect, useReducer } from 'react'

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

    if (typeof window.ethereum !== 'undefined') {
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

  return <div></div>
}

export default ExtensionHandler
