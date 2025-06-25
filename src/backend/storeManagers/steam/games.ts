/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGameInfo as getSteamLibraryGameInfo } from './library'
import { logError, LogPrefix } from 'backend/logger/logger'
import {
  GameInfo,
  GameSettings,
  ExtraInfo,
  InstallPlatform,
  ExecResult,
  InstallArgs,
  UpdateArgs
} from 'common/types'
import { existsSync } from 'graceful-fs'
import { GOGCloudSavesLocation } from 'common/types/gog'
import { InstallResult, RemoveArgs } from 'common/types/game_manager'

export function getGameInfo(appName: string): GameInfo {
  const info = getSteamLibraryGameInfo(appName)
  if (!info) {
    logError(
      [
        'Could not get game info for',
        `${appName},`,
        'returning empty object. Something is probably gonna go wrong soon'
      ],
      LogPrefix.Gog
    )
    return {
      app_name: '',
      runner: 'steam',
      art_cover: '',
      art_square: '',
      install: {},
      is_installed: false,
      title: '',
      canRunOffline: false
    }
  }
  return info
}

export async function isGameAvailable(appName: string): Promise<boolean> {
  const info = getGameInfo(appName)
  if (info && info.is_installed) {
    if (info.install.install_path && existsSync(info.install.install_path!)) {
      return true
    } else {
      return false
    }
  }
  return false
}

export async function getSettings(appName: string): Promise<GameSettings> {
  // not used
  return {} as GameSettings
}

export async function getExtraInfo(appName: string): Promise<ExtraInfo> {
  // not used
  return {} as ExtraInfo
}

export async function importGame(
  appName: string,
  path: string,
  platform: InstallPlatform
): Promise<ExecResult> {
  // not used
  return { stderr: '', stdout: '' }
}

export function onInstallOrUpdateOutput(
  appName: string,
  action: 'installing' | 'updating',
  data: string,
  totalDownloadSize: number
): void {
  // not used
}

export async function install(
  appName: string,
  args: InstallArgs
): Promise<InstallResult> {
  // not used
  return { status: 'error', error: 'Not implemented' }
}

export function isNative(appName: string): boolean {
  // not used
  return false
}

export async function addShortcuts(
  appName: string,
  fromMenu?: boolean
): Promise<void> {
  // not used
}

export async function removeShortcuts(appName: string): Promise<void> {
  // not used
}

export async function launch(
  appName: string,
  launchArguments?: string
): Promise<boolean> {
  // not used
  return false
}

export async function moveInstall(
  appName: string,
  newInstallPath: string
): Promise<InstallResult> {
  // not used
  return { status: 'error', error: 'Not implemented' }
}

export async function repair(appName: string): Promise<ExecResult> {
  // not used
  return { stderr: '', stdout: '' }
}

export async function syncSaves(
  appName: string,
  arg: string,
  path: string,
  gogSaves?: GOGCloudSavesLocation[]
): Promise<string> {
  // not used
  return ''
}

export async function uninstall(args: RemoveArgs): Promise<ExecResult> {
  // not used
  return { stderr: '', stdout: '' }
}

export async function update(
  appName: string,
  args?: UpdateArgs
): Promise<InstallResult> {
  // not used
  return { status: 'error', error: 'Not implemented' }
}

export async function forceUninstall(appName: string): Promise<void> {
  // not used
}

export async function stop(appName: string): Promise<void> {
  // not used
}

export async function pause(appName: string): Promise<void> {
  // not used
}
