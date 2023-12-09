import ExtensionHandlerState from 'frontend/state/ExtensionHandlerState'
import { observer } from 'mobx-react-lite'
import React from 'react'
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

const ExtensionHandler = observer(function () {
  const navigate = useNavigate()

  if (ExtensionHandlerState.navigateTo !== null) {
    navigate(ExtensionHandlerState.navigateTo)
    ExtensionHandlerState.navigateTo = null
  }

  return <></>
})

export default ExtensionHandler
