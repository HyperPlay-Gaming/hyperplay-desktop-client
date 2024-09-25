import React, { useContext, useRef } from 'react'
import ExtensionManagerStyles from './index.module.scss'
import { observer } from 'mobx-react-lite'
import extensionState from 'frontend/state/ExtensionState'
import OverlayState from 'frontend/state/OverlayState'
import ContextProvider from 'frontend/state/ContextProvider'
import ExtensionContents, {
  ExtensionPopup
} from './components/ExtensionContents'

const ExtensionManager = function () {
  const rootRef = useRef<HTMLDialogElement | null>(null)
  const { connectivity } = useContext(ContextProvider)
  const isOffline = connectivity.status !== 'online'
  const mmContainerStyle = {} as React.CSSProperties

  const isOverlay =
    OverlayState.title === 'HyperPlay Extension Overlay' ||
    OverlayState.title === 'HyperPlay Browser Game' ||
    OverlayState.title === 'HyperPlay Web Game'

  if (OverlayState.title === 'HyperPlay Extension') {
    mmContainerStyle.left = 0
    mmContainerStyle.right = 'unset'
    mmContainerStyle.top = 0
  } else if (isOverlay) {
    mmContainerStyle.left = 20
    mmContainerStyle.right = 'unset'
    mmContainerStyle.top = 20
  } else if (isOffline) {
    mmContainerStyle.top = 115
  }
  if (extensionState.isPopupOpen || extensionState.isNotificationOpen) {
    rootRef.current?.showModal()
  } else {
    rootRef.current?.close()
  }
  if (extensionState.isPopupOpen || extensionState.isNotificationOpen) {
    rootRef.current?.showModal()
  } else {
    rootRef.current?.close()
  }

  if (isOverlay) {
    return <ExtensionPopup />
  }

  /* eslint-disable react/no-unknown-property */
  return (
    <dialog
      className={ExtensionManagerStyles.mmContainer}
      ref={rootRef}
      style={mmContainerStyle}
    >
      <ExtensionContents />
    </dialog>
  )
}

export default observer(ExtensionManager)
