import Store from 'electron-store'
import { Get } from 'type-fest'

import {
  WineVersionInfo,
  InstalledInfo,
  UserInfo,
  RecentGame,
  HiddenGame,
  FavouriteGame,
  DMQueueElement,
  GOGLoginData,
  WineManagerUISettings,
  AppSettings,
  WikiInfo,
  GameInfo,
  MetricsOptInStatus
} from 'common/types'
import { PROVIDERS } from './proxy-types'
import { UserData } from 'common/types/gog'

export interface StoreStructure {
  configStore: {
    userHome: string
    userInfo: UserInfo
    games: {
      recent: RecentGame[]
      hidden: HiddenGame[]
      favourites: FavouriteGame[]
    }
    theme: string
    zoomPercent: number
    contentFontFamily: string
    actionsFontFamily: string
    allTilesInColor: boolean
    language: string
    'general-logs': {
      currentLogFile: string
      lastLogFile: string
      legendaryLogFile: string
      gogdlLogFile: string
    }
    'window-props': Electron.Rectangle
    settings: AppSettings
    skipVcRuntime: boolean
  }
  wineDownloaderInfoStore: {
    'wine-releases': WineVersionInfo[]
  }
  gogInstalledGamesStore: {
    installed: InstalledInfo[]
  }
  timestampStore: {
    [K: string]: {
      firstPlayed: string
      lastPlayed: string
      totalPlayed: number
    }
  }
  fontsStore: {
    fonts: string[]
  }
  gogConfigStore: {
    userData: UserData
    credentials: GOGLoginData
    isLoggedIn: boolean
  }
  sideloadedStore: {
    games: GameInfo[]
    // FIXME: Not sure if this is correct, seems like this key is only used once
    installed: InstalledInfo[]
  }
  downloadManager: {
    queue: DMQueueElement[]
    finished: DMQueueElement[]
  }
  gogSyncStore: {
    [appName: string]: {
      [saveName: string]: string
    }
  }
  wineManagerConfigStore: {
    'wine-manager-settings': WineManagerUISettings[]
    'wine-releases': WineVersionInfo[]
  }
  wikigameinfo: {
    [title: string]: WikiInfo
  }
  metricsStore: {
    metricsOptInStatus: MetricsOptInStatus
  }
  onboardingStore: {
    completedEarlyAccess: boolean
    completedDataPrivacy: boolean
    openAuthModalIfAppReloads: boolean
    openEmailModalIfAppReloads: boolean
  }
  hpLibraryStore: {
    [key: string]: GameInfo[]
  }
  providerMetadata: {
    currentWeb3Provider: PROVIDERS
  }
  extensionMetadata: {
    isInitialized: boolean
  }
  newsLetterStore: {
    subscribed: boolean
    skipped: boolean
  }
  npsStore: {
    lastClientVersionNpsSubmitted: string
  }
}

export type StoreOptions<T extends Record<string, unknown>> = Store.Options<T>
export type ValidStoreName = keyof StoreStructure

// This is `T`, *except* for when `T` is `unknown`; it then is `never`
// Credits for this goes to michael#7468 on the TS Community Discord server
export type UnknownGuard<T> = unknown extends T
  ? [T] extends [null]
    ? T
    : never
  : T

export abstract class TypeCheckedStore<
  Name extends ValidStoreName,
  Structure extends StoreStructure[Name]
> {
  abstract has(key: string): boolean

  abstract get<KeyType extends string>(
    key: KeyType,
    defaultValue: NonNullable<UnknownGuard<Get<Structure, KeyType>>>
  ): NonNullable<UnknownGuard<Get<Structure, KeyType>>>

  abstract get_nodefault<KeyType extends string>(
    key: KeyType
  ): UnknownGuard<Get<Structure, KeyType> | undefined>

  abstract set<KeyType extends string>(
    key: KeyType,
    value: UnknownGuard<Get<Structure, KeyType>>
  ): void

  // FIXME: This is currently not type-checked properly
  abstract delete<KeyType extends string>(key: KeyType): void

  abstract clear(): void
}
