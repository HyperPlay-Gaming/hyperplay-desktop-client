import React, { useEffect, useState } from 'react'
import './index.css'
import { ONBOARDING_SCREEN } from './types'
import Welcome from './welcome'
import Analytics from './analytics'
import WalletSelection from './walletSelection'
import { onboardingStore } from 'frontend/helpers/electronStores'

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

  const [currentScreen, setCurrentScreen] = useState(initScreen)

  // Track the screen view once each time the view changes
  useEffect(() => {
    window.api.trackScreen('Onboarding', { view: currentScreen })
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
    <div className="blurBackground">
      <div className="welcomeModal">{renderContent(currentScreen)}</div>
    </div>
  )
}

export default Onboarding
