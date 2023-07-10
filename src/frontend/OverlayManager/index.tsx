import React, { useEffect, useState } from 'react'
import BrowserGameStyles from './index.module.scss'
import BrowserExtensionManager from './ExtensionManager'
import BrowserToastManager from './ToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import BrowserExtensionToastManager from './ExtensionToastManager'
import { Runner } from 'common/types'

interface RenderState {
  showToasts: boolean
  showExtension: boolean
  showBrowserGame: boolean
  showExitButton: boolean
}

interface BrowserGameProps {
  url: string
  appName: string
  runner: Runner
  renderState: RenderState
}

const OverlayManager = function ({
  url,
  appName,
  runner,
  renderState
}: BrowserGameProps) {
  const [provider, setProvider] = useState('')

  useEffect(() => {
    window.api.getConnectedProvider().then((val) => setProvider(val))
  }, [])

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const trueAsStr = 'true' as any
  const style = {
    '--body-background': '#999999'
  } as React.CSSProperties

  const txnToastContainerStyle = {} as React.CSSProperties
  if (renderState.showToasts && !renderState.showExtension) {
    txnToastContainerStyle.bottom = 0
    txnToastContainerStyle.right = 0
    txnToastContainerStyle.top = 0
  }

  function isFullscreenOverlay(showStates: RenderState) {
    return (
      showStates.showToasts &&
      showStates.showExtension &&
      showStates.showExitButton
    )
  }

  if (!(isFullscreenOverlay(renderState) && !renderState.showBrowserGame)) {
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
      {renderState.showToasts ? (
        <div
          className={BrowserGameStyles.txnToastContainer}
          style={txnToastContainerStyle}
        >
          <BrowserToastManager showCloseButton={true} />
          <BrowserExtensionToastManager showCloseButton={true} />
        </div>
      ) : null}
      <BrowserExtensionManager
        appName={appName}
        runner={runner}
        showExtension={renderState.showExtension}
        showExitGameButton={renderState.showExitButton}
      />
      {provider !== '' && url !== 'ignore' && renderState.showBrowserGame ? (
        <webview
          src={url}
          className={BrowserGameStyles.browserGame}
          partition={
            provider === PROVIDERS.METAMASK_MOBILE || PROVIDERS.WALLET_CONNECT
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
}

export default OverlayManager
