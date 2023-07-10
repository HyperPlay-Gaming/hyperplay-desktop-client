import React, { useState, useEffect } from 'react'
import BrowserExtensionManagerStyles from './index.module.scss'
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
  showExtension?: boolean
  showExitGameButton?: boolean
}

const BrowserExtensionManager = function ({
  appName,
  runner,
  showExtension = true,
  showExitGameButton = true
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

  let exitGameButtonStyle = {
    top: 'var(--space-md)',
    right: 'var(--space-md)',
    position: 'absolute',
    zIndex: 200
  } as React.CSSProperties

  if (showExitGameButton && !showExtension)
    exitGameButtonStyle = {
      ...exitGameButtonStyle,
      top: 0,
      right: 0,
      overflowY: 'hidden'
    }

  let mmContainerStyle = {} as React.CSSProperties
  if (showExtension && !showExitGameButton) {
    mmContainerStyle = {
      overflowX: 'hidden',
      overflowY: 'hidden',
      top: 0,
      left: 0
    }
  }
  /* eslint-disable react/no-unknown-property */
  return (
    <>
      {showOverlay ? (
        <>
          <div className={BrowserExtensionManagerStyles.bgFilter}></div>
          {showExitGameButton ? (
            <Button
              onClick={async () => window.api.kill(appName, runner)}
              style={exitGameButtonStyle}
              type="secondary"
              size="medium"
            >
              {t('exit_game', 'Exit Game')}
            </Button>
          ) : null}
          {showExtension ? (
            <div
              className={BrowserExtensionManagerStyles.mmContainer}
              style={mmContainerStyle}
            >
              {!showMmPopupPage ? (
                <div
                  className={BrowserExtensionManagerStyles.overlayToggleHint}
                >
                  <div className="title">
                    {t(
                      'overlay.EXTERNAL_WALLET_CONNECTED',
                      'You are connected to HyperPlay with an external wallet. \n \n To approve transactions in the HyperPlay overlay, you will need to connect to HyperPlay with the MetaMask Extension.'
                    )}
                  </div>
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
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default BrowserExtensionManager
