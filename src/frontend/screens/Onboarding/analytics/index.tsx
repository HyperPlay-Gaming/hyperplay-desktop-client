import React from 'react'
import { ONBOARDING_SCREEN } from '../types'
import { t } from 'i18next'
import { Button, Images } from '@hyperplay/ui'
import AnalyticsStyle from './index.module.scss'
import { onboardingStore } from 'frontend/helpers/electronStores'
import { MetricsOptInStatus } from 'common/types'
import OnboardingStyles from '../index.module.scss'
import { ReactComponent as checkCircle } from '/src/frontend/assets/hyperplay/check-circle.svg'

interface BulletPointProps {
  icon: React.ElementType
  text: string
  color: string
  firstWord?: string
}

const BulletPoint = ({
  text,
  icon: Icon,
  color,
  firstWord
}: BulletPointProps) => {
  return (
    <div className={AnalyticsStyle.bulletPointContainer}>
      <Icon color={color} />
      <div
        className={`body ${AnalyticsStyle.infoText} ${AnalyticsStyle.marginBottomSm}`}
      >
        {firstWord !== undefined ? (
          <span style={{ color }}>{firstWord}</span>
        ) : null}
        {text}
      </div>
    </div>
  )
}

interface BulletPointWrapperProps {
  text: string
}

const CheckBulletPoint = ({ text }: BulletPointWrapperProps) => {
  return (
    <BulletPoint
      icon={checkCircle}
      color={'var(--color-status-success)'}
      text={text}
    />
  )
}

interface AnalyticsProps {
  setScreen: React.Dispatch<React.SetStateAction<ONBOARDING_SCREEN>>
}

const Analytics: React.FC<AnalyticsProps> = function (props) {
  return (
    <>
      <Images.HyperPlayLogoColored className={OnboardingStyles.hpLogo} />
      <h6 className={AnalyticsStyle.title}>
        {t(
          'hyperplay.onboarding.analytics.titleOne',
          `Help Us Improve HyperPlay!`
        )}
      </h6>
      <div className={`body ${AnalyticsStyle.marginBottomLg}`}>
        {t(
          'hyperplay.onboarding.analytics.paragraphOne',
          `HyperPlay would like to gather usage data to better understand how our users interact with the application. 
           This lets us make HyperPlay even better for you.`
        )}
      </div>
      <div className={`${AnalyticsStyle.titleSm}`}>
        {t('hyperplay.onboarding.analytics.hyperplayWill', `HyperPlay will:`)}
      </div>

      <div className={`${AnalyticsStyle.bullets}`}>
        <CheckBulletPoint
          text={t(
            'hyperplay.onboarding.analytics.bulletOne',
            'Always allow you to opt-out'
          )}
        />
        <CheckBulletPoint
          text={t(
            'hyperplay.onboarding.analytics.bulletTwo',
            'Send anonymized click & game interaction'
          )}
        />
      </div>
      <div className={`caption-sm ${AnalyticsStyle.privacyCaption}`}>
        {t(
          'hyperplay.onboarding.analytics.privacyCaption',
          `This data is aggregated and is therefore anonymous for the purposes of General Data Protection Regulation (EU) 2016/679. For more information in relation to our privacy practices, please see our `
        )}
        <a
          onClick={() =>
            window.api.openExternalUrl(
              'https://www.hyperplay.xyz/privacy-policy'
            )
          }
          className="caption-sm"
        >
          {t('hyperplay.onboarding.analytics.privacyPolicy', `Privacy Policy.`)}
        </a>
      </div>

      <div className={AnalyticsStyle.buttonContainer}>
        <Button
          type="secondary"
          onClick={() => {
            onboardingStore.set('completedDataPrivacy', true)
            window.api.changeMetricsOptInStatus(MetricsOptInStatus.optedIn)
            props.setScreen(ONBOARDING_SCREEN.WALLET_SELECTION)
          }}
        >
          {t('hyperplay.buttons.primaryButton', `I Agree`)}
        </Button>

        <Button
          type="tertiary"
          onClick={() => {
            onboardingStore.set('completedDataPrivacy', true)
            window.api.changeMetricsOptInStatus(MetricsOptInStatus.optedOut)
            props.setScreen(ONBOARDING_SCREEN.WALLET_SELECTION)
          }}
        >
          {t('hyperplay.buttons.secondaryButton', `No, Thanks`)}
        </Button>
      </div>
    </>
  )
}

export default Analytics
