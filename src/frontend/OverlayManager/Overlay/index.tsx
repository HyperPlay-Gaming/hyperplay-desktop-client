import React from 'react'
import BrowserGameStyles from './index.module.scss'
import ToastManager from '../ToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import { observer } from 'mobx-react-lite'
import OverlayState from 'frontend/state/OverlayState'
import WalletState from 'frontend/state/WalletState'
import { t } from 'i18next'
import ExtensionManager from 'frontend/ExtensionManager'
import TransactionState from 'frontend/state/TransactionState'
import { BrowserGameProps } from '../types'
import { Button } from '@hyperplay/ui'
import { QuestsViewer } from 'frontend/components/UI/QuestsViewer'
import { useFlags } from 'launchdarkly-react-client-sdk'
import libraryState from 'frontend/state/libraryState'

export const Overlay = observer(function ({
  appName,
  runner
}: BrowserGameProps) {
  const flags = useFlags()
  const txnToastContainerStyle = {} as React.CSSProperties
  if (OverlayState.title === 'HyperPlay Toasts') {
    txnToastContainerStyle.bottom = 'unset'
    txnToastContainerStyle.right = 0
    txnToastContainerStyle.top = 0
  }

  let exitGameButtonStyle = {
    top: 'var(--space-md)',
    right: 'var(--space-md)',
    position: 'absolute',
    zIndex: 200,
    display: 'flex',
    gap: 'var(--space-sm)'
  } as React.CSSProperties

  if (
    OverlayState.renderState.showExitGameButton &&
    !OverlayState.renderState.showExtension
  ) {
    exitGameButtonStyle = {
      ...exitGameButtonStyle,
      top: 0,
      right: 0,
      overflowY: 'hidden'
    }
  }

  const shouldShowExtension =
    WalletState.provider === PROVIDERS.METAMASK_EXTENSION &&
    OverlayState.renderState.showExtension

  let toastManager = null
  if (OverlayState.renderState.showToasts) {
    toastManager = (
      <div
        className={BrowserGameStyles.txnToastContainer}
        style={txnToastContainerStyle}
      >
        <ToastManager />
      </div>
    )
  }

  let overlayItems = null
  if (!TransactionState.isInitialToastShown) {
    let exitGameButton = null
    if (OverlayState.renderState.showExitGameButton) {
      exitGameButton = (
        <div style={exitGameButtonStyle}>
          <Button
            onClick={async () => {
              // mac can take ~5 seconds to close the wine process, so we close the overlay instantly
              window.api.killOverlay()
              window.api.kill(appName, runner)
            }}
            type="tertiary"
            size="medium"
          >
            {t('exit_game', 'Exit Game')}
          </Button>
          <Button
            onClick={async () => {
              window.api.toggleOverlay()
            }}
            type="secondary"
            size="medium"
          >
            {t('back_to_game', 'Back to game')}
          </Button>
        </div>
      )
    }

    let extensionManager = null
    if (shouldShowExtension) {
      extensionManager = <ExtensionManager />
    } else if (
      OverlayState.renderState.showHintText &&
      OverlayState.title !== 'HyperPlay Hint Text'
    ) {
      extensionManager = (
        <div className={`${BrowserGameStyles.overlayToggleHint} title`}>
          {t(
            'overlay.EXTERNAL_WALLET_CONNECTED',
            'You are connected to HyperPlay with an external wallet.'
          )}
        </div>
      )
    }

    let questsViewer = null
    const gamesToShowQuestsFor =
      (flags.gamesToShowQuestsFor as string | undefined)?.split(',') ?? []
    if (
      flags.questsOverlayClaimModals ||
      libraryState.hasGame(gamesToShowQuestsFor)
    ) {
      questsViewer = <QuestsViewer projectId={appName} />
    }

    overlayItems = (
      <>
        <div className={BrowserGameStyles.bgFilter}></div>
        {exitGameButton}
        {extensionManager}
        {questsViewer}
      </>
    )
  }

  return (
    <>
      {toastManager}
      {overlayItems}
    </>
  )
})
