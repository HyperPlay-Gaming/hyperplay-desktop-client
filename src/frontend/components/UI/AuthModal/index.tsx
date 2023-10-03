import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'
import { observer } from 'mobx-react-lite'
import authModalState from '../../../state/authModalState'
import { ethers } from 'ethers'
import extensionStore from '../../../store/ExtensionStore'
import onboardingStore from '../../../store/OnboardingStore'

// TODO: replace this with dev portal preview URL when it's ready
const url = 'http://localhost:3001/signin'

const METAMASK_ALREADY_PROVIDED_ERROR_CODE = -32002

const isTooManyRequestsError = (error: string) => {
  return error.includes(METAMASK_ALREADY_PROVIDED_ERROR_CODE.toString())
}

const AuthModal = () => {
  const webviewRef = useRef<WebviewTag>(null)

  const handleAccountNotConnected = async () => {
    const currentProvider = await window.api.getCurrentWeb3Provider()

    if (!currentProvider) {
      onboardingStore.openOnboarding()
      return
    }

    // try to trigger metamask popup to connect account
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.getSigner()
    } catch (e) {
      // if it fails, open the popup manually
      // since there are already requests in the queue, this will resume
      // the connection flow after the user unlocks metamask
      if (isTooManyRequestsError(String(e))) {
        extensionStore.setIsPopupOpen(true)
      }
    }
  }

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleIpcMessage = async (event: Electron.IpcMessageEvent) => {
      switch (event.channel) {
        case 'closeAuthModal':
          authModalState.closeModal()
          break
        case 'auth:accountNotConnected':
          // TODO: try to resume flow after connecting account
          await handleAccountNotConnected()
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
