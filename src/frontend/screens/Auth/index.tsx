import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'

const url = 'http://localhost:3001/signin'

const Auth = () => {
  const webviewRef = useRef<WebviewTag>(null)

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleIpcMessage = (event: Electron.IpcMessageEvent) => {
      console.log('Received IPC message:', event.channel, event.args)
      // Add more debugging information if needed
    }

    const handleDomReady = () => {
      console.log('DOM is ready. Adding IPC message handler.')
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
    <ModalAnimation isOpen={true} onClose={() => console.log('close')}>
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

export default Auth
