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
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)
  const [showMmPopupPage, setShowMmPopupPage] = useState(false)
  const [extensionId, setExtensionId] = useState('')

  const getExtensionId = async () => {
    const extId = await window.api.getExtensionId()
    setExtensionId(extId)
  }

  useEffect(() => {
    getExtensionId()
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={BrowserExtensionManagerStyles.mmContainer}>
      {showMmPopupPage ? (
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
  )
}

export default BrowserExtensionManager
