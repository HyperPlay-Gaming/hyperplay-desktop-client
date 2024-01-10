import {
  GameInfo,
  GameSettings,
  OverlayRenderState,
  Runner
} from 'common/types'
import { GameConfig } from '../../game_config'
import { isMac, isLinux, gamesConfigPath, icon } from '../../constants'
import { logInfo, LogPrefix, logWarning } from '../../logger/logger'
import path, { dirname, join, resolve } from 'path'
import {
  appendFileSync,
  existsSync,
  constants as FS_CONSTANTS
} from 'graceful-fs'
import i18next from 'i18next'
import {
  callRunner,
  launchCleanup,
  prepareLaunch,
  runWineCommand,
  setupEnvVars,
  setupWrappers
} from '../../launcher'
import { access, chmod } from 'fs/promises'
import shlex from 'shlex'
import { showDialogBoxModalAuto } from '../../dialog/dialog'
import { createAbortController } from '../../utils/aborthandler/aborthandler'
import { app, BrowserWindow } from 'electron'
import { gameManagerMap } from '../index'
const buildDir = resolve(__dirname, '../../build')
import { domainsAreEqual } from 'common/utils'
import { connectedProvider } from 'backend/hyperplay-proxy-server/providerState'
import { PROVIDERS } from 'common/types/proxy-types'
import { controlWindow } from 'backend/hyperplay-overlay/model'
import { initOverlayRenderState } from 'backend/hyperplay-overlay'

export async function getAppSettings(appName: string): Promise<GameSettings> {
  return (
    GameConfig.get(appName).config ||
    (await GameConfig.get(appName).getSettings())
  )
}

export function logFileLocation(appName: string) {
  return join(gamesConfigPath, `${appName}-lastPlay.log`)
}

const openRestrictedBrowserGameWindow = async (url: string) => {
  const restrictedBrowserWindow = new BrowserWindow({
    icon: icon,
    webPreferences: {
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })
  restrictedBrowserWindow.loadURL(url)
}

const openNewBrowserGameWindow = async (
  browserUrl: string,
  gameInfo: GameInfo
): Promise<boolean> => {
  return new Promise((res) => {
    const browserGame = new BrowserWindow({
      icon: icon,
      fullscreen: true,
      webPreferences: {
        webviewTag: true,
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      },
      show: false
    })

    function toggleFullscreen() {
      if (browserGame.isDestroyed()) return

      const fullscreenSize = browserGame.getSize()
      browserGame.setFullScreen(!browserGame.isFullScreen())
      browserGame.setSize(fullscreenSize[0], fullscreenSize[1])
    }

    function beforeInputEventHandler(
      event: Electron.Event,
      input: Electron.Input
    ) {
      if (input.key === 'F11' && input.type === 'keyDown') {
        toggleFullscreen()
        // this fixes DFK fullscreen toggle and ensures toggling is not called twice in dev mode
        event.preventDefault()
      }
    }

    function checkContentsUrlBeforeHandling(contents: Electron.WebContents) {
      return (event: Electron.Event, input: Electron.Input) => {
        if (contents.getURL() !== browserUrl) return
        return beforeInputEventHandler(event, input)
      }
    }

    browserGame.webContents?.on('before-input-event', beforeInputEventHandler)

    browserGame.setIgnoreMouseEvents(false)
    browserGame.setMinimizable(true)

    const abortController = createAbortController(gameInfo.app_name)
    abortController.signal.addEventListener('abort', () => {
      browserGame.close()
    })

    const url = !app.isPackaged
      ? `http://localhost:5173?view=BrowserGame&appName=${gameInfo.app_name}&runner=${gameInfo.runner}`
      : `file://${path.join(
          buildDir,
          `./index.html`
        )}?view=BrowserGame&appName=${gameInfo.app_name}&runner=${
          gameInfo.runner
        }`

    const urlParent = new URL(browserUrl)
    const openNewBroswerGameWindowListener = (
      ev: Electron.Event,
      contents: Electron.WebContents
    ) => {
      // Check for a webview
      if (contents.getType() === 'webview') {
        // this contents isn't necessarily the contents of the browser game so check first
        contents?.on(
          'before-input-event',
          checkContentsUrlBeforeHandling(contents)
        )

        contents.setWindowOpenHandler(({ url }) => {
          const urlToOpen = new URL(url)
          const protocol = urlToOpen.protocol

          if (
            ['https:', 'http:'].includes(protocol) &&
            domainsAreEqual(urlToOpen, urlParent)
          ) {
            openNewBrowserGameWindow(url, gameInfo)
            return { action: 'deny' }
          }
          openRestrictedBrowserGameWindow(url)
          return { action: 'deny' }
        })
      }
    }
    app.on('web-contents-created', openNewBroswerGameWindowListener)

    browserGame.loadURL(url)
    // this is electron's suggested way to prevent visual flash
    // https://github.com/electron/electron/blob/main/docs/api/browser-window.md#using-the-ready-to-show-event
    browserGame.on('ready-to-show', () => browserGame.show())

    controlWindow(browserGame.webContents.id, 'browser')

    const renderState: OverlayRenderState = {
      showToasts: true,
      showBrowserGame: true,
      browserGameUrl: browserUrl,
      showHintText: true,
      showExitGameButton: true,
      showExtension: connectedProvider === PROVIDERS.METAMASK_EXTENSION,
      showBackgroundTint: true
    }
    /*
     * The overlay state wil only handle the update render state event
     * after init() has been called on it. This can be some time after
     * window launch, so we send an overlay ready event when it's ready.
     */
    browserGame.webContents.ipc.once('overlayReady', () => {
      initOverlayRenderState(
        browserGame.webContents.id,
        renderState,
        'HyperPlay Web Game'
      )
    })

    setTimeout(() => browserGame.focus(), 200)

    if (abortController) {
      abortController.signal.addEventListener('abort', () => {
        browserGame.close()
        res(false)
      })
    }

    browserGame.on('close', () => {
      res(true)
      app.removeListener(
        'web-contents-created',
        openNewBroswerGameWindowListener
      )
    })
  })
}

export function getGameProcessName(gameInfo: GameInfo): string | undefined {
  const installedPlatform = gameInfo.install.platform
  const channelName = gameInfo.install.channelName
  if (
    installedPlatform === undefined ||
    channelName === undefined ||
    gameInfo.channels === undefined
  ) {
    console.error(
      `Cannot get game process name installedPlatform ${installedPlatform} or channelName ${channelName} or gameInfo.channels ${gameInfo.channels} is undefined`
    )
    return
  }
  return gameInfo.channels[channelName].release_meta.platforms[
    installedPlatform
  ]?.processName
}

export async function launchGame(
  appName: string,
  gameInfo: GameInfo,
  runner: Runner
): Promise<boolean> {
  if (!gameInfo) {
    return false
  }

  let {
    install: { executable }
  } = gameInfo
  const {
    install: { channelName, platform }
  } = gameInfo

  const gameSettingsOverrides = await GameConfig.get(appName).getSettings()
  if (
    gameSettingsOverrides.targetExe !== undefined &&
    gameSettingsOverrides.targetExe !== '' &&
    existsSync(gameSettingsOverrides.targetExe)
  ) {
    executable = gameSettingsOverrides.targetExe
  }

  let { browserUrl } = gameInfo
  if (platform === 'web' || platform === 'Browser') {
    let webGameUrl

    if (
      gameInfo?.channels &&
      channelName &&
      Object.hasOwn(gameInfo.channels, channelName)
    )
      webGameUrl =
        gameInfo.channels[channelName].release_meta.platforms[platform]
          ?.external_url

    if (webGameUrl) browserUrl = webGameUrl

    if (browserUrl) return openNewBrowserGameWindow(browserUrl, gameInfo)

    throw `Could not launch web game for ${appName}`
  }

  const gameSettings = await getAppSettings(appName)
  const { launcherArgs } = gameSettings

  if (executable) {
    const isNative = gameManagerMap[runner].isNative(appName)
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
        logFileLocation(appName),
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
        `launching native sideloaded or hyperplay store game: ${executable} ${
          launcherArgs ?? ''
        }`,
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
          logFile: logFileLocation(appName),
          logMessagePrefix: LogPrefix.Backend
        },
        gameInfo
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

    const shouldOpenOverlay =
      gameInfo &&
      (gameInfo.runner === 'hyperplay' ||
        (gameInfo.runner === 'sideload' && gameInfo.web3?.supported))

    await runWineCommand({
      commandParts: [executable, launcherArgs ?? ''],
      gameSettings,
      wait: false,
      startFolder: dirname(executable),
      options: {
        wrappers,
        logFile: logFileLocation(appName),
        logMessagePrefix: LogPrefix.Backend
      },
      overlayInfo: {
        showOverlay: !!shouldOpenOverlay,
        runner: gameInfo.runner,
        appName: gameInfo.app_name
      }
    })

    launchCleanup(rpcClient)

    return true
  }
  return false
}
