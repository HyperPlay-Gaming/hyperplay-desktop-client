import React, { useContext, useEffect, useState } from 'react'
import * as Sentry from '@sentry/electron/renderer'
import { init as reactInit } from '@sentry/react'
import { prodSentryDsn, devSentryDsn } from 'common/constants'
import { MetricsOptInStatus } from 'common/types'
import ContextProvider from 'frontend/state/ContextProvider'

const SentryHandler = () => {
  const [initialized, setInitialized] = useState(false)

  const { metricsOptInStatus } = useContext(ContextProvider)

  function initSentry(optInStatus: MetricsOptInStatus) {
    if (optInStatus !== MetricsOptInStatus.optedIn || initialized) return
    Sentry.init(
      {
        dsn:
          window.location.hostname === 'localhost'
            ? devSentryDsn
            : prodSentryDsn
      },
      reactInit
    )
    setInitialized(true)
  }

  useEffect(() => {
    initSentry(metricsOptInStatus)
    const rmListener = window.api.onOptInStatusChange((e, optInStatus) => {
      initSentry(optInStatus)
    })
    return rmListener
  }, [])

  return <></>
}

export default SentryHandler
