import {
  HyperPlayInstallInfo,
  DownloadManagerState,
  Achievement,
  SummaryAchievement,
  LDEnv
} from './../types'
import { ProxiedProviderEventCallback } from './../../backend/hyperplay-proxy-server/providers/types'
import { MetaMaskImportOptions } from './../../backend/hyperplay-extension-helper/ipcHandlers/index'
import { EventEmitter } from 'node:events'
import { IpcMainEvent, OpenDialogOptions } from 'electron'

import {
  Runner,
  DiskSpaceData,
  Tools,
  WineCommandArgs,
  GameInfo,
  GameSettings,
  InstallPlatform,
  UserInfo,
  WineInstallation,
  AppSettings,
  ToolArgs,
  LaunchParams,
  InstallParams,
  MoveGameArgs,
  ImportGameArgs,
  StatusPromise,
  SaveSyncArgs,
  RunWineCommandArgs,
  SideloadGame,
  WineVersionInfo,
  AntiCheatInfo,
  RuntimeName,
  DMQueueElement,
  ConnectivityStatus,
  GamepadActionArgs,
  ExtraInfo
} from 'common/types'
import { LegendaryInstallInfo, SelectiveDownload } from 'common/types/legendary'
import { GOGCloudSavesLocation, GogInstallInfo } from 'common/types/gog'
import { PROVIDERS } from 'common/types/proxy-types'
import {
  NileInstallInfo,
  NileLoginData,
  NileRegisterData,
  NileUserData
} from 'common/types/nile'
import { ToastKey } from 'frontend/store/types'
import { AuthSession } from '../types/auth'

/**
 * Some notes here:
 *  - One could've used arrays as keys for the `SyncIPCFunctions` interface
 *    (holding just the parameters to the callbacks, if any), since the callbacks
 *    there will never return anything other than void.
 *    I've decided against that to keep it in line with the `AsyncIPCFunctions`
 *    interface
 */
interface HyperPlaySyncIPCFunctions {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  extensionOnEvent: (topic: string, ...args: any[]) => void
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  returnExtensionRequest: (requestId: number, args: any) => void
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  errorExtensionRequest: (requestId: number, error: any) => void
  chromeSetBadgeText: (text: string) => void
  providerRequestInitiated: ProxiedProviderEventInitiatedCallback
  providerRequestPending: ProxiedProviderEventCallback
  providerRequestCompleted: ProxiedProviderEventCallback
  providerRequestFailed: ProxiedProviderEventCallback
  loadingScreenReady: () => void
  reloadApp: () => void
  createNewMetaMaskWallet: (mmInitMethod: MetaMaskInitMethod) => void
  enableOnEvents: (topic: string) => void
  addHyperPlayShortcut: (gameId: string) => void
  ignoreExitToTray: () => void
  setQaToken: (qaToken: string) => void
  removeFromLibrary: (appName: string) => void
  openAuthModalIfAppReloads: () => void
  overlayReady: () => void
  updateOverlayWindow: (state: OverlayWindowState) => void
  toggleIsPopupOpen: () => void
  showPopup: () => void
  toastCloseOnClick: (key: ToastKey) => void
  lockPopup: (lock: boolean) => void
  killOverlay: () => void
}

interface SyncIPCFunctions extends HyperPlaySyncIPCFunctions {
  setZoomFactor: (zoomFactor: string) => void
  changeLanguage: (language: string) => void
  notify: (args: { title: string; body: string }) => void
  frontendReady: () => void
  lock: () => void
  unlock: () => void
  quit: () => void
  openExternalUrl: (url: string) => void
  openFolder: (folder: string) => void
  openSupportPage: () => void
  openReleases: () => void
  openWeblate: () => void
  showAboutWindow: () => void
  openLoginPage: () => void
  openDiscordLink: () => void
  openTwitterLink: () => void
  openPatreonPage: () => void
  openKofiPage: () => void
  openWinePrefixFAQ: () => void
  openWebviewPage: (url: string) => void
  openWikiLink: () => void
  openSidInfoPage: () => void
  openCustomThemesWiki: () => void
  openHyperplaySite: () => void
  showConfigFileInFolder: (appName: string) => void
  clearCache: (showDialog?: boolean) => void
  resetApp: () => void
  resetExtension: () => void
  createNewWindow: (url: string) => void
  logoutGOG: () => void
  toggleVKD3D: (args: ToolArgs) => void
  logError: (message: unknown) => void
  logInfo: (message: unknown) => void
  showItemInFolder: (item: string) => void
  clipboardWriteText: (text: string) => void
  addNewApp: (args: SideloadGame) => void
  showLogFileInFolder: (args: {
    appName: string
    defaultLast?: boolean
  }) => void
  addShortcut: (appName: string, runner: Runner, fromMenu: boolean) => void
  removeShortcut: (appName: string, runner: Runner) => void
  removeFromDMQueue: (appName: string) => void
  clearDMFinished: () => void
  abort: (id: string) => void
  'connectivity-changed': (newStatus: ConnectivityStatus) => void
  'set-connectivity-online': () => void
  changeTrayColor: () => void
  setSetting: (args: { appName: string; key: string; value: unknown }) => void
  optInStatusChanged: (optInStatus: MetricsOptInStatus) => void
  openGameInEpicStore: (url: string) => void
  resumeCurrentDownload: () => void
  cancelDownload: (removeDownloaded: boolean) => void
  cancelExtraction: (appName: string) => void
  copyWalletConnectBaseURIToClipboard: () => void
  closeAuthModal: () => void
  'auth:accountConnected': () => void
  'auth:accountNotConnected': () => void
  'auth:otpFinished': () => void
  focusMainWindow: () => void
}

interface RequestArguments {
  readonly method: string
  readonly params?: readonly unknown[] | object
}

interface RequestArguments {
  readonly method: string
  readonly params?: readonly unknown[] | object
}

interface HyperPlayAsyncIPCFunctions {
  //chrome.windows
  chromeWindowsCreate: (
    options: chrome.windows.CreateData
  ) => Promise<chrome.windows.Window>
  chromeWindowsGetCurrent: (
    queryOptions?: chrome.windows.QueryOptions,
    callback?: (window: chrome.windows.Window) => void
  ) => Promise<string>
  chromeWindowsRemove: (windowId: number) => Promise<void>
  chromeWindowsGetAll: (
    queryOptions?: string,
    callback?: (window: chrome.windows.Window[]) => void
  ) => Promise<string>
  chromeWindowsUpdate: (
    windowId: number,
    updateInfo: chrome.windows.UpdateInfo,
    callback?: (window: chrome.windows.Window) => void
  ) => Promise<chrome.windows.Window>
  chromeWindowsGet: (windowId: number) => Promise<chrome.windows.Window>
  //chrome.tabs
  chromeTabsCreate: (
    options: chrome.tabs.CreateProperties
  ) => Promise<chrome.tabs.Tab>
  chromeTabsGet: (tabId: number) => Promise<chrome.tabs.Tab | null>
  chromeTabsQuery: (
    queryInfo: chrome.tabs.QueryInfo
  ) => Promise<chrome.tabs.Tab[]>
  chromeTabsUpdate: (
    tabId: number,
    updateProperties: chrome.tabs.UpdateProperties
  ) => Promise<chrome.tabs.Tab>
  chromeTabsRemove: (tabIds: number | number[]) => Promise<void>
  importMetaMask: (
    mmInitMethod: MetaMaskInitMethod,
    dbPath?: string | null,
    browser?: ImportableBrowser
  ) => Promise<boolean>
  getMetaMaskImportOptions: () => Promise<MetaMaskImportOptions>
  isExtensionInitialized: () => Promise<boolean>
  getTabUrl: () => Promise<string>
  getExtensionId: () => Promise<string>
  getConnectionUris: (
    providerSelection: PROVIDERS,
    isBootstrapping?: boolean
  ) => Promise<string>
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  providerRequest: (args: RequestArguments) => Promise<any>
  getConnectedProvider: () => Promise<PROVIDERS>
  trackEvent: (payload: PossibleMetricPayloads) => Promise<void>
  trackScreen: (name: string, properties?: apiObject) => Promise<void>
  changeMetricsOptInStatus: (
    newStatus: MetricsOptInStatus.optedIn | MetricsOptInStatus.optedOut
  ) => Promise<void>
  addHyperplayGame: (gameId: string, addHyperplayGame: string) => Promise<void>
  sendRequest: (args: unknown[]) => Promise<unknown>
  sendAsyncRequest: (
    payload: JsonRpcRequest,
    callback: JsonRpcCallback
  ) => Promise<unknown>
  isGameHidden: (gameId: string) => Promise<boolean>
  unhideGame: (gameId: string) => Promise<void>
  getCurrentWeb3Provider: () => Promise<PROVIDERS | undefined>
  showPopup: (hideIfShown: boolean) => Promise<boolean>
  removeTempDownloadFiles: (appName: string) => Promise<void>
  getImportFolderPath: () => Promise<string>
  appIsInLibrary: (appName: string, runner: Runner) => Promise<boolean>
  getSummaryAchievements: (options: GetAchievementsOptions) => Promise<{
    data: SummaryAchievement[]
    totalPages: number
  }>
  getIndividualAchievements: (
    options: GetIndividualAchievementsOptions
  ) => Promise<{
    data: Achievement[]
    currentPage: number
    totalPages: number
  }>
  getAchievementsStats: (options: PlayerOptions) => Promise<AchievementsStats>
  syncAchievements: (options: PlayerOptions) => Promise<void>
  checkHyperPlayAccessCode: (
    channelId: number,
    accessCode: string
  ) => Promise<LicenseConfigValidateResult>
  shouldShowAchievements: () => Promise<boolean>
  get_wallet_state_address: () => Promise<string>
  get_wallet_state_isConnected: () => Promise<boolean>
  get_wallet_state_provider: () => Promise<PROVIDERS>
  get_wallet_state_otp: () => Promise<string>
  get_extension_state_isPopupOpen: () => Promise<boolean>
  getLDEnvConfig: () => Promise<LDEnv>
  getAuthSession: () => Promise<AuthSession | null>
  logOut: () => Promise<void>
  updateAutoLaunch: () => Promise<void>
}

interface AsyncIPCFunctions extends HyperPlayAsyncIPCFunctions {
  addToDMQueue: (element: DMQueueElement) => Promise<void>
  kill: (appName: string, runner: Runner) => Promise<void>
  checkDiskSpace: (folder: string) => Promise<DiskSpaceData>
  callTool: (args: Tools) => Promise<void>
  runWineCommand: (
    args: WineCommandArgs
  ) => Promise<{ stdout: string; stderr: string }>
  checkGameUpdates: () => Promise<string[]>
  getEpicGamesStatus: () => Promise<boolean>
  updateAll: () => Promise<({ status: 'done' | 'error' | 'abort' } | null)[]>
  getMaxCpus: () => number
  getAppVersion: () => string
  getLegendaryVersion: () => Promise<string>
  getGogdlVersion: () => Promise<string>
  getNileVersion: () => Promise<string>
  isFullscreen: () => boolean
  isFlatpak: () => boolean
  getPlatform: () => NodeJS.Platform
  showUpdateSetting: () => boolean
  getGameInfo: (appName: string, runner: Runner) => Promise<GameInfo | null>
  getExtraInfo: (appName: string, runner: Runner) => Promise<ExtraInfo | null>
  getGameSettings: (
    appName: string,
    runner: Runner
  ) => Promise<GameSettings | null>
  getGOGLinuxInstallersLangs: (appName: string) => Promise<string[]>
  getInstallInfo: (
    appName: string,
    runner: Runner,
    installPlatform: InstallPlatform,
    channelNameToInstall?: string
  ) => Promise<
    | LegendaryInstallInfo
    | GogInstallInfo
    | HyperPlayInstallInfo
    | NileInstallInfo
    | null
  >
  getUserInfo: () => Promise<UserInfo | undefined>
  getAmazonUserInfo: () => Promise<NileUserData | undefined>
  isLoggedIn: () => boolean
  login: (sid: string) => Promise<{
    status: 'done' | 'failed'
    data: UserInfo | undefined
  }>
  authGOG: (code: string) => Promise<{
    status: 'done' | 'error'
    data?: UserData
  }>
  authAmazon: (data: NileRegisterData) => Promise<{
    status: 'done' | 'failed'
    user: NileUserData | undefined
  }>
  logoutLegendary: () => Promise<void>
  logoutAmazon: () => Promise<void>
  getAlternativeWine: () => Promise<WineInstallation[]>
  getLocalPeloadPath: () => Promise<string>
  readConfig: (config_class: 'library' | 'user') => Promise<GameInfo[] | string>
  requestSettings: (appName: string) => Promise<AppSettings | GameSettings>
  writeConfig: (args: { appName: string; config: Partial<AppSettings> }) => void
  refreshLibrary: (library?: Runner | 'all') => Promise<void>
  launch: (args: LaunchParams) => StatusPromise
  openDialog: (args: OpenDialogOptions) => Promise<string | false>
  install: (
    args: InstallParams
  ) => Promise<{ status: 'error' | 'done' | 'abort' }>
  uninstall: (
    appName: string,
    runner: Runner,
    shouldRemovePrefix: boolean,
    shoudlRemoveSetting: boolean
  ) => Promise<void>
  repair: (appName: string, runner: Runner) => Promise<void>
  moveInstall: (args: MoveGameArgs) => Promise<void>
  importGame: (args: ImportGameArgs) => StatusPromise
  updateGame: (appName: string, runner: Runner) => StatusPromise
  changeInstallPath: (args: MoveGameArgs) => Promise<void>
  egsSync: (arg: string) => Promise<string>
  syncGOGSaves: (
    gogSaves: GOGCloudSavesLocation[],
    appname: string,
    arg: string
  ) => Promise<string>
  syncSaves: (args: SaveSyncArgs) => Promise<string>
  gamepadAction: (args: GamepadActionArgs) => Promise<void>
  getFonts: (reload: boolean) => Promise<string[]>
  runWineCommandForGame: (args: RunWineCommandArgs) => Promise<ExecResult>
  getShellPath: (path: string) => Promise<string>
  clipboardReadText: () => string
  getCustomThemes: () => Promise<string[]>
  getThemeCSS: (theme: string) => Promise<string>
  removeApp: (args: {
    appName: string
    shouldRemovePrefix: boolean
    runner: Runner
  }) => Promise<void>
  launchApp: (
    appName: string,
    runner: 'sideload' | 'hyperplay'
  ) => Promise<boolean>
  isNative: (args: { appName: string; runner: Runner }) => boolean
  getLogContent: (args: { appName: string; defaultLast?: boolean }) => string
  installWineVersion: (
    release: WineVersionInfo
  ) => Promise<'error' | 'abort' | 'success'>
  refreshWineVersionInfo: (fetch?: boolean) => Promise<void>
  removeWineVersion: (release: WineVersionInfo) => Promise<boolean>
  shortcutsExists: (appName: string, runner: Runner) => boolean
  addToSteam: (appName: string, runner: Runner) => Promise<boolean>
  removeFromSteam: (appName: string, runner: Runner) => Promise<void>
  isAddedToSteam: (appName: string, runner: Runner) => Promise<boolean>
  getAnticheatInfo: (appNamespace: string) => AntiCheatInfo | undefined
  getEosOverlayStatus: () => {
    isInstalled: boolean
    version?: string
    install_path?: string
  }
  getLatestEosOverlayVersion: () => Promise<string>
  updateEosOverlayInfo: () => Promise<void>
  installEosOverlay: () => Promise<string | undefined>
  removeEosOverlay: () => Promise<boolean>
  enableEosOverlay: (
    appName: string
  ) => Promise<{ wasEnabled: boolean; installNow?: boolean }>
  disableEosOverlay: (appName: string) => Promise<void>
  isEosOverlayEnabled: (appName?: string) => Promise<boolean>
  downloadRuntime: (runtime_name: RuntimeName) => Promise<boolean>
  isRuntimeInstalled: (runtime_name: RuntimeName) => boolean
  getDMQueueInformation: () => {
    elements: DMQueueElement[]
    finished: DMQueueElement[]
    state: DownloadManagerState
  }
  'get-connectivity-status': () => {
    status: ConnectivityStatus
    retryIn: number
  }
  getNumOfGpus: () => Promise<number>
  removeRecent: (appName: string) => Promise<void>
  getWikiGameInfo: (
    title: string,
    id?: string,
    runner?: Runner
  ) => Promise<WikiInfo | null>
  getDefaultSavePath: (
    appName: string,
    runner: Runner,
    alreadyDefinedGogSaves: GOGCloudSavesLocation[]
  ) => Promise<string | GOGCloudSavesLocation[]>
  isGameAvailable: (args: {
    appName: string
    runner: Runner
  }) => Promise<boolean>
  toggleDXVK: (args: ToolArgs) => Promise<boolean>
  toggleDXVKNVAPI: (args: ToolArgs) => Promise<boolean>
  pathExists: (path: string) => Promise<boolean>
  getExtensionId: () => Promise<string>
  addGameToLibrary: (appName: string) => Promise<void>
  getGOGLaunchOptions: (appName: string) => Promise<LaunchOption[]>
  getGameOverride: () => Promise<GameOverride | null>
  getGameSdl: (appName: string) => Promise<SelectiveDownload[]>
  getPlaytimeFromRunner: (
    runner: Runner,
    appName: string
  ) => Promise<number | undefined>
  getAmazonLoginData: () => Promise<NileLoginData>
  pauseCurrentDownload: () => Promise<void>
}

// This is quite ugly & throws a lot of errors in a regular .ts file
// TODO: Find a TS magician who can improve this further
declare namespace Electron {
  class IpcMain extends EventEmitter {
    public on: <
      Name extends keyof SyncIPCFunctions,
      Definition extends SyncIPCFunctions[Name]
    >(
      name: Name,
      callback: (e: IpcMainEvent, ...args: Parameters<Definition>) => void
    ) => void

    public handle: <
      Name extends keyof AsyncIPCFunctions,
      Definition extends AsyncIPCFunctions[Name]
    >(
      name: Name,
      callback: (
        e: IpcMainEvent,
        ...args: Parameters<Definition>
      ) => ReturnType<Definition>
    ) => void
  }

  class IpcRenderer extends EventEmitter {
    public send: <
      Name extends keyof SyncIPCFunctions,
      Definition extends SyncIPCFunctions[Name]
    >(
      name: Name,
      ...args: Parameters<Definition>
    ) => void

    public sendToHost: <
      Name extends keyof SyncIPCFunctions,
      Definition extends SyncIPCFunctions[Name]
    >(
      name: Name,
      ...args: Parameters<Definition>
    ) => void

    public invoke: <
      Name extends keyof AsyncIPCFunctions,
      Definition extends AsyncIPCFunctions[Name],
      Ret extends ReturnType<Definition>
    >(
      name: Name,
      ...args: Parameters<Definition>
    ) => Ret extends Promise<unknown> ? Ret : Promise<Ret>
  }

  namespace CrossProcessExports {
    const ipcMain: IpcMain
    type IpcMain = Electron.IpcMain
    const ipcRenderer: IpcRenderer
    type IpcRenderer = Electron.IpcRenderer
  }
}

declare module 'electron' {
  export = Electron.CrossProcessExports
}
