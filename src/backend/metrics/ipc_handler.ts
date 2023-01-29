import { apiObject } from '@rudderstack/rudder-sdk-node'
import { ipcMain } from 'electron'
import {
  changeMetricsOptInStatus,
  MetricsOptInStatus,
  trackEvent,
  trackScreen
} from './metrics'
import { PossibleMetricPayloads } from './types'

ipcMain.handle(
  'trackEvent',
  async (event, eventPayload: PossibleMetricPayloads) => {
    return trackEvent(eventPayload)
  }
)

ipcMain.handle(
  'trackScreen',
  async (event, name: string, properties?: apiObject) => {
    return trackScreen(name, properties)
  }
)

ipcMain.handle(
  'changeMetricsOptInStatus',
  async (
    event,
    newStatus: MetricsOptInStatus.optedIn | MetricsOptInStatus.optedOut
  ) => {
    return changeMetricsOptInStatus(newStatus)
  }
)
