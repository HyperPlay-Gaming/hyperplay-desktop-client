import React from 'react'
import InjectedProviderHandler from './state/InjectedProviderHandler'
import { observer } from 'mobx-react-lite'

export default observer(function(){
    console.log('eth listeners bound: ', InjectedProviderHandler.ethereumListenersBound)
    return <div></div>
})