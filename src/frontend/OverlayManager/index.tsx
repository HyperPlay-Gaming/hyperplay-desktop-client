import React, { useRef } from 'react'
import BrowserGameStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import OverlayState from 'frontend/state/OverlayState'
import { BrowserGameProps } from './types'
import { Overlay } from './Overlay'
import { WebviewTag } from 'electron'
import WebviewControls from 'frontend/components/UI/WebviewControls'
import AuthModal from 'frontend/components/UI/AuthModal'
import { useKeepPlaystreaksInSync } from '@hyperplay/quests-ui'

const OverlayManager = observer(function ({
  appName,
  runner
}: BrowserGameProps) {
  useKeepPlaystreaksInSync({
    appName,
    runner,
    getQuest: window.api.getQuest,
    getQuests: window.api.getQuests,
    getUserPlayStreak: window.api.getUserPlayStreak,
    syncPlaySession: window.api.syncPlaySession
  })
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
    <>
      <AuthModal />
      <div
        className={BrowserGameStyles.overlayContainer}
        style={style}
        id="overlay-manager"
      >
        <Overlay appName={appName} runner={runner} />
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
              partition={'persist:InPageWindowEthereumExternalWallet'}
              webpreferences="contextIsolation=true"
              // setting = to {true} does not work :(
              allowpopups={trueAsStr}
              ref={webviewRef}
            />
          </div>
        ) : null}
      </div>
    </>
  )
})

export default OverlayManager
