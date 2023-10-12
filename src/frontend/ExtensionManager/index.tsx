import React, { useRef } from 'react'
import ExtensionManagerStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import extensionState from 'frontend/state/ExtensionState'
import { motion, AnimatePresence } from 'framer-motion'

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
  const trueAsStr = 'false' as unknown as boolean | undefined

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={ExtensionManagerStyles.mmContainer} ref={rootRef}>
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
