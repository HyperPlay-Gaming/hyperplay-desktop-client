import { PossibleMetricPayloads } from 'backend/metrics/types'

export type PatchingErrorReason = 'slower-than-install'

export class PatchingError extends Error {
  reason: PatchingErrorReason
  eventToTrack?: PossibleMetricPayloads

  constructor(
    message: string,
    reason: PatchingErrorReason,
    eventToTrack?: PossibleMetricPayloads
  ) {
    super(message) // Pass the message to the base Error class
    this.reason = reason
    this.eventToTrack = eventToTrack
    this.name = 'PatchingError' // Set a custom error name
  }
}
