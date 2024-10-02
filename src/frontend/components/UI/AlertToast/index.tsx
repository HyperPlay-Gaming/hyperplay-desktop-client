import React from 'react'
import { observer } from 'mobx-react-lite'
import alertStore from 'frontend/store/AlertStore'
import styles from './AlertToast.module.scss'
import { Alert } from '@hyperplay/ui'

const AlertToast = observer(() => {
  const alert = alertStore.alert

  if (!alert) return null

  return (
    <div className={styles.container}>
      <Alert message={alert.message} variant={alert.type} />
    </div>
  )
})

export default AlertToast
