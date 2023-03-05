import { GameSettings, SideloadGame } from 'common/types'
import { libraryStore } from './electronStores'
import { GameConfig } from '../game_config'
import { isWindows, isMac, isLinux, gamesConfigPath, icon } from '../constants'
import { killPattern } from '../utils'
import { logInfo, LogPrefix, logWarning } from '../logger/logger'
import path, { dirname, join, resolve } from 'path'
import {
  appendFileSync,
  constants as FS_CONSTANTS,
  existsSync,
  readdirSync,
  rmSync
} from 'graceful-fs'
import i18next from 'i18next'
import {
  callRunner,
  launchCleanup,
  prepareLaunch,
  runWineCommand,
  setupEnvVars,
  setupWrappers
} from '../launcher'
import { access, chmod } from 'fs/promises'
import { addShortcuts, removeShortcuts } from '../shortcuts/shortcuts/shortcuts'
import shlex from 'shlex'
import { notify, showDialogBoxModalAuto } from '../dialog/dialog'
import { createAbortController } from '../utils/aborthandler/aborthandler'
import { sendFrontendMessage } from '../main_window'
import { app, BrowserWindow } from 'electron'
import { getHyperPlayGameInfo } from 'backend/hyperplay/games'
import { isGameNative } from 'backend/main'
const buildDir = resolve(__dirname, '../../build')

export function appLogFileLocation(appName: string) {
  return join(gamesConfigPath, `${appName}-lastPlay.log`)
}

export function getAppInfo(appName: string): SideloadGame {
  const store = libraryStore.get('games', [])
  const info = store.find((app) => app.app_name === appName)
  if (!info) {
    // @ts-expect-error TODO: As with LegendaryGame and GOGGame, handle this properly
    return {}
  }
  return info
}

export async function getAppSettings(appName: string): Promise<GameSettings> {
  return (
    GameConfig.get(appName).config ||
    (await GameConfig.get(appName).getSettings())
  )
}

export function addNewApp({
  app_name,
  title,
  install: { executable, platform },
  art_cover,
  art_square,
  web3,
  browserUrl,
  is_installed = true,
  description,
  wineSupport,
  systemRequirements
}: SideloadGame): void {
  const game: SideloadGame = {
    runner: 'sideload',
    app_name,
    title,
    install: {
      executable,
      platform
    },
    folder_name: dirname(executable),
    art_cover,
    is_installed: is_installed !== undefined ? is_installed : true,
    art_square,
    canRunOffline: !browserUrl,
    browserUrl,
    web3,
    description,
    wineSupport,
    systemRequirements
  }

  if (isMac && executable.endsWith('.app')) {
    const macAppExecutable = readdirSync(
      join(executable, 'Contents', 'MacOS')
    )[0]
    game.install.executable = join(
      executable,
      'Contents',
      'MacOS',
      macAppExecutable
    )
  }

  const current = libraryStore.get('games', [])

  const gameIndex = current.findIndex((value) => value.app_name === app_name)

  // edit app in case it exists
  if (gameIndex !== -1) {
    current[gameIndex] = { ...current[gameIndex], ...game }
  } else {
    current.push(game)
    addAppShortcuts(app_name)
  }

  libraryStore.set('games', current)
  return
}

export async function addAppShortcuts(
  appName: string,
  fromMenu?: boolean
): Promise<void> {
  return addShortcuts(getAppInfo(appName), fromMenu)
}

export async function removeAppShortcuts(appName: string): Promise<void> {
  return removeShortcuts(getAppInfo(appName))
}

export function isAppAvailable(appName: string): boolean {
  const { install } = getAppInfo(appName)

  if (install && install.platform === 'Browser') {
    return true
  }

  if (install && install.executable) {
    return existsSync(install.executable)
  }
  return false
}

if (Object.hasOwn(app, 'on'))
  app.on('web-contents-created', (_, contents) => {
    // Check for a webview
    if (contents.getType() === 'webview') {
      contents.setWindowOpenHandler(({ url }) => {
        const protocol = new URL(url).protocol
        if (['https:', 'http:'].includes(protocol)) {
          openNewBrowserGameWindow(url)
        }
        return { action: 'deny' }
      })
    }
  })

const openNewBrowserGameWindow = async (
  browserUrl: string
): Promise<boolean> => {
  return new Promise((res) => {
    const browserGame = new BrowserWindow({
      icon: icon,
      webPreferences: {
        webviewTag: true,
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })

    const url = !app.isPackaged
      ? 'http://localhost:5173?view=BrowserGame&browserUrl=' +
        encodeURIComponent(browserUrl)
      : `file://${path.join(
          buildDir,
          './index.html?view=BrowserGame&browserUrl=' +
            encodeURIComponent(browserUrl)
        )}`

    browserGame.loadURL(url)
    setTimeout(() => browserGame.focus(), 200)
    browserGame.on('close', () => {
      res(true)
    })
  })
}

export async function launchApp(
  appName: string,
  runner: 'sideload' | 'hyperplay'
): Promise<boolean> {
  let gameInfo
  if (runner === 'sideload') {
    gameInfo = getAppInfo(appName)
  }
  if (runner === 'hyperplay') {
    gameInfo = getHyperPlayGameInfo(appName)
  }

  if (!gameInfo) {
    return false
  }

  let {
    install: { executable }
  } = gameInfo

  const { folder_name, browserUrl } = gameInfo

  const gameSettingsOverrides = await GameConfig.get(appName).getSettings()
  if (
    gameSettingsOverrides.targetExe !== undefined &&
    gameSettingsOverrides.targetExe !== ''
  ) {
    executable = gameSettingsOverrides.targetExe
  }

  if (browserUrl) {
    return openNewBrowserGameWindow(browserUrl)
  }

  const gameSettings = await getAppSettings(appName)
  const { launcherArgs } = gameSettings

  if (executable) {
    const isNative = isGameNative(appName, runner)
    const {
      success: launchPrepSuccess,
      failureReason: launchPrepFailReason,
      rpcClient,
      mangoHudCommand,
      gameModeBin,
      steamRuntime
    } = await prepareLaunch(gameSettings, gameInfo, isNative)

    const wrappers = setupWrappers(
      gameSettings,
      mangoHudCommand,
      gameModeBin,
      steamRuntime?.length ? [...steamRuntime] : undefined
    )

    if (!launchPrepSuccess) {
      appendFileSync(
        appLogFileLocation(appName),
        `Launch aborted: ${launchPrepFailReason}`
      )
      showDialogBoxModalAuto({
        title: i18next.t('box.error.launchAborted', 'Launch aborted'),
        message: launchPrepFailReason!,
        type: 'ERROR'
      })
      return false
    }
    const env = { ...process.env, ...setupEnvVars(gameSettings) }

    // Native
    if (isNative) {
      logInfo(
        `launching native sideloaded: ${executable} ${launcherArgs ?? ''}`,
        LogPrefix.Backend
      )

      try {
        await access(executable, FS_CONSTANTS.X_OK)
      } catch (error) {
        logWarning(
          'File not executable, changing permissions temporarilly',
          LogPrefix.Backend
        )
        // On Mac, it gives an error when changing the permissions of the file inside the app bundle. But we need it for other executables like scripts.
        if (isLinux || (isMac && !executable.endsWith('.app'))) {
          await chmod(executable, 0o775)
        }
      }

      const commandParts = shlex.split(launcherArgs ?? '')
      await callRunner(
        commandParts,
        {
          name: runner,
          logPrefix: LogPrefix.Backend,
          bin: executable,
          dir: dirname(executable)
        },
        createAbortController(appName),
        {
          env,
          wrappers,
          logFile: appLogFileLocation(appName),
          logMessagePrefix: LogPrefix.Backend
        }
      )

      launchCleanup(rpcClient)
      // TODO: check and revert to previous permissions
      if (isLinux || (isMac && !executable.endsWith('.app'))) {
        await chmod(executable, 0o775)
      }
      return true
    }

    logInfo(
      `launching non-native sideloaded: ${executable}}`,
      LogPrefix.Backend
    )

    await runWineCommand({
      commandParts: [executable, launcherArgs ?? ''],
      gameSettings,
      wait: false,
      startFolder: folder_name,
      options: {
        wrappers,
        logFile: appLogFileLocation(appName),
        logMessagePrefix: LogPrefix.Backend
      }
    })

    launchCleanup(rpcClient)

    return true
  }
  return false
}

export async function stop(appName: string): Promise<void> {
  const {
    install: { executable = undefined }
  } = getAppInfo(appName)

  if (executable) {
    const split = executable.split('/')
    const exe = split[split.length - 1]
    killPattern(exe)
  }
}

type RemoveArgs = {
  appName: string
  shouldRemovePrefix: boolean
  deleteFiles?: boolean
}
export async function removeApp({
  appName,
  shouldRemovePrefix,
  deleteFiles = false
}: RemoveArgs): Promise<void> {
  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner: 'sideload',
    status: 'uninstalling'
  })

  const old = libraryStore.get('games', [])
  const current = old.filter((a: SideloadGame) => a.app_name !== appName)

  const {
    title,
    install: { executable }
  } = getAppInfo(appName)
  const { winePrefix } = await getAppSettings(appName)

  if (shouldRemovePrefix) {
    logInfo(`Removing prefix ${winePrefix}`, LogPrefix.Backend)
    if (existsSync(winePrefix)) {
      // remove prefix if exists
      rmSync(winePrefix, { recursive: true })
    }
  }
  libraryStore.set('games', current)

  if (deleteFiles) {
    rmSync(dirname(executable), { recursive: true })
  }

  notify({ title, body: i18next.t('notify.uninstalled') })

  removeAppShortcuts(appName)

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner: 'sideload',
    status: 'done'
  })

  logInfo('finished uninstalling', LogPrefix.Backend)
}

export function isNativeApp(appName: string): boolean {
  const {
    install: { platform }
  } = getAppInfo(appName)
  if (platform) {
    if (platform === 'Browser') {
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
