import { getPlatformName, getStoreName } from 'backend/utils'
import { AppPlatforms, InstallPlatform, Runner } from 'common/types'
import { PROVIDERS } from 'common/types/proxy-types'

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

export interface MetricsErrorCorrection {
  event: 'Metrics Error Correction'
  properties?: never
  sensitiveProperties?: never
}

export interface GameStoreConnectionStarted {
  event: 'Game Store Connection Started'
  properties?: {
    store_name: Runner
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

export interface OnboardingProviderClicked {
  event: 'Onboarding Provider Clicked'
  properties: {
    provider: PROVIDERS
  }
  sensitiveProperties?: never
}

export interface WalletConnected {
  event: 'Wallet Connected'
  properties?: {
    provider: PROVIDERS
  }
  sensitiveProperties?: never
}

export interface MetaMaskInitialized {
  event: 'MetaMask Initialized'
  properties?: {
    initMethod: string
    browser?: string
  }
  sensitiveProperties?: never
}

export interface GameInstallRequested {
  event: 'Game Install Requested'
  properties: {
    store_name: Runner
    game_name: string
    game_title: string
    platform: InstallPlatform | AppPlatforms
  }
  sensitiveProperties?: never
}

export interface GameInstallStarted {
  event: 'Game Install Started'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameInstallSuccess {
  event: 'Game Install Success'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameInstallFailed {
  event: 'Game Install Failed'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    error: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameInstallCanceled {
  event: 'Game Install Canceled'
  properties: {
    store_name: Runner
    game_title: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameInstallPaused {
  event: 'Game Install Paused'
  properties: {
    store_name: Runner
    game_title: string
    game_name: string
  }
  sensitiveProperties?: never
}

export interface GameInstallResumed {
  event: 'Game Install Resumed'
  properties: {
    store_name: Runner
    game_title: string
    game_name: string
  }
  sensitiveProperties?: never
}

// TODO: remove (?)
export interface GameUpdateRequested {
  event: 'Game Update Requested'
  properties: {
    store_name: Runner
    game_name: string
    game_title: string
    platform: InstallPlatform | AppPlatforms
  }
  sensitiveProperties?: never
}

export interface GameUpdateStarted {
  event: 'Game Update Started'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameUpdateSuccess {
  event: 'Game Update Success'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameUpdateFailed {
  event: 'Game Update Failed'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    error: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface PatchingStarted {
  event: 'Patching Started'
  properties: {
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface PatchingSuccess {
  event: 'Patching Success'
  properties: {
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface PatchingFailed {
  event: 'Patching Failed'
  properties: {
    game_name: string
    error: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface PatchingTooSlow {
  event: 'Patching Too Slow'
  properties: {
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
    old_game_version: string
    new_game_version: string
    est_time_to_patch_sec: string
    est_time_to_install_sec: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallRequested {
  event: 'Game Uninstall Requested'
  properties: {
    store_name: Runner
    game_name: string
    game_title: string
  }
  sensitiveProperties?: never
}

export interface GameUninstallStarted {
  event: 'Game Uninstall Started'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameUninstallSuccess {
  event: 'Game Uninstall Success'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface GameUninstallFailed {
  event: 'Game Uninstall Failed'
  properties: {
    store_name: ReturnType<typeof getStoreName>
    game_name: string
    error: string
    game_title: string
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
  }
  sensitiveProperties?: never
}

export interface DownloadToastInteraction {
  event: 'DownloadToastInteraction'
  properties: {
    buttonClicked: string
  }
  sensitiveProperties?: never
}

export interface GameLaunch {
  event: 'Game Launched'
  properties: {
    isBrowserGame: boolean
    game_name: string
    store_name: ReturnType<typeof getStoreName>
    platform: ReturnType<typeof getPlatformName>
    platform_arch: InstallPlatform
    game_title: string
    browserUrl?: string
    processName?: string
  }
  sensitiveProperties?: never
}

export interface GameClosed {
  event: 'Game Closed'
  properties: {
    isBrowserGame: boolean
    game_name: string
    store_name: ReturnType<typeof getStoreName>
    game_title: string
    playTimeInMs: number
    platform_arch: InstallPlatform
    browserUrl?: string
    processName?: string
    platform: ReturnType<typeof getPlatformName>
  }
  sensitiveProperties?: never
}

export interface HyperPlayLaunched {
  event: 'HyperPlay Launched'
  properties?: never
  sensitiveProperties?: never
}

export interface HyperPlaySummonQuestFailed {
  event: 'HyperPlay Summon Quest Failed'
  properties?: never
  sensitiveProperties?: never
}

export interface HyperPlaySummonQuestSucceeded {
  event: 'HyperPlay Summon Quest Succeeded'
  properties?: never
  sensitiveProperties?: never
}

// fired when a quest card or quest log item is clicked and the quest details are shown
export interface QuestViewed {
  event: 'Quest Viewed'
  properties: {
    quest: {
      id: string
    }
  }
  sensitiveProperties?: never
}

// TODO: refactor and filter out NULL values in _trackEventPrivate so we can have null values in the type
// and so we can reuse the same type in src/common/types
interface Reward {
  id: number
  reward_type: 'ERC20' | 'ERC721' | 'ERC1155' | 'POINTS' | 'EXTERNAL-TASKS'
  name: string
  contract_address: `0x${string}`
  /* eslint-disable-next-line */
  token_ids: { amount_per_user: string; token_id: number }[]
  image_url: string
}

type RewardPropertiesType = Reward & { quest_id: string }

export interface RewardClaimStarted {
  event: 'Reward Claim Started'
  properties: RewardPropertiesType
  sensitiveProperties?: never
}

export interface RewardClaimSuccess {
  event: 'Reward Claim Success'
  properties: RewardPropertiesType
  sensitiveProperties?: never
}

export interface RewardClaimError {
  event: 'Reward Claim Error'
  properties: RewardPropertiesType
  sensitiveProperties?: never
}

export interface ClientUpdateNotified {
  event: 'Client Update Notified'
  properties: {
    currentVersion: string
    newVersion: string
  }
  sensitiveProperties?: never
}

export interface ClientUpdateError {
  event: 'Client Update Error'
  properties: {
    currentVersion: string
    newVersion: string
    error: string
  }
  sensitiveProperties?: never
}

export interface ClientUpdateDownloaded {
  event: 'Client Update Downloaded'
  properties: {
    currentVersion: string
    newVersion: string
  }
  sensitiveProperties?: never
}

export type PossibleMetricPayloads =
  | MetricsOptIn
  | MetricsOptOut
  | MetricsErrorCorrection
  | GameStoreConnectionStarted
  | OnboardingStarted
  | OnboardingProviderClicked
  | OnboardingSkipped
  | WalletConnected
  | MetaMaskInitialized
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
  | GameLaunch
  | GameClosed
  | GameInstallCanceled
  | GameInstallPaused
  | GameInstallResumed
  | HyperPlayLaunched
  | HyperPlaySummonQuestFailed
  | HyperPlaySummonQuestSucceeded
  | QuestViewed
  | RewardClaimStarted
  | RewardClaimSuccess
  | RewardClaimError
  | ClientUpdateNotified
  | ClientUpdateError
  | ClientUpdateDownloaded
  | PatchingStarted
  | PatchingSuccess
  | PatchingFailed
  | PatchingTooSlow

export type PossibleMetricEventNames = PossibleMetricPayloads['event']
