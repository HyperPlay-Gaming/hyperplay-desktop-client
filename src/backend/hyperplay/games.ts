import {
  InstallArgs,
  PlatformInfo,
  InstalledInfo,
  GameInfo,
  ExtraInfo,
  ExecResult,
  WineCommandArgs,
  GameSettings
} from './../../common/types'
import { getBinExecIfExists } from 'backend/hyperplay/library'
import { InstallPlatform } from 'common/types'
import { hpLibraryStore, hpInstalledGamesStore } from './electronStore'
import { sendFrontendMessage, getMainWindow } from 'backend/main_window'
import * as fs from 'fs'
import { LogPrefix, logInfo, logWarning } from 'backend/logger/logger'
import { existsSync, mkdirSync, rmSync, readdirSync } from 'graceful-fs'
import { isMac, isWindows, isLinux } from 'backend/constants'
import {
  downloadFileWithAxios,
  getFileSize,
  spawnAsync,
  killPattern
} from 'backend/utils'
import { notify } from 'backend/dialog/dialog'
import path, { join } from 'path'
import {
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import { removeFromQueue } from 'backend/downloadmanager/downloadqueue'
import { handleArchAndPlatform } from './utils'
import { getSettings as getSettingsSideload } from 'backend/sideload/games'
import {
  addShortcuts as addShortcutsUtil,
  removeShortcuts as removeShortcutsUtil
} from '../shortcuts/shortcuts/shortcuts'
import { InstallResult, RemoveArgs } from 'common/types/game_manager'
import { GOGCloudSavesLocation } from 'common/types/gog'
import { launchGame } from 'backend/gameManagerCommon/games'

export async function getSettings(appName: string): Promise<GameSettings> {
  return getSettingsSideload(appName)
}

export const isGameAvailable = (appName: string) => {
  const hpGameInfo = getGameInfo(appName)
  if (hpGameInfo && hpGameInfo.install.platform === 'web') {
    return true
  }

  if (hpGameInfo.install && hpGameInfo.install.executable) {
    return existsSync(hpGameInfo.install.executable)
  }
  return false
}

export function isNative(appName: string): boolean {
  const {
    install: { platform }
  } = getGameInfo(appName)
  if (platform) {
    if (platform === 'web') {
      return true
    }

    if (isWindows) {
      return true
    }

    if (isMac && platform === 'Mac') {
      return true
    }

    // small hack, but needs to fix the typings
    const plat = platform.toLowerCase()
    if (isLinux && plat === 'linux') {
      return true
    }
  }

  return false
}

export async function stop(appName: string): Promise<void> {
  const {
    install: { executable = undefined }
  } = getGameInfo(appName)

  if (executable) {
    const split = executable.split('/')
    const exe = split[split.length - 1]
    killPattern(exe)
  }
}

export async function importGame(
  appName: string,
  pathName: string,
  platform: InstallPlatform
): Promise<ExecResult> {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const gameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appName
  })

  if (gameInLibrary === undefined) {
    logInfo('Cannot find game in library so cannot import', LogPrefix.HyperPlay)
    return { stderr: '', stdout: '' }
  }

  let exec = ''
  const files = await fs.promises.readdir(pathName)
  files.forEach((val) => {
    const splitFile = val.split('.')
    const extension = splitFile[splitFile.length - 1]
    if (extension === 'exe') {
      exec = val
    }
  })

  const executableFullPath = path.join(pathName, exec)
  const binExec = getBinExecIfExists(executableFullPath)
  gameInLibrary.install = {
    install_path: pathName,
    executable: binExec === '' ? executableFullPath : binExec,
    install_size: '0 GiB',
    is_dlc: false,
    version: '-1',
    platform: platform
  }

  gameInLibrary.is_installed = true
  hpLibraryStore.set('games', currentLibrary)

  sendFrontendMessage('refreshLibrary')
  return { stderr: '', stdout: '' }
}

const installDistributables = async (gamePath: string) => {
  const distFolder = path.join(gamePath, 'dist')
  if (!existsSync(distFolder)) {
    return
  }

  const files = readdirSync(distFolder)
  const executables = files.filter((file) => file.endsWith('.exe'))

  for await (const executable of executables) {
    await spawnAsync(path.join(gamePath, 'dist', executable), [])
  }
}

async function downloadGame(
  appName: string,
  installPath: string,
  platformInfo: PlatformInfo
): Promise<void> {
  const appInfo = getGameInfo(appName)

  if (!appInfo || !appInfo.releaseMeta) {
    throw new Error('App not found in library')
  }

  logInfo(`Downloading zip file`, LogPrefix.HyperPlay)

  // we might need a helper function to deal with the different platforms
  const window = getMainWindow()

  if (!window || !platformInfo.external_url) {
    throw new Error('DownloadUrl not found')
  }

  // prevent from the next download being named eg. "game (1).zip"
  try {
    rmSync(path.join(installPath, platformInfo.name))
    // eslint-disable-next-line no-empty
  } catch (e) {}

  try {
    await downloadFileWithAxios(
      platformInfo.external_url,
      `${installPath}/${platformInfo.name}`,
      createAbortController(appName),
      (downloadedBytes, downloadSpeed, diskWriteSpeed, progress) => {
        // convert downloadspeed to Mb/s
        downloadSpeed = Math.round(downloadSpeed / 1000000)

        window.webContents.send(`progressUpdate-${appName}`, {
          appName,
          status: 'installing',
          runner: 'hyperplay',
          progress: {
            percent: progress,
            diskSpeed: diskWriteSpeed,
            downSpeed: downloadSpeed,
            bytes: downloadedBytes,
            folder: installPath
          }
        })
      }
    )
    deleteAbortController(appName)
    window.webContents.send('gameStatusUpdate', {
      appName,
      runner: 'hyperplay',
      status: 'done'
    })
  } catch (error) {
    deleteAbortController(appName)
    logWarning(`Download aborted ${error}`, LogPrefix.HyperPlay)
    removeFromQueue(appName)
  }
}

export async function install(
  appName: string,
  { path: dirpath, platformToInstall }: InstallArgs
): Promise<{
  status: 'error' | 'done' | 'abort'
  error?: string | undefined
}> {
  if (!existsSync(dirpath) && platformToInstall !== 'Browser') {
    mkdirSync(dirpath, { recursive: true })
  }

  const { title, releaseMeta } = getGameInfo(appName)
  const window = getMainWindow()

  if (!releaseMeta || !window) {
    return { status: 'error', error: 'Release meta not found' }
  }

  logInfo(`Installing ${title} to ${path}...`, LogPrefix.HyperPlay)

  // download the zip file
  try {
    const platformInfo =
      releaseMeta.platforms[
        handleArchAndPlatform(platformToInstall, releaseMeta)
      ]
    const zipFile = path.join(dirpath, platformInfo.name)
    const destinationPath = path.join(dirpath, title)
    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath, { recursive: true })
    }
    await downloadGame(appName, dirpath, platformInfo)
    let executable = path.join(destinationPath, platformInfo.executable)
    const install_size = getFileSize(platformInfo.installSize)

    logInfo(`Extracting ${zipFile} to ${destinationPath}`, LogPrefix.HyperPlay)

    try {
      if (isWindows) {
        await spawnAsync('powershell', [
          'Expand-Archive',
          '-LiteralPath',
          `'${zipFile}'`,
          '-DestinationPath',
          `'${destinationPath}'`
        ])

        await installDistributables(destinationPath)
      } else {
        // extract the zip file and overwrite existing files
        const { code, stderr } = await spawnAsync('unzip', [
          '-o',
          zipFile,
          '-d',
          destinationPath
        ])
        if (code !== 0) {
          throw new Error(stderr)
        }
      }
      rmSync(zipFile)

      if (isWindows) {
        await installDistributables(destinationPath)
      }

      if (isMac && executable.endsWith('.app')) {
        const macAppExecutable = readdirSync(
          join(executable, 'Contents', 'MacOS')
        )[0]
        executable = join(executable, 'Contents', 'MacOS', macAppExecutable)
      }

      const binExecFullPath = getBinExecIfExists(executable)

      const installedInfo: InstalledInfo = {
        appName,
        install_path: destinationPath,
        executable: binExecFullPath === '' ? executable : binExecFullPath,
        install_size,
        is_dlc: false,
        version: releaseMeta.name,
        platform: platformToInstall
      }

      const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
      const gameIndex = currentLibrary.findIndex(
        (value) => value.app_name === appName
      )
      const currentInstalled = hpInstalledGamesStore.get('installed', [])
      currentInstalled.push(installedInfo)
      hpInstalledGamesStore.set('installed', currentInstalled)
      currentLibrary[gameIndex].install = installedInfo
      currentLibrary[gameIndex].is_installed = true

      hpLibraryStore.set('games', currentLibrary)

      notify({
        title,
        body: `Installed`
      })

      sendFrontendMessage('refreshLibrary', 'hyperplay')
    } catch (error) {
      logInfo(`Error while extracting game ${error}`, LogPrefix.HyperPlay)
      window.webContents.send('gameStatusUpdate', {
        appName,
        runner: 'hyperplay',
        status: 'done'
      })
      return { status: 'error', error: `${error}` }
    }
    return { status: 'done' }
  } catch (error) {
    logInfo('Error while downloading and extracting game', LogPrefix.HyperPlay)
    return {
      status: 'error',
      error: `${error}`
    }
  }
}

export function getGameInfo(appName: string): GameInfo {
  logInfo(`Getting game info for ${appName}`, LogPrefix.HyperPlay)
  const appInfo = hpLibraryStore
    .get('games', [])
    .find((app) => app.app_name === appName)

  if (!appInfo) {
    throw new Error('App not found in library')
  }

  return appInfo
}

const rmAppFromHyperPlayStore = (appName: string) => {
  const currentStore = hpLibraryStore.get('games', [])
  const newStore = currentStore.filter((game) => game.app_name !== appName)
  hpLibraryStore.set('games', newStore)
}

export async function uninstallHyperPlayGame(
  appName: string,
  shouldRemovePrefix: boolean
) {
  const appInfo = getGameInfo(appName)
  if (!appInfo) return

  if (appInfo.install.platform === 'web') {
    rmAppFromHyperPlayStore(appName)
    sendFrontendMessage('refreshLibrary', 'hyperplay')
    return
  }

  if (!appInfo.install.install_path) {
    return
  }

  // remove game folder from install path
  const installPath = appInfo.install.install_path
  if (appInfo.folder_name === undefined) return
  const gameFolder = path.join(installPath, appInfo.folder_name)

  rmSync(gameFolder, { recursive: true, force: true })

  // only remove the game from the store if the platform is web
  // @ts-expect-error TS wont know how to handle the type of installInfo
  if (appInfo.install.platform === 'web') {
    rmAppFromHyperPlayStore(appName)
  }

  // remove game from installed games store
  const currentInstalled = hpInstalledGamesStore.get('installed', [])
  const newInstalled = currentInstalled.filter(
    (game) => game.executable !== appInfo.install.executable
  )
  hpInstalledGamesStore.set('installed', newInstalled)

  // change is_installed to false
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex(
    (value) => value.app_name === appName
  )
  currentLibrary[gameIndex].is_installed = false
  hpLibraryStore.set('games', currentLibrary)

  if (shouldRemovePrefix) {
    const { winePrefix } = await getSettings(appName)

    logInfo(`Removing prefix ${winePrefix}`, LogPrefix.Backend)
    if (existsSync(winePrefix)) {
      // remove prefix if exists
      rmSync(winePrefix, { recursive: true })
    }
  }

  setTimeout(() => {
    sendFrontendMessage('refreshLibrary', 'hyperplay')
  })
}

export async function addShortcuts(
  appName: string,
  fromMenu?: boolean
): Promise<void> {
  return addShortcutsUtil(getGameInfo(appName), fromMenu)
}

export async function removeShortcuts(appName: string): Promise<void> {
  return removeShortcutsUtil(getGameInfo(appName))
}

export async function getExtraInfo(appName: string): Promise<ExtraInfo> {
  logWarning(
    `getExtraInfo not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return {
    about: {
      description: '',
      shortDescription: ''
    },
    reqs: [],
    storeUrl: ''
  }
}

export async function launch(
  appName: string,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  launchArguments?: string
): Promise<boolean> {
  return launchGame(appName, getGameInfo(appName), 'hyperplay')
}

export async function hasUpdate(appName: string): Promise<boolean> {
  logWarning(
    `hasUpdate not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return false
}

export async function update(
  appName: string
): Promise<{ status: 'done' | 'error' }> {
  logWarning(
    `update not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return { status: 'error' }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function onInstallOrUpdateOutput(
  appName: string,
  action: 'installing' | 'updating',
  data: string,
  totalDownloadSize: number
) {
  logWarning(
    `onInstallOrUpdateOutput not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
}

export async function moveInstall(
  appName: string,
  newInstallPath: string
): Promise<InstallResult> {
  logWarning(
    `moveInstall not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return { status: 'error' }
}

export async function repair(appName: string): Promise<ExecResult> {
  logWarning(
    `repair not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return { stderr: '', stdout: '' }
}

export async function uninstall({ appName }: RemoveArgs): Promise<ExecResult> {
  logWarning(
    `uninstall not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return { stderr: '', stdout: '' }
}

export async function syncSaves(
  appName: string,
  arg: string,
  path: string,
  gogSaves?: GOGCloudSavesLocation[]
): Promise<string> {
  logWarning(
    `syncSaves not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return ''
}

export async function runWineCommand(
  appName: string,
  { commandParts, wait = false, protonVerb, startFolder }: WineCommandArgs
): Promise<ExecResult> {
  logWarning(
    `runWineCommand not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
  return { stderr: '', stdout: '' }
}

export async function forceUninstall(appName: string): Promise<void> {
  logWarning(
    `forceUninstall not implemented on HyperPlay Game Manager. called for appName = ${appName}`
  )
}
