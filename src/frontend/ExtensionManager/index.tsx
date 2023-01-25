import React, { useEffect, useState } from 'react'
import ExtensionManagerStyles from './index.module.scss'

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

const ExtensionHandler = function () {
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)
  const [showMmPopupPage, setShowMmPopupPage] = useState(false)
  const [extensionId, setExtensionId] = useState('')
  
  const getExtensionId = async() => {
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

  const handleShowPopup = async () => {
    console.log('showing notification webview in hp overlay')
    setShowMmPopupPage(true)
  }

  const handleRemovePopup = async () => {
    console.log('removing notification webview in hp overlay')
    setShowMmPopupPage(false)
  }

  useEffect(() => {
    getExtensionId()
    const rmAddNotifHandler = window.api.handleShowNotificationInWebview(handleShowNotification)
    const rmRemoveNotifHandler = window.api.handleRemoveNotificationInWebview(handleRemoveNotification)
    const rmAddPopupHandler = window.api.handleShowPopupInWebview(handleShowPopup)
    const rmRemovePopupHandler = window.api.handleRemovePopupInWebview(handleRemovePopup)
    return () => {
      rmAddNotifHandler()
      rmRemoveNotifHandler()
      rmAddPopupHandler()
      rmRemovePopupHandler()
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return <div className={ExtensionManagerStyles.mmContainer}>
    {showMmPopupPage ? <webview 
      nodeintegrationinsubframes="true"
      webpreferences='contextIsolation=true, nodeIntegration=true' 
      className={ExtensionManagerStyles.mmPopup} 
      src={`chrome-extension://${extensionId}/popup.html`}>
    </webview> : null}
    {showMmNotificationPage ? <webview 
      nodeintegrationinsubframes="true"
      webpreferences='contextIsolation=true, nodeIntegration=true' 
      className={ExtensionManagerStyles.mmNotification} 
      src={`chrome-extension://${extensionId}/notification.html`}>
    </webview> : null}
  </div>
}

export default ExtensionHandler
