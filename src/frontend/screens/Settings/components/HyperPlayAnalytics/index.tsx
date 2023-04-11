import { Button } from '@hyperplay/ui'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import AnalyticsStyles from './index.module.scss'
import classNames from 'classnames'
import { MetricsOptInStatus } from 'common/types'
import ContextProvider from 'frontend/state/ContextProvider'

const HyperPlayAnalytics = () => {
  const { t } = useTranslation()

  const { metricsOptInStatus } = useContext(ContextProvider)

  const analyticsOn = metricsOptInStatus === MetricsOptInStatus.optedIn

  function toggleAnalytics() {
    const newOptInStatus =
      metricsOptInStatus === MetricsOptInStatus.optedIn
        ? MetricsOptInStatus.optedOut
        : MetricsOptInStatus.optedIn
    window.api.changeMetricsOptInStatus(newOptInStatus)
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <div className={classNames('eyebrow', AnalyticsStyles.title)}>
        {t('analytics', 'Analytics')}
      </div>
      <div className="body">
        {t(
          'hyperplay.onboarding.analytics.body',
          `HyperPlay would like to gather usage data to better understand how our users interact with the application. This information helps us understand how you use the app and lets us make HyperPlay even better for you.`
        )}
      </div>
      <div className={classNames('body', AnalyticsStyles.status)}>
        {analyticsOn
          ? t('hyperplay.analyticsOn', `Analytics is turned on`)
          : t('hyperplay.analyticsOff', `Analytics is turned off`)}
      </div>
      <Button type="tertiary" onClick={toggleAnalytics}>
        {analyticsOn
          ? t('hyperplay.turnAnalyticsOff', `Turn off`)
          : t('hyperplay.turnAnalyticsOn', `Turn on`)}
      </Button>
    </div>
  )
}

export default HyperPlayAnalytics
