import React, { useContext, useRef } from 'react'
import ExtensionManagerStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import extensionState from 'frontend/state/ExtensionState'
import { motion, AnimatePresence } from 'framer-motion'
import OverlayState from 'frontend/state/OverlayState'
import ContextProvider from 'frontend/state/ContextProvider'

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

const animation = {
  initial: { opacity: 0, transform: 'translateY(-20px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  exit: { opacity: 0, transform: 'translateY(-20px)' },
  transition: { duration: 0.2 }
}

const ExtensionManager = function () {
  const rootRef = useRef<HTMLDivElement>(null)
  const { connectivity } = useContext(ContextProvider)
  const isOffline = connectivity.status !== 'online'
  const trueAsStr = 'false' as unknown as boolean | undefined

  const mmContainerStyle = {} as React.CSSProperties

  if (OverlayState.title === 'HyperPlay Extension') {
    mmContainerStyle.left = 0
    mmContainerStyle.right = 'unset'
    mmContainerStyle.top = 0
  } else if (
    OverlayState.title === 'HyperPlay Extension Overlay' ||
    OverlayState.title === 'HyperPlay Browser Game' ||
    OverlayState.title === 'HyperPlay Web Game'
  ) {
    mmContainerStyle.left = 20
    mmContainerStyle.right = 'unset'
    mmContainerStyle.top = 20
  } else if (isOffline) {
    mmContainerStyle.top = 115
  }

  /* eslint-disable react/no-unknown-property */
  return (
    <div
      className={ExtensionManagerStyles.mmContainer}
      ref={rootRef}
      style={mmContainerStyle}
    >
      <AnimatePresence>
        {extensionState.isPopupOpen ? (
          <motion.div {...animation}>
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              src={`chrome-extension://${extensionState.extensionId}/popup.html`}
              className={ExtensionManagerStyles.mmWindow}
              allowpopups={trueAsStr}
            ></webview>
          </motion.div>
        ) : null}
        {extensionState.isNotificationOpen ? (
          <motion.div {...animation}>
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              src={`chrome-extension://${extensionState.extensionId}/notification.html`}
              className={ExtensionManagerStyles.mmWindow}
              allowpopups={trueAsStr}
            ></webview>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default observer(ExtensionManager)
