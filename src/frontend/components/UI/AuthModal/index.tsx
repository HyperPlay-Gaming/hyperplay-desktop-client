import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'
import { observer } from 'mobx-react-lite'
import authModalState from '../../../state/authModalState'

const url = 'http://localhost:3001/signin'

const AuthModal = () => {
  const webviewRef = useRef<WebviewTag>(null)

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleIpcMessage = (event: Electron.IpcMessageEvent) => {
      if (event.channel !== 'closeAuthModal') return
      authModalState.closeModal()
    }

    const handleDomReady = () => {
      webview.addEventListener('ipc-message', handleIpcMessage)
    }

    webview.addEventListener('dom-ready', handleDomReady)

    return () => {
      console.log('Cleaning up event listeners.')
      webview.removeEventListener('dom-ready', handleDomReady)
      webview.removeEventListener('ipc-message', handleIpcMessage)
    }
  }, [])

  return (
    <ModalAnimation
      isOpen={authModalState.isOpen}
      onClose={() => authModalState.closeModal()}
    >
      <webview
        ref={webviewRef}
        src={url}
        className={styles.webview}
        partition="persist:auth"
        allowpopups={'true' as unknown as boolean | undefined}
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15"
      />
    </ModalAnimation>
  )
}

export default observer(AuthModal)
