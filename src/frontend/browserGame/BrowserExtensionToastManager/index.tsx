import React, { useEffect, useState } from 'react'
import BrowserToastManagerStyles from './index.module.scss'
import { TransactionToast } from '@hyperplay/ui'
import { EXTENSION_NOTIFICATION } from 'frontend/screens/TransactionNotification/constants'

interface BrowserExtensionToastManagerProps {
  showCloseButton?: boolean
}

const BrowserExtensionToastManager = function (
  props: BrowserExtensionToastManagerProps
) {
  const [showMmExtensionNotifToast, setShowMmExtensionNotifToast] =
    useState(false)

  const handleShowNotification = async () => {
    setShowMmExtensionNotifToast(true)
  }

  const handleRemoveNotification = async () => {
    setShowMmExtensionNotifToast(false)
  }

  useEffect(() => {
    const rmAddNotifHandler = window.api.handleShowNotificationInWebview(
      handleShowNotification
    )
    const rmRemoveNotifHandler = window.api.handleRemoveNotificationInWebview(
      handleRemoveNotification
    )

    return () => {
      rmAddNotifHandler()
      rmRemoveNotifHandler()
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={BrowserToastManagerStyles.txnToast}>
      {showMmExtensionNotifToast ? (
        <TransactionToast.TransactionToast
          status={EXTENSION_NOTIFICATION.STATUS}
          title={EXTENSION_NOTIFICATION.TITLE}
          subtext={EXTENSION_NOTIFICATION.DESCRIPTION}
          onClick={handleRemoveNotification}
          showCloseButton={props.showCloseButton}
        />
      ) : null}
    </div>
  )
}

export default BrowserExtensionToastManager
