import React, { useContext } from 'react'
import { AlertCard } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
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
    <div className="analytics-card">
      <AlertCard
        title={t('analytics', 'Analytics')}
        message={t(
          'hyperplay.onboarding.analytics.body',
          `HyperPlay would like to gather usage data to better understand how our users interact with the application. This information helps us understand how you use the app and lets us make HyperPlay even better for you.`
        )}
        variant="neutral"
        showClose={false}
        size="small"
        buttons={{
          [analyticsOn ? 'secondary' : 'primary']: {
            text: analyticsOn
              ? t('hyperplay.analyticsTurnOff', `Turn off`)
              : t('hyperplay.analyticsTurnOn', `Turn on`),
            onClick: () => {
              toggleAnalytics()
            }
          }
        }}
      />
    </div>
  )
}

export default HyperPlayAnalytics
