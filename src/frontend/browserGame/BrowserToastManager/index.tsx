import React, { useState } from 'react'
import BrowserToastManagerStyles from './index.module.scss'
import transactionStore from 'frontend/store/TransactionStore'

import { TransactionState } from 'frontend/store/types'
import { TransactionToast } from '@hyperplay/ui'
import {
  TITLE,
  DESCRIPTION
} from 'frontend/screens/TransactionNotification/constants'

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
  const [showToast, setShowToast] = useState(true)

  let title = ''
  let description = ''
  let status: statusType = 'error'

  if (item !== null) {
    title = TITLE[item.method]
      ? TITLE[item.method][item.state]
      : TITLE.default[item.state]
    description = DESCRIPTION[item.state]
    status = TxnStateToStatusMap[item.state]
  }

  /* eslint-disable react/no-unknown-property */
  return (
    <>
      {(item === null || !item.isOpen) && showToast ? (
        <div className={BrowserToastManagerStyles.txnToast}>
          <TransactionToast.TransactionToast
            status={status}
            title={title}
            subtext={description}
            onClick={() => setShowToast(false)}
          />
        </div>
      ) : null}
    </>
  )
}

export default BrowserToastManager
