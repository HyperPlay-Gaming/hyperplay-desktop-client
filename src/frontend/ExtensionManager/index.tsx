import React, { useEffect, useRef } from 'react'
import ExtensionManagerStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import extensionStore from 'frontend/store/ExtensionStore'
import classNames from 'classnames'

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

const ExtensionManager = function () {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (extensionStore.isPopupOpen) {
        const target = e.target as HTMLElement

        const isMenuItemClicked =
          !!target.closest('.SidebarLinks__subItem__popup') ||
          !!target.classList.contains('SidebarLinks__subItem__popup')

        const isOutsideClick =
          target.closest(`.${ExtensionManagerStyles.mmContainer}`) === null

        if (isOutsideClick && !isMenuItemClicked) {
          extensionStore.setIsPopupOpen(false)
        }
      }
    }

    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  })

  /* eslint-disable react/no-unknown-property */
  return (
    <div className={ExtensionManagerStyles.mmContainer} ref={rootRef}>
      {extensionStore.isPopupOpen ? (
        <webview
          nodeintegrationinsubframes="true"
          webpreferences="contextIsolation=true, nodeIntegration=true"
          src={`chrome-extension://${extensionStore.extensionId}/popup.html`}
          className={classNames(ExtensionManagerStyles.mmWindow, {
            [ExtensionManagerStyles.open]:
              extensionStore.isPopupOpen && !extensionStore.isNotificationOpen
          })}
        ></webview>
      ) : null}
      {extensionStore.isNotificationOpen ? (
        <webview
          nodeintegrationinsubframes="true"
          webpreferences="contextIsolation=true, nodeIntegration=true"
          src={`chrome-extension://${extensionStore.extensionId}/notification.html`}
          className={classNames(ExtensionManagerStyles.mmWindow, {
            [ExtensionManagerStyles.open]:
              extensionStore.isPopupOpen && extensionStore.isNotificationOpen
          })}
        ></webview>
      ) : null}
    </div>
  )
}

export default observer(ExtensionManager)
