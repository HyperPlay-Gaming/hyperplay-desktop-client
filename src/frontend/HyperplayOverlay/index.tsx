import React, { useEffect, useState } from 'react'
import OverlayStyles from './index.module.scss'

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

const HyperplayOverlay = function () {
  const [time, setTime] = useState(new Date())
  const [popupUrl, setPopupUrl] = useState('')

  const showWebviewPopup = async() => {
    const mmPopupUrl = await window.api.getPopupUrl()
    console.log('setting popup url to ', mmPopupUrl)
    setPopupUrl(mmPopupUrl)
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    showWebviewPopup()
    return () => {
      clearInterval(interval)
    }
  }, [])

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={OverlayStyles.overlayContainer}>
      <div>{time.toLocaleTimeString()}</div>
      <div>Ctrl + Tab to return to the game</div>
      <div className={OverlayStyles.caption}>
        <button id="button">intercept</button>
        <label id="label">hello hello</label>
        <br />
        <input type="text" />
      </div>
      <div className={OverlayStyles.mmPopupContainer}>
        <webview 
          nodeintegrationinsubframes="true"
          webpreferences='contextIsolation=true, nodeIntegration=true' 
          className={OverlayStyles.mmPopup} 
          src={popupUrl}>
        </webview>
      </div>
    </div>
  )
}

export default HyperplayOverlay
