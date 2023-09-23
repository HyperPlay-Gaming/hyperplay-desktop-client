import {
  AppSettings,
  GameInfo,
  GameStatus,
  Runner,
  ConnectivityStatus,
  DialogType,
  ButtonOptions,
  LibraryTopSectionOptions,
  DMQueueElement,
  MetricsOptInStatus,
  DownloadManagerState
} from 'common/types'

export type Category = 'all' | 'legendary' | 'gog' | 'sideload' | 'hyperplay'

export type Platform = 'win' | 'mac' | 'linux' | 'browser'

export interface ContextType {
  error: boolean
  gameUpdates: string[]
  isRTL: boolean
  language: string
  setLanguage: (newLanguage: string) => void
  handleLayout: (value: string) => void
  handleSearch: (input: string) => void
  layout: string
  libraryStatus: GameStatus[]
  libraryTopSection: string
  handleLibraryTopSection: (value: LibraryTopSectionOptions) => void
  platform: NodeJS.Platform | 'unknown'
  refresh: (library: Runner, checkUpdates?: boolean) => Promise<void>
  refreshLibrary: (options: RefreshOptions) => Promise<void>
  refreshWineVersionInfo: (fetch: boolean) => void
  refreshing: boolean
  refreshingInTheBackground: boolean
  theme: string
  setTheme: (themeName: string) => void
  zoomPercent: number
  setZoomPercent: (newZoomPercent: number) => void
  epic: {
    username?: string
    login: (sid: string) => Promise<string>
    logout: () => Promise<void>
  }
  gog: {
    username?: string
    login: (token: string) => Promise<string>
    logout: () => Promise<void>
  }
  allTilesInColor: boolean
  setAllTilesInColor: (value: boolean) => void
  setSideBarCollapsed: (value: boolean) => void
  sidebarCollapsed: boolean
  activeController: string
  connectivity: { status: ConnectivityStatus; retryIn: number }
  setSecondaryFontFamily: (newFontFamily: string, saveToFile?: boolean) => void
  setPrimaryFontFamily: (newFontFamily: string, saveToFile?: boolean) => void
  dialogModalOptions: DialogModalOptions
  showDialogModal: (options: DialogModalOptions) => void
  showResetDialog: () => void
  externalLinkDialogOptions: ExternalLinkDialogOptions
  handleExternalLinkDialog: (options: ExternalLinkDialogOptions) => void
  isSettingsModalOpen: {
    value: boolean
    gameInfo?: GameInfo | null
    type: 'settings' | 'log'
  }
  setIsSettingsModalOpen: (
    value: boolean,
    type?: 'settings' | 'log',
    gameInfo?: GameInfo
  ) => void
  showMetaMaskBrowserSidebarLinks: boolean
  setShowMetaMaskBrowserSidebarLinks: (value: boolean) => void
  metricsOptInStatus: MetricsOptInStatus
}

export type DialogModalOptions = {
  showDialog?: boolean
  title?: string
  message?: string
  buttons?: Array<ButtonOptions>
  type?: DialogType
}

export interface ExternalLinkDialogOptions {
  showDialog: boolean
  linkCallback?: () => void
}

export interface InstallProgress {
  bytes: string
  eta: string
  folder?: string
  percent: number
}

type RefreshOptions = {
  checkForUpdates?: boolean
  fullRefresh?: boolean
  library?: Runner | 'all'
  runInBackground?: boolean
}

export type SyncType = 'Download' | 'Upload' | 'Force download' | 'Force upload'

declare global {
  interface Window {
    imageData: (
      src: string,
      canvas_width: number,
      canvas_height: number
    ) => Promise<string>
    setTheme: (themeClass: string) => void
  }

  interface WindowEventMap {
    'controller-changed': CustomEvent<{ controllerId: string }>
  }
}

export interface SettingsContextType {
  getSetting: <T extends keyof AppSettings>(
    key: T,
    fallback: NonNullable<AppSettings[T]>
  ) => NonNullable<AppSettings[T]>
  setSetting: <T extends keyof AppSettings>(
    key: T,
    value: AppSettings[T]
  ) => void
  config: Partial<AppSettings>
  isDefault: boolean
  appName: string
  runner: Runner
  gameInfo: GameInfo | null
  isMacNative: boolean
  isLinuxNative: boolean
}

export interface LocationState {
  fromGameCard: boolean
  runner: Runner
  isLinuxNative: boolean
  isMacNative: boolean
  gameInfo: GameInfo
}

export type DMQueue = {
  elements: DMQueueElement[]
  finished: DMQueueElement[]
  state: DownloadManagerState
}
