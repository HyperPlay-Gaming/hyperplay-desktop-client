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

export interface OnboardingStarted {
  event: 'Onboarding Started'
  properties?: never
  sensitiveProperties?: never
}

export interface OnboardingSkipped {
  event: 'Onboarding Skipped'
  properties?: never
  sensitiveProperties?: never
}

export interface OnboardingCompleted {
  event: 'Onboarding Completed'
  properties?: never
  sensitiveProperties?: never
}

export interface GameInstallRequested {
  event: 'Game Install Requested'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameInstallStarted {
  event: 'Game Install Started'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameInstallSuccess {
  event: 'Game Install Success'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameInstallFailed {
  event: 'Game Install Failed'
  properties: {
    store_name: string
    game_name: string
    error: string
  }
  sensitiveProperties?: never
}

export interface GameUpdateRequested {
  event: 'Game Update Requested'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUpdateStarted {
  event: 'Game Update Started'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUpdateSuccess {
  event: 'Game Update Success'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUpdateFailed {
  event: 'Game Update Failed'
  properties: {
    store_name: string
    game_name: string
    error: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallRequested {
  event: 'Game Uninstall Requested'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallStarted {
  event: 'Game Uninstall Started'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallSuccess {
  event: 'Game Uninstall Success'
  properties: {
    store_name: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallFailed {
  event: 'Game Uninstall Failed'
  properties: {
    store_name: string
    game_name: string
    error: string
  }
  sensitiveProperties?: never
}

export interface DownloadToastInteraction {
  event: 'DownloadToastInteraction'
  properties: {
    buttonClicked: string
  }
}

export type PossibleMetricPayloads =
  | MetricsOptIn
  | MetricsOptOut
  | GameStoreConnectionStarted
  | OnboardingStarted
  | OnboardingSkipped
  | OnboardingCompleted
  | GameInstallRequested
  | GameInstallStarted
  | GameInstallSuccess
  | GameInstallFailed
  | GameUpdateRequested
  | GameUpdateStarted
  | GameUpdateSuccess
  | GameUpdateFailed
  | GameUninstallRequested
  | GameUninstallStarted
  | GameUninstallSuccess
  | GameUninstallFailed
  | DownloadToastInteraction

export type PossibleMetricEventNames = PossibleMetricPayloads['event']
