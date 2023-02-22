import React, { useEffect, useState } from 'react'
import OverlayStyles from './index.module.scss'
import './index.css'
import { overlayExternalWalletConnectedMsg } from 'frontend/overlay/constants'

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

  const handleWebviewInput = async (
    e: Electron.IpcRendererEvent,
    inputStringified: string
  ) => {
    const input = JSON.parse(inputStringified) as
      | Electron.MouseInputEvent
      | Electron.MouseWheelInputEvent
      | Electron.KeyboardInputEvent
    const views = document.getElementsByTagName(
      'webview'
    ) as HTMLCollectionOf<Electron.WebviewTag>
    for (let i = 0; i < views.length; i++) {
      const view = views[i]

      let newInput
      if (
        input.type === 'mouseMove' ||
        input.type === 'mouseUp' ||
        input.type === 'mouseDown'
      ) {
        const bounds = view.getBoundingClientRect()
        const newX = input.x - bounds.x
        const newY = input.y - bounds.y
        // make sure this is still inside the bounding box
        newInput = { ...input, x: newX, y: newY }
        if (
          newX >= 0 &&
          newY >= 0 &&
          newX <= bounds.x + bounds.width &&
          newY <= bounds.y + bounds.height
        ) {
          view.sendInputEvent(newInput)
        } else {
          // we're outside of the web view
          // if (input.type === 'mouseDown') {
          //   view.executeJavaScript('document.activeElement.blur()')
          // } else {
          //   return
          // }
        }
      } else {
        // not the mouse, just send it over
        view.sendInputEvent(input)
      }
    }
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
    const rmHandleWebviewProxyInput =
      window.api.handleProxyWebViewInput(handleWebviewInput)

    const rmUpdatePopupHandler =
      window.api.handleUpdatePopupInOverlay(handleUpdatePopup)

    return () => {
      rmAddNotifHandler()
      rmRemoveNotifHandler()
      rmHandleWebviewProxyInput()
      rmUpdatePopupHandler()
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={OverlayStyles.overlayContainer}>
      <div className={OverlayStyles.overlayToggleHint}>
        Ctrl + Tab to return to the game
      </div>
      <div className={OverlayStyles.mmPopupContainer}>
        {showMmPopupPage ? (
          <webview
            nodeintegrationinsubframes="true"
            webpreferences="contextIsolation=true, nodeIntegration=true"
            className={OverlayStyles.mmPopup}
            src={`chrome-extension://${extensionId}/popup.html`}
            id="mmPopupWebview"
          ></webview>
        ) : (
          <div className={OverlayStyles.overlayToggleHint}>
            {overlayExternalWalletConnectedMsg}
          </div>
        )}
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
