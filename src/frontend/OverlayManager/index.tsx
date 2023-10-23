import React from 'react'
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

interface BrowserGameProps {
  appName: string
  runner: Runner
}

const Overlay = observer(function ({ appName, runner }: BrowserGameProps) {
  const txnToastContainerStyle = {} as React.CSSProperties
  if (
    OverlayState.renderState.showToasts &&
    !OverlayState.renderState.showExtension
  ) {
    txnToastContainerStyle.bottom = 0
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

  console.log('show toasts ', OverlayState.renderState.showToasts)

  return (
    <>
      {OverlayState.renderState.showToasts ? (
        <div
          className={BrowserGameStyles.txnToastContainer}
          style={txnToastContainerStyle}
        >
          <ToastManager />
        </div>
      ) : null}

      {TransactionState.isInitialToastShown ? null : (
        <>
          <div className={BrowserGameStyles.bgFilter}></div>
          {OverlayState.renderState.showHintText ? (
            <div className={`${BrowserGameStyles.closeOverlayText} title`}>
              {t('hyperplayOverlay.closeOverlay', {
                defaultValue:
                  'Press {{overlayKeyMod}} + X to close the overlay',
                overlayKeyMod: DeviceState.isMac ? 'Option' : 'Alt'
              })}
            </div>
          ) : null}
          {OverlayState.renderState.showExitGameButton ? (
            <Button
              onClick={async () => window.api.kill(appName, runner)}
              style={exitGameButtonStyle}
              type="secondary"
              size="medium"
            >
              {t('exit_game', 'Exit Game')}
            </Button>
          ) : null}
          {WalletState.provider === PROVIDERS.METAMASK_EXTENSION ? (
            <ExtensionManager />
          ) : (
            <div className={`${BrowserGameStyles.overlayToggleHint} title`}>
              {t(
                'overlay.EXTERNAL_WALLET_CONNECTED',
                'You are connected to HyperPlay with an external wallet. \n \n To approve transactions in the HyperPlay overlay, you will need to connect to HyperPlay with the MetaMask Extension.'
              )}
            </div>
          )}
        </>
      )}
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
        />
      ) : null}
    </div>
  )
})

export default OverlayManager
