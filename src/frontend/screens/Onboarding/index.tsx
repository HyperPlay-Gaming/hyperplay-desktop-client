import React, { useEffect, useState } from 'react'
import OnboardingStyles from './index.module.scss'
import { ONBOARDING_SCREEN } from './types'
import Welcome from './welcome'
import Analytics from './analytics'
import WalletSelection from './walletSelection'
import { onboardingStore } from 'frontend/helpers/electronStores'
import classNames from 'classnames'

interface OnboardingProps {
  disableOnboarding: () => void
}

const Onboarding: React.FC<OnboardingProps> = function (props) {
  let initScreen = ONBOARDING_SCREEN.WELCOME

  if (onboardingStore.get('completedEarlyAccess', false)) {
    initScreen = ONBOARDING_SCREEN.ANALYTICS
  }

  if (onboardingStore.get('completedDataPrivacy', false)) {
    initScreen = ONBOARDING_SCREEN.WALLET_SELECTION
  }

  const handleConnected: WrapRendererCallback<WalletConnectedType> = (
    e,
    accounts
  ) => {
    console.log('connected with accounts = ', accounts)
    window.api.trackEvent({ event: 'Onboarding Completed' })
    setContentParams({
      content: ONBOARDING_CONTENT.SUCCESS
    })
  }

  const handleRejected: WrapRendererCallback<ConnectionRequestRejectedType> = (
    e
  ) => {
    console.log('rejected with ', e)
    setContentParams({
      content: ONBOARDING_CONTENT.REJECTED
    })
  }

  const { content } = contentParams

  // Track the screen view once each time the view changes
  useEffect(() => {
    window.api.trackScreen('Onboarding', { view: content })
  }, [content])

  useEffect(() => {
    window.api.trackEvent({ event: 'Onboarding Started' })
  }, [])

  function getWelcomeElement() {
    return <Welcome setScreen={setCurrentScreen} />
  }

  function renderContent(param: ONBOARDING_SCREEN) {
    switch (param) {
      case ONBOARDING_SCREEN.WELCOME:
        return getWelcomeElement()
      case ONBOARDING_SCREEN.ANALYTICS:
        return <Analytics setScreen={setCurrentScreen} />
      case ONBOARDING_SCREEN.WALLET_SELECTION:
        return <WalletSelection disableOnboarding={props.disableOnboarding} />
      default:
        return getWelcomeElement()
    }
  }
  return (
    <div className={OnboardingStyles.blurBackground}>
      <div
        className={classNames(`${OnboardingStyles.welcomeModal}`, {
          [`${OnboardingStyles.wideModal}`]:
            currentScreen === ONBOARDING_SCREEN.WALLET_SELECTION,
          [`${OnboardingStyles.regularModal}`]:
            currentScreen !== ONBOARDING_SCREEN.WALLET_SELECTION
        })}
      >
        {renderContent(currentScreen)}
      </div>
    </div>
  )
}

export default Onboarding
