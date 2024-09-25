import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import extensionState from 'frontend/state/ExtensionState'
import ExtensionContentsStyles from './index.module.scss'

const trueAsStr = 'false' as unknown as boolean | undefined

//Module type augmentation necessary to use experimental feature nodeintegrationinsubframes
//https://www.electronjs.org/docs/latest/api/webview-tag
/* eslint-disable react/no-unknown-property */
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

export function ExtensionPopup() {
  return (
    <webview
      nodeintegrationinsubframes="true"
      webpreferences="contextIsolation=true, nodeIntegration=true"
      src={`chrome-extension://${extensionState.extensionId}/popup.html`}
      className={ExtensionContentsStyles.mmWindow}
      allowpopups={trueAsStr}
    ></webview>
  )
}

export function ExtensionNotification() {
  return (
    <webview
      nodeintegrationinsubframes="true"
      webpreferences="contextIsolation=true, nodeIntegration=true"
      src={`chrome-extension://${extensionState.extensionId}/notification.html`}
      className={ExtensionContentsStyles.mmWindow}
      allowpopups={trueAsStr}
    ></webview>
  )
}

export default function ExtensionContents() {
  return (
    <AnimatePresence>
      {extensionState.isPopupOpen ? (
        <motion.div
          {...animation}
          className={ExtensionContentsStyles.mmWindowContainer}
        >
          <ExtensionPopup />
        </motion.div>
      ) : null}
      {extensionState.isNotificationOpen ? (
        <motion.div
          {...animation}
          className={ExtensionContentsStyles.mmWindowContainer}
        >
          <ExtensionNotification />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
