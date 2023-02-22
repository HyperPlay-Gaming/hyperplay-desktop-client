import { apiObject } from '@rudderstack/rudder-sdk-node'
import { PossibleMetricPayloads } from 'backend/metrics/types'
import { MetricsOptInStatus } from 'common/types'
import { ipcRenderer } from 'electron'

export const trackEvent = async (eventPayload: PossibleMetricPayloads) => {
  ipcRenderer.invoke('trackEvent', eventPayload)
}

export const trackScreen = async (name: string, properties?: apiObject) => {
  ipcRenderer.invoke('trackScreen', name, properties)
}

export const changeMetricsOptInStatus = async (
  newStatus: MetricsOptInStatus.optedIn | MetricsOptInStatus.optedOut
) => {
  ipcRenderer.invoke('changeMetricsOptInStatus', newStatus)
}

export const onOptInStatusChange = (
  callback: (event: Event, optInStatus: MetricsOptInStatus) => void
) => {
  ipcRenderer.on('optInStatusChanged', callback)
  return () => {
    ipcRenderer.removeListener('optInStatusChanged', callback)
  }
}
