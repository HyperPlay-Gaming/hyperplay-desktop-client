import React, { useEffect, useState } from 'react'
import BrowserToastManagerStyles from './index.module.scss'
import transactionStore from 'frontend/store/TransactionStore'
import { TransactionState } from 'frontend/store/types'
import { TransactionToast } from '@hyperplay/ui'
import {
  TITLE,
  DESCRIPTION,
  statusType,
  TxnStateToStatusMap
} from 'frontend/screens/TransactionNotification/constants'
import { observer } from 'mobx-react-lite'

interface BrowserToastManagerProps {
  showCloseButton?: boolean
}

const BrowserToastManager = function (props: BrowserToastManagerProps) {
  const [showInitialToast, setShowInitialToast] = useState(true)

  const handleInjectionSuccess = () => {
    setShowInitialToast(true)

    setTimeout(() => {
      setShowInitialToast(false)
    }, 6000)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowInitialToast(false)
    }, 6000)

    const rmHandleInjectionSuccess = window.api.handleInjectionSuccess(
      handleInjectionSuccess
    )

    return () => {
      rmHandleInjectionSuccess()
    }
  }, [])

  if (showInitialToast) {
    return (
      <div className={BrowserToastManagerStyles.txnToast}>
        <TransactionToast.TransactionToast
          status={'success'}
          title={'HyperPlay Overlay'}
          subtext={
            'HyperPlay Overlay is ready! Press Ctrl+Tab to show or hide it.'
          }
          onClick={() => setShowInitialToast(false)}
          showCloseButton={props.showCloseButton}
        />
      </div>
    )
  }

  const item = transactionStore.latestTxn
  if (item === null || !item.isOpen) return <></>

  let title = ''
  let description = ''
  let status: statusType = 'error'

  title = TITLE[item.method]
    ? TITLE[item.method][item.state]
    : TITLE.default[item.state]
  description = DESCRIPTION[item.state]
  status = TxnStateToStatusMap[item.state]

  if (
    item.state === TransactionState.CONFIRMED ||
    item.state === TransactionState.FAILED
  ) {
    setTimeout(() => transactionStore.closeTransaction(item.id), 5000)
  }

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={BrowserToastManagerStyles.txnToast}>
      <TransactionToast.TransactionToast
        status={status}
        title={title}
        subtext={description}
        onClick={() => transactionStore.closeTransaction(item.id)}
        showCloseButton={props.showCloseButton}
      />
    </div>
  )
}

export default observer(BrowserToastManager)
