import React, { useEffect, useState } from 'react'
import OverlayStyles from './index.module.scss'
import './index.css'
import { overlayExternalWalletConnectedMsg } from 'frontend/overlay/constants'
import { t } from 'i18next'

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

const ExtensionOverlay = function () {
  const [extensionId, setExtensionId] = useState('')
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)
  const [showMmPopupPage, setShowMmPopupPage] = useState(false)

  const getExtensionId = async () => {
    const extId = await window.api.getExtensionId()
    console.log('setting extension id to ', extId)
    setExtensionId(extId)
  }

  const handleShowNotification = async () => {
    console.log('showing notification webview in hp overlay')
    setShowMmNotificationPage(true)
  }

  const handleRemoveNotification = async () => {
    console.log('removing notification webview in hp overlay')
    setShowMmNotificationPage(false)
  }

  function handleUpdatePopup(e: Electron.IpcRendererEvent, show: boolean) {
    setShowMmPopupPage(show)
  }

  useEffect(() => {
    getExtensionId()
    const rmAddNotifHandler = window.api.handleShowNotificationInWebview(
      handleShowNotification
    )
    const rmRemoveNotifHandler = window.api.handleRemoveNotificationInWebview(
      handleRemoveNotification
    )

    const rmUpdatePopupHandler =
      window.api.handleUpdatePopupInOverlay(handleUpdatePopup)

    return () => {
      rmAddNotifHandler()
      rmRemoveNotifHandler()
      rmUpdatePopupHandler()
    }
  }, [])

  const toggleHint = t(
    'hyperplayOverlay.desktopHotkeyHint',
    'Alt + X to return to the game'
  )

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={OverlayStyles.overlayContainer}>
      <div className={OverlayStyles.overlayToggleHint}>{toggleHint}</div>
      <div className={OverlayStyles.mmPopupContainer}>
        {!showMmPopupPage ? (
          <div className={OverlayStyles.overlayToggleHint}>
            {overlayExternalWalletConnectedMsg}
          </div>
        ) : null}
        {showMmPopupPage && !showMmNotificationPage ? (
          <webview
            nodeintegrationinsubframes="true"
            webpreferences="contextIsolation=true, nodeIntegration=true"
            className={OverlayStyles.mmPopup}
            src={`chrome-extension://${extensionId}/popup.html`}
            id="mmPopupWebview"
          ></webview>
        ) : null}
        {showMmNotificationPage ? (
          <webview
            nodeintegrationinsubframes="true"
            webpreferences="contextIsolation=true, nodeIntegration=true"
            className={OverlayStyles.mmPopup}
            src={`chrome-extension://${extensionId}/notification.html`}
          ></webview>
        ) : null}
      </div>
    </div>
  )
}

export default ExtensionOverlay
