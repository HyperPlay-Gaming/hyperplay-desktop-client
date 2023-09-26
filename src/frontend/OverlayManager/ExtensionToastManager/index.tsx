import React, { useContext, useEffect, useState } from 'react'
import { TransactionToast } from '@hyperplay/ui'
import { EXTENSION_NOTIFICATION } from 'frontend/screens/TransactionNotification/constants'
import ContextProvider from 'frontend/state/ContextProvider'

interface BrowserExtensionToastManagerProps {
  showCloseButton?: boolean
}

const BrowserExtensionToastManager = function (
  props: BrowserExtensionToastManagerProps
) {
  const { platform } = useContext(ContextProvider)
  const isMac = platform === 'darwin'
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
    <div>
      {showMmExtensionNotifToast ? (
        <TransactionToast
          status={EXTENSION_NOTIFICATION.STATUS}
          title={EXTENSION_NOTIFICATION.TITLE()}
          subtext={EXTENSION_NOTIFICATION.DESCRIPTION(isMac)}
          onClick={handleRemoveNotification}
          showCloseButton={props.showCloseButton}
        />
      ) : null}
    </div>
  )
}

export default BrowserExtensionToastManager
