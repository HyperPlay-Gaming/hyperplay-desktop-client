import React, { useContext } from 'react'
import { MetricsOptInStatus } from 'common/types'
import { ToggleSwitch } from 'frontend/components/UI'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'

export default function ParticipateInMetrics() {
  const { t } = useTranslation()

  const { metricsOptInStatus } = useContext(ContextProvider)

  return (
    <ToggleSwitch
      htmlId="participateInMetrics"
      value={metricsOptInStatus === MetricsOptInStatus.optedIn ? true : false}
      handleChange={async () =>
        window.api.changeMetricsOptInStatus(
          metricsOptInStatus === MetricsOptInStatus.optedIn
            ? MetricsOptInStatus.optedOut
            : MetricsOptInStatus.optedIn
        )
      }
      title={t('setting.participate-in-metrics', 'Participate in metrics')}
    />
  )
}
