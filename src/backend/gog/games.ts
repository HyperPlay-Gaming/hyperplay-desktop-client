import {
  createAbortController,
  deleteAbortController
} from '../utils/aborthandler/aborthandler'
import { GOGLibrary, runGogdlCommand } from './library'
import { join } from 'path'
import { Game } from '../games'
import { GameConfig } from '../game_config'
import { GlobalConfig } from '../config'
import {
  errorHandler,
  getFileSize,
  getGOGdlBin,
  killPattern,
  spawnAsync,
  moveOnUnix,
  moveOnWindows
} from '../utils'
import {
  ExtraInfo,
  GameInfo,
  GameSettings,
  ExecResult,
  InstallArgs,
  InstalledInfo,
  WineCommandArgs,
  InstallPlatform,
  InstallProgress
} from 'common/types'
import { appendFileSync, existsSync, rmSync } from 'graceful-fs'
import { gamesConfigPath, isWindows, isMac, isLinux } from '../constants'
import { installedGamesStore, syncStore } from '../gog/electronStores'
import { logError, logInfo, LogPrefix, logWarning } from '../logger/logger'
import { GOGUser } from './user'
import {
  getRunnerCallWithoutCredentials,
  getWinePath,
  launchCleanup,
  prepareLaunch,
  prepareWineLaunch,
  runWineCommand,
  setupEnvVars,
  setupWrappers
} from '../launcher'
import { addShortcuts, removeShortcuts } from '../shortcuts/shortcuts/shortcuts'
import setup from './setup'
import { removeNonSteamGame } from '../shortcuts/nonesteamgame/nonesteamgame'
import shlex from 'shlex'
import {
  GOGCloudSavesLocation,
  GogInstallInfo,
  GogInstallPlatform
} from 'common/types/gog'
import { t } from 'i18next'
import { showDialogBoxModalAuto } from '../dialog/dialog'
import { sendFrontendMessage } from '../main_window'

async function getExtraInfo(appName: string): Promise<ExtraInfo> {
  const gameInfo = getGameInfo(appName)
  let targetPlatform: GogInstallPlatform = 'windows'

  if (isMac && gameInfo.is_mac_native) {
    targetPlatform = 'osx'
  } else if (isLinux && gameInfo.is_linux_native) {
    targetPlatform = 'linux'
  } else {
    targetPlatform = 'windows'
  }

  const extra: ExtraInfo = {
    about: gameInfo.extra.about,
    reqs: await GOGLibrary.get().createReqsArray(appName, targetPlatform),
    storeUrl: gameInfo.store_url
  }
  return extra
}

function getGameInfo(appName: string): GameInfo {
  const info = GOGLibrary.get().getGameInfo(appName)
  if (!info) {
    logError(
      [
        'Could not get game info for',
        `${appName},`,
        'returning empty object. Something is probably gonna go wrong soon'
      ],
      LogPrefix.Gog
    )
    // @ts-expect-error TODO: Handle this better
    return {}
  }
  return info
}

function handleRunnersPlatforms(platform: InstallPlatform): InstallPlatform {
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

async function getInstallInfo(
  appName: string,
  installPlatform: InstallPlatform = 'windows'
): Promise<GogInstallInfo> {
  const info = await GOGLibrary.get().getInstallInfo(
    appName,
    handleRunnersPlatforms(installPlatform)
  )
  if (!info) {
    logWarning(
      [
        'Failed to get Install Info for',
        `${appName}`,
        `using ${installPlatform} as platform,`,
        'returning empty object'
      ],
      LogPrefix.Gog
    )
    // @ts-expect-error TODO: Handle this better
    return {}
  }
  return info
}

async function getSettings(appName: string): Promise<GameSettings> {
  return (
    GameConfig.get(appName).config ||
    (await GameConfig.get(appName).getSettings())
  )
}

async function hasUpdate(appName: string): Promise<boolean> {
  throw new Error('Method not implemented.')
}

async function importGame(appName: string, path: string): Promise<ExecResult> {
  const res = await runGogdlCommand(
    ['import', path],
    createAbortController(appName),
    {
      logMessagePrefix: `Importing ${appName}`
    }
  )

  deleteAbortController(appName)

  if (res.abort) {
    return res
  }

  if (res.error) {
    logError(['Failed to import', `${appName}:`, res.error], LogPrefix.Gog)
    return res
  }

  try {
    await GOGLibrary.get().importGame(JSON.parse(res.stdout), path)
    addShortcuts()
  } catch (error) {
    logError(['Failed to import', `${appName}:`, error], LogPrefix.Gog)
  }

  return res
}

function tmpProgress(): InstallProgress {
  return {
    bytes: '',
    eta: '',
    percent: undefined,
    diskSpeed: undefined,
    downSpeed: undefined
  }
}

function onInstallOrUpdateOutput(
  action: 'installing' | 'updating',
  data: string
) {
  // parse log for percent
  if (!tmpProgress.percent) {
    const percentMatch = data.match(/Progress: (\d+\.\d+) /m)

    tmpProgress.percent = !Number.isNaN(Number(percentMatch?.at(1)))
      ? Number(percentMatch?.at(1))
      : undefined
  }

  // parse log for eta
  if (tmpProgress.eta === '') {
    const etaMatch = data.match(/ETA: (\d\d:\d\d:\d\d)/m)
    tmpProgress.eta = etaMatch && etaMatch?.length >= 2 ? etaMatch[1] : ''
  }

  // parse log for game download progress
  if (tmpProgress.bytes === '') {
    const bytesMatch = data.match(/Downloaded: (\S+) MiB/m)
    tmpProgress.bytes =
      bytesMatch && bytesMatch?.length >= 2 ? `${bytesMatch[1]}MB` : ''
  }

  // parse log for download speed
  if (!tmpProgress.downSpeed) {
    const downSpeedMBytes = data.match(/Download\t- (\S+.) MiB/m)
    tmpProgress.downSpeed = !Number.isNaN(Number(downSpeedMBytes?.at(1)))
      ? Number(downSpeedMBytes?.at(1))
      : undefined
  }

  // parse disk write speed
  if (!tmpProgress.diskSpeed) {
    const diskSpeedMBytes = data.match(/Disk\t- (\S+.) MiB/m)
    tmpProgress.diskSpeed = !Number.isNaN(Number(diskSpeedMBytes?.at(1)))
      ? Number(diskSpeedMBytes?.at(1))
      : undefined
  }

  // only send to frontend if all values are updated
  if (
    Object.values(tmpProgress).every(
      (value) => !(value === undefined || value === '')
    )
  ) {
    logInfo(
      [
        `Progress for ${getGameInfo().title}:`,
        `${tmpProgress.percent}%/${tmpProgress.bytes}/${tmpProgress.eta}`.trim(),
        `Down: ${tmpProgress.downSpeed}MB/s / Disk: ${tmpProgress.diskSpeed}MB/s`
      ],
      LogPrefix.Gog
    )

    sendFrontendMessage(`progressUpdate-${appName}`, {
      appName: appName,
      runner: 'gog',
      status: action,
      progress: tmpProgress
    })

    // reset
    tmpProgress = {
      bytes: '',
      eta: '',
      percent: undefined,
      diskSpeed: undefined,
      downSpeed: undefined
    }
  }
}

async function install({
  path,
  installDlcs,
  platformToInstall,
  installLanguage
}: InstallArgs): Promise<{
  status: 'done' | 'error' | 'abort'
  error?: string
}> {
  const { maxWorkers } = GlobalConfig.get().getSettings()
  const workers = maxWorkers ? ['--max-workers', `${maxWorkers}`] : []
  const withDlcs = installDlcs ? '--with-dlcs' : '--skip-dlcs'

  const credentials = await GOGUser.getCredentials()

  if (!credentials) {
    logError(
      ['Failed to install', `${appName}:`, 'No credentials'],
      LogPrefix.Gog
    )
    return { status: 'error' }
  }

  const installPlatform =
    platformToInstall === 'Mac'
      ? 'osx'
      : (platformToInstall.toLowerCase() as GogInstallPlatform)

  const logPath = join(gamesConfigPath, appName + '.log')

  const commandParts: string[] = [
    'download',
    appName,
    '--platform',
    installPlatform,
    `--path=${path}`,
    '--token',
    `"${credentials.access_token}"`,
    withDlcs,
    `--lang=${installLanguage}`,
    ...workers
  ]

  const onOutput = (data: string) => {
    onInstallOrUpdateOutput('installing', data)
  }

  const res = await runGogdlCommand(
    commandParts,
    createAbortController(appName),
    {
      logFile: logPath,
      onOutput,
      logMessagePrefix: `Installing ${appName}`
    }
  )

  deleteAbortController(appName)

  if (res.abort) {
    return { status: 'abort' }
  }

  if (res.error) {
    logError(['Failed to install', `${appName}:`, res.error], LogPrefix.Gog)
    return { status: 'error', error: res.error }
  }

  // Installation succeded
  // Save new game info to installed games store
  const installInfo = await getInstallInfo(installPlatform)
  const gameInfo = getGameInfo()
  const isLinuxNative = installPlatform === 'linux'
  const additionalInfo = isLinuxNative
    ? await GOGLibrary.getLinuxInstallerInfo(appName)
    : null

  const installedData: InstalledInfo = {
    platform: installPlatform,
    executable: '',
    install_path: join(path, gameInfo.folder_name),
    install_size: getFileSize(installInfo.manifest.disk_size),
    is_dlc: false,
    version: additionalInfo ? additionalInfo.version : installInfo.game.version,
    appName: appName,
    installedWithDLCs: installDlcs,
    language: installLanguage,
    versionEtag: isLinuxNative ? '' : installInfo.manifest.versionEtag,
    buildId: isLinuxNative ? '' : installInfo.game.buildId
  }
  const array = installedGamesStore.get('installed', [])
  array.push(installedData)
  installedGamesStore.set('installed', array)
  GOGLibrary.get().refreshInstalled()
  if (isWindows) {
    logInfo('Windows os, running setup instructions on install', LogPrefix.Gog)
    try {
      await setup(appName, installedData)
    } catch (e) {
      logWarning(
        [
          `Failed to run setup instructions on install for ${gameInfo.title}, some other step might be needed for the game to work. Check the 'goggame-${appName}.script' file in the game folder`,
          'Error:',
          e
        ],
        LogPrefix.Gog
      )
    }
  }
  addShortcuts()
  return { status: 'done' }
}

function isNative(): boolean {
  const gameInfo = getGameInfo()
  if (isWindows) {
    return true
  }

  if (isMac && gameInfo.install.platform === 'osx') {
    return true
  }

  if (isLinux && gameInfo.install.platform === 'linux') {
    return true
  }

  return false
}

async function addShortcuts(fromMenu?: boolean) {
  return addShortcuts(getGameInfo(), fromMenu)
}

async function removeShortcuts() {
  return removeShortcuts(getGameInfo())
}

async function launch(launchArguments?: string): Promise<boolean> {
  const gameSettings = await getSettings()
  const gameInfo = getGameInfo()

  if (
    !gameInfo.install ||
    !gameInfo.install.install_path ||
    !gameInfo.install.platform
  ) {
    return false
  }

  if (!existsSync(gameInfo.install.install_path)) {
    errorHandler({
      error: 'appears to be deleted',
      runner: 'gog',
      appName: gameInfo.app_name
    })
    return false
  }

  const {
    success: launchPrepSuccess,
    failureReason: launchPrepFailReason,
    rpcClient,
    mangoHudCommand,
    gameModeBin,
    steamRuntime
  } = await prepareLaunch(gameSettings, gameInfo, isNative())
  if (!launchPrepSuccess) {
    appendFileSync(logFileLocation, `Launch aborted: ${launchPrepFailReason}`)
    showDialogBoxModalAuto({
      title: t('box.error.launchAborted', 'Launch aborted'),
      message: launchPrepFailReason!,
      type: 'ERROR'
    })
    return false
  }

  const exeOverrideFlag = gameSettings.targetExe
    ? ['--override-exe', gameSettings.targetExe]
    : []

  let commandEnv = isWindows
    ? process.env
    : { ...process.env, ...setupEnvVars(gameSettings) }
  const wineFlag: string[] = []

  if (!isNative()) {
    const {
      success: wineLaunchPrepSuccess,
      failureReason: wineLaunchPrepFailReason,
      envVars: wineEnvVars
    } = await prepareWineLaunch(this)
    if (!wineLaunchPrepSuccess) {
      appendFileSync(
        logFileLocation,
        `Launch aborted: ${wineLaunchPrepFailReason}`
      )
      if (wineLaunchPrepFailReason) {
        showDialogBoxModalAuto({
          title: t('box.error.launchAborted', 'Launch aborted'),
          message: wineLaunchPrepFailReason!,
          type: 'ERROR'
        })
      }
      return false
    }

    commandEnv = {
      ...commandEnv,
      ...wineEnvVars
    }

    const { bin: wineExec, type: wineType } = gameSettings.wineVersion

    // Fix for people with old config
    const wineBin =
      wineExec.startsWith("'") && wineExec.endsWith("'")
        ? wineExec.replaceAll("'", '')
        : wineExec

    wineFlag.push(
      ...(wineType === 'proton'
        ? ['--no-wine', '--wrapper', `'${wineBin}' run`]
        : ['--wine', wineBin])
    )
  }

  const commandParts = [
    'launch',
    gameInfo.install.install_path,
    ...exeOverrideFlag,
    gameInfo.app_name,
    ...wineFlag,
    '--platform',
    gameInfo.install.platform.toLowerCase(),
    ...shlex.split(launchArguments ?? ''),
    ...shlex.split(gameSettings.launcherArgs ?? '')
  ]
  const wrappers = setupWrappers(
    gameSettings,
    mangoHudCommand,
    gameModeBin,
    steamRuntime?.length ? [...steamRuntime] : undefined
  )

  const fullCommand = getRunnerCallWithoutCredentials(
    commandParts,
    commandEnv,
    wrappers,
    join(...Object.values(getGOGdlBin()))
  )
  appendFileSync(
    logFileLocation,
    `Launch Command: ${fullCommand}\n\nGame Log:\n`
  )

  const { error, abort } = await runGogdlCommand(
    commandParts,
    createAbortController(appName),
    {
      env: commandEnv,
      wrappers,
      logMessagePrefix: `Launching ${gameInfo.title}`,
      onOutput: (output: string) => {
        appendFileSync(logFileLocation, output)
      }
    }
  )

  deleteAbortController(appName)

  if (abort) {
    return true
  }

  if (error) {
    logError(['Error launching game:', error], LogPrefix.Gog)
  }

  launchCleanup(rpcClient)

  return !error
}

async function moveInstall(
  newInstallPath: string
): Promise<{ status: 'done' } | { status: 'error'; error: string }> {
  const gameInfo = getGameInfo()
  logInfo(`Moving ${gameInfo.title} to ${newInstallPath}`, LogPrefix.Gog)

  const moveImpl = isWindows ? moveOnWindows : moveOnUnix
  const moveResult = await moveImpl(newInstallPath, gameInfo)

  if (moveResult.status === 'error') {
    const { error } = moveResult
    logError(
      ['Error moving', gameInfo.title, 'to', newInstallPath, error],
      LogPrefix.Gog
    )

    return { status: 'error', error }
  }

  GOGLibrary.get().changeGameInstallPath(appName, moveResult.installPath)
  return { status: 'done' }
}

/**
 * Literally installing game, since gogdl verifies files at runtime
 */
async function repair(): Promise<ExecResult> {
  const { installPlatform, gameData, credentials, withDlcs, logPath, workers } =
    await getCommandParameters()

  if (!credentials) {
    return { stderr: 'Unable to repair game, no credentials', stdout: '' }
  }

  const commandParts = [
    'repair',
    appName,
    '--platform',
    installPlatform!,
    `--path=${gameData.install.install_path}`,
    '--token',
    `"${credentials.access_token}"`,
    withDlcs,
    `--lang=${gameData.install.language || 'en-US'}`,
    '-b=' + gameData.install.buildId,
    ...workers
  ]

  const res = await runGogdlCommand(
    commandParts,
    createAbortController(appName),
    {
      logFile: logPath,
      logMessagePrefix: `Repairing ${appName}`
    }
  )

  deleteAbortController(appName)

  if (res.error) {
    logError(['Failed to repair', `${appName}:`, res.error], LogPrefix.Gog)
  }

  return res
}

async function syncSaves(
  arg: string,
  path: string,
  gogSaves?: GOGCloudSavesLocation[]
): Promise<string> {
  if (!gogSaves) {
    return 'Unable to sync saves, gogSaves is undefined'
  }

  const credentials = await GOGUser.getCredentials()
  if (!credentials) {
    return 'Unable to sync saves, no credentials'
  }

  const gameInfo = GOGLibrary.get().getGameInfo(appName)
  if (!gameInfo || !gameInfo.install.platform) {
    return 'Unable to sync saves, game info not found'
  }

  let fullOutput = ''

  for (const location of gogSaves) {
    const commandParts = [
      'save-sync',
      location.location,
      appName,
      '--token',
      `"${credentials.refresh_token}"`,
      '--os',
      gameInfo.install.platform,
      '--ts',
      syncStore.get(`${appName}.${location.name}`, '0'),
      '--name',
      location.name,
      arg
    ]

    logInfo([`Syncing saves for ${gameInfo.title}`], LogPrefix.Gog)

    const res = await runGogdlCommand(
      commandParts,
      createAbortController(appName),
      {
        logMessagePrefix: `Syncing saves for ${gameInfo.title}`,
        onOutput: (output) => (fullOutput += output)
      }
    )

    deleteAbortController(appName)

    if (res.error) {
      logError(
        ['Failed to sync saves for', `${appName}`, `${res.error}`],
        LogPrefix.Gog
      )
    }
    if (res.stdout) {
      syncStore.set(`${appName}.${location.name}`, res.stdout.trim())
    }
  }

  return fullOutput
}

async function uninstall(): Promise<ExecResult> {
  const array = installedGamesStore.get('installed', [])
  const index = array.findIndex((game) => game.appName === appName)
  if (index === -1) {
    throw Error("Game isn't installed")
  }

  const [object] = array.splice(index, 1)
  logInfo(['Removing', object.install_path], LogPrefix.Gog)
  // Run unins000.exe /verysilent /dir=Z:/path/to/game
  const uninstallerPath = join(object.install_path, 'unins000.exe')

  const res: ExecResult = { stdout: '', stderr: '' }
  if (existsSync(uninstallerPath)) {
    const gameSettings = GameConfig.get(appName).config

    const installDirectory = isWindows
      ? object.install_path
      : await getWinePath({
          path: object.install_path,
          gameSettings
        })

    const command = [
      uninstallerPath,
      '/verysilent',
      `/dir=${shlex.quote(installDirectory)}`
    ]

    logInfo(['Executing uninstall command', command.join(' ')], LogPrefix.Gog)

    if (!isWindows) {
      runWineCommand({
        gameSettings,
        commandParts: command,
        wait: true,
        protonVerb: 'waitforexitandrun'
      })
    } else {
      const adminCommand = [
        'Start-Process',
        '-FilePath',
        uninstallerPath,
        '-Verb',
        'RunAs',
        '-ArgumentList'
      ]

      await spawnAsync('powershell', [
        ...adminCommand,
        `/verysilent /dir=${shlex.quote(installDirectory)}`
      ])
    }
  } else {
    rmSync(object.install_path, { recursive: true })
  }
  installedGamesStore.set('installed', array)
  GOGLibrary.get().refreshInstalled()
  const gameInfo = getGameInfo()
  await removeShortcuts(gameInfo)
  syncStore.delete(appName)
  await removeNonSteamGame({ gameInfo })
  return res
}

async function update(): Promise<{ status: 'done' | 'error' }> {
  const { installPlatform, gameData, credentials, withDlcs, logPath, workers } =
    await getCommandParameters()
  if (!installPlatform || !credentials) {
    return { status: 'error' }
  }

  const commandParts = [
    'update',
    appName,
    '--platform',
    installPlatform,
    `--path=${gameData.install.install_path}`,
    '--token',
    `"${credentials.access_token}"`,
    withDlcs,
    `--lang=${gameData.install.language || 'en-US'}`,
    ...workers
  ]

  const onOutput = (data: string) => {
    onInstallOrUpdateOutput('updating', data)
  }

  const res = await runGogdlCommand(
    commandParts,
    createAbortController(appName),
    {
      logFile: logPath,
      onOutput,
      logMessagePrefix: `Updating ${appName}`
    }
  )

  // This always has to be done, so we do it before checking for res.error
  sendFrontendMessage('gameStatusUpdate', {
    appName: appName,
    runner: 'gog',
    status: 'done'
  })

  deleteAbortController(appName)

  if (res.abort) {
    return { status: 'done' }
  }

  if (res.error) {
    logError(['Failed to update', `${appName}:`, res.error], LogPrefix.Gog)
    return { status: 'error' }
  }

  const installedArray = installedGamesStore.get('installed', [])
  const gameIndex = installedArray.findIndex(
    (value) => appName === value.appName
  )
  const gameObject = installedArray[gameIndex]

  if (gameData.install.platform !== 'linux') {
    const installInfo = await getInstallInfo()
    gameObject.buildId = installInfo.game.buildId
    gameObject.version = installInfo.game.version
    gameObject.versionEtag = installInfo.manifest.versionEtag
    gameObject.install_size = getFileSize(installInfo.manifest.disk_size)
  } else {
    const installerInfo = await GOGLibrary.getLinuxInstallerInfo(appName)
    if (!installerInfo) {
      return { status: 'error' }
    }
    gameObject.version = installerInfo.version
  }
  installedGamesStore.set('installed', installedArray)
  GOGLibrary.get().refreshInstalled()
  return { status: 'done' }
}

/**
 * Reads game installed data and returns proper parameters
 * Useful for Update and Repair
 */
async function getCommandParameters() {
  const { maxWorkers } = GlobalConfig.get().getSettings()
  const workers = maxWorkers ? ['--max-workers', `${maxWorkers}`] : []
  const gameData = getGameInfo()
  const logPath = join(gamesConfigPath, appName + '.log')
  const credentials = await GOGUser.getCredentials()

  const withDlcs = gameData.install.installedWithDLCs
    ? '--with-dlcs'
    : '--skip-dlcs'
  if (GOGUser.isTokenExpired()) {
    await GOGUser.refreshToken()
  }

  const installPlatform = gameData.install.platform

  return {
    withDlcs,
    workers,
    installPlatform,
    logPath,
    credentials,
    gameData
  }
}

async function runWineCommand({
  commandParts,
  wait = false,
  protonVerb,
  startFolder
}: WineCommandArgs): Promise<ExecResult> {
  if (isNative()) {
    logError('runWineCommand called on native game!', LogPrefix.Gog)
    return { stdout: '', stderr: '' }
  }
  const { folder_name } = getGameInfo()
  const gameSettings = await getSettings()

  return runWineCommand({
    gameSettings,
    installFolderName: folder_name,
    commandParts,
    wait,
    protonVerb,
    startFolder
  })
}

async function forceUninstall(): Promise<void> {
  const installed = installedGamesStore.get('installed', [])
  const newInstalled = installed.filter((g) => g.appName !== appName)
  installedGamesStore.set('installed', newInstalled)
  sendFrontendMessage('refreshLibrary', 'gog')
}

// Could be removed if gogdl handles SIGKILL and SIGTERM for us
// which is send via AbortController
async function stop(): Promise<void> {
  const pattern = isLinux ? appName : 'gogdl'
  killPattern(pattern)
}
