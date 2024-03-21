import {
  InstallArgs,
  InstalledInfo,
  GameInfo,
  ExtraInfo,
  ExecResult,
  GameSettings,
  PlatformConfig,
  LicenseConfigValidateResult,
  ChannelReleaseMeta,
  WineCommandArgs
} from '../../../common/types'
import { hpLibraryStore } from './electronStore'
import { sendFrontendMessage, getMainWindow } from 'backend/main_window'
import { LogPrefix, logError, logInfo, logWarning } from 'backend/logger/logger'
import {
  ExtractZipService,
  ExtractZipProgressResponse
} from 'backend/services/ExtractZipService'
import {
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
  readFileSync,
  statSync
} from 'graceful-fs'
import {
  isMac,
  isWindows,
  isLinux,
  getValidateLicenseKeysApiUrl,
  getPatchingApiUrl,
  appConfigFolder
} from 'backend/constants'
import {
  downloadFile,
  spawnAsync,
  killPattern,
  shutdownWine,
  calculateEta
} from 'backend/utils'
import { notify, showDialogBoxModalAuto } from 'backend/dialog/dialog'
import path, { dirname, join } from 'path'
import {
  callAbortController,
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import {
  getValistPlatformOfThisPlatform,
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
import axios from 'axios'
import { PlatformsMetaInterface } from '@valist/sdk/dist/typesShared'
import { Channel } from '@valist/sdk/dist/typesApi'
import { DownloadItem, dialog } from 'electron'
import { waitForItemToDownload } from 'backend/utils/downloadFile/download_file'
import { cancelQueueExtraction } from 'backend/downloadmanager/downloadqueue'
import { captureException } from '@sentry/electron'
import Store from 'electron-store'
import i18next from 'i18next'
import { gameManagerMap } from '..'
import { runWineCommand } from 'backend/launcher'

interface ProgressDownloadingItem {
  DownloadItem: DownloadItem
  platformInfo?: PlatformConfig
  destinationPath: string
  gameInfo: GameInfo
  installVersion: string
  appPlatform: InstalledInfo['platform']
  channelName: string | undefined
}

const inProgressDownloadsMap: Map<string, ProgressDownloadingItem> = new Map()
const inProgressExtractionsMap: Map<string, ExtractZipService> = new Map()

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
  if (!dl?.DownloadItem) {
    throw `Tried to pause download for ${appName} that is not in progress!`
  }
  dl.DownloadItem.pause()
}

// check for valid json file inside the folder before importing
// if none was found, check the first folder inside the folder
// return the path to the folder with a valid json file
// if none was found return empty string
// this is necessary because we do not know which folder the user has selected, the main folder or the game folder
const getValidGameFolderPath = (
  appName: string,
  folderPath: string
): string => {
  const subFolders = readdirSync(folderPath)

  if (subFolders.includes(`${appName}.json`)) {
    return folderPath
  }

  // in case the selected folder is a dev folder with multiple games
  for (const subFolder of subFolders) {
    // check if it is a folder or a file, if it is a file, skip it
    const subFolderStats = statSync(path.join(folderPath, subFolder))
    if (subFolderStats.isDirectory()) {
      if (getValidGameFolderPath(appName, path.join(folderPath, subFolder))) {
        return path.join(folderPath, subFolder)
      }
    }
  }

  return ''
}

type HyperPlayManifest = {
  manifest: InstalledInfo
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
  pathName: string
): Promise<ExecResult> {
  pathName = getValidGameFolderPath(appName, pathName)
  if (!pathName) {
    logError(
      'Not a valid game folder, import not possible',
      LogPrefix.HyperPlay
    )

    showDialogBoxModalAuto({
      title: i18next.t('importGameErrorTitle', 'Import Game Error'),
      message: i18next.t(
        'importGameErrorMessage',
        'Not a valid game folder, importing game is not possible'
      ),
      type: 'ERROR'
    })

    throw Error('Not a valid game folder, import not possible')
  }

  // read the json file and get the game info
  const installInfo: HyperPlayManifest = JSON.parse(
    readFileSync(path.join(pathName, `${appName}.json`), 'utf8')
  )

  const currentLibrary = hpLibraryStore.get('games', [])

  const gameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appName
  })

  if (gameInLibrary === undefined) {
    logInfo('Cannot find game in library so cannot import', LogPrefix.HyperPlay)
    return { stderr: '', stdout: '' }
  }

  const gameInfo = getGameInfo(appName)
  const channel = gameInfo.channels![
    installInfo.manifest.channelName!
  ] as Channel
  const mainExe =
    channel.release_meta.platforms[installInfo.manifest.platform].executable
  const executable = path.join(pathName, mainExe)

  if (!existsSync(executable)) {
    logError(`Executable ${executable} does not exist!`, LogPrefix.HyperPlay)

    showDialogBoxModalAuto({
      title: i18next.t('importGameErrorTitle', 'Import Game Error'),
      message: i18next.t(
        'importGameErrorMessageExecutable',
        'Game Executable not found, importing game is not possible'
      ),
      type: 'ERROR'
    })

    throw Error(`Executable ${executable} does not exist!`)
  }

  gameInLibrary.install = {
    install_path: pathName,
    executable,
    install_size: installInfo.manifest.install_size ?? '0',
    is_dlc: false,
    version: installInfo.manifest.version,
    platform: installInfo.manifest.platform,
    channelName: installInfo.manifest.channelName
  }

  gameInLibrary.is_installed = true
  hpLibraryStore.set('games', currentLibrary)

  sendFrontendMessage('refreshLibrary')

  // delete current manifest file
  rmSync(path.join(pathName, `${appName}.json`))
  writeManifestFile(appName, gameInLibrary.install)
  return { stderr: '', stdout: '' }
}

export async function runWineCommandOnGame(
  runner: string,
  appName: string,
  { commandParts, wait = false, protonVerb, startFolder }: WineCommandArgs
): Promise<ExecResult> {
  if (isNative(appName)) {
    logError('runWineCommand called on native game!', LogPrefix.Gog)
    return { stdout: '', stderr: '' }
  }
  const { folder_name, install } = gameManagerMap[runner].getGameInfo(appName)
  const gameSettings = await gameManagerMap[runner].getSettings(appName)

  return runWineCommand({
    gameSettings,
    installFolderName: folder_name,
    gameInstallPath: install.install_path,
    commandParts,
    wait,
    protonVerb,
    startFolder
  })
}

type DistArgs = {
  gamePath: string
  appName: string
}

// for Windows games only
const installDistributables = async ({ gamePath, appName }: DistArgs) => {
  sendFrontendMessage('gameStatusUpdate', {
    appName,
    status: 'distributables',
    runner: 'hyperplay',
    folder: gamePath
  })

  const possibleFolders = ['dist', 'redist', 'Dist', 'Redist']
  let executables: string[] = []

  for (const folder of possibleFolders) {
    executables = executables.concat(
      await findFolderAndExecutables(gamePath, folder)
    )
  }

  for await (const executable of executables) {
    logInfo(`Installing distributable ${executable}`, LogPrefix.HyperPlay)
    // Not windows
    if (!isWindows && !isNative(appName)) {
      return runWineCommandOnGame('hyperplay', appName, {
        commandParts: [executable, '/quiet'],
        protonVerb: 'run',
        startFolder: dirname(executable)
      })
    }

    // Windows
    return spawnAsync(executable, ['/quiet'])
  }
  return
}

const findFolderAndExecutables = async (
  basePath: string,
  folderName: string
): Promise<string[]> => {
  let executables: string[] = []
  if (!existsSync(basePath)) {
    return executables
  }

  const entries = readdirSync(basePath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(basePath, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === folderName) {
        executables = executables.concat(await findExecutables(entryPath))
      } else {
        executables = executables.concat(
          await findFolderAndExecutables(entryPath, folderName)
        )
      }
    }
  }

  return executables
}

const findExecutables = async (folderPath: string): Promise<string[]> => {
  let executables: string[] = []
  const files = readdirSync(folderPath, { withFileTypes: true })
  logInfo(`Searching for executables in ${folderPath}`, LogPrefix.HyperPlay)

  for (const file of files) {
    if (file.isDirectory()) {
      const subFolderExecutables = await findExecutables(
        path.join(folderPath, file.name)
      )
      executables = executables.concat(subFolderExecutables)
    } else if (file.name.endsWith('.exe')) {
      logInfo(`Found distributable ${file.name}`, LogPrefix.HyperPlay)
      executables.push(path.join(folderPath, file.name))
    }
  }

  return executables
}

function cleanUpDownload(appName: string, directory: string) {
  inProgressDownloadsMap.delete(appName)
  inProgressExtractionsMap.delete(appName)
  deleteAbortController(appName)
  rmSync(directory, { recursive: true, force: true })
}

function getDownloadUrl(platformInfo: PlatformConfig, appName: string) {
  const is_ci =
    process.env.CI &&
    process.env.MOCK_DOWNLOAD_URL &&
    process.env.CI === 'e2e' &&
    process.env.APP_NAME_TO_MOCK &&
    process.env.APP_NAME_TO_MOCK === appName

  const downloadUrl = is_ci
    ? process.env.MOCK_DOWNLOAD_URL
    : platformInfo.external_url

  return downloadUrl
}

function roundToTenth(x: number) {
  return Math.round(x * 10) / 10
}

async function downloadGame(
  appName: string,
  directory: string,
  fileName: string,
  platformInfo: PlatformConfig,
  destinationPath: string,
  gameInfo: GameInfo,
  installVersion: string,
  appPlatform: InstalledInfo['platform'],
  channelName?: string
): Promise<void> {
  if (await resumeIfPaused(appName)) {
    return
  }
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

    const downloadUrl = getDownloadUrl(platformInfo, appName)

    if (!downloadUrl) {
      throw `Download url is invalid. Value: ${downloadUrl}`
    }

    logInfo(`Downloading from ${downloadUrl}`, LogPrefix.HyperPlay)

    function handleProgess(
      downloadedBytes: number,
      downloadSpeed: number,
      diskWriteSpeed: number,
      progress: number
    ) {
      const currentProgress = calculateProgress(
        downloadedBytes,
        Number.parseInt(platformInfo.downloadSize ?? '0'),
        downloadSpeed,
        diskWriteSpeed,
        progress
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

      window?.webContents.send(`progressUpdate-${appName}`, {
        appName,
        status: 'installing',
        runner: 'hyperplay',
        folder: destinationPath,
        progress: {
          folder: destinationPath,
          ...currentProgress
        }
      })
    }

    function onCompleted() {
      res()
    }

    function onCancel() {
      try {
        cleanUpDownload(appName, directory)
      } catch (err) {
        rej(err)
      }
      rej()
    }

    const item = await downloadFile(
      downloadUrl,
      directory,
      fileName,
      createAbortController(appName),
      handleProgess,
      onCompleted,
      onCancel
    )

    inProgressDownloadsMap.set(appName, {
      DownloadItem: item,
      appPlatform,
      gameInfo,
      destinationPath,
      platformInfo,
      installVersion,
      channelName
    })
  })
}

function calculateProgress(
  downloadedBytes: number,
  downloadSize: number,
  downloadSpeed: number,
  diskWriteSpeed: number,
  progress: number
) {
  const eta = calculateEta(downloadedBytes, downloadSpeed, downloadSize)

  return {
    percent: roundToTenth(progress),
    diskSpeed: roundToTenth(diskWriteSpeed / 1024 / 1024),
    downSpeed: roundToTenth(downloadSpeed / 1024 / 1024),
    bytes: roundToTenth(downloadedBytes / 1024 / 1024),
    eta
  }
}

function sanitizeFileName(filename: string) {
  return filename.replace(/[/\\?%*:|"<>]/g, '-')
}

function getZipFileName(
  appName: string,
  platformInfo: PlatformConfig,
  destinationPath: string
): { directory: string; filename: string } {
  const zipName = encodeURI(platformInfo.name)
  const tempfolder = path.join(destinationPath, '.temp', appName)

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

  writeManifestFile(appName, installedInfo)
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

async function resumeIfPaused(
  appName: string
): Promise<InstallResult | boolean> {
  const isPaused = inProgressDownloadsMap.has(appName)

  if (isPaused) {
    const item = inProgressDownloadsMap.get(appName)
    if (!item?.DownloadItem) {
      return false
    }

    item.DownloadItem.resume()

    if (await waitForItemToDownload(item.DownloadItem)) {
      await extract(appName, {
        appPlatform: item.appPlatform,
        gameInfo: item.gameInfo,
        destinationPath: item.destinationPath,
        platformInfo: item.platformInfo,
        installVersion: item.installVersion,
        channelName: item.channelName
      })

      return true
    }

    return false
  }

  return isPaused
}

export async function cancelExtraction(appName: string) {
  logInfo(
    `cancelExtraction: Extraction will be canceled and downloaded zip will be removed`,
    LogPrefix.HyperPlay
  )

  try {
    process.noAsar = false

    const extractZipService = inProgressExtractionsMap.get(appName)
    if (extractZipService) {
      extractZipService.cancel()
    }
  } catch (error: unknown) {
    logInfo(
      `cancelExtraction: Error while canceling the operation ${
        (error as Error).message
      } `,
      LogPrefix.HyperPlay
    )
  }
}

async function downloadIPDT() {
  try {
    const ipdtLatestReleaseMeta = await getIPDTLatestReleaseMeta()
    // download IPDT
    const ipdtName = process.platform === 'win32' ? 'ipdt.exe' : 'ipdt'
    await downloadFile(
      ipdtLatestReleaseMeta[getValistPlatformOfThisPlatform()].external_url,
      appConfigFolder,
      ipdtName,
      createAbortController('ipdt-download')
    )
  } catch (err) {
    const errorMessage = `Error downloading IPDT! ${err}`
    captureException(errorMessage)
    logError(errorMessage)
  }
}

async function downloadManifest() {
  try {
    await downloadFile(
      getPatchingApiUrl(),
      _,
      _,
      createAbortController('ipdt-download')
    )
  } catch (err) {
    const errorMessage = `Error downloading Manifest! ${err}`
    captureException(errorMessage)
    logError(errorMessage)
  }
}

export async function install(
  appName: string,
  {
    path: dirpath,
    platformToInstall,
    channelName,
    accessCode,
    updateOnly = false
  }: InstallArgs
): Promise<InstallResult> {
  if (await resumeIfPaused(appName)) {
    return { status: 'done' }
  }

  let { directory, fileName } = { directory: '', fileName: '' }
  try {
    const gameInfo = getGameInfo(appName)
    const { title } = gameInfo

    const destinationPath = updateOnly
      ? dirpath
      : getDestinationPath(gameInfo, dirpath)

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

    if (!existsSync(dirpath)) {
      mkdirSync(dirpath, { recursive: true })
    }

    logInfo(`Installing ${title} to ${dirpath}...`, LogPrefix.HyperPlay)
    const zipPathInfo = getZipFileName(appName, platformInfo, destinationPath)
    directory = zipPathInfo.directory
    fileName = zipPathInfo.filename

    // download the zip file
    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath, { recursive: true })
    }

    // Reset the download progress
    window.webContents.send(`progressUpdate-${appName}`, {
      appName,
      runner: 'hyperplay',
      folder: destinationPath,
      status: 'done',
      progress: {
        folder: destinationPath,
        percent: 0,
        diskSpeed: 0,
        downSpeed: 0,
        bytes: 0,
        eta: null
      }
    })

    await downloadGame(
      appName,
      directory,
      fileName,
      platformInfo,
      destinationPath,
      gameInfo,
      installVersion,
      appPlatform,
      channelName
    )

    if (!platformInfo.executable) {
      return {
        status: 'error',
        error: 'Executable not found during install in HyperPlay game manager'
      }
    }

    await extract(appName, {
      appPlatform,
      gameInfo,
      destinationPath,
      platformInfo,
      installVersion,
      channelName
    })

    if (platformToInstall === 'Windows') {
      logInfo(`Looking for  distributables for ${appName}`, LogPrefix.HyperPlay)
      await installDistributables({
        gamePath: destinationPath,
        appName
      })
    }
    return { status: 'done' }
  } catch (error) {
    process.noAsar = false

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

interface Extract {
  platformInfo?: PlatformConfig
  destinationPath: string
  gameInfo: GameInfo
  installVersion: string
  appPlatform: InstalledInfo['platform']
  channelName: string | undefined
}

export async function extract(
  appName: string,
  {
    platformInfo,
    destinationPath,
    gameInfo,
    installVersion,
    appPlatform,
    channelName
  }: Extract
): Promise<InstallResult> {
  let { directory, fileName } = { directory: '', fileName: '' }
  const window = getMainWindow()
  if (!window) return { status: 'error', error: 'Window undefined' }

  try {
    if (!platformInfo) {
      return {
        status: 'error',
        error: `Extracting: Platform info not found for ${appName}`
      }
    }

    const { title } = gameInfo
    const zipPathInfo = getZipFileName(appName, platformInfo, destinationPath)
    directory = zipPathInfo.directory
    fileName = zipPathInfo.filename

    // download the zip file
    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath, { recursive: true })
    }
    // Reset the download progress
    window.webContents.send(`progressUpdate-${appName}`, {
      appName,
      runner: 'hyperplay',
      folder: destinationPath,
      status: 'done',
      progress: {
        folder: destinationPath,
        percent: 0,
        diskSpeed: 0,
        downSpeed: 0,
        bytes: 0,
        eta: null
      }
    })

    if (!platformInfo.executable) {
      return {
        status: 'error',
        error: 'Executable not found during install in HyperPlay game manager'
      }
    }

    let executable = path.join(destinationPath, platformInfo.executable)

    const zipFile = path.join(directory, fileName)
    logInfo(`Extracting ${zipFile} to ${destinationPath}`, LogPrefix.HyperPlay)

    // disables electron's fs wrapper called when extracting .asar files
    // which is necessary to extract electron app/game zip files
    process.noAsar = true

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      status: 'extracting',
      runner: 'hyperplay',
      folder: destinationPath
    })

    window.webContents.send(`progressUpdate-${appName}`, {
      appName,
      runner: 'hyperplay',
      folder: destinationPath,
      status: 'extracting',
      progress: {
        folder: destinationPath,
        percent: 0,
        diskSpeed: 0,
        downSpeed: 0,
        bytes: 0,
        eta: null
      }
    })

    const extractService = new ExtractZipService(zipFile, destinationPath)

    inProgressExtractionsMap.set(appName, extractService)

    return await new Promise<InstallResult>((resolve) => {
      extractService.on(
        'progress',
        ({
          processedSizeInBytes,
          totalSizeInBytes,
          speedInBytesPerSec,
          progressPercentage
        }: ExtractZipProgressResponse) => {
          logInfo(
            `Extracting Progress: ${progressPercentage}% Speed: ${speedInBytesPerSec} B/s | Total size ${totalSizeInBytes} and ${processedSizeInBytes}`,
            LogPrefix.HyperPlay
          )
          const currentProgress = calculateProgress(
            processedSizeInBytes,
            totalSizeInBytes,
            speedInBytesPerSec,
            speedInBytesPerSec,
            progressPercentage
          )

          window.webContents.send(`progressUpdate-${appName}`, {
            appName,
            runner: 'hyperplay',
            folder: destinationPath,
            status: 'extracting',
            progress: {
              folder: destinationPath,
              ...currentProgress
            }
          })
        }
      )
      extractService.once(
        'finished',
        async ({
          progressPercentage,
          totalSizeInBytes,
          speedInBytesPerSec,
          processedSizeInBytes
        }: ExtractZipProgressResponse) => {
          logInfo(
            `Extracting End: ${progressPercentage}% Speed: ${speedInBytesPerSec} B/s | Total size ${totalSizeInBytes} and ${processedSizeInBytes}`,
            LogPrefix.HyperPlay
          )

          const currentProgress = calculateProgress(
            processedSizeInBytes,
            totalSizeInBytes,
            speedInBytesPerSec,
            speedInBytesPerSec,
            progressPercentage
          )

          window.webContents.send(`progressUpdate-${appName}`, {
            appName,
            runner: 'hyperplay',
            folder: destinationPath,
            status: 'extracting',
            progress: {
              folder: destinationPath,
              ...currentProgress
            }
          })

          window.webContents.send('gameStatusUpdate', {
            appName,
            runner: 'hyperplay',
            folder: destinationPath,
            status: 'extracting'
          })

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
            install_size: platformInfo?.installSize ?? '0',
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

          cleanUpDownload(appName, directory)

          sendFrontendMessage('refreshLibrary', 'hyperplay')

          resolve({
            status: 'done'
          })
        }
      )
      extractService.once('error', (error: Error) => {
        logError(`Extracting Error ${error.message}`, LogPrefix.HyperPlay)

        cancelQueueExtraction()
        callAbortController(appName)

        cleanUpDownload(appName, directory)

        sendFrontendMessage('refreshLibrary', 'hyperplay')

        resolve({
          status: 'error'
        })
      })
      extractService.once('canceled', () => {
        logInfo(
          `Canceled Extracting: Cancellation completed on ${appName} - Destination ${destinationPath}`,
          LogPrefix.HyperPlay
        )

        process.noAsar = false

        cancelQueueExtraction()
        callAbortController(appName)

        sendFrontendMessage('gameStatusUpdate', {
          appName,
          status: 'done',
          runner: 'hyperplay',
          folder: destinationPath
        })

        window.webContents.send(`progressUpdate-${appName}`, {
          appName,
          runner: 'hyperplay',
          folder: destinationPath,
          status: 'done',
          progress: {
            folder: destinationPath,
            percent: 0,
            diskSpeed: 0,
            downSpeed: 0,
            bytes: 0,
            eta: null
          }
        })

        notify({
          title,
          body: 'Installation Stopped'
        })

        cleanUpDownload(appName, directory)

        sendFrontendMessage('refreshLibrary', 'hyperplay')

        resolve({
          status: 'abort'
        })
      })

      extractService.extract().then()
    })
  } catch (error: unknown) {
    process.noAsar = false

    logInfo(`Error while extracting game ${error}`, LogPrefix.HyperPlay)

    window.webContents.send('gameStatusUpdate', {
      appName,
      runner: 'hyperplay',
      folder: destinationPath,
      status: 'done'
    })

    captureException(error)
  }

  return { status: 'error' }
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

  // TODO: remove this in the future, it is only needed for games downloaded from v0.10 and below
  // write manifest file
  if (appInfo?.is_installed && appInfo.install) {
    writeManifestFile(appName, appInfo.install)
  }

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
  const isAvailable = isGameAvailable(appName)

  if (!isAvailable) {
    const { title } = getGameInfo(appName)
    const { response } = await dialog.showMessageBox({
      type: 'question',
      title,
      message: i18next.t(
        'box.error.folder-not-found.title',
        'Game folder appears to be deleted, do you want to remove the game from the installed list?'
      ),
      buttons: [i18next.t('box.no'), i18next.t('box.yes')]
    })

    if (response === 1) {
      await forceUninstall(appName)
      return false
    }

    return false
  }

  return launchGame(appName, getGameInfo(appName), 'hyperplay')
}

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
    path: gameInfo.install.install_path,
    platformToInstall: gameInfo.install.platform,
    channelName: gameInfo.install.channelName,
    accessCode,
    updateOnly: true
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

function writeManifestFile(
  appName: string,
  installedInfo: Partial<InstalledInfo>
) {
  if (!installedInfo.install_path) {
    return
  }
  const store = new Store({
    cwd: installedInfo.install_path,
    name: appName
  })

  return store.set('manifest', installedInfo)
}
