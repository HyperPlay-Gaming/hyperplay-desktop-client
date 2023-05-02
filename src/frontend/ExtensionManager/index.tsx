import React, { useRef } from 'react'
import ExtensionManagerStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import extensionStore from 'frontend/store/ExtensionStore'
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

  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     if (extensionStore.isPopupOpen) {
  //       const target = e.target as HTMLElement

  //       const isMenuItemClicked =
  //         !!target.closest('.SidebarLinks__subItem__popup') ||
  //         !!target.classList.contains('SidebarLinks__subItem__popup')

  //       const isOutsideClick =
  //         target.closest(`.${ExtensionManagerStyles.mmContainer}`) === null

  //       if (isOutsideClick && !isMenuItemClicked) {
  //         extensionStore.setIsPopupOpen(false)
  //       }
  //     }
  //   }

  //   window.addEventListener('click', handleOutsideClick)
  //   return () => {
  //     window.removeEventListener('click', handleOutsideClick)
  //   }
  // })

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={ExtensionManagerStyles.mmContainer} ref={rootRef}>
      <AnimatePresence>
        {extensionStore.isPopupOpen && !extensionStore.isNotificationOpen ? (
          <motion.div {...animation}>
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              src={`chrome-extension://${extensionStore.extensionId}/popup.html`}
              className={ExtensionManagerStyles.mmWindow}
            ></webview>
          </motion.div>
        ) : null}
        {extensionStore.isPopupOpen && extensionStore.isNotificationOpen ? (
          <motion.div {...animation}>
            <webview
              nodeintegrationinsubframes="true"
              webpreferences="contextIsolation=true, nodeIntegration=true"
              src={`chrome-extension://${extensionStore.extensionId}/notification.html`}
              className={ExtensionManagerStyles.mmWindow}
            ></webview>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default observer(ExtensionManager)
