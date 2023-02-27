import React from 'react'
import { ONBOARDING_SCREEN } from '../types'
import { t } from 'i18next'
import { HyperPlayLogo } from 'frontend/assets/hyperplay'
import { Button } from '@hyperplay/ui'
import AnalyticsStyle from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface BulletPointProps {
  icon: IconProp
  text: string
  color: string
  firstWord?: string
}

const BulletPoint = ({ text, icon, color, firstWord }: BulletPointProps) => {
  return (
    <div className={AnalyticsStyle.bulletPointContainer}>
      <FontAwesomeIcon icon={icon} color={color} />
      <body>
        {firstWord !== undefined ? (
          <span style={{ color }}>{firstWord}</span>
        ) : null}
        {text}
      </body>
    </div>
  )
}

interface BulletPointWrapperProps {
  text: string
}

const CheckBulletPoint = ({ text }: BulletPointWrapperProps) => {
  return (
    <BulletPoint
      icon={faCheck}
      color={'var(--color-status-success)'}
      text={text}
    />
  )
}

const XBulletPoint = ({ text }: BulletPointWrapperProps) => {
  return (
    <BulletPoint
      icon={faX}
      color={'var(--color-status-error)'}
      firstWord={t('hyperplay.misc', 'Never')}
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
      <HyperPlayLogo />
      <h5>
        {t(
          'hyperplay.onboarding.analytics.title',
          `Help Us improve HyperPlay!`
        )}
      </h5>
      <body>
        {t(
          'hyperplay.onboarding.analytics.body',
          `HyperPlay would like to gather usage data to better understand how our users interact with the application. This information helps us understand how you use the app and lets us make HyperPlay even better for you.`
        )}
      </body>
      <body>
        {t('hyperplay.onboarding.analytics.hyperplayWill', `HyperPlay will:`)}
      </body>
      <CheckBulletPoint
        text={t(
          'hyperplay.onboarding.analytics.optOut',
          'Always allow you to opt-out via Settings;'
        )}
      />
      <CheckBulletPoint
        text={t(
          'hyperplay.onboarding.analytics.anonymized',
          'Send anonymized click & game interaction;'
        )}
      />
      <XBulletPoint
        text={t(
          'hyperplay.onboarding.analytics.neverCollectPersonal',
          ' collect keys, addresses, balances, hashes, or any personal information;'
        )}
      />
      <XBulletPoint
        text={t(
          'hyperplay.onboarding.analytics.neverCollectIP',
          ' collect your full IP address;'
        )}
      />
      <XBulletPoint
        text={t(
          'hyperplay.onboarding.analytics.neverSellData',
          ' sell data for profit. Ever!'
        )}
      />
      <div className={AnalyticsStyle.buttonContainer}>
        <Button
          type="tertiary"
          onClick={() => props.setScreen(ONBOARDING_SCREEN.WALLET_SELECTION)}
        >
          {t('hyperplay.buttons.noThanks', `No Thanks`)}
        </Button>
        <Button
          onClick={() => props.setScreen(ONBOARDING_SCREEN.WALLET_SELECTION)}
        >
          {t('hyperplay.buttons.agree', `I agree`)}
        </Button>
      </div>
      <div className="caption-sm">
        {t(
          'hyperplay.onboarding.analytics.privacyCaption',
          `This data is aggregated and is therefore anonymous for the purposes of General Data Protection Regulation (EU) 2016/679. For more information in relation to our privacy practices, please see our Privacy Policy here. `
        )}
      </div>
    </>
  )
}

export default Analytics
