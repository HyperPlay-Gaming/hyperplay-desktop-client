import React, { useContext, useState } from 'react'
import { MetricsOptInStatus } from 'common/types'
import { t } from 'i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import AnalyticsStyles from './index.module.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '/src/frontend/assets/hyperplay/x-close.svg'

// Store is visible on local storage
// The user has accepted the privacy policy
const storage = window.localStorage
const hasAcceptedPrivacyPolicy = storage.getItem('hasAcceptedPrivacyPolicy')

function CardPrivacyPolicy() {
  const { metricsOptInStatus } = useContext(ContextProvider)
  const hasAcceptedV1 = metricsOptInStatus === MetricsOptInStatus.optedIn
  const [isVisible, setIsVisible] = useState(!hasAcceptedPrivacyPolicy)

  if (!hasAcceptedV1 || !isVisible) {
    return null
  }

  const handleClose = () => {
    setIsVisible(false)
    storage.setItem('hasAcceptedPrivacyPolicy', 'true')
  }

  return (
    <div className={AnalyticsStyles.root}>
      <button className={AnalyticsStyles.closeButton} onClick={handleClose}>
        <CloseIcon />
      </button>
      <span className={AnalyticsStyles.text}>
        {t(
          'hyperplay.onboarding.analytics.text.title',
          `We’ve updated our Privacy Policy`
        )}{' '}
      </span>

      <Link
        className={AnalyticsStyles.link}
        to="https://www.hyperplay.xyz/privacy-policy"
        target="_blank"
      >
        {t('hyperplay.onboarding.analytics.text.externalLink', `Learn More`)}
      </Link>
    </div>
  )
}

export default CardPrivacyPolicy
