import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'
import { observer } from 'mobx-react-lite'
import { DEV_PORTAL_URL } from 'common/constants'
import emailSubscriptionState from '../../../state/EmailSubscriptionState'

const url = `${DEV_PORTAL_URL}/signin?isLauncher=true&promoMode=true`

const EmailSubscriptionModal = () => {
  const webviewRef = useRef<WebviewTag>(null)

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleIpcMessage = async (event: Electron.IpcMessageEvent) => {
      switch (event.channel) {
        case 'closeAuthModal':
          emailSubscriptionState.closeEmailModal()
          break
        default:
          break
      }
    }

    const handleDomReady = () => {
      webview.addEventListener('ipc-message', handleIpcMessage)
    }

    webview.addEventListener('dom-ready', handleDomReady)

    return () => {
      webview.removeEventListener('dom-ready', handleDomReady)
      webview.removeEventListener('ipc-message', handleIpcMessage)
    }
  }, [])

  return (
    <ModalAnimation
      isOpen={emailSubscriptionState.isEmailModalOpen}
      onClose={() => emailSubscriptionState.closeEmailModal()}
    >
      <webview
        ref={webviewRef}
        src={url}
        className={styles.webview}
        partition="persist:emailModal"
        allowpopups={'true' as unknown as boolean | undefined}
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15"
      />
    </ModalAnimation>
  )
}

export default observer(EmailSubscriptionModal)
