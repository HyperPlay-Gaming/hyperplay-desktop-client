import React from 'react'
import styles from './index.module.css'

import { observer } from 'mobx-react-lite'
import transactionStore from 'frontend/state/TransactionState'
import PhoneIcon from './components/PhoneIcon'

const TransactionNotification = () => {
  const item = transactionStore.latestToast

  if (item === null || !item.isOpen) return <></>

  const title = item.title
  const description = item.subtext

  return (
    <div className="blurBackground">
      <div className={styles.modal}>
        <h6 className={styles.title}>{title}</h6>
        <p className="content-sm text-secondary">{description}</p>
        <PhoneIcon status={item.status} />
        <button className={styles.actionButton} onClick={item.onClick}>
          Close
        </button>
      </div>
    </div>
  )
}

export default observer(TransactionNotification)
