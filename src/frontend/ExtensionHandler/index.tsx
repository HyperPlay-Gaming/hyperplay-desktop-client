import ExtensionHandlerState from 'frontend/state/ExtensionHandlerState'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ExtensionHandler = observer(function () {
  const navigate = useNavigate()

  if (ExtensionHandlerState.navigateTo !== null) {
    navigate(ExtensionHandlerState.navigateTo)
    ExtensionHandlerState.navigateTo = null
  }

  return <></>
})

export default ExtensionHandler
