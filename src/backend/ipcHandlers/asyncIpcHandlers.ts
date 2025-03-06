import { wait } from '@hyperplay/utils'
import {
  getGameOverride,
  getGameSdl,
  getEpicListingUrl
} from 'backend/api/library'
import { logError, logInfo, logWarning, LogPrefix } from 'backend/logger/logger'
import { GlobalConfig } from 'backend/config'
import {
  isSteamDeckGameMode,
  isCLIFullscreen,
  isFlatpak,
  configStore,
  fontsStore
} from 'backend/constants'
import { GameConfig } from 'backend/game_config'
import { verifyWinePrefix, runWineCommand } from 'backend/launcher'
import { getMainWindow, sendFrontendMessage } from 'backend/main_window'
import { isOnline } from 'backend/online_monitor'
import { getDefaultSavePath } from 'backend/save_sync'
import { gameManagerMap, libraryManagerMap } from 'backend/storeManagers'
import { getGOGPlaytime } from 'backend/storeManagers/gog/games'
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
  checkGameUpdates
} from 'backend/utils'
import { callAbortController } from 'backend/utils/aborthandler/aborthandler'
import { runWineCommandOnGame } from 'backend/utils/compatibility_layers'
import { ipcMain, app, dialog, clipboard } from 'electron'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { cpus, platform } from 'os'
import path, { join } from 'path'
import * as HyperPlayGameManager from 'backend/storeManagers/hyperplay/games'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'
import * as GOGLibraryManager from 'backend/storeManagers/gog/library'
import setup from 'backend/storeManagers/gog/setup'
import { isClientUpdating } from 'backend/updater/updater'
import { Runner } from 'common/types'
import { getFonts } from 'font-list'

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
