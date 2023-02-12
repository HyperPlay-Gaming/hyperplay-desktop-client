export interface MetricsOptIn {
  event: 'Metrics Opt-in'
  properties?: never
  sensitiveProperties?: never
}

export interface MetricsOptOut {
  event: 'Metrics Opt-out'
  properties?: never
  sensitiveProperties?: never
}

export interface GameStoreConnectionStarted {
  event: 'Game Store Connection Started'
  properties?: {
    store_name: string
  }
  sensitiveProperties?: never
}

export type PossibleMetricPayloads =
  | MetricsOptIn
  | MetricsOptOut
  | GameStoreConnectionStarted
export type PossibleMetricEventNames = PossibleMetricPayloads['event']