import { Runner } from 'common/types'

type TrackArgs = {
  event:
    | 'Game Install Canceled'
    | 'Game Install Paused'
    | 'Game Install Resumed'
  properties: {
    game_title: string
    store_name: Runner
    game_name: string
  }
}

export function trackDownloadStatusChange(args: TrackArgs) {
  const { event, properties } = args
  window.api.trackEvent({
    event,
    properties
  })
}
