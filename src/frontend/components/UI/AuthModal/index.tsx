import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'
import { observer } from 'mobx-react-lite'
import authState from '../../../state/authState'
import { ethers } from 'ethers'
import extensionStore from '../../../store/ExtensionStore'
import onboardingStore from '../../../store/OnboardingStore'
import walletStore from '../../../store/WalletStore'

// TODO: replace this with dev portal prod URL when it's ready
const url =
  'https://hyperplay-dev-git-feature-unified-auth-ui-valist.vercel.app/signin'

const METAMASK_ALREADY_PROVIDED_ERROR_CODE = -32002

const isTooManyRequestsError = (error: string) => {
  return error.includes(METAMASK_ALREADY_PROVIDED_ERROR_CODE.toString())
}

const AuthModal = () => {
  const webviewRef = useRef<WebviewTag>(null)

  const sendRetryConnectionMessage = () => {
    const webview = webviewRef.current
    if (!webview) return
    authState.setPendingSignatureRequest(false)
    webview.send('auth:retryWalletConnection')
  }

  const handleAccountNotConnected = async () => {
    const currentProvider = await window.api.getConnectedProvider()

    if (currentProvider === 'Unconnected') {
      window.api.openAuthModalIfAppReloads()
      onboardingStore.openOnboarding()
      authState.setPendingSignatureRequest(true)
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
        authState.setPendingSignatureRequest(true)
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
          authState.closeSignInModal()
          break
        case 'auth:accountConnected':
          alert('account connected')
          authState.setSignedIn()
          authState.closeSignInModal()
          break
        case 'auth:accountNotConnected':
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

    const qaModeListenerCleanup = window.api.handleQaModeActivated(() => {
      authState.activateQaMode()
      authState.openSignInModal()
    })

    return () => {
      qaModeListenerCleanup()
      webview.removeEventListener('dom-ready', handleDomReady)
      webview.removeEventListener('ipc-message', handleIpcMessage)
    }
  }, [])

  useEffect(() => {
    if (walletStore.isConnected && authState.hasPendingSignatureRequest) {
      sendRetryConnectionMessage()
    }
  }, [walletStore.isConnected, authState.hasPendingSignatureRequest])

  return (
    <ModalAnimation
      isOpen={authState.isSignInModalOpen}
      onClose={() => authState.closeSignInModal()}
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
