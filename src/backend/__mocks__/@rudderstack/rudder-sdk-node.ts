import {
  apiCallback,
  apiObject,
  integrationOptions
} from '@rudderstack/rudder-sdk-node'
import EventEmitter from 'events'

export const analyticsEvents = new EventEmitter()

interface TrackMessage {
  event: string
  userId?: string
  anonymousId?: string
  context?: apiObject
  properties?: apiObject
  integrations?: integrationOptions
  timestamp?: Date
}

interface EventMessage {
  name: string
  userId?: string
  anonymousId?: string
  context?: apiObject
  properties?: apiObject
  integrations?: integrationOptions
  timestamp?: Date
}

class Analytics {
  track(message: TrackMessage, callback?: apiCallback) {
    console.log('received event ', message.event)
    analyticsEvents.emit('track', message)
    return this
  }

  screen(message: EventMessage, callback?: apiCallback): Analytics {
    console.log('screen: ', message.name)
    analyticsEvents.emit('screen', message)
    return this
  }
}

export default Analytics
