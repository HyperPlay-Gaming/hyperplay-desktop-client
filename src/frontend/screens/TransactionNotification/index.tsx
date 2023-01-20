import React from 'react'
import styles from './index.module.css'

import { observer } from 'mobx-react-lite'
import transactionStore from 'frontend/store/TransactionStore'
import { TITLE, DESCRIPTION } from './constants'
import PhoneIcon from './components/PhoneIcon'

const TransactionNotification = () => {
  const item = transactionStore.firstTransaction

  if (!item || !item.isOpen) return <></>

  const title = TITLE[item.method]
    ? TITLE[item.method][item.state]
    : TITLE.default[item.state]
  const description = DESCRIPTION[item.state]

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
