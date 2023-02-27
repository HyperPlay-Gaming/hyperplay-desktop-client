import React from 'react'
import { ONBOARDING_SCREEN } from '../types'
import { t } from 'i18next'
import { Button } from '@hyperplay/ui'
import { HyperPlayLogo } from 'frontend/assets/hyperplay'
import { LanguageSelector } from 'frontend/components/UI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FlagPosition } from 'frontend/components/UI/LanguageSelector'
import { onboardingStore } from 'frontend/helpers/electronStores'
import WelcomeStyles from './index.module.scss'

interface WelcomeProps {
  setScreen: React.Dispatch<React.SetStateAction<ONBOARDING_SCREEN>>
}

const Welcome: React.FC<WelcomeProps> = function (props) {
  return (
    <>
      <HyperPlayLogo />
      <h5>
        {t(
          'hyperplay.onboarding.welcome.title',
          'Welcome to HyperPlay Early Access!'
        )}
      </h5>
      <div
        className={`body ${WelcomeStyles.welcomeBody} ${WelcomeStyles.welcomeBodyText}`}
      >
        {t(
          'hyperplay.onboarding.welcome.body',
          `You're entering in a new game launcher from the future where you can carry your wallet, tokens, NFTs, and assets across the game store. 
          Note that we are in public alpha stage, and may be some bugs and unfinished features, but don't worry, we're working hard to fix them as soon as we can! 
          We'd love for you to join our HyperPlay Discord community and share your thoughts on any issues you encounter or features you'd like to see.`
        )}
      </div>
      <div className={`body ${WelcomeStyles.welcomeBodyText}`}>
        {t(
          'hyperplay.onboarding.welcome.textCTA',
          `Together, let's shape the future of gaming!`
        )}
      </div>
      <div className={WelcomeStyles.languageSelector}>
        <LanguageSelector flagPossition={FlagPosition.PREPEND} />
      </div>
      <div className={WelcomeStyles.actionButton}>
        <Button
          onClick={() => {
            onboardingStore.set('completedEarlyAccess', true)
            props.setScreen(ONBOARDING_SCREEN.ANALYTICS)
          }}
        >
          {t('button.continue', 'Continue')}{' '}
          <FontAwesomeIcon
            icon={faArrowRight}
            className={WelcomeStyles.actionButtonArrow}
          />
        </Button>
      </div>
    </>
  )
}

export default Welcome
