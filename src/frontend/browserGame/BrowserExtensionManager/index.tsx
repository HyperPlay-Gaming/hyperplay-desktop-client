import React, { useState, useEffect } from 'react'
import BrowserExtensionManagerStyles from './index.module.scss'
import { overlayExternalWalletConnectedMsg } from 'frontend/overlay/constants'
import { Button } from '@hyperplay/ui'
import { Runner } from 'common/types'
import { useTranslation } from 'react-i18next'

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

interface BrowserExtensionManagerProps {
  appName: string
  runner: Runner
}

const BrowserExtensionManager = function ({
  appName,
  runner
}: BrowserExtensionManagerProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showMmNotificationPage, setShowMmNotificationPage] = useState(false)
  const [extensionId, setExtensionId] = useState('')
  const [showMmPopupPage, setShowMmPopupPage] = useState(false)
  const { t } = useTranslation()

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

  function handleUpdatePopup(e: Electron.IpcRendererEvent, show: boolean) {
    setShowMmPopupPage(show)
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

    window.api.getConnectedProvider().then((prov) => {
      const providersWithoutPopup = ['MetaMaskExtension']
      if (providersWithoutPopup.includes(prov)) {
        return setShowMmPopupPage(true)
      }
      return setShowMmPopupPage(false)
    })

    const rmUpdatePopupHandler =
      window.api.handleUpdatePopupInOverlay(handleUpdatePopup)

    return () => {
      rmHandleUpdateOverlayVisibility()
      rmAddNotifHandler()
      rmRemoveNotifHandler()
      rmUpdatePopupHandler()
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <>
      {showOverlay ? (
        <>
          <div className={BrowserExtensionManagerStyles.bgFilter}></div>
          <Button
            onClick={async () => window.api.kill(appName, runner)}
            style={{
              top: 'var(--space-md)',
              right: 'var(--space-md)',
              position: 'absolute',
              zIndex: 200
            }}
            type="secondary"
            size="medium"
          >
            {t('exit_game', 'Exit Game')}
          </Button>
          <div className={BrowserExtensionManagerStyles.mmContainer}>
            {!showMmPopupPage ? (
              <div className={BrowserExtensionManagerStyles.overlayToggleHint}>
                <div className="title">{overlayExternalWalletConnectedMsg}</div>
              </div>
            ) : null}
            {showMmPopupPage && !showMmNotificationPage ? (
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
        </>
      ) : null}
    </>
  )
}

export default BrowserExtensionManager
