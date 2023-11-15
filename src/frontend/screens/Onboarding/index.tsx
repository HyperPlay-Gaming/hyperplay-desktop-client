import React, { useEffect, useState } from 'react'
import OnboardingStyles from './index.module.scss'
import { ONBOARDING_SCREEN } from './types'
import Welcome from './welcome'
import Analytics from './analytics'
import WalletSelection from './walletSelection'
import { onboardingStore } from 'frontend/helpers/electronStores'
import classNames from 'classnames'
import { WalletOnboardCloseReason } from 'common/types'

interface OnboardingProps {
  disableOnboarding: (disableReason: WalletOnboardCloseReason) => void
}

const Onboarding: React.FC<OnboardingProps> = function (props) {
  let initScreen = ONBOARDING_SCREEN.WELCOME

  if (onboardingStore.get('completedEarlyAccess', false)) {
    initScreen = ONBOARDING_SCREEN.ANALYTICS
  }

  if (onboardingStore.get('completedDataPrivacy', false)) {
    initScreen = ONBOARDING_SCREEN.WALLET_SELECTION
  }

  const [currentScreen, setCurrentScreen] = useState(initScreen)

  // Track the screen view once each time the view changes
  useEffect(() => {
    window.api.trackScreen('Onboarding', { view: currentScreen })

    if (currentScreen === ONBOARDING_SCREEN.WALLET_SELECTION) {
      window.api.trackEvent({ event: 'Onboarding Started' })
    }
  }, [currentScreen])

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
