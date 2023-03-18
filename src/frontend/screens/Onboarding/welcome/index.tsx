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
      <div className={`body ${WelcomeStyles.welcomeBodyTextContainer}`}>
        <div className={WelcomeStyles.boldText}>
          {t(
            'hyperplay.onboarding.welcome.text.construction',
            `HyperPlay is under construction.`
          )}
        </div>
        <div>
          {t(
            'hyperplay.onboarding.welcome.text.description',
            `HyperPlay is a game launcher and game store aggregator from the
          future. With HyperPlay, you can carry your wallet, tokens, and assets
          into every game. HyperPlay supports the entire library of the Epic
          Store, GOG, and our own HyperPlay store. By using HyperPlay, you agree
          to our`
          )}{' '}
          <a
            onClick={() =>
              window.api.openExternalUrl(
                `https://www.hyperplay.xyz/terms-of-service`
              )
            }
          >
            {t('hyperplay.onboarding.terms', `Terms of Service.`)}
          </a>
        </div>
        <div>
          {t(
            'hyperplay.onboarding.welcome.text.bugs',
            `Please note that HyperPlay is a public alpha. Many features are still
          in development, and there will be bugs.`
          )}
        </div>
        <div>
          {t(
            'hyperplay.onboarding.welcome.text.communityCTA_1',
            `We'd love your feedback and to have you join us in our`
          )}{' '}
          <a
            onClick={() =>
              window.api.openExternalUrl(`https://discord.gg/hyperplay`)
            }
          >
            {t('hyperplay.discordApp', `Discord`)}
          </a>{' '}
          {t(
            'hyperplay.onboarding.welcome.text.communityCTA_2',
            `community. Together, let's shape the future of gaming!`
          )}
        </div>
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
