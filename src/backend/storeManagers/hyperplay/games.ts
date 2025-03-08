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
  SiweValues,
  UpdateArgs
} from '../../../common/types'
import { generateID } from '@valist/sdk'
import { hpLibraryStore } from './electronStore'
import { sendFrontendMessage, getMainWindow } from 'backend/main_window'
import {
  LogPrefix,
  logDebug,
  logError,
  logInfo,
  logWarning
} from 'backend/logger/logger'
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
  ipdtPatcher,
  toolsPath,
  ipdtManifestsPath
} from 'backend/constants'
import {
  downloadFile,
  spawnAsync,
  killPattern,
  shutdownWine,
  getExecutableAndArgs,
  calculateProgress,
  calculateEta,
  getFileSize,
  getPlatformName
} from 'backend/utils'
import { notify, showDialogBoxModalAuto } from 'backend/dialog/dialog'
import path, { dirname, join } from 'path'
import {
  callAbortController,
  createAbortController,
  deleteAbortController
} from 'backend/utils/aborthandler/aborthandler'
import {
  getIPDTManifestUrl,
  handleArchAndPlatform,
  handlePlatformReversed,
  runModPatcher,
  sanitizeVersion,
  safeRemoveDirectory
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
import { PlatformsMetaInterface } from '@valist/sdk/dist/typesShared'
import { Channel } from '@valist/sdk/dist/typesApi'
import { DownloadItem, dialog } from 'electron'
import { waitForItemToDownload } from 'backend/utils/downloadFile/download_file'
import {
  cancelQueueExtraction,
  getFirstQueueElement,
  updateQueueElementParam
} from 'backend/downloadmanager/downloadqueue'
import { captureException } from '@sentry/electron'
import Store from 'electron-store'
import i18next from 'i18next'
import { DEV_PORTAL_URL } from 'common/constants'
import getPartitionCookies from 'backend/utils/get_partition_cookies'
import { prepareBaseGameForModding } from 'backend/ipcHandlers/mods'
import { runWineCommandOnGame } from 'backend/utils/compatibility_layers'

import { chmod, writeFile } from 'fs/promises'
import { trackEvent } from 'backend/metrics/metrics'
import { getFlag } from 'backend/flags/flags'
import { ipfsGateway } from 'backend/vite_constants'
import { GlobalConfig } from 'backend/config'
import { PatchingError } from './types'
import { SiweMessage } from 'siwe'

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
export const inProgressExtractionsMap: Map<string, ExtractZipService> =
  new Map()

export async function getSettings(appName: string): Promise<GameSettings> {
  return getSettingsSideload(appName)
}

export const isGameAvailable = async (appName: string) => {
  const hpGameInfo = getGameInfo(appName)
  if (hpGameInfo && hpGameInfo.install.platform === 'web') {
    return true
  }

  if (hpGameInfo.install && hpGameInfo.install.executable) {
    let { executable } = getExecutableAndArgs(hpGameInfo.install.executable)
    const { targetExe } = await getSettings(appName)

    if (targetExe) {
      executable = targetExe
    }

    // on linux and mac replace backslashes with forward slashes on executable
    if (!isWindows) {
      executable = executable.replace(/\\/g, '/')
    }

    return existsSync(executable)
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
  // Accessing the platform data with type assertion
  const platformKey = installInfo.manifest
    .platform as keyof PlatformsMetaInterface
  const platformData = channel.release_meta.platforms[platformKey]
  if (!platformData || !platformData.executable) {
    logError(
      `Platform data not found for ${appName} in importGame`,
      LogPrefix.HyperPlay
    )
    return { stderr: '', stdout: '' }
  }
  const mainExe = platformData.executable
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

  sendFrontendMessage('refreshLibrary', 'hyperplay')

  // delete current manifest file
  rmSync(path.join(pathName, `${appName}.json`))
  writeManifestFile(appName, gameInLibrary.install)
  return { stderr: '', stdout: '' }
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

export async function cleanUpDownload(appName: string, directory: string) {
  inProgressDownloadsMap.delete(appName)
  inProgressExtractionsMap.delete(appName)
  deleteAbortController(appName)
  await safeRemoveDirectory(directory)
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

    async function onCancel() {
      try {
        await cleanUpDownload(appName, directory)
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

export async function validateAccessCode({
  accessCode,
  channelId,
  licenseConfigId
}: {
  accessCode: string
  channelId?: number
  licenseConfigId?: number
}) {
  const validateUrl = getValidateLicenseKeysApiUrl()

  /* eslint-disable-next-line */
  const request: Record<string, any> = {
    code: accessCode
  }
  if (channelId !== undefined) {
    request.channel_id = channelId
  }
  if (licenseConfigId !== undefined) {
    request.license_config_id = licenseConfigId
  }

  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const validateResult = await fetch(validateUrl, {
    method: 'POST',
    headers: {
      Cookie: cookieString
    },
    body: JSON.stringify(request)
  })
  const result: LicenseConfigValidateResult = await validateResult.json()
  return result
}

async function getAccessCodeGatedPlatforms(
  accessCode: string,
  channelId: number,
  appName: string
): Promise<PlatformsMetaInterface> {
  const validateResult = await validateAccessCode({ accessCode, channelId })

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

async function getTokenGatedPlatforms(
  channel_id: number,
  siweValues: SiweValues
): Promise<PlatformsMetaInterface> {
  const { address, message, signature } = siweValues

  const request = {
    message,
    signature,
    address,
    channel_id
  }
  const validateUrl = `${DEV_PORTAL_URL}api/v1/license_contracts/validate`
  const validateResponse = await fetch(validateUrl, {
    method: 'POST',
    body: JSON.stringify(request)
  })

  if (!validateResponse.ok) {
    throw `Could not validate access ${await validateResponse.text()}`
  }

  const validateResult: LicenseConfigValidateResult =
    await validateResponse.json()

  if (validateResult.valid !== true)
    throw `Address code ${address} is not valid for channel id ${channel_id}!`

  if (validateResult.platforms === undefined)
    throw 'Token gated platforms returned by the validate url were undefined'

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

export function getDestinationPath(gameInfo: GameInfo, dirpath: string) {
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

export function gameIsAccessCodeGated(appName: string): boolean {
  const gameInfo = getGameInfo(appName)

  const [, installedChannel] = getReleaseMeta(
    gameInfo,
    gameInfo.install.channelName
  )
  return installedChannel.license_config.access_codes
}

export async function install(
  appName: string,
  {
    path: dirpath,
    platformToInstall,
    channelName,
    accessCode,
    updateOnly = false,
    siweValues,
    modOptions
  }: InstallArgs
): Promise<InstallResult> {
  if (await resumeIfPaused(appName)) {
    return { status: 'done' }
  }

  let { directory, fileName } = { directory: '', fileName: '' }
  try {
    const gameInfo = getGameInfo(appName)
    const { title, account_name } = gameInfo
    const isMarketWars = account_name === 'marketwars'

    if (isMarketWars && modOptions?.zipFilePath) {
      try {
        await prepareBaseGameForModding({
          appName,
          zipFile: modOptions.zipFilePath,
          installPath: dirpath
        })
      } catch (error) {
        callAbortController(appName)
        return { status: 'error' }
      }
    }

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

    if (selectedChannel.license_config.tokens) {
      if (!siweValues?.address) throw 'No address found'
      const gatedPlatforms = await getTokenGatedPlatforms(
        selectedChannel.channel_id,
        siweValues
      )

      platformInfo = gatedPlatforms[appPlatform] ?? platformInfo
    } else if (selectedChannel.license_config.access_codes) {
      // get presigned platform info if code gated
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

    if (isMarketWars) {
      try {
        await runModPatcher(appName)
      } catch (error) {
        return { status: 'error' }
      }
    }

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
      return {
        status: 'abort'
      }
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

          await cleanUpDownload(appName, directory)

          sendFrontendMessage('refreshLibrary', 'hyperplay')

          resolve({
            status: 'done'
          })
        }
      )
      extractService.once('error', async (error: Error) => {
        logError(`Extracting Error ${error.message}`, LogPrefix.HyperPlay)

        cancelQueueExtraction()
        callAbortController(appName)

        await cleanUpDownload(appName, directory)

        sendFrontendMessage('refreshLibrary', 'hyperplay')

        resolve({
          status: 'error'
        })
      })
      extractService.once('canceled', async () => {
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

        await cleanUpDownload(appName, directory)

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
  if (!appName) {
    throw new Error('AppName is empty')
  }

  const appInfo = hpLibraryStore
    .get('games', [])
    .find((app) => app.app_name === appName)

  if (!appInfo) {
    throw new Error(`AppName ${appName} not found in library`)
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

export async function launch(appName: string): Promise<boolean> {
  const isAvailable = await isGameAvailable(appName)

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

async function createSiweMessage(signerAddress: string): Promise<SiweMessage> {
  const mainWindowUrl = getMainWindow()?.webContents.getURL()
  if (mainWindowUrl === undefined) {
    throw 'could not get main window url'
  }
  const url = new URL(mainWindowUrl)
  let domain = url.host
  let origin = url.origin
  // host is empty string and origin is null on the artifact
  if (url.protocol === 'file:') {
    domain = 'hyperplay'
    origin = 'file://hyperplay'
  }

  const statementRes = await fetch(
    DEV_PORTAL_URL + 'api/v1/license_contracts/validate/get-nonce'
  )
  if (!statementRes.ok) {
    const responseError = await statementRes.text()
    throw new Error(`Failed to get nonce for SIWE message. ${responseError}`)
  }
  const nonce = await statementRes.text()

  return new SiweMessage({
    domain,
    address: signerAddress,
    statement: nonce.replaceAll('"', ''),
    uri: origin,
    version: '1',
    chainId: 1
  })
}

export async function requestSIWE() {
  const providers = await import('@hyperplay/providers')
  const signer = await providers.provider.getSigner()
  const address = await signer.getAddress()
  const siweMessage = await createSiweMessage(address)
  const message = siweMessage.prepareMessage()
  const signature = await signer.signMessage(message)

  return {
    message,
    signature,
    address
  }
}

// TODO: Refactor to only replace updated files
export async function update(
  appName: string,
  args?: UpdateArgs
): Promise<InstallResult> {
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

  const {
    channels,
    install: { channelName, platform, install_size, install_path, executable }
  } = gameInfo

  const isValidUpdate =
    channels &&
    channelName &&
    platform &&
    install_path &&
    executable &&
    install_size !== undefined

  if (!isValidUpdate) {
    logError(
      `Channel name or platform not found for ${appName} in update`,
      LogPrefix.HyperPlay
    )
    throw new Error('Channel name or platform not found')
  }

  const channelRequiresToken = !!channels[channelName]?.license_config.tokens

  if (channelRequiresToken && args?.siweValues === undefined) {
    // request from frontend
    if (args === undefined) {
      args = {}
    }
    try {
      args.siweValues = await requestSIWE()
    } catch (err) {
      logError(
        `Could not get SIWE sig for updating token gated game. ${err}`,
        LogPrefix.HyperPlay
      )
      captureException(err)
    }
  }

  const newVersion = channels[channelName].release_meta.name
  const abortController = createAbortController(appName)
  const { status, error } = await applyPatching(
    gameInfo,
    newVersion,
    abortController.signal
  )

  const isMarketWars = gameInfo.account_name === 'marketwars'

  if (status === 'abort') {
    logWarning(`Patching ${appName} aborted`, LogPrefix.HyperPlay)
    return { status: 'abort' }
  } else if (status === 'error' && !error?.includes('aborted')) {
    // if error, download the zip file
    const installResult = await install(appName, {
      path: gameInfo.install.install_path,
      platformToInstall: gameInfo.install.platform,
      channelName: gameInfo.install.channelName,
      accessCode: args?.accessCode,
      updateOnly: true,
      siweValues: args?.siweValues
    })
    if (isMarketWars) {
      try {
        await runModPatcher(appName)
      } catch (error) {
        logError(`Error running mod patcher: ${error}`, LogPrefix.HyperPlay)
        return { status: 'error', error: `${error}` }
      }
    }
    return installResult
  }

  if (isMarketWars) {
    try {
      await runModPatcher(appName)
    } catch (error) {
      return { status: 'error' }
    }
  }

  const installedInfo: InstalledInfo = {
    appName,
    install_path,
    executable,
    install_size,
    is_dlc: false,
    version: newVersion,
    platform,
    channelName
  }

  updateInstalledInfo(appName, installedInfo)
  sendFrontendMessage('refreshLibrary', 'hyperplay')
  notify({
    title: gameInfo.title,
    body: 'Updated'
  })
  return { status: 'done' }
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

export const downloadPatcher = async () => {
  try {
    const { downloadIPDTForOS } = await import('@hyperplay/patcher')
    const versionFile = path.join(toolsPath, 'ipdt_version.txt')

    const currentVersion = existsSync(versionFile)
      ? readFileSync(versionFile, 'utf-8')
      : undefined

    await downloadIPDTForOS(toolsPath, currentVersion)
    const version = await getIpdtPatcherVersion()

    logInfo(`IPDT patcher ${version} setup successfully`, LogPrefix.HyperPlay)
    await writeFile(versionFile, version)

    if (!isWindows) {
      await chmod(ipdtPatcher, 0o755)
    }
  } catch (error) {
    captureException(error, {
      extra: {
        method: 'downloadPatcher'
      },
      tags: {
        feature: 'Patcher',
        method: 'downloadPatcher'
      }
    })

    const errorMsg = `Error downloading IPDT: ${error}`
    logError(errorMsg, LogPrefix.HyperPlay)
    throw errorMsg
  }
}

const getIpdtPatcherVersion = async () => {
  const { stdout } = await spawnAsync(ipdtPatcher, ['-version'])
  return 'v' + `${stdout}`.split(' ')[2]
}

export async function downloadGameIpdtManifest(
  appName: string,
  version: string
) {
  try {
    const {
      install: { channelName, platform },
      is_installed
    } = getGameInfo(appName)
    if (!channelName || !platform || !is_installed) throw Error('Invalid game')

    // download only if the manifest file is not already downloaded and its the same version
    const manifestName = `${appName}-${platform}-${version}.json`
    const manifestPath = path.join(ipdtManifestsPath, manifestName)
    if (!existsSync(ipdtManifestsPath)) {
      mkdirSync(ipdtManifestsPath, { recursive: true })
    }
    if (existsSync(manifestPath)) return

    const releaseId = generateID(appName, version)
    const manifestUrl = await getIPDTManifestUrl(releaseId, platform)
    if (!manifestUrl) return logWarning(`Manifest not found for ${appName}`)

    // download and save the manifest file as a json file in manifest folder
    logInfo(
      `Downloading manifest for ${appName} from ${manifestUrl} to ${manifestPath}`,
      LogPrefix.HyperPlay
    )
    const response = await fetch(manifestUrl)
    if (!response.ok) {
      throw new Error(`Failed to download manifest: ${response.statusText}`)
    }
    const manifestData = await response.text()
    await writeFile(manifestPath, manifestData)
  } catch (error) {
    logError(
      `Error downloading manifest for ${appName}: ${error}`,
      LogPrefix.HyperPlay
    )
    captureException(
      new Error(`Error downloading manifest for ${appName}: ${error}`),
      {
        extra: {
          method: 'downloadGameIpdtManifest',
          appName,
          version
        }
      }
    )
    throw new Error(`Error downloading manifest for ${appName}: ${error}`)
  }
}

async function checkIfPatchingIsFaster(
  oldManifestPath: string,
  newManifestPath: string,
  gameInfo: GameInfo
) {
  // read manifests
  const oldManifestJson = JSON.parse(readFileSync(oldManifestPath).toString())
  const newManifestJson = JSON.parse(readFileSync(newManifestPath).toString())

  // compare manifests

  const { compareManifests } = await import('@hyperplay/patcher')
  const { estimatedPatchSizeInKB } = compareManifests(
    oldManifestJson.files,
    newManifestJson.files
  )

  // calc break point % where patching is faster
  if (
    gameInfo?.install?.platform &&
    gameInfo.channels &&
    gameInfo?.install?.channelName &&
    Object.hasOwn(gameInfo.channels, gameInfo.install.channelName)
  ) {
    const channelName = gameInfo.install.channelName
    const [releaseMeta] = getReleaseMeta(gameInfo, channelName)
    const platform = handleArchAndPlatform(
      gameInfo.install.platform,
      releaseMeta
    )
    const downloadSize = parseInt(
      releaseMeta.platforms[platform]?.downloadSize ?? '0'
    )
    const installSize = parseInt(
      releaseMeta.platforms[platform]?.installSize ?? '0'
    )
    // @TODO: get these speed values from local checks of download/write speed
    const patchingSpeeds = getFlag('patching-speeds', {
      downloadSpeedInKBPerSecond: 25600,
      extractionSpeedInKBPerSecond: 51200,
      patchingSpeedEstimateInKBPerSecond: 5120
    }) as {
      downloadSpeedInKBPerSecond: number
      extractionSpeedInKBPerSecond: number
      patchingSpeedEstimateInKBPerSecond: number
    }
    const downloadSpeedInKBPerSecond = patchingSpeeds.downloadSpeedInKBPerSecond
    const extractionSpeedInKBPerSecond =
      patchingSpeeds.extractionSpeedInKBPerSecond
    const estTimeToInstallFullGameInSec =
      (downloadSize / 1024) * downloadSpeedInKBPerSecond +
      (installSize / 1024) * extractionSpeedInKBPerSecond

    // @TODO: get this value from local check of patching speed
    const patchingSpeedEstimateInKBPerSecond =
      patchingSpeeds.patchingSpeedEstimateInKBPerSecond
    const estTimeToPatchGameInSec =
      estimatedPatchSizeInKB / patchingSpeedEstimateInKBPerSecond

    if (estTimeToPatchGameInSec > estTimeToInstallFullGameInSec) {
      const abortMessage = `Downloading full game instead of patching. \n 
        Estimated time to install full game: ${estTimeToInstallFullGameInSec} seconds. \n
        Estimated time to patch: ${estTimeToPatchGameInSec}
      `
      logInfo(abortMessage, LogPrefix.HyperPlay)
      const patchingError = new PatchingError(
        abortMessage,
        'slower-than-install',
        {
          event: 'Patching Too Slow',
          properties: {
            game_name: gameInfo.app_name,
            game_title: gameInfo.title,
            platform: getPlatformName(platform),
            platform_arch: platform,
            est_time_to_install_sec: estTimeToInstallFullGameInSec.toString(),
            est_time_to_patch_sec: estTimeToPatchGameInSec.toString(),
            old_game_version: gameInfo.install.version ?? 'unknown',
            new_game_version: gameInfo.version ?? 'unknown'
          }
        }
      )
      throw patchingError
    }
  }
}

async function applyPatching(
  gameInfo: GameInfo,
  newVersion: string,
  signal: AbortSignal
): Promise<InstallResult> {
  const gamesPatcherIsEnabled = getFlag('enable-patcher-per-game', {}) as object

  if (!Object.hasOwn(gamesPatcherIsEnabled, gameInfo.app_name) || !isWindows) {
    return { status: 'error' }
  }

  const {
    app_name: appName,
    install: { install_path, version, platform }
  } = gameInfo

  const datastoreDir = path.join(install_path!, '.temp', appName)

  try {
    const { patchFolder } = await import('@hyperplay/patcher')

    const mainWindow = getMainWindow()
    let aborted = false

    await downloadPatcher()

    if (!version || !install_path || !platform) {
      logError(
        `Version or install path not found for ${appName} in applyPatching`,
        LogPrefix.HyperPlay
      )
      captureException(
        new Error(
          'Could not start patching because of missing version, install_path or platform'
        ),
        {
          extra: {
            method: 'applyPatching',
            appName,
            install_path,
            title: gameInfo.title,
            platform,
            version,
            newVersion
          }
        }
      )

      return { status: 'error', error: 'Version or install path not found' }
    }

    trackEvent({
      event: 'Patching Started',
      properties: {
        game_name: gameInfo.app_name,
        game_title: gameInfo.title,
        platform: getPlatformName(platform),
        platform_arch: platform
      }
    })

    const previousManifest = await getManifest(appName, platform, version)
    const currentManifest = await getManifest(appName, platform, newVersion)

    // check if it is faster to patch or install and throw if install is faster
    await checkIfPatchingIsFaster(previousManifest, currentManifest, gameInfo)

    logInfo(
      `Patching ${gameInfo.title} from ${version} to ${newVersion}`,
      LogPrefix.HyperPlay
    )

    let totalBlocks = 0
    let downloadedBlocks = 0
    let downloadedData = 0
    const blockSize = 512 * 1024 // 512KB in bytes
    const startTime = Date.now()

    if (!existsSync(datastoreDir)) {
      mkdirSync(datastoreDir, { recursive: true })
    }

    const { maxWorkers } = GlobalConfig.get().getSettings()

    const { generator } = patchFolder(
      ipdtPatcher,
      install_path,
      currentManifest,
      previousManifest,
      {
        signal,
        s3API: ipfsGateway,
        datastoreDir,
        workers: maxWorkers || 6
      }
    )

    if (signal.aborted) {
      logInfo(`Patching ${appName} aborted`, LogPrefix.HyperPlay)
      await safeRemoveDirectory(datastoreDir, {
        sizeThresholdMB: blockSize * totalBlocks
      })
      aborted = true
      return { status: 'abort' }
    }

    signal.onabort = async () => {
      aborted = true
      await safeRemoveDirectory(datastoreDir, {
        sizeThresholdMB: blockSize * totalBlocks
      })
      return { status: 'abort' }
    }

    for await (const output of generator) {
      logInfo(output, LogPrefix.HyperPlay)

      if (signal.aborted) {
        logInfo(`Patching ${appName} aborted`, LogPrefix.HyperPlay)
        return { status: 'abort' }
      }

      if (output.includes('connection refused')) {
        logError(
          `Error while patching ${appName}: connection refused`,
          LogPrefix.HyperPlay
        )
        return {
          status: 'error',
          error: 'Error while patching: connection refused'
        }
      }

      const match = output.match(
        /Blocks: (\d+)\/(\d+), Data Downloaded: ([\d.]+)/
      )
      if (match) {
        downloadedBlocks = parseInt(match[1], 10)
        totalBlocks = parseInt(match[2], 10)
        downloadedData = parseInt(match[3])

        const percent = (downloadedBlocks / totalBlocks) * 100
        const currentTime = Date.now()
        const elapsedTime = (currentTime - startTime) / 1000 // in seconds
        const downloadedDataInMiB = downloadedData / 1024 / 1024
        const downloadSpeed = downloadedData / elapsedTime
        const totalSize = blockSize * totalBlocks
        const eta = calculateEta(downloadedData, downloadSpeed, totalSize) ?? 0

        // update queue element.size with totalSize
        const queueElement = getFirstQueueElement()
        if (queueElement) {
          updateQueueElementParam(queueElement, 'params', {
            ...queueElement.params,
            size: getFileSize(totalSize)
          })
        }

        sendFrontendMessage('gameStatusUpdate', {
          appName,
          status: 'patching',
          runner: 'hyperplay',
          folder: gameInfo.install.install_path
        })

        mainWindow?.webContents.send(`progressUpdate-${appName}`, {
          appName,
          status: 'patching',
          runner: 'hyperplay',
          folder: gameInfo.install.install_path,
          progress: {
            folder: gameInfo.install.install_path,
            totalSize,
            percent,
            diskSpeed: downloadSpeed / 1024 / 1024,
            downSpeed: downloadSpeed / 1024 / 1024,
            bytes: downloadedDataInMiB,
            eta
          }
        })

        logInfo(
          `Progress: ${percent.toFixed(2)}%, Downloaded: ${getFileSize(
            downloadedData
          )}, Speed: ${getFileSize(
            downloadSpeed
          )}/s, ETA: ${eta} totalSize: ${totalSize} = ${getFileSize(
            totalSize
          )}`,
          LogPrefix.HyperPlay
        )
      }
    }
    // need this to cover 100% of abort cases
    if (aborted) {
      try {
        await safeRemoveDirectory(datastoreDir, {
          sizeThresholdMB: blockSize * totalBlocks
        })
      } catch (cleanupError) {
        trackEvent({
          event: 'Patching Cleanup Failed',
          properties: {
            error: `${cleanupError}`,
            game_name: gameInfo.app_name,
            game_title: gameInfo.title,
            platform: getPlatformName(platform),
            platform_arch: platform
          }
        })

        logWarning(
          `Patching aborted and cleanup failed: ${cleanupError}`,
          LogPrefix.HyperPlay
        )
      }
      trackEvent({
        event: 'Patching Aborted',
        properties: {
          game_name: gameInfo.app_name,
          game_title: gameInfo.title,
          platform: getPlatformName(platform),
          platform_arch: platform
        }
      })
      return { status: 'abort' }
    }

    trackEvent({
      event: 'Patching Success',
      properties: {
        game_name: gameInfo.app_name,
        game_title: gameInfo.title,
        platform: getPlatformName(platform),
        platform_arch: platform
      }
    })

    logInfo(`Patching ${appName} completed`, LogPrefix.HyperPlay)
    try {
      await safeRemoveDirectory(datastoreDir, {
        sizeThresholdMB: blockSize * totalBlocks
      })
    } catch (cleanupError) {
      trackEvent({
        event: 'Patching Cleanup Failed',
        properties: {
          error: `${cleanupError}`,
          game_name: gameInfo.app_name,
          game_title: gameInfo.title,
          platform: getPlatformName(platform),
          platform_arch: platform
        }
      })

      logWarning(
        `Patching succeeded but cleanup failed: ${cleanupError}`,
        LogPrefix.HyperPlay
      )
    }
    return { status: 'done' }
  } catch (error) {
    if (error instanceof PatchingError) {
      if (error.reason === 'slower-than-install') {
        if (error.eventToTrack) {
          trackEvent(error.eventToTrack)
        }
        // this will not track any error events or call captureException in the calling code. it will try to install
        return { status: 'error' }
      }
    }

    logError(`Error while patching ${error}`, LogPrefix.HyperPlay)

    trackEvent({
      event: 'Patching Failed',
      properties: {
        error: `${error}`,
        game_name: gameInfo.app_name,
        game_title: gameInfo.title,
        platform: getPlatformName(platform!),
        platform_arch: platform!
      }
    })

    captureException(new Error(`Error while patching ${error}`), {
      extra: {
        method: 'applyPatching',
        appName,
        title: gameInfo.title,
        install_path,
        platform,
        version,
        newVersion
      }
    })

    // errors can be thrown before datastore dir created. rmSync on nonexistent dir blocks indefinitely
    if (existsSync(datastoreDir)) {
      try {
        await safeRemoveDirectory(datastoreDir)
      } catch (cleanupError) {
        trackEvent({
          event: 'Patching Cleanup Failed',
          properties: {
            error: `${cleanupError}`,
            game_name: gameInfo.app_name,
            game_title: gameInfo.title
          }
        })

        logWarning(
          `Patching failed and cleanup failed: ${cleanupError}`,
          LogPrefix.HyperPlay
        )
      }
    }

    return { status: 'error', error: `Error while patching ${error}` }
  }
}

async function getManifest(
  appName: string,
  platformName: string,
  version: string
) {
  try {
    const manifestPath = path.join(
      ipdtManifestsPath,
      `${appName}-${platformName}-${version}.json`
    )

    if (!existsSync(manifestPath)) {
      logDebug(
        `Manifest for ${appName} not found for version ${version} and platform ${platformName}, downloading it.`,
        LogPrefix.HyperPlay
      )

      await downloadGameIpdtManifest(appName, version)
    }

    return manifestPath
  } catch (error) {
    logError(
      `Error in getManifest for ${appName}: ${error}`,
      LogPrefix.HyperPlay
    )
    captureException(
      new Error(`Error in getManifest for ${appName}: ${error}`),
      {
        extra: {
          method: 'getManifest',
          appName,
          platformName,
          version
        }
      }
    )
    throw new Error(`Error in getManifest for ${appName}: ${error}`)
  }
}

// TODO: finish this method for Repair Game purposes
/* export async function generateManifestFromFolder(appName: string) {
  const gameInfo = getGameInfo(appName)
  const { install_path, version } = gameInfo.install

  if (!version || !install_path) {
    logError(
      `Version or install path not found for ${appName} in generateManifestFromFolder`,
      LogPrefix.HyperPlay
    )
    throw new Error('Version or install path not found')
  }

  const manifestPath = getManifest(appName, version)
  const generatedManifest = join(manifestPath, '.current')

  // generate manifest from folder
  const manifest = await generateManifestFile(install_path, generatedManifest)
} */
