import {
  ExtraInfo,
  GameInfo,
  InstallPlatform,
  GameSettings,
  ExecResult,
  InstallArgs,
  WineCommandArgs
} from 'common/types'
import { GOGCloudSavesLocation } from './gog'

export interface GameManagerBase {
  getSettings: () => Promise<GameSettings>
}

export interface InstallResult {
  status: 'done' | 'error' | 'abort'
  error?: string
}

export interface GameManager {
  getGameInfo: (appName: string) => GameInfo
  getExtraInfo: (appName: string) => Promise<ExtraInfo>
  hasUpdate: (appName: string) => Promise<boolean>
  importGame: (
    appName: string,
    path: string,
    platform: InstallPlatform
  ) => Promise<ExecResult>
  onInstallOrUpdateOutput: (
    appName: string,
    action: 'installing' | 'updating',
    data: string,
    totalDownloadSize: number
  ) => void
  install: (appName: string, args: InstallArgs) => Promise<InstallResult>
  isNative: (appName: string) => boolean
  addShortcuts: (appName: string, fromMenu?: boolean) => Promise<void>
  removeShortcuts: (appName: string) => Promise<void>
  launch: (appName: string, launchArguments?: string) => Promise<boolean>
  moveInstall: (
    appName: string,
    newInstallPath: string
  ) => Promise<InstallResult>
  repair: (appName: string) => Promise<ExecResult>
  syncSaves: (
    appName: string,
    arg: string,
    path: string,
    gogSaves?: GOGCloudSavesLocation[]
  ) => Promise<string>
  uninstall: (appName: string) => Promise<ExecResult>
  update: (appName: string) => Promise<{ status: 'done' | 'error' }>
  runWineCommand: (
    appName: string,
    { commandParts, wait = false, protonVerb, startFolder }: WineCommandArgs
  ) => Promise<ExecResult>
  forceUninstall: (appName: string) => Promise<void>
  stop: (appName: string) => Promise<void>
  isGameAvailable: (appName: string) => boolean
}
