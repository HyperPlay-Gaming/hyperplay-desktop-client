import { GOGCloudSavesLocation, GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import {
  ExecResult,
  ExtraInfo,
  GameInfo,
  GameSettings,
  InstallArgs,
  ProtonVerb
} from 'common/types'

import { BrowserWindow } from 'electron'
import { join } from 'path'
import { gamesConfigPath } from './constants'

abstract class Game {
  public get logFileLocation() {
    return join(gamesConfigPath, `${this.appName}-lastPlay.log`)
  }

  abstract appName: string
  abstract window: BrowserWindow
  abstract getExtraInfo(): Promise<ExtraInfo>
  abstract getGameInfo(installPlatform?: string): GameInfo
  abstract getInstallInfo(
    installPlatform?: string
  ): Promise<LegendaryInstallInfo | GogInstallInfo>
  abstract getSettings(): Promise<GameSettings>
  abstract hasUpdate(): Promise<boolean>
  abstract import(path: string): Promise<ExecResult>
  abstract install(args: InstallArgs): Promise<{ status: string }>
  abstract addShortcuts(): Promise<void>
  abstract launch(launchArguments?: string): Promise<boolean>
  abstract stop(): Promise<void>
  abstract moveInstall(newInstallPath: string): Promise<string>
  abstract repair(): Promise<ExecResult>
  abstract forceUninstall(): Promise<void>
  abstract syncSaves(arg: string, path: string): Promise<ExecResult>
  abstract syncSaves(
    arg: string,
    path: string,
    gogSaves?: GOGCloudSavesLocation[]
  ): Promise<ExecResult>
  abstract uninstall(): Promise<ExecResult>
  abstract update(): Promise<{ status: 'done' | 'error' | 'abort' }>
  abstract isNative(): boolean
  abstract runWineCommand(
    commandParts: string[],
    wait?: boolean,
    protonVerb?: ProtonVerb
  ): Promise<ExecResult>
}

export { Game }
