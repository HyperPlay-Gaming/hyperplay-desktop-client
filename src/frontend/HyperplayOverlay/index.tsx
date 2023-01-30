import React, { useEffect, useState } from 'react'
import OverlayStyles from './index.module.scss'
import './index.css'

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

// declare Element {
//   setZoomFactor?: (number)=>void
// }

const HyperplayOverlay = function () {
  const [extensionId, setExtensionId] = useState('')
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)

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

  useEffect(() => {
    getExtensionId()
    const rmAddNotifHandler = window.api.handleShowNotificationInWebview(handleShowNotification)
    const rmRemoveNotifHandler = window.api.handleRemoveNotificationInWebview(handleRemoveNotification)
    // const rmDomReadyHandler = window.api.handleDomReady(zoomOut)
    return () => {
      rmAddNotifHandler()
      rmRemoveNotifHandler()
      // rmDomReadyHandler()
    }
  }, [])

  // const zoomOut = function(){
  //   const popupWv = document.querySelector('#mmPopupWebview')
  //   popupWv.setZoomFactor(0.75)
  // }
  
  /* eslint-disable react/no-unknown-property */
  return (
    <div className={OverlayStyles.overlayContainer}>
      <div>Ctrl + Tab to return to the game</div>
      <div className={OverlayStyles.mmPopupContainer}>
      <webview 
        nodeintegrationinsubframes="true"
        webpreferences='contextIsolation=true, nodeIntegration=true' 
        className={OverlayStyles.mmPopup} 
        src={`chrome-extension://${extensionId}/popup.html`}
        id='mmPopupWebview'>
      </webview>
        {showMmNotificationPage ? <webview 
          nodeintegrationinsubframes="true"
          webpreferences='contextIsolation=true, nodeIntegration=true' 
          className={OverlayStyles.mmPopup} 
          src={`chrome-extension://${extensionId}/notification.html`}>
        </webview> : null}
      </div>
    </div>
  )
}

export default HyperplayOverlay
