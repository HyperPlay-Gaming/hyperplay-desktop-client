import React from 'react'
import InjectedProviderHandler from './state/InjectedProviderHandler'
import { observer } from 'mobx-react-lite'

export default observer(function () {
  // @dev need to keep this log so that InjectedProviderHandler is imported and initialized
  console.log(
    'eth listeners bound: ',
    InjectedProviderHandler.ethereumListenersBound
  )
  return <div></div>
})
