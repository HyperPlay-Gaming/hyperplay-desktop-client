import { GOGCloudSavesLocation, GogInstallPlatform } from './types/gog'
import { LegendaryInstallPlatform, GameMetadataInner } from './types/legendary'
import { IpcRendererEvent } from 'electron'
import { ChildProcess } from 'child_process'
import 'i18next'
import {
  WineSupport,
  SystemRequirements,
  SupportedPlatform as AppPlatforms,
  PlatformsMetaInterface
} from '@valist/sdk/dist/typesShared'
import { Channel } from '@valist/sdk/dist/typesApi'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { NileInstallPlatform } from './types/nile'
import { DropdownItemType } from '@hyperplay/ui'

export type {
  Listing as HyperPlayRelease,
  ProjectMetaApi as HyperPlayProjectMeta,
  ChannelReleaseMeta
} from '@valist/sdk/dist/typesApi'
export type {
  AccountMetaInterface as HyperPlayAccountMeta,
  PlatformsMetaInterface as ValistPlatforms,
  SupportedPlatform as AppPlatforms,
  PlatformConfig
} from '@valist/sdk/dist/typesShared'

export interface LicenseConfigValidateResult {
  valid: boolean
  platforms: PlatformsMetaInterface
}

// fix for i18next https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

export type WrapRendererCallback<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFunction extends (...args: any) => any
> = (
  e: Electron.IpcRendererEvent,
  ...args: [...Parameters<TFunction>]
) => ReturnType<TFunction>

export type Runner = 'legendary' | 'gog' | 'sideload' | 'hyperplay' | 'nile'

// NOTE: Do not put enum's in this module or it will break imports

export type DialogType = 'MESSAGE' | 'ERROR'

export interface ButtonOptions {
  text: string
  onClick?: () => void
}

export type LaunchParams = {
  appName: string
  launchArguments: string
  runner: Runner
}

interface About {
  description: string
  shortDescription: string
}

export type ExperimentalFeatures = {
  enableNewShinyFeature: boolean // remove this when adding a real experimental feature
}

export type LDUser = {
  kind: string
  key: string
}

export type LDEnv = {
  envId: string
  ldUser: LDUser
}

export interface AppSettings extends GameSettings {
  addDesktopShortcuts: boolean
  addStartMenuShortcuts: boolean
  addSteamShortcuts: boolean
  altGogdlBin: string
  altLegendaryBin: string
  autoUpdateGames: boolean
  checkForUpdatesOnStartup: boolean
  autoLaunchHyperPlay: boolean
  checkUpdatesInterval: number
  customThemesPath: string
  customWinePaths: string[]
  darkTrayIcon: boolean
  defaultInstallPath: string
  defaultSteamPath: string
  defaultWinePrefix: string
  disableController: boolean
  disableLogs: boolean
  discordRPC: boolean
  downloadNoHttps: boolean
  egsLinkedPath: string
  enableUpdates: boolean
  exitToTray: boolean
  experimentalFeatures: ExperimentalFeatures
  hideChangelogsOnStartup: boolean
  libraryTopSection: LibraryTopSectionOptions
  maxRecentGames: number
  maxWorkers: number
  minimizeOnGameLaunch: boolean
  startInTray: boolean
  userInfo: UserInfo
  steamId: string
  ldUser: LDUser
}

export type LibraryTopSectionOptions =
  | 'disabled'
  | 'recently_played'
  | 'recently_played_installed'
  | 'favourites'

export type ExecResult = {
  stderr: string
  stdout: string
  fullCommand?: string
  error?: string
  abort?: boolean
}

export interface ExtraInfo {
  about?: About
  reqs: Reqs[]
  storeUrl?: string
}

export type GameConfigVersion = 'auto' | 'v0' | 'v0.1'

export interface GameInfo {
  runner: 'legendary' | 'gog' | 'hyperplay' | 'sideload' | 'nile'
  store_url?: string
  app_name: string
  art_cover: string
  art_logo?: string
  art_square: string
  cloud_save_enabled?: boolean
  developer?: string
  extra?: ExtraInfo
  folder_name?: string
  install: Partial<InstalledInfo>
  installable?: boolean
  is_installed: boolean
  namespace?: string
  // NOTE: This is the save folder without any variables filled in...
  save_folder?: string
  // ...and this is the folder with them filled in
  save_path?: string
  gog_save_location?: GOGCloudSavesLocation[]
  title: string
  canRunOffline: boolean
  thirdPartyManagedApp?: string | undefined
  is_mac_native?: boolean
  is_linux_native?: boolean
  is_windows_native?: boolean
  browserUrl?: string
  web3?: Web3Features
  description?: string
  wineSupport?: WineSupport
  systemRequirements?: SystemRequirements
  //used for store release versions. if remote !== local, then update
  version?: string
  // key is channel name
  channels?: { [key: string]: Channel }
  project_name?: string
  //data schema version
  v?: string
  account_name?: string
  dlcList?: GameMetadataInner[]
  //key is channel_id, value is last access code used
  accessCodesCache?: Record<string, string>
}

export interface GameSettings {
  autoInstallDxvk: boolean
  autoInstallVkd3d: boolean
  autoInstallDxvkNvapi: boolean
  autoSyncSaves: boolean
  battlEyeRuntime: boolean
  DXVKFpsCap: string //Entered as string but used as number
  eacRuntime: boolean
  enableDXVKFpsLimit: boolean
  enableEsync: boolean
  enableFSR: boolean
  enableFsync: boolean
  enableMsync: boolean
  enviromentOptions: EnviromentVariable[]
  ignoreGameUpdates: boolean
  language: string
  launcherArgs: string
  maxSharpness?: number
  nvidiaPrime: boolean
  offlineMode: boolean
  otherOptions?: string //deprecated
  preferSystemLibs: boolean
  showFps: boolean
  showMangohud: boolean
  targetExe: string
  useGameMode: boolean
  useSteamRuntime: boolean
  wineCrossoverBottle: string
  winePrefix: string
  wineVersion: WineInstallation
  wrapperOptions: WrapperVariable[]
  savesPath: string
  gogSaves?: GOGCloudSavesLocation[]
}

export type Status =
  | 'installing'
  | 'updating'
  | 'launching'
  | 'playing'
  | 'uninstalling'
  | 'repairing'
  | 'done'
  | 'canceled'
  | 'moving'
  | 'queued'
  | 'error'
  | 'syncing-saves'
  | 'notAvailable'
  | 'notSupportedGame'
  | 'notInstalled'
  | 'installed'
  | 'extracting'
  | 'paused'
  | 'preparing'
  | 'distributables'

export interface GameStatus {
  appName: string
  progress?: InstallProgress
  folder?: string
  runner?: Runner
  status: Status
}

export type GlobalConfigVersion = 'auto' | 'v0'

export interface InstallProgress {
  bytes: string
  eta?: string
  folder?: string
  percent?: number
  downSpeed?: number
  diskSpeed?: number
  file?: string
}

export interface InstalledInfo {
  executable: string
  install_path: string
  install_size: string
  is_dlc: boolean
  version: string
  platform: InstallPlatform
  appName?: string
  installedWithDLCs?: boolean // For verifing GOG games
  language?: string // For verifing GOG games
  versionEtag?: string // Checksum for checking GOG updates
  buildId?: string // For verifing GOG games
  channelName?: string // HP store game channel. Channel to check updates for
}

export interface Reqs {
  minimum: string
  recommended: string
  title: string
}

export type SyncType = 'Download' | 'Upload' | 'Force download' | 'Force upload'

export type UserInfo = {
  account_id: string
  displayName: string
  user: string
}

export interface WineInstallation {
  bin: string
  name: string
  type: 'wine' | 'proton' | 'crossover' | 'toolkit'
  lib?: string
  lib32?: string
  wineserver?: string
}

export interface InstallArgs {
  path: string
  platformToInstall: InstallPlatform
  installDlcs?: Array<string> | boolean
  sdlList?: string[]
  installLanguage?: string
  channelName?: string
  accessCode?: string
  updateOnly?: boolean
}

export interface InstallParams extends InstallArgs {
  appName: string
  gameInfo: GameInfo
  runner: Runner
  size?: string
}

export interface UpdateParams {
  appName: string
  gameInfo: GameInfo
  runner: Runner
}

export interface GOGLoginData {
  expires_in: number
  access_token: string
  refresh_token: string
  user_id: string
  loginTime: number
  error?: boolean
}

export interface GOGImportData {
  // "appName": "1441974651", "buildId": "55136646198962890", "title": "Prison Architect", "tasks": [{"category": "launcher", "isPrimary": true, "languages": ["en-US"], "name": "Prison Architect", "osBitness": ["64"], "path": "Launcher/dowser.exe", "type": "FileTask"}, {"category": "game", "isHidden": true, "languages": ["en-US"], "name": "Prison Architect - launcher process Prison Architect64_exe", "osBitness": ["64"], "path": "Prison Architect64.exe", "type": "FileTask"}, {"category": "document", "languages": ["en-US"], "link": "http://www.gog.com/support/prison_architect", "name": "Support", "type": "URLTask"}, {"category": "other", "languages": ["en-US"], "link": "http://www.gog.com/forum/prison_architect/prison_break_escape_map_megathread/post1", "name": "Escape Map Megathread", "type": "URLTask"}], "installedLanguage": "en-US"}
  appName: string
  buildId: string
  title: string
  tasks: Array<{
    category: string
    isPrimary?: boolean
    languages?: Array<string>
    arguments?: Array<string> | string
    path: string
    name: string
    type: string
  }>
  installedLanguage: string
  platform: GogInstallPlatform
  versionName: string
  installedWithDlcs: boolean
}

export type GamepadInputEvent =
  | GamepadInputEventKey
  | GamepadInputEventWheel
  | GamepadInputEventMouse

interface GamepadInputEventKey {
  type: 'keyDown' | 'keyUp' | 'char'
  keyCode: string
}

interface GamepadInputEventWheel {
  type: 'mouseWheel'
  deltaY: number
  x: number
  y: number
}

interface GamepadInputEventMouse {
  type: 'mouseDown' | 'mouseUp'
  x: number
  y: number
  button: 'left' | 'middle' | 'right'
}

export interface SteamRuntime {
  path: string
  type: 'sniper' | 'scout' | 'soldier'
  args: string[]
}

export interface LaunchPreperationResult {
  success: boolean
  failureReason?: string
  rpcClient?: RpcClient
  mangoHudCommand?: string[]
  gameModeBin?: string
  steamRuntime?: string[]
  offlineMode?: boolean
}

export interface RpcClient {
  updatePresence(d: unknown): void
  reply(user: unknown, response: unknown): void
  disconnect(): void
}

export interface CallRunnerOptions {
  logMessagePrefix?: string
  logFile?: string
  verboseLogFile?: string
  logSanitizer?: (line: string) => string
  env?: Record<string, string> | NodeJS.ProcessEnv
  wrappers?: string[]
  onOutput?: (output: string, child: ChildProcess) => void
}

export interface EnviromentVariable {
  key: string
  value: string
}

export interface WrapperVariable {
  exe: string
  args: string
}

type AntiCheat =
  | 'Arbiter'
  | 'BattlEye'
  | 'Denuvo Anti-Cheat'
  | 'Easy Anti-Cheat'
  | 'EQU8'
  | 'FACEIT'
  | 'FairFight'
  | 'Mail.ru Anti-Cheat'
  | 'miHoYo Protect'
  | 'miHoYo Protect 2'
  | 'NEAC Protect'
  | 'Nexon Game Security'
  | 'nProtect GameGuard'
  | 'PunkBuster'
  | 'RICOCHET'
  | 'Sabreclaw'
  | 'Treyarch Anti-Cheat'
  | 'UNCHEATER'
  | 'Unknown (Custom)'
  | 'VAC'
  | 'Vanguard'
  | 'Warden'
  | 'XIGNCODE3'
  | 'Zakynthos'

export interface AntiCheatInfo {
  status: ''
  anticheats: AntiCheat[]
  notes: string[]
  native: boolean
  storeIds: {
    epic?: {
      namespace: string
      slug: string
    }
    steam?: string
  }
  reference: string
  updates: AntiCheatReference[]
}

interface AntiCheatReference {
  name: string
  date: string
  reference: string
}

export interface Runtime {
  id: number
  name: string
  created_at: string
  architecture: string
  url: string
}

export type RuntimeName = 'eac_runtime' | 'battleye_runtime'

export type RecentGame = {
  appName: string
  title: string
}

export type HiddenGame = RecentGame

export type FavouriteGame = HiddenGame

export interface GameCollection {
  list: HiddenGame[]
  add: (appNameToAdd: string, appTitle: string) => void
  remove: (appNameToRemove: string) => void
}

export type RefreshOptions = {
  checkForUpdates?: boolean
  fullRefresh?: boolean
  library?: Runner | 'all'
  runInBackground?: boolean
}

export interface WineVersionInfo extends VersionInfo {
  isInstalled: boolean
  hasUpdate: boolean
  installDir: string
}

export type GamepadActionStatus = Record<
  ValidGamepadAction,
  {
    triggeredAt: { [key: number]: number }
    repeatDelay: false | number
  }
>

export type ValidGamepadAction = GamepadActionArgs['action']

export type GamepadActionArgs =
  | GamepadActionArgsWithMetadata
  | GamepadActionArgsWithoutMetadata

interface GamepadActionArgsWithMetadata {
  action: 'leftClick' | 'rightClick'
  metadata: {
    elementTag: string
    x: number
    y: number
  }
}

interface GamepadActionArgsWithoutMetadata {
  action:
    | 'padUp'
    | 'padDown'
    | 'padLeft'
    | 'padRight'
    | 'leftStickUp'
    | 'leftStickDown'
    | 'leftStickLeft'
    | 'leftStickRight'
    | 'rightStickUp'
    | 'rightStickDown'
    | 'rightStickLeft'
    | 'rightStickRight'
    | 'mainAction'
    | 'back'
    | 'altAction'
    | 'esc'
  metadata?: undefined
}

export type InstallPlatform =
  | LegendaryInstallPlatform
  | GogInstallPlatform
  | AppPlatforms
  | NileInstallPlatform
  | 'Browser'

export type ConnectivityChangedCallback = (
  event: IpcRendererEvent,
  status: ConnectivityStatus
) => void

export type ConnectivityStatus = 'offline' | 'check-online' | 'online'

export interface Tools {
  exe?: string
  tool: string
  appName: string
  runner: Runner
}

export type DMStatus = 'done' | 'error' | 'abort' | 'paused'

export interface DMQueueElement {
  type: 'update' | 'install'
  params: InstallParams
  addToQueueTime: number
  startTime: number
  endTime: number
  status?: DMStatus
}

type ProtonVerb =
  | 'run'
  | 'waitforexitandrun'
  | 'runinprefix'
  | 'destroyprefix'
  | 'getcompatpath'
  | 'getnativepath'

export type WineCommandArgs = {
  commandParts: string[]
  wait?: boolean
  protonVerb?: ProtonVerb
  gameSettings?: GameSettings
  gameInstallPath?: string
  installFolderName?: string
  options?: CallRunnerOptions
  startFolder?: string
  skipPrefixCheckIKnowWhatImDoing?: boolean
  overlayInfo?: {
    showOverlay: boolean
    appName: string
    runner: Runner
  }
}

export type Web3Features = {
  supported: boolean
}

export interface SaveSyncArgs {
  arg: string | undefined
  path: string
  appName: string
  runner: Runner
}

export interface RunWineCommandArgs {
  appName: string
  runner: Runner
  commandParts: string[]
}

export interface ImportGameArgs {
  appName: string
  path: string
  runner: Runner
  platform: InstallPlatform
}

export interface MoveGameArgs {
  appName: string
  path: string
  runner: Runner
}

export interface DiskSpaceData {
  free: number
  diskSize: number
  message: string
  validPath: boolean
}

export interface ToolArgs {
  appName: string
  action: 'backup' | 'restore'
}

export type StatusPromise = Promise<{ status: 'done' | 'error' | 'abort' }>

export interface GameScoreInfo {
  score: string
  urlid: string
}

export interface PCGamingWikiInfo {
  steamID: string
  metacritic: GameScoreInfo
  opencritic: GameScoreInfo
  igdb: GameScoreInfo
  direct3DVersions: string[]
}

export interface GamesDBInfo {
  steamID: string
}

export interface AppleGamingWikiInfo {
  crossoverRating: string
  crossoverLink: string
}

export interface WikiInfo {
  timestampLastFetch: string
  pcgamingwiki: PCGamingWikiInfo | null
  applegamingwiki: AppleGamingWikiInfo | null
}

/**
 * Defines from where the version comes
 */
export type Type =
  | 'Wine-GE'
  | 'Proton-GE'
  | 'Proton'
  | 'Wine-Lutris'
  | 'Wine-Kron4ek'
  | 'Wine-Crossover'
  | 'Wine-Staging-macOS'
  | 'Game-Porting-Toolkit'

/**
 * Interface contains information about a version
 * - version
 * - type (wine, proton, lutris, ge ...)
 * - date
 * - download link
 * - checksum link
 * - size (download and disk)
 */
export interface VersionInfo {
  version: string
  type: Type
  date: string
  download: string
  downsize: number
  disksize: number
  checksum: string
}

/**
 * Enum for the supported repositorys
 */
export enum Repositorys {
  WINEGE,
  PROTONGE,
  PROTON,
  WINELUTRIS,
  WINECROSSOVER,
  WINESTAGINGMACOS,
  GPTK
}

/**
 * Type for the progress callback state
 */
export type State = 'downloading' | 'unzipping' | 'idle'

/**
 * Interface for the information that progress callback returns
 */
export interface ProgressInfo {
  percentage: number
  avgSpeed: number
  eta: number
}

export interface WineManagerUISettings {
  value: string
  type: Type
  enabled: boolean
}

/**
 * A user will always be in one of these three states of Metrics Opt In status:
 * a) Opted In -- The user has chosen to participate in our metrics program
 * b) Opted Out -- The user has explicitly asked not to participate
 * c) Undecided -- The user has neither explicitly opted in or opted out.
 * Functionally this is no different then Opted Out. We do not track events for
 * undecided users. However, for the sake of knowing whether to ask the user to
 * opt in, we should know whether or not they have decided.
 */
export enum MetricsOptInStatus {
  optedIn = 'OPTED_IN',
  optedOut = 'OPTED_OUT',
  undecided = 'UNDECIDED'
}

export interface DLCInfo {
  app_name: string
  title: string
}

export interface LaunchOption {
  name: string
  parameters: string
}

export type PlatformInfo = {
  external_url: string
  name: string
  executable?: string
  installSize?: string
  downloadSize?: string
  launch_options?: Array<LaunchOption>
  owned_dlc?: Array<DLCInfo>
  processName?: string
}

export interface HyperPlayInstallInfo {
  game: PlatformInfo
  manifest: {
    download_size: number
    install_size: number
    disk_size?: number
    url?: string
  }
}

export type JsonRpcCallback = (
  error: Error | null,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  response?: any
) => unknown

export type DownloadManagerState = 'idle' | 'running' | 'paused' | 'stopped'

export type AvailablePlatforms = {
  name: string
  available: boolean
  value: string
  icon: IconDefinition
}[]

export type AchievementStore = 'HYPERPLAY' | 'STEAM' | 'EPIC'

export interface Achievement {
  id: string
  apiname: string
  achieved: number
  unlocktime: number
  name: string
  defaultvalue: number
  displayName: string
  hidden: number
  description: string
  icon: string
  icongray: string
  iconName: string
  gameId: number
  gameName: string
  gameImageURL: string
}

export interface SummaryAchievement extends Achievement {
  totalAchievementCount: number
  mintedAchievementCount: number
  mintableAchievementsCount: number
  isNewAchievement: boolean
  isMinted: boolean
  tags: string[]
}

export type AchievementSort = 'ALPHA_A_TO_Z' | 'ALPHA_Z_TO_A' | 'SORT_BY_STATUS'

export type AchievementFilter = 'ALL' | 'NEW' | 'MINTED'

export interface PlayerOptions {
  playerStoreId: string
  playerAddress: string
  store: AchievementStore
}

export interface GetAchievementsOptions extends PlayerOptions {
  filter: AchievementFilter
  sort: AchievementSort
  page: number
  pageSize?: number
}

export interface GetIndividualAchievementsOptions extends PlayerOptions {
  gameId: number
  sort: AchievementSort
  page: number
  pageSize: number
}
export interface AchievementsStats {
  newAchievements: number
  mintedAchievements: number
  totalAchievements: number
  totalGames: number
  numFreeMints: number
}

export type WalletOnboardCloseReason =
  | 'skipped'
  | 'connected'
  | 'requestedMetaMaskConnection'

export type Filter =
  | 'alphabeticalAscending'
  | 'alphabeticalDescending'
  | 'sortByInstalled'
export interface FilterItem extends DropdownItemType {
  id?: Filter
}

export interface OverlayRenderState {
  showToasts: boolean
  showBrowserGame: boolean
  browserGameUrl: string
  showHintText: boolean
  showExitGameButton: boolean
  showExtension: boolean
  showBackgroundTint: boolean
}

export type OverlayAction = 'ON' | 'OFF' | 'TOGGLE'

export interface RunnerBin {
  dir: string
  bin: string
}

export type OverlayType = 'native' | 'browser' | 'mainWindow'

export interface Reward {
  id: number
  amount_per_user: number
  chain_id: number
  marketplace_url: string | null
  reward_type: string
  name: string
  contract_address: string
  decimals: number
  /* eslint-disable-next-line */
  token_ids: any[]
  image_url: string
}

export interface Quest {
  id: number
  project_id: string
  name: string
  type: string
  status: string
  description: string
  rewards: Reward[]
  /* eslint-disable-next-line */
  deposit_contracts: any[]
  eligibility: {
    completion_threshold: number
    steam_games: { id: string }[]
  }
}
