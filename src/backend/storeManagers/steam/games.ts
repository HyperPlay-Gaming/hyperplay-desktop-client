/* eslint-disable @typescript-eslint/no-unused-vars */

import { dirname, join } from 'node:path'
import { GlobalConfig } from 'backend/config'
import { isWindows, steamLogFile, userHome } from 'backend/constants'

import { getGameInfo as getSteamLibraryGameInfo } from './library'
import { logError, logInfo, LogPrefix, logWarning } from 'backend/logger/logger'
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
import { callRunner, setupEnvVars } from 'backend/launcher'
import { createAbortController } from 'backend/utils/aborthandler/aborthandler'

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
  // Steam games are considered native if they run on the Steam client
  return true
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
  const gameInfo = getGameInfo(appName)
  if (!gameInfo || !gameInfo.is_installed) {
    logWarning(`Game ${appName} is not installed or does not exist`, {
      prefix: LogPrefix.Steam
    })
    return false
  }

  const steamBinaryPath = getSteamBinaryPath()
  if (!existsSync(steamBinaryPath)) {
    logError('Steam binary not found', { prefix: LogPrefix.Steam })
    return false
  }

  const bin = getSteamBinaryPath()
  const dir = dirname(bin)
  const commandParts = [bin, '-applaunch', gameInfo.app_name]
  const gameSettings = await getSettings(appName)
  const commandEnv = isWindows
    ? process.env
    : { ...process.env, ...setupEnvVars(gameSettings) }
  const options = {
    env: {
      ...commandEnv
    },
    logMessagePrefix: `Launching ${gameInfo.title}`
  }
  const abortController = createAbortController(appName)

  const { error, abort } = await callRunner(
    [...commandParts],
    { name: 'steam', logPrefix: LogPrefix.Steam, bin, dir },
    abortController,
    {
      ...options,
      verboseLogFile: steamLogFile
    },
    gameInfo
  )

  if (error) {
    logError(`Failed to launch game ${appName}: ${error}`, {
      prefix: LogPrefix.Steam
    })
    return false
  }

  if (abort) {
    logWarning(`Game ${appName} launch aborted`, { prefix: LogPrefix.Steam })
    return false
  }
  logInfo(`Game ${appName} launched successfully`, { prefix: LogPrefix.Steam })
  return true
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

function getSteamBinaryPath(): string {
  const { defaultSteamPath } = GlobalConfig.get().getSettings()
  const steamPath = defaultSteamPath.replaceAll("'", '')

  if (process.platform === 'win32') {
    return join(steamPath, 'steam.exe')
  } else if (process.platform === 'darwin') {
    const steamApp = join('/Applications', 'Steam.app')
    if (existsSync(steamApp)) {
      return join(steamApp, 'Contents', 'MacOS', 'steam_osx')
    }
  } else {
    // For Linux it could be on /usr/bin/steam or in the flatpak path from home/.var/app/com.valvesoftware.Steam/.steam/steam
    const flatpakSteamPath = join(
      userHome,
      '.var',
      'app',
      'com.valvesoftware.Steam',
      '.steam',
      'steam'
    )

    if (existsSync(flatpakSteamPath)) {
      return flatpakSteamPath
    }
    return join('/usr', 'bin', 'steam')
  }
  return ''
}
