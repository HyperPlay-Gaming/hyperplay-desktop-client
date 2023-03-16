import { GameInfo, GameSettings, Runner } from 'common/types'
import { GameConfig } from '../../game_config'
import { isMac, isLinux, gamesConfigPath, icon } from '../../constants'
import { logInfo, LogPrefix, logWarning } from '../../logger/logger'
import path, { dirname, join, resolve } from 'path'
import { appendFileSync, constants as FS_CONSTANTS } from 'graceful-fs'
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
import { gameManagerMap } from 'backend/main'
import find from 'find-process'
import { OverlayApp } from 'backend/overlay/overlay'
const buildDir = resolve(__dirname, '../../build')

export async function getAppSettings(appName: string): Promise<GameSettings> {
  return (
    GameConfig.get(appName).config ||
    (await GameConfig.get(appName).getSettings())
  )
}

export function logFileLocation(appName: string) {
  return join(gamesConfigPath, `${appName}-lastPlay.log`)
}

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

// TODO: refactor to use hyperplay store json data
export const appNameToProcessName = {
  '63f8a8c7069b92b74c52d1a3': 'MoonBlasters-Win64-Shipping',
  '63f69d82069b92b74c8c36e9': 'altiros',
  '63efc374069b92b74cddf1d0': 'AnotherWorld-Win64-Shipping',
  '63f42b4b069b92b74cee0ca5': 'Bionic Owls',
  '63f6f435069b92b74cce5f1b': 'BC3', //bunny count
  '63ed99d1636c19e6200f7631': 'Space_Hangar_FPS', //flight force
  '63f785b3069b92b74c484f0e': 'Necrodemic-Win64-Shipping',
  '63f8f9a8069b92b74ca32061': 'BattleRacingClient-Win64-Shipping', //tearing spaces
  '63f7ead4069b92b74cb8b684': 'TheBornless426-Win64-Shipping',
  '63f72cde069b92b74c01b1ca': 'PhantomGalaxies-Win64-Shipping',
  '63ff5425069b92b74c91f67c': 'RocketMonstersUE5-Win64-Shipping',
  '63fd0f9f069b92b74c3abe9d': 'Voxie Tactics v0.27.0'
}

async function injectProcess(appName: string) {
  if (!Object.hasOwn(appNameToProcessName, appName)) return

  find('name', appNameToProcessName[appName], true).then((val) => {
    console.log('found this with process name = ', JSON.stringify(val, null, 4))
    for (const process_i of val) {
      const pidToInject = process_i.pid
      logInfo(`Injecting pid = ${pidToInject}`, LogPrefix.HyperPlay)
      OverlayApp.inject({ pid: pidToInject.toString() })
    }
  })
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

      if (runner === 'hyperplay') {
        //some games take a while to launch. 8 seconds seems to work well
        setTimeout(async () => injectProcess(appName), 8000)
      }

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
        runner === 'sideload' ? true : false
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
        logFile: logFileLocation(appName),
        logMessagePrefix: LogPrefix.Backend
      }
    })

    launchCleanup(rpcClient)

    return true
  }
  return false
}
