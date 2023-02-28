import React from 'react'
import BrowserToastManager from 'frontend/browserGame/BrowserToastManager'
import BrowserExtensionToastManager from 'frontend/browserGame/BrowserExtensionToastManager'

const ToastOverlay = function () {
  /* eslint-disable react/no-unknown-property */
  return (
    <div>
      <BrowserToastManager />
      <BrowserExtensionToastManager />
    </div>
  )
}

export default ToastOverlay
