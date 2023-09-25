import React, { useRef } from 'react'
import { WebviewTag } from 'electron'
import WebviewControls from '../../components/UI/WebviewControls'

const url = 'http://localhost:3001/session'

const AuthSession = () => {
  const webviewRef = useRef<WebviewTag>(null)
  return (
    <div className="WebView">
      {webviewRef.current && (
        <WebviewControls
          webview={webviewRef.current}
          initURL={url}
          openInBrowser={false}
        />
      )}
      <webview
        ref={webviewRef}
        src={url}
        className="WebView__webview"
        partition="persist:InPageWindowEthereumExternalWallet"
        allowpopups={'true' as unknown as boolean | undefined}
        useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/200.0"
      />
    </div>
  )
}

export default AuthSession
