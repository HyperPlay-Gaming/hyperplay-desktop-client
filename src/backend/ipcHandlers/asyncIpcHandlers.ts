import { wait } from '@hyperplay/utils'
import {
  getGameOverride,
  getGameSdl,
  getEpicListingUrl
} from 'backend/api/library'
import {
  logError,
  logInfo,
  logWarning,
  LogPrefix,
  logsDisabled
} from 'backend/logger/logger'
import { GlobalConfig } from 'backend/config'
import {
  isSteamDeckGameMode,
  isCLIFullscreen,
  isFlatpak,
  configStore,
  fontsStore,
  fixAsarPath,
  publicDir,
  isCLINoGui,
  tsStore,
  gamesConfigPath
} from 'backend/constants'
import { GameConfig } from 'backend/game_config'
import { verifyWinePrefix, runWineCommand } from 'backend/launcher'
import { getMainWindow, sendFrontendMessage } from 'backend/main_window'
import { isOnline } from 'backend/online_monitor'
import { getDefaultSavePath } from 'backend/save_sync'
import { gameManagerMap, libraryManagerMap } from 'backend/storeManagers'
import {
  getGOGPlaytime,
  updateGOGPlaytime
} from 'backend/storeManagers/gog/games'
import { GOGUser } from 'backend/storeManagers/gog/user'
import { addGameToLibrary } from 'backend/storeManagers/hyperplay/library'
import { getHyperPlayReleaseObject } from 'backend/storeManagers/hyperplay/utils'
import { legendarySetup } from 'backend/storeManagers/legendary/setup'
import { LegendaryUser } from 'backend/storeManagers/legendary/user'
import { Winetricks, DXVK, SteamWindows } from 'backend/tools'
import {
  isEpicServiceOffline,
  writeConfig,
  execAsync,
  getShellPath,
  checkGameUpdates,
  getPlatformName,
  getStoreName
} from 'backend/utils'
import { callAbortController } from 'backend/utils/aborthandler/aborthandler'
import {
  checkWineBeforeLaunch,
  runWineCommandOnGame
} from 'backend/utils/compatibility_layers'
import { ipcMain, app, dialog, clipboard, powerSaveBlocker } from 'electron'
import {
  appendFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'fs'
import { cpus, platform } from 'os'
import path, { join } from 'path'
import * as HyperPlayGameManager from 'backend/storeManagers/hyperplay/games'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'
import * as GOGLibraryManager from 'backend/storeManagers/gog/library'
import setup from 'backend/storeManagers/gog/setup'
import { isClientUpdating } from 'backend/updater/updater'
import {
  AppSettings,
  GamepadInputEvent,
  GameSettings,
  Runner,
  StatusPromise
} from 'common/types'
import { getFonts } from 'font-list'
import shlex from 'shlex'
import { logFileLocation as getLogFileLocation } from 'backend/storeManagers/storeManagerCommon/games'

import { addRecentGame } from 'backend/recent_games/recent_games'
import { getSystemInfo, formatSystemInfo } from 'backend/utils/systeminfo'
import {
  checkG7ConnectionStatus,
  postPlaySessionTime
} from 'backend/utils/quests'
import { gameIsEpicForwarderOnHyperPlay } from 'backend/utils/shouldOpenOverlay'
import { hrtime } from 'process'
import { getFlag } from 'backend/flags/flags'
import getPartitionCookies from 'backend/utils/get_partition_cookies'
import { DEV_PORTAL_URL } from 'common/constants'
import { showDialogBoxModalAuto, notify } from 'backend/dialog/dialog'
import i18next from 'i18next'
import { trackEvent } from 'backend/metrics/metrics'

const devAppUrl = 'http://localhost:5173/?view=App'
const prodAppUrl = `file://${path.join(
  publicDir,
  '../build/index.html?view=App'
)}`

// Calls WineCFG or Winetricks. If is WineCFG, use the same binary as wine to launch it to dont update the prefix
ipcMain.handle('callTool', async (event, { tool, exe, appName, runner }) => {
  const gameSettings = await gameManagerMap[runner].getSettings(appName)
  const { wineVersion, winePrefix } = gameSettings
  await verifyWinePrefix(gameSettings)

  switch (tool) {
    case 'winetricks':
      await verifyWinePrefix(gameSettings)
      await Winetricks.run(wineVersion, winePrefix, event)
      break
    case 'winecfg':
      runWineCommandOnGame(runner, appName, {
        gameSettings,
        commandParts: ['winecfg'],
        wait: false
      })
      break
    case 'runExe':
      if (exe) {
        const workingDir = path.parse(exe).dir
        runWineCommandOnGame(runner, appName, {
          gameSettings,
          commandParts: [exe],
          wait: false,
          startFolder: workingDir
        })
      }
      break
  }
})

ipcMain.handle('runWineCommand', async (e, args) => runWineCommand(args))

ipcMain.handle('requestSIWE', HyperPlayGameManager.requestSIWE)

ipcMain.handle('getEpicGamesStatus', async () => isEpicServiceOffline())

ipcMain.handle('getMaxCpus', () => cpus().length)

ipcMain.handle('getAppVersion', () => app.getVersion())
ipcMain.handle('isFullscreen', () => isSteamDeckGameMode || isCLIFullscreen)
ipcMain.handle('isFlatpak', () => isFlatpak)
ipcMain.handle('getGameOverride', async () => getGameOverride())
ipcMain.handle('getGameSdl', async (event, appName) => getGameSdl(appName))

ipcMain.handle('getPlatform', () => process.platform)

ipcMain.handle('showUpdateSetting', () => !isFlatpak)

ipcMain.handle('isGameAvailable', async (e, args) => {
  const { appName, runner } = args
  return gameManagerMap[runner].isGameAvailable(appName)
})

ipcMain.handle('appIsInLibrary', async (event, appName, runner) => {
  if (runner !== 'hyperplay') return false
  return HyperPlayGameManager.appIsInLibrary(appName)
})

ipcMain.handle('getGameInfo', async (event, appName, runner) => {
  // Fastpath since we sometimes have to request info for a GOG game as Legendary because we don't know it's a GOG game yet
  if (runner === 'legendary' && !LegendaryLibraryManager.hasGame(appName)) {
    return null
  }
  return gameManagerMap[runner].getGameInfo(appName)
})

ipcMain.handle('getExtraInfo', async (event, appName, runner) => {
  // Fastpath since we sometimes have to request info for a GOG game as Legendary because we don't know it's a GOG game yet
  if (runner === 'legendary' && !LegendaryLibraryManager.hasGame(appName)) {
    return null
  }
  return gameManagerMap[runner].getExtraInfo(appName)
})

ipcMain.handle('getGameSettings', async (event, appName, runner) => {
  try {
    return await gameManagerMap[runner].getSettings(appName)
  } catch (error) {
    logError(error, LogPrefix.Backend)
    return null
  }
})

ipcMain.handle('getGOGLinuxInstallersLangs', async (event, appName) =>
  GOGLibraryManager.getLinuxInstallersLanguages(appName)
)

ipcMain.handle(
  'getInstallInfo',
  async (event, appName, runner, installPlatform, channelNameToInstall) => {
    try {
      const info = await libraryManagerMap[runner].getInstallInfo(
        appName,
        installPlatform,
        'en-US',
        channelNameToInstall
      )
      if (info === undefined) return null
      return info
    } catch (error) {
      logError(
        error,
        runner === 'legendary' ? LogPrefix.Legendary : LogPrefix.Gog
      )
      return null
    }
  }
)

ipcMain.handle('getUserInfo', async () => {
  return LegendaryUser.getUserInfo()
})

ipcMain.handle('isLoggedIn', LegendaryUser.isLoggedIn)

ipcMain.handle('login', async (event, sid) => LegendaryUser.login(sid))
ipcMain.handle('authGOG', async (event, code) => GOGUser.login(code))
ipcMain.handle('logoutLegendary', LegendaryUser.logout)

ipcMain.handle('getAlternativeWine', async () =>
  GlobalConfig.get().getAlternativeWine()
)

ipcMain.handle('readConfig', async (event, config_class) => {
  if (config_class === 'library') {
    await libraryManagerMap['legendary'].refresh()
    return LegendaryLibraryManager.getListOfGames()
  }
  const userInfo = await LegendaryUser.getUserInfo()
  return userInfo?.displayName ?? ''
})

ipcMain.handle('toggleDXVK', async (event, { appName, action }) =>
  GameConfig.get(appName)
    .getSettings()
    .then(async (gameSettings) =>
      DXVK.installRemove(gameSettings, 'dxvk', action)
    )
)

ipcMain.handle('toggleDXVKNVAPI', async (event, { appName, action }) =>
  GameConfig.get(appName)
    .getSettings()
    .then(async (gameSettings) =>
      DXVK.installRemove(gameSettings, 'dxvk-nvapi', action)
    )
)

ipcMain.handle('writeConfig', (event, { appName, config }) =>
  writeConfig(appName, config)
)

ipcMain.handle('refreshLibrary', async (e, library?) => {
  if (library !== undefined && library !== 'all') {
    await libraryManagerMap[library].refresh()
  } else {
    const allRefreshPromises = []
    for (const runner_i in libraryManagerMap) {
      allRefreshPromises.push(libraryManagerMap[runner_i as Runner].refresh())
    }
    await Promise.allSettled(allRefreshPromises)
  }
})

ipcMain.handle('isClientUpdating', async () => {
  return isClientUpdating()
})

ipcMain.handle('openDialog', async (e, args) => {
  const mainWindow = getMainWindow()
  if (!mainWindow) {
    return false
  }

  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, args)
  if (!canceled) {
    return filePaths[0]
  }
  return false
})

ipcMain.handle('kill', async (event, appName, runner) => {
  callAbortController(appName)
  return gameManagerMap[runner].stop(appName)
})

ipcMain.handle(
  'changeInstallPath',
  async (event, { appName, path, runner }) => {
    await libraryManagerMap[runner].changeGameInstallPath(appName, path)
    logInfo(
      `Finished changing install path of ${appName} to ${path}.`,
      LogPrefix.Backend
    )
  }
)

ipcMain.handle('egsSync', async (event, args) => {
  return LegendaryLibraryManager.toggleGamesSync(args)
})

ipcMain.handle('syncGOGSaves', async (event, gogSaves, appName, arg) =>
  gameManagerMap['gog'].syncSaves(appName, arg, '', gogSaves)
)

ipcMain.handle(
  'syncSaves',
  async (event, { arg = '', path, appName, runner }) => {
    if (runner === 'legendary') {
      const epicOffline = await isEpicServiceOffline()
      if (epicOffline) {
        logWarning(
          'Epic is offline right now, cannot sync saves!',
          LogPrefix.Backend
        )
        return 'Epic is offline right now, cannot sync saves!'
      }
    }
    if (!isOnline()) {
      logWarning('App is offline, cannot sync saves!', LogPrefix.Backend)
      return 'App is offline, cannot sync saves!'
    }

    const output = await gameManagerMap[runner].syncSaves(appName, arg, path)
    logInfo(output, LogPrefix.Backend)
    return output
  }
)

ipcMain.handle(
  'getDefaultSavePath',
  async (event, appName, runner, alreadyDefinedGogSaves) => {
    return Promise.race([
      getDefaultSavePath(appName, runner, alreadyDefinedGogSaves),
      wait(15000).then(() => {
        return runner === 'gog' ? [] : ''
      })
    ])
  }
)

ipcMain.handle(
  'checkHyperPlayAccessCode',
  async (_e, licenseConfigId, accessCode) => {
    return HyperPlayGameManager.validateAccessCode({
      accessCode,
      licenseConfigId
    })
  }
)

ipcMain.handle(
  'runWineCommandForGame',
  async (event, { appName, commandParts, runner }) => {
    const gameSettings = await gameManagerMap[runner].getSettings(appName)

    if (platform() === 'win32') {
      // execAsync is a function from main.ts that needs to be imported
      return execAsync(commandParts.join(' '))
    }
    const { updated } = await verifyWinePrefix(gameSettings)

    if (runner === 'gog' && updated) {
      await setup(appName)
    }
    if (runner === 'legendary' && updated) {
      await legendarySetup(appName)
    }

    return runWineCommandOnGame(runner, appName, {
      commandParts,
      wait: false,
      protonVerb: 'runinprefix'
    })
  }
)

ipcMain.handle('getShellPath', async (event, path) => getShellPath(path))

ipcMain.handle('clipboardReadText', () => clipboard.readText())

ipcMain.handle('getCustomThemes', async () => {
  const { customThemesPath } = GlobalConfig.get().getSettings()

  if (!existsSync(customThemesPath)) {
    return []
  }

  return readdirSync(customThemesPath).filter((fileName) =>
    fileName.endsWith('.css')
  )
})

ipcMain.handle('getThemeCSS', async (event, theme) => {
  const { customThemesPath = '' } = GlobalConfig.get().getSettings()

  const cssPath = join(customThemesPath, theme)

  if (!existsSync(cssPath)) {
    return ''
  }

  return readFileSync(cssPath, 'utf-8')
})

ipcMain.handle('removeApp', async (e, args) => {
  gameManagerMap[args.runner].uninstall(args)
})

ipcMain.handle('launchApp', async (e, appName, runner) =>
  gameManagerMap[runner].launch(appName)
)

ipcMain.handle('installSteamWindows', async () => SteamWindows.installSteam())

ipcMain.handle('isNative', (e, { appName, runner }) => {
  return gameManagerMap[runner].isNative(appName)
})

ipcMain.handle('pathExists', async (e, path) => {
  return existsSync(path)
})

ipcMain.handle('getPlaytimeFromRunner', async (e, runner, appName) => {
  if (runner === 'gog') {
    return getGOGPlaytime(appName)
  }

  return undefined
})

ipcMain.handle('addHyperplayGame', async (_e, projectId) => {
  await addGameToLibrary(projectId)
})

ipcMain.handle('getEpicListingUrl', async (_e, projectId) =>
  getEpicListingUrl(projectId)
)

ipcMain.handle(
  'isGameHidden',
  async (_e, gameId) =>
    !!configStore
      .get('games.hidden', [])
      .find(({ appName }) => appName === gameId)
)

ipcMain.handle('unhideGame', async (_e, gameId) => {
  const hiddenGames = configStore.get('games.hidden', [])
  const newHiddenGames = hiddenGames.filter(({ appName }) => appName !== gameId)
  configStore.set('games.hidden', newHiddenGames)
  sendFrontendMessage('refreshLibrary', 'hyperplay')
})

ipcMain.handle('getHyperPlayListings', async () => {
  const listingsMap = await getHyperPlayReleaseObject()
  return JSON.parse(JSON.stringify(listingsMap))
})

ipcMain.handle('getFonts', async (event, reload) => {
  let cachedFonts = fontsStore.get('fonts', [])
  if (cachedFonts.length === 0 || reload) {
    cachedFonts = await getFonts()
    cachedFonts = cachedFonts.sort((a, b) => a.localeCompare(b))
    fontsStore.set('fonts', cachedFonts)
  }
  return cachedFonts
})

ipcMain.handle(
  'checkGameUpdates',
  async (e, runners: Runner[]): Promise<string[]> => {
    return checkGameUpdates(runners)
  }
)

ipcMain.handle('requestSettings', async (event, appName) => {
  // To the changes how we handle env and wrappers
  // otherOptions is deprectaed and needs to be mapped
  // to new approach.
  // Can be removed if otherOptions is removed aswell
  const mapOtherSettings = (config: AppSettings | GameSettings) => {
    if (config.otherOptions) {
      if (config.enviromentOptions.length <= 0) {
        config.otherOptions
          .split(' ')
          .filter((val) => val.indexOf('=') !== -1)
          .forEach((envKeyAndVar) => {
            const keyAndValueSplit = envKeyAndVar.split('=')
            const key = keyAndValueSplit.shift()!
            const value = keyAndValueSplit.join('=')
            config.enviromentOptions.push({ key, value })
          })
      }

      if (config.wrapperOptions.length <= 0) {
        const args: string[] = []
        config.otherOptions
          .split(' ')
          .filter((val) => val.indexOf('=') === -1)
          .forEach((val, index) => {
            if (index === 0) {
              config.wrapperOptions.push({ exe: val, args: '' })
            } else {
              args.push(val)
            }
          })

        if (config.wrapperOptions.at(0)) {
          config.wrapperOptions.at(0)!.args = shlex.join(args)
        }
      }

      delete config.otherOptions
    }
    return config
  }

  if (appName === 'default') {
    return mapOtherSettings(GlobalConfig.get().getSettings())
  }

  const config = await GameConfig.get(appName).getSettings()
  return mapOtherSettings(config)
})

ipcMain.handle('getLocalPreloadPath', async () => {
  return fixAsarPath(join(publicDir, 'webviewPreload.js'))
})

let powerDisplayId: number | null

ipcMain.handle(
  'launch',
  async (event, { appName, launchArguments, runner }): StatusPromise => {
    const game = gameManagerMap[runner].getGameInfo(appName)
    const gameSettings = await gameManagerMap[runner].getSettings(appName)
    const { autoSyncSaves, savesPath, gogSaves = [] } = gameSettings

    const { title, app_name, browserUrl, install } = game

    const { minimizeOnGameLaunch } = GlobalConfig.get().getSettings()

    const startPlayingDate = new Date()
    startNewPlaySession(appName)

    if (!tsStore.has(game.app_name)) {
      tsStore.set(
        `${game.app_name}.firstPlayed`,
        startPlayingDate.toISOString()
      )
    }

    logInfo(`Launching ${title} (${game.app_name})`, LogPrefix.Backend)
    trackEvent({
      event: 'Game Launched',
      properties: {
        game_name: app_name,
        isBrowserGame: browserUrl !== undefined,
        game_title: title,
        store_name: getStoreName(runner),
        browserUrl: browserUrl ?? undefined,
        platform: getPlatformName(install.platform!),
        platform_arch: install.platform!
      }
    })

    // purposefully not awaiting this
    completeHyperPlayQuest()

    if (autoSyncSaves && isOnline()) {
      sendFrontendMessage('gameStatusUpdate', {
        appName,
        runner,
        status: 'syncing-saves'
      })
      logInfo(`Downloading saves for ${title}`, LogPrefix.Backend)
      try {
        await gameManagerMap[runner].syncSaves(
          appName,
          '--skip-upload',
          savesPath,
          gogSaves
        )
        logInfo(`Saves for ${title} downloaded`, LogPrefix.Backend)
      } catch (error) {
        logError(
          `Error while downloading saves for ${title}. ${error}`,
          LogPrefix.Backend
        )
      }
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'playing'
    })

    const mainWindow = getMainWindow()
    if (minimizeOnGameLaunch) {
      mainWindow?.hide()
    }

    // Prevent display from sleep
    if (!powerDisplayId) {
      logInfo('Preventing display from sleep', LogPrefix.Backend)
      powerDisplayId = powerSaveBlocker.start('prevent-display-sleep')
    }

    const logFileLocation = getLogFileLocation(appName)

    const systemInfo = await getSystemInfo()
      .then(formatSystemInfo)
      .catch((error) => {
        logError(
          ['Failed to fetch system information', error],
          LogPrefix.Backend
        )
        return 'Error, check general log'
      })
    writeFileSync(logFileLocation, 'System Info:\n' + `${systemInfo}\n` + '\n')

    const gameSettingsString = JSON.stringify(gameSettings, null, '\t')
    appendFileSync(
      logFileLocation,
      'System Info:\n' +
        `${systemInfo}\n` +
        '\n' +
        `Game Settings: ${gameSettingsString}\n` +
        '\n' +
        `Game launched at: ${startPlayingDate}\n` +
        '\n'
    )

    if (logsDisabled) {
      appendFileSync(
        logFileLocation,
        'IMPORTANT: Logs are disabled. Enable logs before reporting an issue.'
      )
    }

    const isNative = gameManagerMap[runner].isNative(appName)

    // check if isNative, if not, check if wine is valid
    if (!isNative) {
      const isWineOkToLaunch = await checkWineBeforeLaunch(
        appName,
        gameSettings,
        logFileLocation
      )

      if (!isWineOkToLaunch) {
        logError(
          `Was not possible to launch using ${gameSettings.wineVersion.name}`,
          LogPrefix.Backend
        )

        sendFrontendMessage('gameStatusUpdate', {
          appName,
          runner,
          status: 'done'
        })

        return { status: 'error' }
      }
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'playing'
    })

    const command = gameManagerMap[runner].launch(appName, launchArguments)

    const launchResult = await command.catch((exception) => {
      logError(exception, LogPrefix.Backend)
      appendFileSync(
        logFileLocation,
        `An exception occurred when launching the game:\n${exception.stack}`
      )
      return false
    })

    // Stop display sleep blocker
    if (powerDisplayId !== null) {
      logInfo('Stopping Display Power Saver Blocker', LogPrefix.Backend)
      powerSaveBlocker.stop(powerDisplayId)
    }

    // Update playtime and last played date
    const finishedPlayingDate = new Date()
    tsStore.set(`${appName}.lastPlayed`, finishedPlayingDate.toISOString())

    if (runner === 'gog') {
      await updateGOGPlaytime(appName, startPlayingDate, finishedPlayingDate)
    }

    await addRecentGame(game)

    if (autoSyncSaves && isOnline()) {
      /**
       * @dev It sets to done, so the GlobalState knows that the game session stopped.
       * Then it changes the status to syncing-saves. Then It sets to done again.
       * Otherwise it would count the Syncing Saves time (which can be long depending on the game) as playing time as well.
       * done is not only the state for stopping playing but for finishing any other process that came before.
       */
      sendFrontendMessage('gameStatusUpdate', {
        appName,
        runner,
        status: 'done'
      })

      sendFrontendMessage('gameStatusUpdate', {
        appName,
        runner,
        status: 'syncing-saves'
      })

      sendFrontendMessage('gameStatusUpdate', {
        appName,
        runner,
        status: 'done'
      })

      logInfo(`Uploading saves for ${title}`, LogPrefix.Backend)
      try {
        await gameManagerMap[runner].syncSaves(
          appName,
          '--skip-download',
          savesPath,
          gogSaves
        )
        logInfo(`Saves uploaded for ${title}`, LogPrefix.Backend)
      } catch (error) {
        logError(
          `Error uploading saves for ${title}. Error: ${error}`,
          LogPrefix.Backend
        )
      }
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done'
    })

    // Playtime of this session in milliseconds. Uses hrtime for monotonic timer not subject to clock drift or sync errors
    const sessionPlaytimeInMs = syncPlaySession(appName)
    postPlaySession(appName, runner, sessionPlaytimeInMs)

    trackEvent({
      event: 'Game Closed',
      properties: {
        game_name: app_name,
        isBrowserGame: browserUrl !== undefined,
        game_title: title,
        store_name: getStoreName(runner),
        browserUrl: browserUrl ?? undefined,
        platform: getPlatformName(install.platform!),
        playTimeInMs: Number(sessionPlaytimeInMs),
        platform_arch: install.platform!
      }
    })

    // Exit if we've been launched without UI
    if (isCLINoGui) {
      app.exit()
    } else {
      mainWindow?.show()
    }

    return { status: launchResult ? 'done' : 'error' }
  }
)

ipcMain.handle(
  'uninstall',
  async (event, appName, runner, shouldRemovePrefix, shouldRemoveSetting) => {
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'uninstalling'
    })

    const {
      title,
      install: { platform }
    } = gameManagerMap[runner].getGameInfo(appName)

    trackEvent({
      event: 'Game Uninstall Started',
      properties: {
        game_name: appName,
        store_name: getStoreName(runner),
        game_title: title,
        platform_arch: platform!,
        platform: getPlatformName(platform!)
      }
    })

    let uninstalled = false

    try {
      await gameManagerMap[runner].uninstall({ appName })
      uninstalled = true
    } catch (error) {
      trackEvent({
        event: 'Game Uninstall Failed',
        properties: {
          game_name: appName,
          store_name: getStoreName(runner),
          error: `${error}`,
          game_title: title,
          platform_arch: platform!,
          platform: getPlatformName(platform!)
        }
      })
      notify({
        title,
        body: i18next.t('notify.uninstalled.error', 'Error uninstalling')
      })
      logError(error, LogPrefix.Backend)
    }

    if (uninstalled) {
      if (shouldRemovePrefix) {
        const { winePrefix } = await gameManagerMap[runner].getSettings(appName)
        logInfo(`Removing prefix ${winePrefix}`, LogPrefix.Backend)
        // remove prefix if exists
        if (existsSync(winePrefix)) {
          rmSync(winePrefix, { recursive: true })
        }
      }
      if (shouldRemoveSetting) {
        const removeIfExists = (filename: string) => {
          logInfo(`Removing ${filename}`, LogPrefix.Backend)
          const gameSettingsFile = join(gamesConfigPath, filename)
          if (existsSync(gameSettingsFile)) {
            rmSync(gameSettingsFile)
          }
        }

        removeIfExists(appName.concat('.json'))
        removeIfExists(appName.concat('.log'))
        removeIfExists(appName.concat('-lastPlay.log'))
      }

      trackEvent({
        event: 'Game Uninstall Success',
        properties: {
          game_name: appName,
          store_name: getStoreName(runner),
          game_title: title,
          platform_arch: platform!,
          platform: getPlatformName(platform!)
        }
      })

      notify({ title, body: i18next.t('notify.uninstalled') })
      logInfo('Finished uninstalling', LogPrefix.Backend)
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done'
    })
  }
)

ipcMain.handle('repair', async (event, appName, runner) => {
  if (!isOnline()) {
    logWarning(
      `App offline, skipping repair for game '${appName}'.`,
      LogPrefix.Backend
    )
    return
  }

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner,
    status: 'repairing'
  })

  const { title } = gameManagerMap[runner].getGameInfo(appName)

  try {
    await gameManagerMap[runner].repair(appName)
  } catch (error) {
    notify({
      title,
      body: i18next.t('notify.error.reparing', 'Error Repairing')
    })
    logError(error, LogPrefix.Backend)
  }
  notify({ title, body: i18next.t('notify.finished.reparing') })
  logInfo('Finished repairing', LogPrefix.Backend)

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner,
    status: 'done'
  })
})

ipcMain.handle(
  'moveInstall',
  async (event, { appName, path, runner }): Promise<void> => {
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'moving'
    })

    const { title } = gameManagerMap[runner].getGameInfo(appName)
    notify({ title, body: i18next.t('notify.moving', 'Moving Game') })

    const moveRes = await gameManagerMap[runner].moveInstall(appName, path)
    if (moveRes.status === 'error') {
      notify({
        title,
        body: i18next.t('notify.error.move', 'Error Moving Game')
      })
      logError(
        `Error while moving ${appName} to ${path}: ${moveRes.error} `,
        LogPrefix.Backend
      )

      showDialogBoxModalAuto({
        event,
        title: i18next.t('box.error.title', 'Error'),
        message: i18next.t('box.error.moving', 'Error Moving Game {{error}}', {
          error: moveRes.error
        }),
        type: 'ERROR'
      })
    }

    if (moveRes.status === 'done') {
      notify({ title, body: i18next.t('notify.moved') })
      logInfo(`Finished moving ${appName} to ${path}.`, LogPrefix.Backend)
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done'
    })
  }
)

ipcMain.handle(
  'importGame',
  async (event, { appName, path, runner, platform }): StatusPromise => {
    const epicOffline = await isEpicServiceOffline()
    if (epicOffline && runner === 'legendary') {
      showDialogBoxModalAuto({
        event,
        title: i18next.t('box.warning.title', 'Warning'),
        message: i18next.t(
          'box.warning.epic.import',
          'Epic Servers are having major outage right now, the game cannot be imported!'
        ),
        type: 'ERROR'
      })
      return { status: 'error' }
    }

    const title = gameManagerMap[runner].getGameInfo(appName).title
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'installing'
    })

    const abortMessage = () => {
      notify({ title, body: i18next.t('notify.install.canceled') })
      sendFrontendMessage('gameStatusUpdate', {
        appName,
        runner,
        status: 'done'
      })
    }

    try {
      const { abort, error } = await gameManagerMap[runner].importGame(
        appName,
        path,
        platform
      )
      if (abort || error) {
        abortMessage()
        return { status: 'done' }
      }
    } catch (error) {
      abortMessage()
      logError(error, LogPrefix.Backend)
      return { status: 'error' }
    }

    notify({
      title,
      body: i18next.t('notify.install.imported', 'Game Imported')
    })
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done'
    })
    logInfo(`imported ${title}`, LogPrefix.Backend)
    return { status: 'done' }
  }
)

ipcMain.handle('updateGame', async (event, appName, runner): StatusPromise => {
  if (!isOnline()) {
    logWarning(
      `App offline, skipping install for game '${appName}'.`,
      LogPrefix.Backend
    )
    return { status: 'error' }
  }

  const epicOffline = await isEpicServiceOffline()
  if (epicOffline && runner === 'legendary') {
    showDialogBoxModalAuto({
      event,
      title: i18next.t('box.warning.title', 'Warning'),
      message: i18next.t(
        'box.warning.epic.update',
        'Epic Servers are having major outage right now, the game cannot be updated!'
      ),
      type: 'ERROR'
    })
    return { status: 'error' }
  }

  const { title } = gameManagerMap[runner].getGameInfo(appName)
  notify({
    title,
    body: i18next.t('notify.update.started', 'Update Started')
  })

  let status: 'done' | 'error' | 'abort' = 'error'
  try {
    status = (await gameManagerMap[runner].update(appName)).status
  } catch (error) {
    logError(error, LogPrefix.Backend)
    notify({ title, body: i18next.t('notify.update.canceled') })
    return { status: 'error' }
  }
  notify({
    title,
    body:
      status === 'done'
        ? i18next.t('notify.update.finished')
        : i18next.t('notify.update.canceled')
  })
  logInfo('finished updating', LogPrefix.Backend)
  return { status }
})

ipcMain.handle(
  'syncPlaySession',
  async (e, appName: string, runner: Runner) => {
    const sessionPlaytimeInMs = syncPlaySession(appName)
    await postPlaySession(appName, runner, sessionPlaytimeInMs)
  }
)

// Simulate keyboard and mouse actions as if the real input device is used
ipcMain.handle('gamepadAction', async (event, args) => {
  const senderUrl = event.sender.getURL()
  if (!senderUrl.includes(devAppUrl) && !senderUrl.includes(prodAppUrl)) {
    return
  }

  // we can only receive gamepad events if the main window exists
  const mainWindow = getMainWindow()!

  const { action, metadata } = args
  const inputEvents: GamepadInputEvent[] = []

  /*
   * How to extend:
   *
   * Valid values for type are 'keyDown', 'keyUp' and 'char'
   * Valid values for keyCode are defined here:
   * https://www.electronjs.org/docs/latest/api/accelerator#available-key-codes
   *
   */
  switch (action) {
    case 'rightStickUp':
      inputEvents.push({
        type: 'mouseWheel',
        deltaY: 50,
        x: mainWindow.getBounds().width / 2,
        y: mainWindow.getBounds().height / 2
      })
      break
    case 'rightStickDown':
      inputEvents.push({
        type: 'mouseWheel',
        deltaY: -50,
        x: mainWindow.getBounds().width / 2,
        y: mainWindow.getBounds().height / 2
      })
      break
    case 'leftStickUp':
    case 'leftStickDown':
    case 'leftStickLeft':
    case 'leftStickRight':
    case 'padUp':
    case 'padDown':
    case 'padLeft':
    case 'padRight':
      // spatial navigation
      inputEvents.push({
        type: 'keyDown',
        keyCode: action.replace(/pad|leftStick/, '')
      })
      inputEvents.push({
        type: 'keyUp',
        keyCode: action.replace(/pad|leftStick/, '')
      })
      break
    case 'leftClick':
      inputEvents.push({
        type: 'mouseDown',
        button: 'left',
        x: metadata.x,
        y: metadata.y
      })
      inputEvents.push({
        type: 'mouseUp',
        button: 'left',
        x: metadata.x,
        y: metadata.y
      })
      break
    case 'rightClick':
      inputEvents.push({
        type: 'mouseDown',
        button: 'right',
        x: metadata.x,
        y: metadata.y
      })
      inputEvents.push({
        type: 'mouseUp',
        button: 'right',
        x: metadata.x,
        y: metadata.y
      })
      break
    case 'back':
      mainWindow.webContents.goBack()
      break
    case 'esc':
      inputEvents.push({
        type: 'keyDown',
        keyCode: 'Esc'
      })
      inputEvents.push({
        type: 'keyUp',
        keyCode: 'Esc'
      })
      break
  }

  if (inputEvents.length) {
    inputEvents.forEach((event) => mainWindow.webContents.sendInputEvent(event))
  }
})

async function postPlaySession(
  appName: string,
  runner: Runner,
  sessionPlaytimeInMs: bigint
) {
  const game = gameManagerMap[runner].getGameInfo(appName)
  const { hyperPlayListing } = await gameIsEpicForwarderOnHyperPlay(game)
  await postPlaySessionTime(
    hyperPlayListing?.project_id || appName,
    // round up to prevent session time loss
    parseInt(((sessionPlaytimeInMs + BigInt(1000)) / BigInt(1000)).toString())
  )
}

function syncPlaySession(appName: string) {
  if (!Object.hasOwn(gamePlaySessionStartTimes, appName)) {
    return BigInt(0)
  }

  // reset the time counter and start new session slightly before ending current session to prevent time loss
  const startPlayingTimeMonotonic = startNewPlaySession(appName)
  const stopPlayingTimeMonotonic = hrtime.bigint()
  const sessionPlaytimeInMs =
    (stopPlayingTimeMonotonic - startPlayingTimeMonotonic) / BigInt(1000000)

  // update local json with time played
  const sessionPlaytimeInMinutes =
    sessionPlaytimeInMs / BigInt(1000) / BigInt(60)

  const totalPlaytime =
    sessionPlaytimeInMinutes + BigInt(tsStore.get(`${appName}.totalPlayed`, 0))
  tsStore.set(`${appName}.totalPlayed`, Number(totalPlaytime))

  return sessionPlaytimeInMs
}

let gamePlaySessionStartTimes: Record<string, bigint> = {}

function startNewPlaySession(appName: string) {
  const prevStartTime = gamePlaySessionStartTimes[appName]
  gamePlaySessionStartTimes = {}
  // Uses hrtime for monotonic timer not subject to clock drift or sync errors
  const startPlayingTimeMonotonic = hrtime.bigint()
  gamePlaySessionStartTimes[appName] = startPlayingTimeMonotonic
  return prevStartTime
}

async function completeHyperPlayQuest() {
  const completeHpSummonQuestIsActive = getFlag(
    'complete-hp-summon-quest',
    false
  )

  if (!completeHpSummonQuestIsActive) {
    return
  }
  logInfo('Completing HyperPlay Quest', LogPrefix.HyperPlay)
  try {
    const isConnected = await checkG7ConnectionStatus()
    if (!isConnected) {
      logInfo(
        'HyperPlay account is not connected to Game7 Account',
        LogPrefix.HyperPlay
      )
    }

    const cookieString = await getPartitionCookies({
      partition: 'persist:auth',
      url: DEV_PORTAL_URL
    })

    const response = await fetch(`${DEV_PORTAL_URL}/api/hyperplay-quest`, {
      method: 'POST',
      headers: {
        Cookie: cookieString
      }
    })

    if (!response.ok) {
      const error = await response.json()
      logError(
        `Failed to complete summon task: ${
          error?.message ?? response.statusText
        }`,
        LogPrefix.HyperPlay
      )
      trackEvent({
        event: 'HyperPlay Summon Quest Failed'
      })
      return
    }

    trackEvent({
      event: 'HyperPlay Summon Quest Succeeded'
    })
  } catch (err) {
    logError(`Error completing Summon quest ${err}`, LogPrefix.HyperPlay)
    trackEvent({
      event: 'HyperPlay Summon Quest Failed'
    })
  }

  logInfo(`Completed HyperPlay Summon task`, LogPrefix.Backend)
}
