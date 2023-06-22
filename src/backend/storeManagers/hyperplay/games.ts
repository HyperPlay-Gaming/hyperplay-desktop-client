import {
  InstallArgs,
  PlatformInfo,
  InstalledInfo,
  GameInfo,
  ExtraInfo,
  ExecResult,
  GameSettings
} from '../../../common/types'
import { InstallPlatform } from 'common/types'
import { hpLibraryStore, hpInstalledGamesStore } from './electronStore'
import { sendFrontendMessage, getMainWindow } from 'backend/main_window'
import { LogPrefix, logError, logInfo, logWarning } from 'backend/logger/logger'
import { existsSync, mkdirSync, rmSync, readdirSync, rm } from 'graceful-fs'
import { isMac, isWindows, isLinux, configFolder } from 'backend/constants'
import {
  downloadFile,
  spawnAsync,
  killPattern,
  shutdownWine,
  extractZip,
  calculateEta
} from 'backend/utils'
import { notify } from 'backend/dialog/dialog'
import path, { join } from 'path'
import {
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import {
  getHyperPlayStoreRelease,
  handleArchAndPlatform,
  handlePlatformReversed
} from './utils'
import { getSettings as getSettingsSideload } from 'backend/storeManagers/sideload/games'
import {
  addShortcuts as addShortcutsUtil,
  removeShortcuts as removeShortcutsUtil
} from '../../shortcuts/shortcuts/shortcuts'
import { InstallResult, RemoveArgs } from 'common/types/game_manager'
import { GOGCloudSavesLocation } from 'common/types/gog'
import {
  getGameProcessName,
  launchGame
} from 'backend/storeManagers/storeManagerCommon/games'
import { isOnline } from 'backend/online_monitor'
import { clean } from 'easydl/dist/utils'
import { getFirstQueueElement } from 'backend/downloadmanager/downloadqueue'

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

    const genericPlatform = handlePlatformReversed(platform).toLowerCase()

    if (isMac && genericPlatform === 'mac') {
      return true
    }

    if (isLinux && genericPlatform === 'linux') {
      return true
    }
  }

  return false
}

export async function stop(appName: string): Promise<void> {
  const gameInfo = getGameInfo(appName)
  const {
    install: { executable = undefined }
  } = gameInfo

  if (executable) {
    const split = executable.split('/')
    const exe = split[split.length - 1]
    killPattern(exe)
    if (!isNative(appName)) {
      const gameSettings = await getSettings(appName)
      shutdownWine(gameSettings)
    }
  }

  const gameProcessName = getGameProcessName(gameInfo)
  if (gameProcessName) {
    killPattern(gameProcessName)
    if (!isNative(appName)) {
      const gameSettings = await getSettings(appName)
      shutdownWine(gameSettings)
    }
  }
}

/**
 *
 * @param appName
 * @param pathName exe file full path
 * @param platform
 * @returns
 */
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

  const gameInfo = getGameInfo(appName)
  //necessary so that injectProcess can find the process name
  if (gameInfo.releaseMeta)
    platform = handleArchAndPlatform(platform, gameInfo.releaseMeta)

  let hpImportVersion = '-1'
  /**
   * TODO: Figure out a way to get release name/version of game that is already installed
   * Currently this just sets version to the latest store release and relies on the game dev
   * to handle if their game is launched with an old version
   **/
  if (isOnline()) {
    const currentRelease = await getHyperPlayStoreRelease(appName)
    hpImportVersion = currentRelease.releaseName
  }

  gameInLibrary.install = {
    install_path: path.dirname(pathName),
    executable: pathName,
    install_size: '0 GiB',
    is_dlc: false,
    version: hpImportVersion,
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
    logWarning(
      `Tried to install distributables from ${distFolder} but folder does not exist!`,
      LogPrefix.HyperPlay
    )
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
  downloadPath: string,
  platformInfo: PlatformInfo,
  destinationPath: string
): Promise<void> {
  const appInfo = getGameInfo(appName)
  let downloadStarted = false

  if (!appInfo || !appInfo.releaseMeta) {
    throw new Error('App not found in library')
  }

  logInfo(`Downloading zip file to ${downloadPath}`, LogPrefix.HyperPlay)

  // we might need a helper function to deal with the different platforms
  const window = getMainWindow()

  if (!window || !platformInfo.external_url) {
    throw new Error('DownloadUrl not found')
  }

  const downloadUrl =
    process.env.CI &&
    process.env.MOCK_DOWNLOAD_URL &&
    process.env.CI === 'e2e' &&
    process.env.APP_NAME_TO_MOCK &&
    process.env.APP_NAME_TO_MOCK === appName
      ? process.env.MOCK_DOWNLOAD_URL
      : platformInfo.external_url
  logInfo(`Downloading from ${downloadUrl}`, LogPrefix.HyperPlay)
  await downloadFile(
    downloadUrl,
    downloadPath,
    createAbortController(appName),
    (downloadedBytes, downloadSpeed, diskWriteSpeed, progress) => {
      const eta = calculateEta(
        downloadedBytes,
        downloadSpeed,
        platformInfo.downloadSize
      )

      if (downloadedBytes > 0 && !downloadStarted) {
        downloadStarted = true
        sendFrontendMessage('gameStatusUpdate', {
          appName,
          status: 'installing',
          runner: 'hyperplay',
          folder: destinationPath
        })
      }

      window.webContents.send(`progressUpdate-${appName}`, {
        appName,
        status: 'installing',
        runner: 'hyperplay',
        folder: destinationPath,
        progress: {
          percent: progress,
          diskSpeed: diskWriteSpeed / 1024 / 1024,
          downSpeed: downloadSpeed / 1024 / 1024,
          bytes: downloadedBytes / 1024 / 1024,
          folder: destinationPath,
          eta
        }
      })
    }
  )
  deleteAbortController(appName)
}

function sanitizeFileName(filename: string) {
  return filename.replace(/[/\\?%*:|"<>]/g, '-')
}

function getZipFileName(appName: string, platformInfo: PlatformInfo): string {
  const zipName = encodeURI(platformInfo.name)
  const tempfolder = path.join(configFolder, 'hyperplay', '.temp', appName)

  if (!existsSync(tempfolder)) {
    mkdirSync(tempfolder, { recursive: true })
  }

  const zipFile = path.join(tempfolder, zipName)
  return zipFile
}

export async function install(
  appName: string,
  { path: dirpath, platformToInstall }: InstallArgs
): Promise<InstallResult> {
  if (!existsSync(dirpath) && platformToInstall !== 'Browser') {
    mkdirSync(dirpath, { recursive: true })
  }

  const gameInfo = getGameInfo(appName)
  const { title, releaseMeta, developer } = gameInfo
  const window = getMainWindow()

  if (!releaseMeta || !window) {
    return { status: 'error', error: 'Release meta not found' }
  }

  const appPlatform = handleArchAndPlatform(platformToInstall, releaseMeta)
  const platformInfo = releaseMeta.platforms[appPlatform]

  logInfo(`Installing ${title} to ${dirpath}...`, LogPrefix.HyperPlay)
  const zipFile = getZipFileName(appName, platformInfo)

  // download the zip file
  try {
    // prevent naming conflicts where two developers release games with the same name
    const sanitizedDestinationFolderName =
      developer !== undefined
        ? sanitizeFileName(developer) + ' - ' + sanitizeFileName(title)
        : sanitizeFileName(title)
    const destinationPath = path.join(dirpath, sanitizedDestinationFolderName)
    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath, { recursive: true })
    }
    await downloadGame(appName, zipFile, platformInfo, destinationPath)
    let executable = path.join(destinationPath, platformInfo.executable)

    logInfo(`Extracting ${zipFile} to ${destinationPath}`, LogPrefix.HyperPlay)

    try {
      window.webContents.send('gameStatusUpdate', {
        appName,
        runner: 'hyperplay',
        folder: destinationPath,
        status: 'extracting'
      })

      if (isWindows) {
        await extractZip(zipFile, destinationPath)
        await installDistributables(destinationPath)
      } else {
        await extractZip(zipFile, destinationPath)
      }

      if (isMac && executable.endsWith('.app')) {
        const macAppExecutable = readdirSync(
          join(executable, 'Contents', 'MacOS')
        )[0]
        executable = join(executable, 'Contents', 'MacOS', macAppExecutable)
      }

      const installedInfo: InstalledInfo = {
        appName,
        install_path: destinationPath,
        executable: executable,
        install_size: platformInfo.installSize.toString(),
        is_dlc: false,
        version: gameInfo.version ?? '0',
        platform: appPlatform
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
        folder: destinationPath,
        status: 'done'
      })
      return { status: 'error', error: `${error}` }
    }
    return { status: 'done' }
  } catch (error) {
    logInfo(
      `Error while downloading and extracting game: ${error}`,
      LogPrefix.HyperPlay
    )
    if (!`${error}`.includes('Download stopped or paused')) {
      if (existsSync(zipFile)) rmSync(zipFile)
      clean(zipFile)
    }
    return {
      status: 'error',
      error: `${error}`
    }
  }
}

export async function removeTempDownloadFiles(appName: string) {
  const currentElement = getFirstQueueElement()
  if (!currentElement || currentElement.params.appName !== appName) return

  const gameInfo = getGameInfo(appName)
  const { releaseMeta } = gameInfo
  if (!releaseMeta) return
  const appPlatform = handleArchAndPlatform(
    currentElement.params.platformToInstall,
    releaseMeta
  )
  const platformInfo = releaseMeta.platforms[appPlatform]

  const zipFile = getZipFileName(appName, platformInfo)
  if (existsSync(zipFile))
    rm(zipFile, () =>
      logInfo(`Removed zip file: ${zipFile}`, LogPrefix.HyperPlay)
    )
  clean(zipFile)
}

export function getGameInfo(appName: string): GameInfo {
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

export async function uninstall({
  appName,
  shouldRemovePrefix
}: RemoveArgs): Promise<ExecResult> {
  const appInfo = getGameInfo(appName)
  if (!appInfo) return { stderr: '', stdout: '' }

  if (appInfo.install.platform === 'web') {
    rmAppFromHyperPlayStore(appName)
    sendFrontendMessage('refreshLibrary', 'hyperplay')
    return { stderr: '', stdout: '' }
  }

  if (!appInfo.install.install_path) {
    return { stderr: '', stdout: '' }
  }

  // remove game folder from install path
  const installPath = appInfo.install.install_path
  logInfo(`Removing folder in uninstall: ${installPath}`, LogPrefix.HyperPlay)
  rmSync(installPath, { recursive: true, force: true })

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
  currentLibrary[gameIndex].install = {}
  hpLibraryStore.set('games', currentLibrary)

  if (shouldRemovePrefix) {
    const { winePrefix } = await getSettings(appName)

    logInfo(`Removing prefix ${winePrefix}`, LogPrefix.HyperPlay)
    if (existsSync(winePrefix)) {
      // remove prefix if exists
      rmSync(winePrefix, { recursive: true })
    }
  }

  setTimeout(() => {
    sendFrontendMessage('refreshLibrary', 'hyperplay')
  })
  return { stderr: '', stdout: '' }
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
  const extraInfo = getGameInfo(appName).extra
  if (!extraInfo) {
    logWarning(`No extra info found for ${appName}`, LogPrefix.HyperPlay)
    return {
      about: {
        description: '',
        shortDescription: ''
      },
      reqs: [],
      storeUrl: ''
    }
  }
  return extraInfo
}

export async function launch(
  appName: string,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  launchArguments?: string
): Promise<boolean> {
  return launchGame(appName, getGameInfo(appName), 'hyperplay')
}

// TODO: Refactor to only replace updated files
export async function update(appName: string): Promise<InstallResult> {
  const gameInfo = getGameInfo(appName)

  if (gameInfo.install.platform === undefined) {
    logError(
      'Install platform was not found during game updated',
      LogPrefix.HyperPlay
    )
    return { status: 'error' }
  }

  if (gameInfo.install.install_path === undefined) {
    logError(
      'Install path was not found during game updated',
      LogPrefix.HyperPlay
    )
    return { status: 'error' }
  }

  await uninstall({ appName })
  const installResult = await install(appName, {
    path: path.dirname(gameInfo.install.install_path),
    platformToInstall: gameInfo.install.platform
  })
  return installResult
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

export async function forceUninstall(appName: string): Promise<void> {
  await uninstall({ appName, shouldRemovePrefix: false })
}
