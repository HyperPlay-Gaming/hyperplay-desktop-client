import React from 'react'
import styles from './index.module.css'

import { observer } from 'mobx-react-lite'
import transactionStore from 'frontend/store/TransactionStore'
import { TITLE, DESCRIPTION } from './constants'
import PhoneIcon from './components/PhoneIcon'
import { TransactionState } from 'frontend/store/types'

const TransactionNotification = () => {
  const item = transactionStore.latestTxn

  if (item === null || !item.isOpen) return <></>

  const title = TITLE[item.method]
    ? TITLE[item.method][item.state]
    : TITLE.default[item.state]
  const description = DESCRIPTION[item.state]

  if (
    item.state === TransactionState.CONFIRMED ||
    item.state === TransactionState.FAILED
  ) {
    setTimeout(() => transactionStore.closeTransaction(item.id), 2000)
  }

  return (
    <div className="blurBackground">
      <div className={styles.modal}>
        <h6 className={styles.title}>{title}</h6>
        <p className="content-sm text-secondary">{description}</p>
        <PhoneIcon status={item.state} />
        <button
          className={styles.actionButton}
          onClick={() => transactionStore.closeTransaction(item.id)}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default observer(TransactionNotification)
