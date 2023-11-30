import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'
import { WebviewTag } from 'electron'
import { observer } from 'mobx-react-lite'
import authState from '../../../state/authState'
import { ethers } from 'ethers'
import extensionState from '../../../state/ExtensionState'
import onboardingState from '../../../store/OnboardingStore'
import walletState from '../../../state/WalletState'
import { DEV_PORTAL_URL } from 'common/constants'

const url = `${DEV_PORTAL_URL}/signin`

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
      onboardingState.openOnboarding()
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
        extensionState.isPopupOpen = true
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
    })

    const oAuthCompletedCleanup = window.api.handleOAuthCompleted(() => {
      authState.setSignedIn()
      authState.closeSignInModal()
    })

    return () => {
      qaModeListenerCleanup()
      oAuthCompletedCleanup()
      webview.removeEventListener('dom-ready', handleDomReady)
      webview.removeEventListener('ipc-message', handleIpcMessage)
    }
  }, [])

  /**
   * Without reload, user gets stuck on email verified page even after
   * auth modal close and reopen.
   */
  useEffect(() => {
    if (!authState.isSignInModalOpen) {
      return
    }
    /**
     * On import app reload this will fail as it tries to reload an unmounted webview
     */
    try {
      webviewRef.current?.reload()
    } catch (err) {
      console.error(err)
    }
  }, [authState.isSignInModalOpen])

  useEffect(() => {
    if (walletState.isConnected && authState.hasPendingSignatureRequest) {
      sendRetryConnectionMessage()
    }
  }, [walletState.isConnected, authState.hasPendingSignatureRequest])

  function emailConfirmed(
    _e: Electron.IpcRendererEvent,
    emailConfirmUrl: string
  ) {
    webviewRef.current?.loadURL(emailConfirmUrl)
    authState.openSignInModal()

    setTimeout(() => webviewRef.current?.loadURL(url), 5000)
  }

  useEffect(() => {
    const rmHandleEmailConfirmationNavigation =
      window.api.handleEmailConfirmationNavigation(emailConfirmed)

    return () => {
      rmHandleEmailConfirmationNavigation()
    }
  }, [])

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
