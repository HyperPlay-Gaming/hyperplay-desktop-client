import {
  ExtraInfo,
  GameInfo,
  InstallPlatform,
  GameSettings,
  ExecResult,
  InstallArgs
} from 'common/types'
import { LegendaryInstallInfo } from './legendary'
import { GogInstallInfo } from './gog'

export interface GameManagerBase {
  getSettings: () => Promise<GameSettings>
}

interface InstallResult {
  status: 'done' | 'error' | 'abort'
  error?: string
}

export interface GameManager {
  games: {
    getGameInfo: (appName: string) => GameInfo
    getExtraInfo: (appName: string) => Promise<ExtraInfo>
    getInstallInfo: (
      appName: string,
      installPlatform: InstallPlatform
    ) => Promise<LegendaryInstallInfo | GogInstallInfo>
    import: (appName: string, path: string) => Promise<ExecResult>
    onInstallOrUpdateOutput: (
      appName: string,
      action: 'installing' | 'updating',
      data: string
    ) => void
    getSettings: (appName: string) => Promise<GameSettings>
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
    syncSaves()
  }
}
