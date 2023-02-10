import React from 'react'
import BrowserToastManagerStyles from './index.module.scss'
import transactionStore from 'frontend/store/TransactionStore'
import { TransactionState } from 'frontend/store/types'
import { TransactionToast } from '@hyperplay/ui'
import {
  TITLE,
  DESCRIPTION
} from 'frontend/screens/TransactionNotification/constants'
import { observer } from 'mobx-react-lite'

// todo: import from hyperplay/ui package
type statusType =
  | 'pending'
  | 'submitted'
  | 'error'
  | 'alert'
  | 'success'
  | 'error'
type TxnStateToStatusMapType = {
  [key in TransactionState]: statusType
}
const TxnStateToStatusMap: TxnStateToStatusMapType = {
  initiated: 'pending',
  pending: 'submitted',
  confirmed: 'success',
  failed: 'error'
}

const BrowserToastManager = function () {
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
      />
    </div>
  )
}

export default observer(BrowserToastManager)
