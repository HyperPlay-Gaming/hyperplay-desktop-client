import { EventEmitter } from 'stream'
import { PossibleMetricPayloads } from '../types'

export const trackEvent = async ({
  event,
  properties,
  sensitiveProperties
}: PossibleMetricPayloads): Promise<void> => {
  console.log('in track event mock with ', event)
}
