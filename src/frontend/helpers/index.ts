import {
  GameInfo,
  InstallProgress,
  Runner,
  GameSettings,
  InstallPlatform,
  HyperPlayInstallInfo
} from 'common/types'
import { LegendaryInstallInfo } from 'common/types/legendary'
import { GogInstallInfo } from 'common/types/gog'

import { install, launch, repair, updateGame } from './library'
import * as fileSize from 'filesize'
import libraryState from 'frontend/state/libraryState'

const notify = (args: { title: string; body: string }) =>
  window.api.notify(args)

export const size = fileSize.partial({ base: 2 }) as (arg: unknown) => string

const syncSaves = async (
  savesPath: string,
  appName: string,
  runner: Runner,
  arg?: string
): Promise<string> => {
  const response: string = await window.api.syncSaves({
    arg,
    path: savesPath,
    appName,
    runner
  })
  return response
}

const getLegendaryConfig = async (): Promise<{
  library: GameInfo[]
  user: string
}> => {
  // TODO: I'd say we should refactor this to be two different IPC calls, makes type annotations easier
  const library: GameInfo[] = (await window.api.readConfig(
    'library'
  )) as GameInfo[]
  const user: string = (await window.api.readConfig('user')) as string

  if (!user) {
    return { library: [], user: '' }
  }

  return { library, user }
}

const getGameInfo = async (appName: string, runner: Runner) => {
  return window.api.getGameInfo(appName, runner)
}

const getGameSettings = async (
  appName: string,
  runner: Runner
): Promise<GameSettings | null> => {
  return window.api.getGameSettings(appName, runner)
}

const getInstallInfo = async (
  appName: string,
  runner: Runner,
  installPlatform: InstallPlatform,
  channelNameToInstall?: string
): Promise<
  LegendaryInstallInfo | GogInstallInfo | HyperPlayInstallInfo | null
> => {
  if (runner === 'hyperplay') {
    installPlatform = handleRunnersPlatforms(installPlatform, runner)
  }
  return window.api.getInstallInfo(
    appName,
    runner,
    handleRunnersPlatforms(installPlatform, runner),
    channelNameToInstall
  )
}

function handleRunnersPlatforms(
  platform: InstallPlatform,
  runner: Runner
): InstallPlatform {
  if (runner === 'legendary' || runner === 'hyperplay') {
    return platform
  }

  switch (platform) {
    case 'Mac':
      return 'osx'
    case 'Windows':
      return 'windows'
    // GOG doesn't have a linux platform, so we need to get the information as windows
    case 'linux':
      return 'windows'
    default:
      return platform
  }
}

const createNewWindow = (url: string) => window.api.createNewWindow(url)

function getProgress(progress: InstallProgress): number {
  if (progress && progress.percent) {
    const percent = progress.percent
    // this should deal with a few edge cases
    if (typeof percent === 'string') {
      return Number(String(percent).replace('%', ''))
    }
    return percent
  }
  return 0
}

function removeSpecialcharacters(text: string): string {
  const regexp = new RegExp(/[:|/|*|?|<|>|\\|&|{|}|%|$|@|`|!|™|+|'|"|®]/, 'gi')
  return text.replaceAll(regexp, '')
}

const getStoreName = (runner: Runner, other: string) => {
  switch (runner) {
    case 'legendary':
      return 'Epic Games'
    case 'gog':
      return 'GOG'
    case 'hyperplay':
      return 'HyperPlay'
    default:
      return other
  }
}

export function getPlatformName(platform: string): string {
  switch (platform) {
    case 'windows_amd64':
    case 'windows_arm64':
      return 'Windows'
    case 'linux_amd64':
    case 'linux_arm64':
      return 'Linux'
    case 'darwin_amd64':
    case 'darwin_arm64':
      return 'Mac'
    case 'web':
      return 'Browser'
    default:
      return platform
  }
}

const getLastPartOfUrl = (url: string) => {
  return url.split('/').pop()
}

export const fetchEpicListing = async (projectId: string) => {
  const epicListingUrl = await window.api.getEpicListingUrl(projectId)

  if (!epicListingUrl) {
    return { appName: '', epicListingUrl: '' }
  }

  if (!libraryState.epicLibrary.length) {
    return { appName: '', epicListingUrl }
  }

  // filter libraryState using the epicListing url to get the appName
  const lastPartOfHpUrl = getLastPartOfUrl(epicListingUrl)
  const appName = libraryState.epicLibrary.filter((g) => {
    const game = JSON.parse(JSON.stringify(g)) as GameInfo
    if (!game.store_url) return false

    const lastPartOfEpicUrl = getLastPartOfUrl(game.store_url)

    if (!lastPartOfEpicUrl || !lastPartOfHpUrl) return false

    // test the last part of the URL from the start since sometimes
    // it might includes some numbers at the end but they are the same listing.
    // in the future might need some adjustments depending on the game,
    // so far work with Apeiron and Moonray
    return lastPartOfHpUrl.startsWith(lastPartOfEpicUrl)
  })[0].app_name

  return { appName, epicListingUrl }
}

export {
  createNewWindow,
  getGameInfo,
  getGameSettings,
  getInstallInfo,
  getLegendaryConfig,
  getProgress,
  install,
  launch,
  notify,
  repair,
  syncSaves,
  updateGame,
  removeSpecialcharacters,
  getStoreName
}
