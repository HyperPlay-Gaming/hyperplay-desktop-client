import React from 'react'
import transactionState from 'frontend/state/TransactionState'
import { TransactionToast } from '@hyperplay/ui'
import { observer } from 'mobx-react-lite'

const BrowserToastManager = function () {
  const item = transactionState.latestToast
  if (item === null || !item.isOpen) return <></>

  return (
    <TransactionToast
      status={item.status}
      title={item.title}
      subtext={item.subtext}
      onClick={() => item.onClick()}
      showCloseButton={true}
    />
  )
}

export default observer(BrowserToastManager)
