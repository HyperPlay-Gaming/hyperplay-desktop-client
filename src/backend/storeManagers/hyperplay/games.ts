import {
  InstallArgs,
  InstalledInfo,
  GameInfo,
  ExtraInfo,
  ExecResult,
  GameSettings,
  PlatformConfig,
  LicenseConfigValidateResult,
  ChannelReleaseMeta
} from '../../../common/types'
import { InstallPlatform } from 'common/types'
import { hpLibraryStore } from './electronStore'
import { sendFrontendMessage, getMainWindow } from 'backend/main_window'
import { LogPrefix, logError, logInfo, logWarning } from 'backend/logger/logger'
import { existsSync, mkdirSync, rmSync, readdirSync } from 'graceful-fs'
import {
  isMac,
  isWindows,
  isLinux,
  configFolder,
  mainReleaseChannelName,
  getValidateLicenseKeysApiUrl
} from 'backend/constants'
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
  callAbortController,
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import {
  getHyperPlayStoreRelease,
  handleArchAndPlatform,
  handlePlatformReversed,
  sanitizeVersion
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
import axios from 'axios'
import { PlatformsMetaInterface } from '@valist/sdk/dist/typesShared'
import { Channel } from '@valist/sdk/dist/typesApi'
import { DownloadItem } from 'electron'
import { waitForItemToDownload } from 'backend/utils/downloadFile/download_file'

const inProgressDownloadsMap: Map<string, DownloadItem> = new Map()

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

export async function pause(appName: string): Promise<void> {
  const dl = inProgressDownloadsMap.get(appName)
  if (dl === undefined) {
    throw `Tried to pause download for ${appName} that is not in progress!`
  }
  dl.pause()
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
  if (
    gameInfo.channels &&
    gameInfo.channels[mainReleaseChannelName].release_meta
  )
    platform = handleArchAndPlatform(
      platform,
      gameInfo.channels[mainReleaseChannelName].release_meta
    )

  let hpImportVersion = '-1'
  /**
   * TODO: Figure out a way to get release name/version of game that is already installed
   * Currently this just sets version to the latest store release and relies on the game dev
   * to handle if their game is launched with an old version
   **/
  if (isOnline()) {
    const currentRelease = await getHyperPlayStoreRelease(appName)
    hpImportVersion =
      currentRelease.channels[mainReleaseChannelName]?.release_meta?.name
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
  directory: string,
  fileName: string,
  platformInfo: PlatformConfig,
  destinationPath: string
): Promise<void> {
  /* eslint-disable-next-line no-async-promise-executor */
  return new Promise(async (res, rej) => {
    let downloadStarted = false

    logInfo(
      `Downloading zip file to directory ${directory} filename ${fileName}`,
      LogPrefix.HyperPlay
    )

    // we might need a helper function to deal with the different platforms
    const window = getMainWindow()

    if (!window || !platformInfo.external_url) {
      throw new Error('DownloadUrl not found')
    }

    function cleanUpDownload() {
      inProgressDownloadsMap.delete(appName)
      deleteAbortController(appName)
      rmSync(directory, { recursive: true, force: true })
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
    const item = await downloadFile(
      downloadUrl,
      directory,
      fileName,
      createAbortController(appName),
      (downloadedBytes, downloadSpeed, diskWriteSpeed, progress) => {
        const eta = calculateEta(
          downloadedBytes,
          downloadSpeed,
          Number.parseInt(platformInfo.downloadSize ?? '0')
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
      },
      () => {
        cleanUpDownload()
        res()
      },
      () => {
        cleanUpDownload()
        rej()
      }
    )

    inProgressDownloadsMap.set(appName, item)
  })
}

function sanitizeFileName(filename: string) {
  return filename.replace(/[/\\?%*:|"<>]/g, '-')
}

function getZipFileName(
  appName: string,
  platformInfo: PlatformConfig
): { directory: string; filename: string } {
  const zipName = encodeURI(platformInfo.name)
  const tempfolder = path.join(configFolder, 'hyperplay', '.temp', appName)

  if (!existsSync(tempfolder)) {
    mkdirSync(tempfolder, { recursive: true })
  }

  return { directory: tempfolder, filename: zipName }
}

export async function validateAccessCode(
  accessCode: string,
  channelId: number
) {
  const validateUrl = getValidateLicenseKeysApiUrl()

  const validateResult = await axios.post<LicenseConfigValidateResult>(
    validateUrl,
    {
      code: accessCode,
      channel_id: channelId
    }
  )
  return validateResult.data
}

async function getAccessCodeGatedPlatforms(
  accessCode: string,
  channelId: number,
  appName: string
): Promise<PlatformsMetaInterface> {
  const validateResult = await validateAccessCode(accessCode, channelId)

  if (validateResult.valid !== true)
    throw `Access code ${accessCode} is not valid for channel id ${channelId}!`

  //set platform info
  logInfo(
    'Updating platform info with access code gated platform info in HyperPlay Game Manager',
    LogPrefix.HyperPlay
  )
  if (validateResult.platforms === undefined)
    throw 'Access code gated platforms returned by the validate url were undefined'

  // update local game info access key code cache
  // this will be needed for updating the game
  const hpGames = hpLibraryStore.get('games', [])
  const newHpGames = hpGames.map((val) => {
    if (val.app_name === appName) {
      if (val.accessCodesCache === undefined) val.accessCodesCache = {}
      val.accessCodesCache[channelId] = accessCode
    }
    return val
  })
  hpLibraryStore.set('games', newHpGames)

  return validateResult.platforms
}

function updateInstalledInfo(appName: string, installedInfo: InstalledInfo) {
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex(
    (value) => value.app_name === appName
  )
  currentLibrary[gameIndex].install = installedInfo
  currentLibrary[gameIndex].is_installed = true

  hpLibraryStore.set('games', currentLibrary)
}

function getDestinationPath(gameInfo: GameInfo, dirpath: string) {
  if (
    gameInfo.account_name === undefined ||
    gameInfo.project_name === undefined
  ) {
    throw `Account or project name is undefined for ${gameInfo.app_name}`
  }
  const accountFolderName = sanitizeFileName(gameInfo.account_name)
  const projectFolderName = sanitizeFileName(gameInfo.project_name)

  return path.join(dirpath, accountFolderName, projectFolderName)
}

function getReleaseMeta(
  gameInfo: GameInfo,
  channelName: string | undefined
): [ChannelReleaseMeta, Channel] {
  const { channels } = gameInfo
  if (
    channelName === undefined ||
    channels === undefined ||
    !Object.hasOwn(channels, channelName)
  ) {
    throw `Channel name not found for ${gameInfo.app_name}`
  }

  const selectedChannel = channels[channelName]
  const releaseMeta = selectedChannel.release_meta
  if (!releaseMeta) {
    throw `Release meta not found for ${gameInfo.app_name}`
  }
  return [releaseMeta, selectedChannel]
}

async function resumeIfPaused(appName: string): Promise<boolean> {
  const isPaused = inProgressDownloadsMap.has(appName)
  if (isPaused) {
    const item = inProgressDownloadsMap.get(appName)
    if (item === undefined) {
      return false
    }
    item.resume()
    const success = await waitForItemToDownload(item) // inProgressDownloadsMap.get(appName)?.on
    return success
  }
  return isPaused
}

export async function install(
  appName: string,
  { path: dirpath, platformToInstall, channelName, accessCode }: InstallArgs
): Promise<InstallResult> {
  if (await resumeIfPaused(appName)) {
    return { status: 'done' }
  }
  let { directory, fileName } = { directory: '', fileName: '' }
  try {
    const gameInfo = getGameInfo(appName)
    const { title } = gameInfo

    const destinationPath = getDestinationPath(gameInfo, dirpath)

    const [releaseMeta, selectedChannel] = getReleaseMeta(gameInfo, channelName)

    const releaseVersion: string = sanitizeVersion(releaseMeta.name)
    const gameInfoVersion = gameInfo.version
      ? sanitizeVersion(gameInfo.version)
      : ''

    const installVersion = releaseVersion ?? gameInfoVersion ?? '0'

    if (platformToInstall === 'Browser') {
      const browserGameInstalledInfo: InstalledInfo = {
        appName,
        install_path: destinationPath,
        executable: '',
        install_size: '0',
        is_dlc: false,
        version: installVersion,
        platform: 'web',
        channelName
      }
      updateInstalledInfo(appName, browserGameInstalledInfo)
      return { status: 'done' }
    }

    if (!existsSync(dirpath)) {
      mkdirSync(dirpath, { recursive: true })
    }

    const window = getMainWindow()
    if (!window) return { status: 'error', error: 'Window undefined' }

    const appPlatform = handleArchAndPlatform(platformToInstall, releaseMeta)
    let platformInfo = releaseMeta.platforms[appPlatform]

    if (!platformInfo) {
      return {
        status: 'error',
        error: `Platform info not found for ${appName}`
      }
    }

    logInfo(`Installing ${title} to ${dirpath}...`, LogPrefix.HyperPlay)
    const zipPathInfo = getZipFileName(appName, platformInfo)
    directory = zipPathInfo.directory
    fileName = zipPathInfo.filename
    const zipFile = path.join(directory, fileName)

    // download the zip file
    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath, { recursive: true })
    }

    // get presigned platform info if code gated
    if (selectedChannel.license_config.access_codes) {
      if (accessCode === undefined)
        throw 'Access code was undefined for an access code gated channel'

      const gatedPlatforms = await getAccessCodeGatedPlatforms(
        accessCode,
        selectedChannel.channel_id,
        appName
      )

      platformInfo = gatedPlatforms[appPlatform] ?? platformInfo
    }

    await downloadGame(
      appName,
      directory,
      fileName,
      platformInfo,
      destinationPath
    )
    if (!platformInfo.executable) {
      return {
        status: 'error',
        error: 'Executable not found during install in HyperPlay game manager'
      }
    }
    let executable = path.join(destinationPath, platformInfo.executable)

    logInfo(`Extracting ${zipFile} to ${destinationPath}`, LogPrefix.HyperPlay)

    try {
      window.webContents.send('gameStatusUpdate', {
        appName,
        runner: 'hyperplay',
        folder: destinationPath,
        status: 'extracting'
      })

      // disables electron's fs wrapper called when extracting .asar files
      // which is necessary to extract electron app/game zip files
      process.noAsar = true
      if (isWindows) {
        await extractZip(zipFile, destinationPath)
        await installDistributables(destinationPath)
      } else {
        await extractZip(zipFile, destinationPath)
      }
      process.noAsar = false

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
        install_size: platformInfo.installSize ?? '0',
        is_dlc: false,
        version: installVersion,
        platform: appPlatform,
        channelName
      }

      updateInstalledInfo(appName, installedInfo)

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
      callAbortController(appName)
    }
    return {
      status: 'error',
      error: `${error}`
    }
  }
}

export function appIsInLibrary(appName: string): boolean {
  const appInfo = hpLibraryStore
    .get('games', [])
    .find((app) => app.app_name === appName)

  return !!appInfo
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

const uninstallGame = (appName: string) => {
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex(
    (value) => value.app_name === appName
  )
  currentLibrary[gameIndex].is_installed = false
  currentLibrary[gameIndex].install = {}
  hpLibraryStore.set('games', currentLibrary)
}

export async function uninstall({
  appName,
  shouldRemovePrefix
}: RemoveArgs): Promise<ExecResult> {
  const appInfo = getGameInfo(appName)

  if (appInfo.install.platform === 'web') {
    uninstallGame(appName)
    sendFrontendMessage('refreshLibrary', 'hyperplay')
    return { stderr: '', stdout: '' }
  }

  if (!appInfo) return { stderr: '', stdout: '' }

  if (!appInfo.install.install_path) {
    return { stderr: '', stdout: '' }
  }

  // remove game folder from install path
  const installPath = appInfo.install.install_path
  logInfo(`Removing folder in uninstall: ${installPath}`, LogPrefix.HyperPlay)
  rmSync(installPath, { recursive: true, force: true })

  // change is_installed to false
  uninstallGame(appName)

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
  if (await resumeIfPaused(appName)) {
    return { status: 'done' }
  }
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

  let accessCode: string | undefined = undefined

  // if we used an access code for this channel on last install, use it again
  // if this fails due a different license config, game will remain in an uninstalled state
  if (
    gameInfo.channels !== undefined &&
    gameInfo.install.channelName !== undefined &&
    gameInfo.channels[gameInfo.install.channelName] !== undefined
  ) {
    const channelIdOfCurrentInstall =
      gameInfo.channels[gameInfo.install.channelName].channel_id
    if (
      gameInfo.accessCodesCache !== undefined &&
      Object.hasOwn(gameInfo.accessCodesCache, channelIdOfCurrentInstall)
    )
      accessCode = gameInfo.accessCodesCache[channelIdOfCurrentInstall]
  }

  //install the new version
  const installResult = await install(appName, {
    path: path.dirname(gameInfo.install.install_path),
    platformToInstall: gameInfo.install.platform,
    channelName: gameInfo.install.channelName,
    accessCode
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
