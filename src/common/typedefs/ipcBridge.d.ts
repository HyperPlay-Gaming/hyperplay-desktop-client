import { EventEmitter } from 'node:events'
import { IpcMainEvent, OpenDialogOptions } from 'electron'
import { HowLongToBeatEntry } from 'howlongtobeat'

import {
  Runner,
  DiskSpaceData,
  Tools,
  WineCommandArgs,
  Release,
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
  GamepadActionArgs
} from 'common/types'
import { LegendaryInstallInfo } from 'common/types/legendary'
import { GOGCloudSavesLocation, GogInstallInfo } from 'common/types/gog'
import { PROVIDERS } from 'common/types/proxy-types'

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
}

interface SyncIPCFunctions extends HyperPlaySyncIPCFunctions {
  setZoomFactor: (zoomFactor: string) => void
  changeLanguage: (language: string) => void
  notify: (args: { title: string; body: string }) => void
  frontendReady: () => void
  loadingScreenReady: () => void
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
  openPatreonPage: () => void
  openKofiPage: () => void
  openWinePrefixFAQ: () => void
  openWebviewPage: (url: string) => void
  openWikiLink: () => void
  openSidInfoPage: () => void
  openCustomThemesWiki: () => void
  openHyperplaySite: () => void
  showConfigFileInFolder: (appName: string) => void
  removeFolder: ([path, folderName]: [string, string]) => void
  clearCache: (showDialog?: boolean) => void
  resetApp: () => void
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
  addToDMQueue: (element: DMQueueElement) => void
  removeFromDMQueue: (appName: string) => void
  clearDMFinished: () => void
  abort: (id: string) => void
  'connectivity-changed': (newStatus: ConnectivityStatus) => void
  'set-connectivity-online': () => void
  changeTrayColor: () => void
}

interface HyperPlayAsyncIPCFunctions {
  showPopup: (hideIfShown?: boolean) => Promise<void>
  chromeWindowsCreate: (
    options: chrome.windows.CreateData
  ) => Promise<chrome.windows.Window>
  chromeWindowsGetCurrent: () => Promise<chrome.windows.Window>
  chromeWindowsRemove: (windowId: number) => Promise<void>
  chromeWindowsGetAll: () => Promise<chrome.windows.Window[]>
  chromeTabsCreate: (
    options: chrome.tabs.CreateProperties
  ) => Promise<chrome.tabs.Tab>
  getTabUrl: () => Promise<string>
}

interface AsyncIPCFunctions extends HyperPlayAsyncIPCFunctions {
  kill: (appName: string, runner: Runner) => Promise<void>
  checkDiskSpace: (folder: string) => Promise<DiskSpaceData>
  callTool: (args: Tools) => Promise<void>
  runWineCommand: (
    args: WineCommandArgs
  ) => Promise<{ stdout: string; stderr: string }>
  checkGameUpdates: () => Promise<string[]>
  getEpicGamesStatus: () => Promise<boolean>
  updateAll: () => Promise<({ status: 'done' | 'error' } | null)[]>
  getMaxCpus: () => number
  getAppVersion: () => string
  getLegendaryVersion: () => Promise<string>
  getGogdlVersion: () => Promise<string>
  isFullscreen: () => boolean
  isFlatpak: () => boolean
  getPlatform: () => NodeJS.Platform
  showUpdateSetting: () => boolean
  getLatestReleases: () => Promise<Release[]>
  getGameInfo: (appName: string, runner: Runner) => Promise<GameInfo | null>
  getGameSettings: (
    appName: string,
    runner: Runner
  ) => Promise<GameSettings | null>
  getGOGLinuxInstallersLangs: (appName: string) => Promise<string[]>
  getInstallInfo: (
    appName: string,
    runner: Runner,
    installPlatform: InstallPlatform
  ) => Promise<LegendaryInstallInfo | GogInstallInfo | null>
  getUserInfo: () => Promise<UserInfo | undefined>
  isLoggedIn: () => boolean
  login: (sid: string) => Promise<{
    status: 'done' | 'failed'
    data: UserInfo | undefined
  }>
  authGOG: (code: string) => Promise<{
    status: 'done' | 'error'
    data?: { displayName: string; username: string }
  }>
  logoutLegendary: () => Promise<void>
  getAlternativeWine: () => Promise<WineInstallation[]>
  readConfig: (config_class: 'library' | 'user') => Promise<GameInfo[] | string>
  requestSettings: (appName: string) => Promise<AppSettings | GameSettings>
  writeConfig: (args: { appName: string; config: Partial<AppSettings> }) => void
  refreshLibrary: (
    fullRefresh?: boolean,
    library?: Runner | 'all'
  ) => Promise<void>
  launch: (args: LaunchParams) => StatusPromise
  openDialog: (args: OpenDialogOptions) => Promise<string | false>
  install: (
    args: InstallParams
  ) => Promise<{ status: 'error' | 'done' | 'abort' }>
  uninstall: (
    appName: string,
    runner: Runner,
    shouldRemovePrefix: boolean
  ) => Promise<void>
  repair: (appName: string, runner: Runner) => Promise<void>
  moveInstall: (args: MoveGameArgs) => StatusPromise
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
  }) => Promise<void>
  launchApp: (appName: string) => Promise<boolean>
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
  getAnticheatInfo: (appNamespace: string) => AntiCheatInfo | null
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
  }
  'get-connectivity-status': () => {
    status: ConnectivityStatus
    retryIn: number
  }
  getNumOfGpus: () => Promise<number>
  removeRecent: (appName: string) => Promise<void>
  getHowLongToBeat: (title: string) => Promise<HowLongToBeatEntry | null>
  getDefaultSavePath: (
    appName: string,
    runner: Runner,
    alreadyDefinedGogSaves: GOGCloudSavesLocation[]
  ) => Promise<string | GOGCloudSavesLocation[]>
  'get-connection-uris': (provider: PROVIDERS) => Promise<ConnectionURIs>
  isGameAvailable: (args: {
    appName: string
    runner: Runner
  }) => Promise<boolean>
  toggleDXVK: (args: ToolArgs) => Promise<boolean>
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
