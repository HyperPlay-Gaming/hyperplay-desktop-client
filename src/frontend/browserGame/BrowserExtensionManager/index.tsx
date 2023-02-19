import React, { useState, useEffect } from 'react'
import BrowserExtensionManagerStyles from './index.module.scss'

//Module type augmentation necessary to use experimental feature nodeintegrationinsubframes
//https://www.electronjs.org/docs/latest/api/webview-tag
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React {
    interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
      nodeintegrationinsubframes?: string
    }
  }
}

const BrowserExtensionManager = function () {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)
  const [extensionId, setExtensionId] = useState('')

  const getExtensionId = async () => {
    const extId = await window.api.getExtensionId()
    setExtensionId(extId)
  }

  const handleShowNotification = async () => {
    setShowMmNotificationPage(true)
  }

  const handleRemoveNotification = async () => {
    setShowMmNotificationPage(false)
  }

  function updateOverlayVisibility(
    e: Electron.IpcRendererEvent,
    show: boolean
  ) {
    setShowOverlay(show)
  }

  useEffect(() => {
    getExtensionId()
    const rmHandleUpdateOverlayVisibility =
      window.api.handleUpdateOverlayVisibility(updateOverlayVisibility)

    const rmAddNotifHandler = window.api.handleShowNotificationInWebview(
      handleShowNotification
    )
    const rmRemoveNotifHandler = window.api.handleRemoveNotificationInWebview(
      handleRemoveNotification
    )

    return () => {
      rmHandleUpdateOverlayVisibility()
      rmAddNotifHandler()
      rmRemoveNotifHandler()
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <>
      {showOverlay ? (
        <div className={BrowserExtensionManagerStyles.mmContainer}>
          {!showMmNotificationPage ? (
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              className={BrowserExtensionManagerStyles.mmPopup}
              src={`chrome-extension://${extensionId}/popup.html`}
            ></webview>
          ) : null}

          {showMmNotificationPage ? (
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              className={BrowserExtensionManagerStyles.mmNotification}
              src={`chrome-extension://${extensionId}/notification.html`}
            ></webview>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default BrowserExtensionManager
