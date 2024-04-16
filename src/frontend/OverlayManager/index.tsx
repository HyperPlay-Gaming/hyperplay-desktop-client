import React, { useRef } from 'react'
import BrowserGameStyles from './index.module.scss'
import ToastManager from './ToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import { Runner } from 'common/types'
import { observer } from 'mobx-react-lite'
import OverlayState from 'frontend/state/OverlayState'
import WalletState from 'frontend/state/WalletState'
import { t } from 'i18next'
import { Button } from '@hyperplay/ui'
import DeviceState from 'frontend/state/DeviceState'
import ExtensionManager from 'frontend/ExtensionManager'
import TransactionState from 'frontend/state/TransactionState'
import { WebviewTag } from 'electron'
import WebviewControls from 'frontend/components/UI/WebviewControls'

interface BrowserGameProps {
  appName: string
  runner: Runner
}

const Overlay = observer(function ({ appName, runner }: BrowserGameProps) {
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

const OverlayManager = observer(function ({
  appName,
  runner
}: BrowserGameProps) {
  const url = OverlayState.renderState.browserGameUrl

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const trueAsStr = 'true' as any
  const style = {
    '--body-background': '#999999'
  } as React.CSSProperties

  if (
    !(
      OverlayState.isFullscreenOverlay &&
      !OverlayState.renderState.showBrowserGame
    ) &&
    url === 'ignore'
  ) {
    style.width = '100%'
    style.height = '100%'
  }
  const webviewRef = useRef<WebviewTag>(null)

  /* eslint-disable react/no-unknown-property */
  return (
    <div
      className={BrowserGameStyles.overlayContainer}
      style={style}
      id="overlay-manager"
    >
      {OverlayState.showOverlay ? (
        <Overlay appName={appName} runner={runner} />
      ) : null}
      {url !== 'ignore' && OverlayState.renderState.showBrowserGame ? (
        <div>
          <WebviewControls
            webview={webviewRef.current}
            initURL={''}
            openInBrowser={false}
            disableUrl={true}
          />
          <webview
            src={url}
            className={BrowserGameStyles.browserGame}
            partition={
              WalletState.provider === PROVIDERS.METAMASK_MOBILE ||
              PROVIDERS.WALLET_CONNECT
                ? 'persist:InPageWindowEthereumExternalWallet'
                : undefined
            }
            webpreferences="contextIsolation=true"
            // setting = to {true} does not work :(
            allowpopups={trueAsStr}
            ref={webviewRef}
          />
        </div>
      ) : null}
    </div>
  )
})

export default OverlayManager
