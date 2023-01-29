import { apiObject } from '@rudderstack/rudder-sdk-node'
import { MetricsOptInStatus } from 'backend/metrics/metrics'
import { PossibleMetricPayloads } from 'backend/metrics/types'
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
  callback: (optInStatus: MetricsOptInStatus) => void
) => {
  ipcRenderer.on('optInStatusChanged', callback)
  return () => {
    ipcRenderer.removeListener('optInStatusChanged', callback)
  }
}
