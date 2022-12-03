import React, { Reducer, useEffect, useReducer } from 'react'

const ExtensionHandler = function () {
  async function handleRequest(_event: any, id: number, args: any) {
    const value = await window.ethereum.request(args)
    window.api.returnExtensionRequest(id, value)
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log('window message received = ', JSON.stringify(event, null, 4))
    })

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        window.api.extensionOnEvent('accountsChanged', accounts)
      })

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: any) => {
          console.log('received response eth request accounts')
          const account = accounts[0]
          console.log('account selected is ', account)
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
  }, [])

  return <div></div>
}

export default ExtensionHandler
