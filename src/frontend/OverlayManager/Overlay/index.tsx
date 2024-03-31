import React from 'react'
import BrowserGameStyles from './index.module.scss'
import ToastManager from '../ToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import { observer } from 'mobx-react-lite'
import OverlayState from 'frontend/state/OverlayState'
import WalletState from 'frontend/state/WalletState'
import { t } from 'i18next'
import DeviceState from 'frontend/state/DeviceState'
import ExtensionManager from 'frontend/ExtensionManager'
import TransactionState from 'frontend/state/TransactionState'
import { BrowserGameProps } from '../types'
import { Button } from '@hyperplay/ui'
import { QuestsViewer } from 'frontend/components/UI/QuestsViewer'

export const Overlay = observer(function ({
  appName,
  runner
}: BrowserGameProps) {
  const txnToastContainerStyle = {} as React.CSSProperties
  if (OverlayState.title === 'HyperPlay Toasts') {
    txnToastContainerStyle.bottom = 'unset'
    txnToastContainerStyle.right = 0
    txnToastContainerStyle.top = 0
  }

  let exitGameButtonStyle = {
    top: 'var(--space-md)',
    right: 'var(--space-md)',
    position: 'absolute',
    zIndex: 200
  } as React.CSSProperties

  if (
    OverlayState.renderState.showExitGameButton &&
    !OverlayState.renderState.showExtension
  ) {
    exitGameButtonStyle = {
      ...exitGameButtonStyle,
      top: 0,
      right: 0,
      overflowY: 'hidden'
    }
  }

  const shouldShowExtension =
    WalletState.provider === PROVIDERS.METAMASK_EXTENSION &&
    OverlayState.renderState.showExtension

  let toastManager = null
  if (OverlayState.renderState.showToasts) {
    toastManager = (
      <div
        className={BrowserGameStyles.txnToastContainer}
        style={txnToastContainerStyle}
      >
        <ToastManager />
      </div>
    )
  }

  let overlayItems = null
  if (!TransactionState.isInitialToastShown) {
    let hintText = null
    if (OverlayState.renderState.showHintText) {
      hintText = (
        <div className={`${BrowserGameStyles.closeOverlayText} title`}>
          {t('hyperplayOverlay.closeOverlay', {
            defaultValue: 'Press {{overlayKeyMod}} + X to close the overlay',
            overlayKeyMod: DeviceState.isMac ? 'Option' : 'Alt'
          })}
        </div>
      )
    }

    let exitGameButton = null
    if (OverlayState.renderState.showExitGameButton) {
      exitGameButton = (
        <Button
          onClick={async () => {
            // mac can take ~5 seconds to close the wine process, so we close the overlay instantly
            window.api.killOverlay()
            window.api.kill(appName, runner)
          }}
          style={exitGameButtonStyle}
          type="secondary"
          size="medium"
        >
          {t('exit_game', 'Exit Game')}
        </Button>
      )
    }

    let extensionManager = null
    if (shouldShowExtension) {
      extensionManager = <ExtensionManager />
    } else if (
      OverlayState.renderState.showHintText &&
      OverlayState.title !== 'HyperPlay Hint Text'
    ) {
      extensionManager = (
        <div className={`${BrowserGameStyles.overlayToggleHint} title`}>
          {t(
            'overlay.EXTERNAL_WALLET_CONNECTED',
            'You are connected to HyperPlay with an external wallet.'
          )}
        </div>
      )
    }

    overlayItems = (
      <>
        <div className={BrowserGameStyles.bgFilter}></div>
        {hintText}
        {exitGameButton}
        {extensionManager}
        <QuestsViewer projectId={appName} />
      </>
    )
  }

  return (
    <>
      {toastManager}
      {overlayItems}
    </>
  )
})
