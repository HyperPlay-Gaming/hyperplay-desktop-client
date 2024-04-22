import {
  initExtension,
  resetExtension
} from 'backend/hyperplay-extension-helper/ipcHandlers/index'
import { initImagesCache } from './images_cache'
import { downloadAntiCheatData } from './anticheat/utils'
import {
  AppSettings,
  GamepadInputEvent,
  GameSettings,
  Runner,
  StatusPromise
} from 'common/types'
import * as path from 'path'
import { join } from 'path'
import {
  app,
  BrowserWindow,
  clipboard,
  dialog,
  globalShortcut,
  ipcMain,
  Menu,
  powerSaveBlocker,
  protocol,
  screen,
  session
} from 'electron'
import 'backend/updater'
import { autoUpdater } from 'electron-updater'
import { cpus, platform } from 'os'
import {
  appendFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  watch,
  writeFileSync
} from 'graceful-fs'
import * as LDElectron from 'launchdarkly-electron-client-sdk'
import Backend from 'i18next-fs-backend'
import i18next from 'i18next'
import { DXVK, Winetricks } from './tools'
import { GameConfig } from './game_config'
import { GlobalConfig } from './config'
import { LegendaryUser } from 'backend/storeManagers/legendary/user'
import { GOGUser } from './storeManagers/gog/user'
import { NileUser } from './storeManagers/nile/user'
import setup from './storeManagers/gog/setup'
import nileSetup from './storeManagers/nile/setup'
import {
  clearCache,
  execAsync,
  getGOGdlBin,
  getLegendaryBin,
  getPlatformName,
  getStoreName,
  isEpicServiceOffline,
  handleExit,
  checkRosettaInstall,
  openUrlOrFile,
  resetApp,
  setGPTKDefaultOnMacOS,
  showAboutWindow,
  showItemInFolder,
  wait,
  getShellPath,
  checkWineBeforeLaunch,
  downloadDefaultWine
} from './utils'
import {
  configPath,
  configStore,
  createNecessaryFolders,
  customThemesWikiLink,
  discordLink,
  epicLoginUrl,
  eventsToCloseMetaMaskPopupOn,
  fixAsarPath,
  fontsStore,
  gamesConfigPath,
  githubURL,
  hyperplaySite,
  icon,
  installed,
  isCLIFullscreen,
  isCLINoGui,
  isFlatpak,
  isMac,
  isSteamDeckGameMode,
  onboardLocalStore,
  publicDir,
  setQaToken,
  sidInfoUrl,
  supportURL,
  tsStore,
  twitterLink,
  userHome,
  weblateUrl,
  wikiLink,
  wineprefixFAQ
} from './constants'
import { handleProtocol } from './protocol'
import {
  initLogger,
  logChangedSetting,
  logError,
  logInfo,
  LogPrefix,
  logsDisabled,
  logWarning
} from './logger/logger'
import { gameInfoStore } from 'backend/storeManagers/legendary/electronStores'
import { getFonts } from 'font-list'
import { runWineCommand, verifyWinePrefix } from './launcher'
import shlex from 'shlex'
import { initQueue } from './downloadmanager/downloadqueue'
import * as ExtensionHelper from './hyperplay-extension-helper/extensionProvider'
import * as ProxyServer from './hyperplay-proxy-server/proxy'
import {
  initOnlineMonitor,
  isOnline,
  runOnceWhenOnline
} from './online_monitor'
import { notify, showDialogBoxModalAuto } from './dialog/dialog'
import { addRecentGame } from './recent_games/recent_games'
import { callAbortController } from './utils/aborthandler/aborthandler'
import { getDefaultSavePath } from './save_sync'
import { initTrayIcon } from './tray_icon/tray_icon'
import {
  createMainWindow,
  getMainWindow,
  sendFrontendMessage
} from './main_window'
import { addGameToLibrary } from './storeManagers/hyperplay/library'

import * as HyperPlayGameManager from 'backend/storeManagers/hyperplay/games'
import * as HyperPlayLibraryManager from 'backend/storeManagers/hyperplay/library'
import * as GOGLibraryManager from 'backend/storeManagers/gog/library'
import {
  getGOGPlaytime,
  syncQueuedPlaytimeGOG,
  updateGOGPlaytime
} from 'backend/storeManagers/gog/games'
import { playtimeSyncQueue } from './storeManagers/gog/electronStores'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'

import {
  autoUpdate,
  gameManagerMap,
  initStoreManagers,
  libraryManagerMap,
  sendGameUpdatesNotifications
} from './storeManagers'
import { legendarySetup } from 'backend/storeManagers/legendary/setup'

import * as Sentry from '@sentry/electron'
import { DEV_PORTAL_URL, devSentryDsn, prodSentryDsn } from 'common/constants'

/*
 * INSERT OTHER IPC HANDLERS HERE
 */
import './logger/ipc_handler'
import './wine/manager/ipc_handler'
import './shortcuts/ipc_handler'
import './anticheat/ipc_handler'
import 'backend/storeManagers/legendary/eos_overlay/ipc_handler'
import './wine/runtimes/ipc_handler'
import './downloadmanager/ipc_handler'
import './utils/ipc_handler'
import './wiki_game_info/ipc_handler'
import './recent_games/ipc_handler'
import './metrics/ipc_handler'
import 'backend/hyperplay-extension-helper/usbHandler'

import './ipcHandlers'
import './ipcHandlers/checkDiskSpace'

import { metricsAreEnabled, trackEvent } from './metrics/metrics'
import { hpLibraryStore } from './storeManagers/hyperplay/electronStore'
import { libraryStore as sideloadLibraryStore } from 'backend/storeManagers/sideload/electronStores'
import { backendEvents } from 'backend/backend_events'
import { closeOverlay, toggleOverlay } from 'backend/hyperplay-overlay'
import { PROVIDERS } from 'common/types/proxy-types'
import 'backend/hyperplay-achievements'
import 'backend/utils/auto_launch'

ProxyServer.serverStarted.then(() => console.log('Server started'))

let sentryInitialized = false

function initSentry() {
  if (sentryInitialized) return
  Sentry.init({
    dsn: app.isPackaged ? prodSentryDsn : devSentryDsn
  })
  sentryInitialized = true
}

if (metricsAreEnabled()) {
  initSentry()
}

import { logFileLocation as getLogFileLocation } from './storeManagers/storeManagerCommon/games'
import { addNewApp } from './storeManagers/sideload/library'
import {
  getGameOverride,
  getGameSdl
} from 'backend/storeManagers/legendary/library'
import { uuid } from 'short-uuid'
import { LDEnvironmentId, ldOptions } from './ldconstants'
import getPartitionCookies from './utils/get_partition_cookies'
import { runWineCommandOnGame } from 'backend/storeManagers/hyperplay/games'
import { formatSystemInfo, getSystemInfo } from './utils/systeminfo'

let ldMainClient: LDElectron.LDElectronMainClient

if (!app.isPackaged || process.env.DEBUG_HYPERPLAY === 'true') {
  app.commandLine?.appendSwitch('remote-debugging-port', '9222')
}

const { showOpenDialog } = dialog
const isWindows = platform() === 'win32'

let mainWindow: BrowserWindow
let ignoreExitToTray = false

ipcMain.on('ignoreExitToTray', () => {
  ignoreExitToTray = true
})

ipcMain.on('focusMainWindow', () => {
  const mainWindow = getMainWindow()

  if (!mainWindow) {
    return
  }

  mainWindow.show()
  mainWindow?.focus()
})

async function completeHyperPlayQuest() {
  const completeHpSummonQuestIsActive = ldMainClient.variation(
    'complete-hp-summon-quest',
    false
  )
  if (!completeHpSummonQuestIsActive) {
    return
  }
  logInfo('Completing HyperPlay Quest', LogPrefix.Backend)
  try {
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
        LogPrefix.Backend
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

async function initializeWindow(): Promise<BrowserWindow> {
  createNecessaryFolders()
  configStore.set('userHome', userHome)
  mainWindow = createMainWindow()

  mainWindow.webContents.on('input-event', (ev, inputEv) => {
    if (eventsToCloseMetaMaskPopupOn.includes(inputEv.type)) {
      backendEvents.emit('removePopup')
    }
  })

  ExtensionHelper.initExtensionProvider(mainWindow)

  if ((isSteamDeckGameMode || isCLIFullscreen) && !isCLINoGui) {
    logInfo(
      [
        isSteamDeckGameMode
          ? 'HyperPlay started via Steam-Deck gamemode.'
          : 'HyperPlay started with --fullscreen',
        'Switching to fullscreen'
      ],
      LogPrefix.Backend
    )
    mainWindow.setFullScreen(true)
  }

  mainWindow.setIcon(icon)
  app.setAppUserModelId('HyperPlay')
  app.commandLine?.appendSwitch('enable-spatial-navigation')

  mainWindow.on('close', async (e) => {
    e.preventDefault()

    if (!isCLIFullscreen && !isSteamDeckGameMode) {
      // store windows properties
      configStore.set('window-props', mainWindow.getBounds())
    }

    const { exitToTray } = GlobalConfig.get().getSettings()

    if (!ignoreExitToTray && exitToTray) {
      logInfo('Exitting to tray instead of quitting', LogPrefix.Backend)
      return mainWindow.hide()
    }

    handleExit()
  })

  // if (isWindows) {
  //   detectVCRedist(mainWindow)
  // }

  loadMainWindowURL()

  return mainWindow
}

const devAppUrl = 'http://localhost:5173/?view=App'
const prodAppUrl = `file://${path.join(
  publicDir,
  '../build/index.html?view=App'
)}`
const loadMainWindowURL = function () {
  if (!app.isPackaged && process.env.CI !== 'e2e') {
    mainWindow.loadURL(devAppUrl)
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    Menu.setApplicationMenu(null)
    mainWindow.loadURL(prodAppUrl)
    autoUpdater.checkForUpdates().then((val) => {
      logInfo(
        `Auto Updater found version: ${val?.updateInfo.version} released on ${val?.updateInfo.releaseDate} with name ${val?.updateInfo.releaseName}`
      )
    })
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    let pattern
    if (!app.isPackaged) {
      pattern = 'localhost:5173'
    } else {
      pattern = publicDir
    }
    return { action: !details.url.match(pattern) ? 'allow' : 'deny' }
  })

  ipcMain.on('setZoomFactor', async (event, zoomFactor) => {
    mainWindow.webContents.setZoomFactor(
      processZoomForScreen(parseFloat(zoomFactor))
    )
  })

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const gotTheLock = app.requestSingleInstanceLock()
let openUrlArgument = ''

const processZoomForScreen = (zoomFactor: number) => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize.width
  if (screenSize < 1200) {
    const extraDPIZoomIn = screenSize / 1200
    return zoomFactor * extraDPIZoomIn
  } else {
    return zoomFactor
  }
}

if (!gotTheLock) {
  logInfo('HyperPlay is already running, quitting this instance')
  app.quit()
} else {
  app.on('second-instance', (event, argv) => {
    // Someone tried to run a second instance, we should focus our window.
    const mainWindow = getMainWindow()
    mainWindow?.show()

    handleProtocol(argv)
  })
  app.whenReady().then(async () => {
    trackEvent({
      event: 'HyperPlay Launched'
    })

    initStoreManagers()

    initLogger()

    const ses = session.fromPartition(
      'persist:InPageWindowEthereumExternalWallet'
    )
    ses.setPreloads([path.join(__dirname, '../preload/providerPreload.js')])

    const authSession = session.fromPartition('persist:auth')
    authSession.setPreloads([
      path.join(__dirname, '../preload/providerPreload.js'),
      path.join(__dirname, '../preload/auth_provider_preload.js')
    ])

    const emailModalSession = session.fromPartition('persist:emailModal')
    emailModalSession.setPreloads([
      path.join(__dirname, '../preload/email_modal_provider_preload.js')
    ])

    const hpStoreSession = session.fromPartition('persist:hyperplaystore')
    hpStoreSession.setPreloads([
      path.join(__dirname, '../preload/hyperplay_store_preload.js'),
      path.join(__dirname, '../preload/webview_style_preload.js')
    ])
    const epicStoreSession = session.fromPartition('persist:epicstore')
    epicStoreSession.setPreloads([
      path.join(__dirname, '../preload/webview_style_preload.js')
    ])

    // keyboards with alt and no option key can be used with mac so register both
    const openOverlayAccelerator = 'Alt+X'
    globalShortcut.register(openOverlayAccelerator, toggleOverlay)
    const openOverlayAcceleratorMac = 'Option+X'
    globalShortcut.register(openOverlayAcceleratorMac, toggleOverlay)

    initExtension()

    initOnlineMonitor()

    initImagesCache()

    logInfo(
      ['Legendary location:', join(...Object.values(getLegendaryBin()))],
      LogPrefix.Legendary
    )
    logInfo(
      ['GOGDL location:', join(...Object.values(getGOGdlBin()))],
      LogPrefix.Gog
    )
    logInfo(
      ['GOGDL location:', join(...Object.values(getGOGdlBin()))],
      LogPrefix.Gog
    )

    // TODO: Remove this after a couple of stable releases
    // Affects only current users, not new installs
    const settings = GlobalConfig.get().getSettings()
    const { language } = settings
    const currentConfigStore = configStore.get_nodefault('settings')
    if (!currentConfigStore?.defaultInstallPath) {
      configStore.set('settings', settings)
    }

    runOnceWhenOnline(async () => {
      const isLoggedIn = LegendaryUser.isLoggedIn()

      if (!isLoggedIn) {
        logInfo('User Not Found, removing it from Store', {
          prefix: LogPrefix.Backend,
          forceLog: true
        })
        configStore.delete('userInfo')
      }

      // Update user details
      if (GOGUser.isLoggedIn()) {
        GOGUser.getUserDetails()
      }

      //update metadata for all hp store games in library on launch
      HyperPlayLibraryManager.refresh()
    })

    // Make sure lock is not present when starting up
    playtimeSyncQueue.delete('lock')
    runOnceWhenOnline(syncQueuedPlaytimeGOG)

    await i18next.use(Backend).init({
      backend: {
        addPath: path.join(publicDir, 'locales', '{{lng}}', '{{ns}}'),
        allowMultiLoading: false,
        loadPath: path.join(publicDir, 'locales', '{{lng}}', '{{ns}}.json')
      },
      debug: false,
      returnEmptyString: false,
      returnNull: false,
      fallbackLng: 'en',
      lng: language,
      supportedLngs: [
        'ar',
        'az',
        'be',
        'bg',
        'bs',
        'ca',
        'cs',
        'de',
        'el',
        'en',
        'es',
        'et',
        'eu',
        'fa',
        'fi',
        'fr',
        'gl',
        'hr',
        'hu',
        'ja',
        'ko',
        'id',
        'it',
        'ml',
        'nb_NO',
        'nl',
        'pl',
        'pt',
        'pt_BR',
        'ro',
        'ru',
        'sk',
        'sv',
        'ta',
        'tr',
        'uk',
        'vi',
        'zh_Hans',
        'zh_Hant'
      ]
    })

    let ldUser = GlobalConfig.get().getSettings().ldUser

    if (!ldUser) {
      logInfo('No LaunchDarkly user found, creating new one.')
      ldUser = {
        kind: 'user',
        key: uuid()
      }
      configStore.set('settings.ldUser', ldUser)
    }

    ldMainClient = LDElectron.initializeInMain(
      LDEnvironmentId,
      ldUser,
      ldOptions
    )

    ldMainClient.on('ready', () => {
      logInfo('LaunchDarkly client initialized', LogPrefix.Backend)
    })

    const mainWindow = await initializeWindow()

    if (!app.isPackaged) {
      const devToolsAccelerator =
        process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
      globalShortcut.register(devToolsAccelerator, () => {
        mainWindow.webContents.openDevTools()
      })
    }

    protocol.registerStringProtocol('hyperplay', (request, callback) => {
      handleProtocol([request.url])
      callback('Operation initiated.')
    })
    if (!app.isDefaultProtocolClient('hyperplay')) {
      if (app.setAsDefaultProtocolClient('hyperplay')) {
        logInfo('Registered protocol with OS.', LogPrefix.Backend)
      } else {
        logWarning('Failed to register protocol with OS.', LogPrefix.Backend)
      }
    } else {
      logWarning('Protocol already registered.', LogPrefix.Backend)
    }

    const { startInTray } = GlobalConfig.get().getSettings()
    const headless = isCLINoGui || startInTray
    logInfo(
      `App is starting in headless mode = ${headless} isCLINoGui = ${isCLINoGui} startInTray = ${startInTray}`,
      LogPrefix.Backend
    )
    if (!headless) {
      ipcMain.once('loadingScreenReady', () => mainWindow.show())
      setTimeout(() => {
        if (!mainWindow.isVisible()) {
          logInfo(
            'Frontend did not initialize after 10 seconds! Showing main window now',
            LogPrefix.Backend
          )
          mainWindow.show()
        }
      }, 10000)
    }

    // Will download Wine if none was found
    const availableWine = (await GlobalConfig.get().getAlternativeWine()) || []
    const toolkitDownloaded = availableWine.some(
      (wine) => wine.type === 'toolkit'
    )
    const shouldDownloadWine =
      !availableWine.length || (isMac && !toolkitDownloaded)

    Promise.all([
      DXVK.getLatest(),
      Winetricks.download(),
      shouldDownloadWine ? downloadDefaultWine() : null,
      isMac && checkRosettaInstall(),
      isMac && !shouldDownloadWine && setGPTKDefaultOnMacOS()
    ])

    // set initial zoom level after a moment, if set in sync the value stays as 1
    setTimeout(() => {
      const zoomFactor = configStore.get('zoomPercent', 100) / 100

      mainWindow.webContents.setZoomFactor(processZoomForScreen(zoomFactor))
    }, 200)

    ipcMain.on('changeLanguage', async (event, language) => {
      logInfo(['Changing Language to:', language], LogPrefix.Backend)
      await i18next.changeLanguage(language)
      gameInfoStore.clear()
    })

    downloadAntiCheatData()

    initTrayIcon(mainWindow)

    return
  })
}

ipcMain.on('notify', (event, args) => notify(args))

ipcMain.once('loadingScreenReady', () => {
  logInfo('Loading Screen Ready', LogPrefix.Backend)
})

ipcMain.once('frontendReady', () => {
  logInfo('Frontend Ready', LogPrefix.Backend)
  handleProtocol([openUrlArgument, ...process.argv])
  setTimeout(() => {
    logInfo('Starting the Download Queue', LogPrefix.Backend)
    initQueue()
  }, 5000)

  watchLibraryChanges()
})

// Maybe this can help with white screens
process.on('uncaughtException', async (err) => {
  logError(
    `'Uncaught Exception occured!': ${err.name}: ${err.message}`,
    LogPrefix.Backend
  )
  /*   showDialogBoxModalAuto({
    title: i18next.t(
      'box.error.uncaught-exception.title',
      'Uncaught Exception occured!'
    ),
    message: i18next.t('box.error.uncaught-exception.message', {
      defaultValue:
        'A uncaught exception occured:{{newLine}}{{error}}{{newLine}}{{newLine}} Report the exception on our Github repository.',
      newLine: '\n',
      error: err
    }),
    type: 'ERROR'
  }) */
})

let powerId: number | null

ipcMain.on('lock', () => {
  if (!existsSync(join(gamesConfigPath, 'lock'))) {
    writeFileSync(join(gamesConfigPath, 'lock'), '')
    if (!powerId) {
      logInfo('Preventing machine to sleep', LogPrefix.Backend)
      powerId = powerSaveBlocker.start('prevent-app-suspension')
    }
  }
})

ipcMain.on('unlock', () => {
  if (existsSync(join(gamesConfigPath, 'lock'))) {
    unlinkSync(join(gamesConfigPath, 'lock'))
    if (powerId) {
      logInfo('Stopping Power Saver Blocker', LogPrefix.Backend)
      powerSaveBlocker.stop(powerId)
    }
  }
})

ipcMain.on('quit', async () => handleExit())

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('open-url', (event, url) => {
  event.preventDefault()
  const mainWindow = getMainWindow()

  if (mainWindow) {
    handleProtocol([url])
  } else {
    openUrlArgument = url
  }
})

ipcMain.on('openExternalUrl', async (event, url) => openUrlOrFile(url))
ipcMain.on('openFolder', async (event, folder) => openUrlOrFile(folder))
ipcMain.on('openSupportPage', async () => openUrlOrFile(supportURL))
ipcMain.on('openReleases', async () => openUrlOrFile(githubURL))
ipcMain.on('openWeblate', async () => openUrlOrFile(weblateUrl))
ipcMain.on('showAboutWindow', () => showAboutWindow())
ipcMain.on('openLoginPage', async () => openUrlOrFile(epicLoginUrl))
ipcMain.on('openDiscordLink', async () => openUrlOrFile(discordLink))
ipcMain.on('openTwitterLink', async () => openUrlOrFile(twitterLink))
ipcMain.on('openWinePrefixFAQ', async () => openUrlOrFile(wineprefixFAQ))
ipcMain.on('openWebviewPage', async (event, url) => openUrlOrFile(url))
ipcMain.on('openWikiLink', async () => openUrlOrFile(wikiLink))
ipcMain.on('openSidInfoPage', async () => openUrlOrFile(sidInfoUrl))
ipcMain.on('openCustomThemesWiki', async () =>
  openUrlOrFile(customThemesWikiLink)
)
ipcMain.on('showConfigFileInFolder', async (event, appName) => {
  if (appName === 'default') {
    return openUrlOrFile(configPath)
  }
  return openUrlOrFile(path.join(gamesConfigPath, `${appName}.json`))
})

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

/// IPC handlers begin here.

ipcMain.handle(
  'checkGameUpdates',
  async (e, runners: Runner[]): Promise<string[]> => {
    let oldGames: string[] = []
    const { autoUpdateGames } = GlobalConfig.get().getSettings()
    for (const runner of runners) {
      let gamesToUpdate = await libraryManagerMap[runner].listUpdateableGames()
      if (autoUpdateGames) {
        gamesToUpdate = await autoUpdate(runner as Runner, gamesToUpdate)
      }
      oldGames = [...oldGames, ...gamesToUpdate]
    }

    sendGameUpdatesNotifications().catch((e) =>
      logError(
        `Something went wrong sending update notifications: ${e}`,
        LogPrefix.Backend
      )
    )

    return oldGames
  }
)

ipcMain.handle('getEpicGamesStatus', async () => isEpicServiceOffline())

ipcMain.handle('getMaxCpus', () => cpus().length)

ipcMain.handle('getAppVersion', () => app.getVersion())
ipcMain.handle('isFullscreen', () => isSteamDeckGameMode || isCLIFullscreen)
ipcMain.handle('isFlatpak', () => isFlatpak)
ipcMain.handle('getGameOverride', async () => getGameOverride())
ipcMain.handle('getGameSdl', async (event, appName) => getGameSdl(appName))

ipcMain.handle('getPlatform', () => process.platform)

ipcMain.handle('showUpdateSetting', () => !isFlatpak)

ipcMain.on('clearCache', (event) => {
  clearCache()
  sendFrontendMessage('refreshLibrary')

  showDialogBoxModalAuto({
    event,
    title: i18next.t('box.cache-cleared.title', 'Cache Cleared'),
    message: i18next.t(
      'box.cache-cleared.message',
      'HyperPlay Cache Was Cleared!'
    ),
    type: 'MESSAGE',
    buttons: [{ text: i18next.t('box.ok', 'Ok') }]
  })
})

ipcMain.on('resetApp', async () => {
  resetApp()
})

ipcMain.on('resetExtension', async () => {
  resetExtension()
})

ipcMain.on('createNewWindow', (e, url) => {
  new BrowserWindow({ height: 700, width: 1200 }).loadURL(url)
})

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

ipcMain.handle('getAmazonUserInfo', async () => NileUser.getUserData())

// Checks if the user have logged in with Legendary already
ipcMain.handle('isLoggedIn', LegendaryUser.isLoggedIn)

ipcMain.handle('login', async (event, sid) => LegendaryUser.login(sid))
ipcMain.handle('authGOG', async (event, code) => GOGUser.login(code))
ipcMain.handle('logoutLegendary', LegendaryUser.logout)
ipcMain.on('logoutGOG', GOGUser.logout)
ipcMain.handle('getLocalPeloadPath', async () => {
  return fixAsarPath(join(publicDir, '../preload/webviewPreload.js'))
})

ipcMain.handle('getAmazonLoginData', NileUser.getLoginData)
ipcMain.handle('authAmazon', async (event, data) => NileUser.login(data))
ipcMain.handle('logoutAmazon', NileUser.logout)

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

ipcMain.on('toggleVKD3D', (event, { appName, action }) => {
  GameConfig.get(appName)
    .getSettings()
    .then((gameSettings) => {
      DXVK.installRemove(gameSettings, 'vkd3d', action)
    })
})

ipcMain.handle('writeConfig', (event, { appName, config }) => {
  logInfo(
    `Writing config for ${appName === 'default' ? 'HyperPlay' : appName}`,
    LogPrefix.Backend
  )
  const oldConfig =
    appName === 'default'
      ? GlobalConfig.get().getSettings()
      : GameConfig.get(appName).config

  // log only the changed setting
  logChangedSetting(config, oldConfig)

  if (appName === 'default') {
    GlobalConfig.get().set(config as AppSettings)
    GlobalConfig.get().flush()
    const currentConfigStore = configStore.get_nodefault('settings')
    if (currentConfigStore) {
      configStore.set('settings', { ...currentConfigStore, ...config })
    }
  } else {
    GameConfig.get(appName).config = config as GameSettings
    GameConfig.get(appName).flush()
  }
})

ipcMain.on('setSetting', (event, { appName, key, value }) => {
  if (appName === 'default') {
    GlobalConfig.get().setSetting(key, value)
  } else {
    GameConfig.get(appName).setSetting(key, value)
  }
})

// Watch the installed games file and trigger a refresh on the installed games if something changes
if (existsSync(installed)) {
  let watchTimeout: NodeJS.Timeout | undefined
  watch(installed, () => {
    logInfo('installed.json updated, refreshing library', LogPrefix.Legendary)
    // `watch` might fire twice (while Legendary/we are still writing chunks of the file), which would in turn make LegendaryLibrary fail to
    // decode the JSON data. So instead of immediately calling LegendaryLibrary.get().refreshInstalled(), call it only after no writes happen
    // in a 500ms timespan
    if (watchTimeout) clearTimeout(watchTimeout)
    watchTimeout = setTimeout(LegendaryLibraryManager.refreshInstalled, 500)
  })
}

ipcMain.handle('refreshLibrary', async (e, library?) => {
  if (library !== undefined && library !== 'all') {
    await libraryManagerMap[library].refresh()
  } else {
    const allRefreshPromises = []
    for (const runner_i in libraryManagerMap) {
      allRefreshPromises.push(libraryManagerMap[runner_i].refresh())
    }
    await Promise.allSettled(allRefreshPromises)
  }
})

ipcMain.on('logError', (e, err) => logError(err, LogPrefix.Frontend))

ipcMain.on('logInfo', (e, info) => logInfo(info, LogPrefix.Frontend))

let powerDisplayId: number | null

// get pid/tid on launch and inject
ipcMain.handle(
  'launch',
  async (event, { appName, launchArguments, runner }): StatusPromise => {
    const game = gameManagerMap[runner].getGameInfo(appName)
    const gameSettings = await gameManagerMap[runner].getSettings(appName)
    const { autoSyncSaves, savesPath, gogSaves = [] } = gameSettings

    const { title, app_name, browserUrl, install } = game

    const { minimizeOnGameLaunch } = GlobalConfig.get().getSettings()

    const startPlayingDate = new Date()

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
    // Playtime of this session in minutes
    const sessionPlaytime =
      (finishedPlayingDate.getTime() - startPlayingDate.getTime()) / 1000 / 60
    const totalPlaytime =
      sessionPlaytime + tsStore.get(`${appName}.totalPlayed`, 0)
    tsStore.set(`${appName}.totalPlayed`, Math.floor(totalPlaytime))

    if (runner === 'gog') {
      await updateGOGPlaytime(appName, startPlayingDate, finishedPlayingDate)
    }

    await addRecentGame(game)

    if (autoSyncSaves && isOnline()) {
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

    trackEvent({
      event: 'Game Closed',
      properties: {
        game_name: app_name,
        isBrowserGame: browserUrl !== undefined,
        game_title: title,
        store_name: getStoreName(runner),
        browserUrl: browserUrl ?? undefined,
        platform: getPlatformName(install.platform!),
        playTimeInMs: sessionPlaytime * 60 * 1000,
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

ipcMain.handle('openDialog', async (e, args) => {
  const mainWindow = getMainWindow()
  if (!mainWindow) {
    return false
  }

  const { filePaths, canceled } = await showOpenDialog(mainWindow, args)
  if (!canceled) {
    return filePaths[0]
  }
  return false
})

ipcMain.on('showItemInFolder', async (e, item) => showItemInFolder(item))

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

ipcMain.on('removeFromLibrary', (event, appName) => {
  HyperPlayLibraryManager.removeFromLibrary(appName)
})

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

ipcMain.handle('kill', async (event, appName, runner) => {
  callAbortController(appName)
  return gameManagerMap[runner].stop(appName)
})

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
  async (_e, licenseConfigId: number, accessCode: string) => {
    return HyperPlayGameManager.validateAccessCode({
      accessCode,
      licenseConfigId
    })
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
  'runWineCommandForGame',
  async (event, { appName, commandParts, runner }) => {
    const gameSettings = await gameManagerMap[runner].getSettings(appName)

    if (isWindows) {
      return execAsync(commandParts.join(' '))
    }
    const { updated } = await verifyWinePrefix(gameSettings)

    if (runner === 'gog' && updated) {
      await setup(appName)
    }
    if (runner === 'nile' && updated) {
      await nileSetup(appName)
    }
    if (runner === 'legendary' && updated) {
      await legendarySetup(appName)
    }

    // FIXME: Why are we using `runinprefix` here?
    return runWineCommandOnGame(runner, appName, {
      commandParts,
      wait: false,
      protonVerb: 'runinprefix'
    })
  }
)

ipcMain.handle('getShellPath', async (event, path) => getShellPath(path))

ipcMain.handle('clipboardReadText', () => clipboard.readText())

ipcMain.on('clipboardWriteText', (e, text) => clipboard.writeText(text))

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

  const cssPath = path.join(customThemesPath, theme)

  if (!existsSync(cssPath)) {
    return ''
  }

  return readFileSync(cssPath, 'utf-8')
})

ipcMain.on('addNewApp', (e, args) => addNewApp(args))

ipcMain.handle('removeApp', async (e, args) => {
  gameManagerMap[args.runner].uninstall(args)
})

ipcMain.handle('launchApp', async (e, appName, runner) =>
  gameManagerMap[runner].launch(appName)
)

ipcMain.handle('isNative', (e, { appName, runner }) => {
  return gameManagerMap[runner].isNative(appName)
})

ipcMain.handle('pathExists', async (e, path: string) => {
  return existsSync(path)
})

ipcMain.handle(
  'getPlaytimeFromRunner',
  async (e, runner, appName): Promise<number | undefined> => {
    if (runner === 'gog') {
      return getGOGPlaytime(appName)
    }

    return
  }
)

/*
  Other Keys that should go into translation files:
  t('box.error.generic.title')
  t('box.error.generic.message')
 */

// sends messages to renderer process through preload.ts callbacks
backendEvents.on('walletConnected', function (accounts: string[]) {
  getMainWindow()?.webContents.send('walletConnected', accounts)
})

backendEvents.on('walletDisconnected', function (code: number, reason: string) {
  getMainWindow()?.webContents.send('walletDisconnected', code, reason)
})

backendEvents.on('connectionRequestRejected', function () {
  getMainWindow()?.webContents.send('connectionRequestRejected')
})

backendEvents.on('chainChanged', function (chainId: number) {
  getMainWindow()?.webContents.send('chainChanged', chainId)
})

backendEvents.on(
  'accountsChanged',
  function (accounts: string[], provider: PROVIDERS) {
    getMainWindow()?.webContents.send('accountChanged', accounts, provider)
  }
)

ipcMain.on('openHyperplaySite', async () => openUrlOrFile(hyperplaySite))

ipcMain.on('reloadApp', async () => {
  for (const win of BrowserWindow.getAllWindows()) {
    win.loadURL(win.webContents.getURL())
  }
})

ipcMain.handle('addHyperplayGame', async (_e, projectId) => {
  await addGameToLibrary(projectId)
})

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

function watchLibraryChanges() {
  // workaround for https://github.com/sindresorhus/electron-store/issues/165
  sideloadLibraryStore.onDidChange('games', (newValue) =>
    sendFrontendMessage('onLibraryChanged', 'sideload', newValue)
  )
  hpLibraryStore.onDidChange('games', (newValue) =>
    sendFrontendMessage('onLibraryChanged', 'hyperplay', newValue)
  )
}

ipcMain.on('openGameInEpicStore', async (_e, url) => {
  if (url.startsWith('https://store.epicgames.com/'))
    sendFrontendMessage('navToEpicAndOpenGame', url)
})

ipcMain.on('setQaToken', (_e, qaToken) => {
  setQaToken(qaToken)
  if (qaToken.length > 0) sendFrontendMessage('qaModeActive')
})

ipcMain.on('openAuthModalIfAppReloads', () => {
  onboardLocalStore.set('openAuthModalIfAppReloads', true)
})

ipcMain.on('killOverlay', () => {
  closeOverlay()
})
/*
 * INSERT OTHER IPC HANDLERS HERE
 */

import './storeManagers/legendary/eos_overlay/ipc_handler'
