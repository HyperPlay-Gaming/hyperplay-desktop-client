import { MetricsOptInStatus } from './../../../common/types'
import * as Metrics from '../metrics'
import { analyticsEvents } from '../../__mocks__/@rudderstack/rudder-sdk-node'

jest.mock('@rudderstack/rudder-sdk-node')
jest.mock('../../logger/logger')
jest.mock('../../logger/logfile')

describe('metrics', () => {
  it('should track event', () => {
    analyticsEvents.addListener('track', (msg) => {
      console.log('track msg = ', msg)
    })
    analyticsEvents.addListener('screen', (msg) => {
      console.log('screen msg = ', msg)
    })
    Metrics.changeMetricsOptInStatus(MetricsOptInStatus.optedIn)
    Metrics.trackEvent({
      event: 'HyperPlay Launched'
    })
  })
})
