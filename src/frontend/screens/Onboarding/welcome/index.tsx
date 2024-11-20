import React from 'react'
import { ONBOARDING_SCREEN } from '../types'
import { t } from 'i18next'
import { Button, Images } from '@hyperplay/ui'
import { LanguageSelector } from 'frontend/components/UI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FlagPosition } from 'frontend/components/UI/LanguageSelector'
import { onboardingStore } from 'frontend/helpers/electronStores'
import WelcomeStyles from './index.module.scss'
import OnboardingStyles from '../index.module.scss'
import { ReactComponent as DiamondBlue } from '/src/frontend/assets/diamond.svg'

interface WelcomeProps {
  setScreen: React.Dispatch<React.SetStateAction<ONBOARDING_SCREEN>>
}

const Welcome: React.FC<WelcomeProps> = function (props) {
  return (
    <>
      <Images.HyperPlayLogoColored className={OnboardingStyles.hpLogo} />
      <h6 className={WelcomeStyles.welcomeTitle}>
        {t('hyperplay.onboarding.welcome.title2', 'Welcome to HyperPlay!')}
      </h6>
      <div className={`body ${WelcomeStyles.welcomeBodyTextContainer}`}>
        <div className={WelcomeStyles.text}>
          {t(
            'hyperplay.onboarding.welcome.text.paragraph1',
            `At HyperPlay, we’re building the next-generation game store 
            for the future of gaming.`
          )}{' '}
        </div>
        <div className={WelcomeStyles.text}>
          {t(
            'hyperplay.onboarding.welcome.text.paragraph3',
            `Seamlessly bring your wallet, tokens, 
           and assets into every game while accessing 
           the extensive libraries of the Epic Store, 
           GOG, and our own HyperPlay Store, all in one place.`
          )}
        </div>
        <div className={WelcomeStyles.textBold}>
          {t(
            'hyperplay.onboarding.welcome.text.bulletTitle',
            `With HyperPlay, you can:`
          )}
        </div>
        <div>
          <ul
            className={`${WelcomeStyles.bulletPointIcon} ${WelcomeStyles.bulletPointList}`}
          >
            <li>
              <DiamondBlue className={WelcomeStyles.diamondBlue} />
              {t(
                'hyperplay.onboarding.welcome.text.bulletPoint_1',
                `Access a vast collection of 100+ on-chain enabled games`
              )}
            </li>
            <li>
              <DiamondBlue className={WelcomeStyles.diamondBlue} />
              {t(
                'hyperplay.onboarding.welcome.text.bulletPoint_2',
                `Earn tokens, NFTs, and off-chain rewards by completing Quests`
              )}
            </li>
            <li>
              <DiamondBlue className={WelcomeStyles.diamondBlue} />
              {t(
                'hyperplay.onboarding.welcome.text.bulletPoint_3',
                `Play Epic and GOG games directly through HyperPlay`
              )}
            </li>
            <li>
              <DiamondBlue className={WelcomeStyles.diamondBlue} />
              {t(
                'hyperplay.onboarding.welcome.text.bulletPoint_4',
                `Install Steam (Windows version) on macOS with one easy click`
              )}
            </li>
            <li>
              <DiamondBlue className={WelcomeStyles.diamondBlue} />
              {t(
                'hyperplay.onboarding.welcome.text.bulletPoint_5',
                `Run Windows games on macOS, Linux, and SteamDeck using our
              advanced`
              )}{' '}
              <a
                onClick={() =>
                  window.api.openExternalUrl(
                    `https://docs.hyperplay.xyz/faq#q-what-operating-systems-are-supported`
                  )
                }
              >
                Compatibility Layer (Beta)
              </a>
            </li>
          </ul>{' '}
        </div>
        <div>
          {t(
            'hyperplay.onboarding.welcome.text.2',
            `Currently in Beta, we highly value your feedback and 
            encourage you to report any issues or suggestions in our`
          )}{' '}
          <a
            onClick={() =>
              window.api.openExternalUrl(`https://discord.gg/hyperplay`)
            }
          >
            {t('hyperplay.discordApp2', `Discord Community.`)}
          </a>{' '}
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
          type="secondary"
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
