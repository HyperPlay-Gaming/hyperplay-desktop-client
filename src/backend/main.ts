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
  globalShortcut,
  ipcMain,
  Menu,
  powerSaveBlocker,
  protocol,
  screen,
  session
} from 'electron'
import { uuid } from 'short-uuid'
import { autoUpdater } from 'electron-updater'
import { platform } from 'os'
import {
  appendFileSync,
  existsSync,
  rmSync,
  watch,
  writeFileSync
} from 'graceful-fs'
import Backend from 'i18next-fs-backend'
import i18next from 'i18next'
import { GameConfig } from './game_config'
import { GlobalConfig } from './config'
import { LegendaryUser } from 'backend/storeManagers/legendary/user'
import { GOGUser } from './storeManagers/gog/user'
import {
  getPlatformName,
  getStoreName,
  isEpicServiceOffline,
  handleExit,
  wait,
  checkGameUpdates
} from './utils'
import {
  configStore,
  createNecessaryFolders,
  eventsToCloseMetaMaskPopupOn,
  fixAsarPath,
  gamesConfigPath,
  icon,
  installed,
  isCLIFullscreen,
  isCLINoGui,
  isSteamDeckGameMode,
  publicDir,
  tsStore,
  userHome
} from './constants'
import { handleOtp, handleProtocol } from './protocol'
import {
  initLogger,
  logError,
  logInfo,
  LogPrefix,
  logsDisabled,
  logWarning
} from './logger/logger'
import { gameInfoStore } from 'backend/storeManagers/legendary/electronStores'
import shlex from 'shlex'
import { initQueue } from './downloadmanager/downloadqueue'
import {
  initOnlineMonitor,
  isOnline,
  runOnceWhenOnline
} from './online_monitor'
import { notify, showDialogBoxModalAuto } from './dialog/dialog'
import { addRecentGame } from './recent_games/recent_games'
import { initTrayIcon } from './tray_icon/tray_icon'
import {
  createMainWindow,
  getMainWindow,
  sendFrontendMessage
} from './main_window'

import * as HyperPlayLibraryManager from 'backend/storeManagers/hyperplay/library'
import {
  syncQueuedPlaytimeGOG,
  updateGOGPlaytime
} from 'backend/storeManagers/gog/games'
import { playtimeSyncQueue } from './storeManagers/gog/electronStores'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'
import { getFlag, initLDClient } from './flags/flags'
import { gameManagerMap, initStoreManagers } from './storeManagers'

import * as Sentry from '@sentry/electron'
import { DEV_PORTAL_URL, devSentryDsn, prodSentryDsn } from 'common/constants'
import { getHpOverlay, initOverlay } from './overlay'

import { initExtension } from './extension/importer'
import { hpApi } from './utils/hyperplay_api'
import {
  initializeCompatibilityLayer,
  checkWineBeforeLaunch
} from './utils/compatibility_layers'

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
import 'backend/extension/provider'
import 'backend/proxy/ipcHandlers'

import { metricsAreEnabled, trackEvent } from './metrics/metrics'
import { hpLibraryStore } from './storeManagers/hyperplay/electronStore'
import { libraryStore as sideloadLibraryStore } from 'backend/storeManagers/sideload/electronStores'
import { backendEvents } from 'backend/backend_events'
import { PROVIDERS } from 'common/types/proxy-types'

import './ipcHandlers/index'

import 'backend/utils/auto_launch'

import { hrtime } from 'process'
import { checkG7ConnectionStatus, postPlaySessionTime } from './utils/quests'

import { gameIsEpicForwarderOnHyperPlay } from './utils/shouldOpenOverlay'

import { createInjectedProviderWindow } from './injected_provider_window'

async function initExtensionOnLaunch() {
  try {
    const extImporter = await import('@hyperplay/extension-importer')
    await extImporter.initExtensionBeforeWindowCreation(hpApi)
  } catch (err) {
    logError(
      `Error initializing extension on launch ${err}`,
      LogPrefix.HyperPlay
    )
  }
}

initExtensionOnLaunch()

async function startProxyServer() {
  try {
    const proxyServer = await import('@hyperplay/proxy-server')
    proxyServer.initServer(undefined)
    logInfo('Proxy server started', LogPrefix.HyperPlay)
  } catch (err) {
    logError(`Error starting proxy server ${err}`, LogPrefix.HyperPlay)
  }
}

startProxyServer()

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
import getPartitionCookies from './utils/get_partition_cookies'

import { formatSystemInfo, getSystemInfo } from './utils/systeminfo'

if (!app.isPackaged || process.env.DEBUG_HYPERPLAY === 'true') {
  app.commandLine?.appendSwitch('remote-debugging-port', '9222')

  ipcMain.on('otp', (e, otp: string) => {
    handleOtp(otp)
  })
}

const isWindows = platform() === 'win32'

let mainWindow: BrowserWindow
let ignoreExitToTray = false

ipcMain.on('ignoreExitToTray', () => {
  ignoreExitToTray = true
})

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

async function initializeWindow(): Promise<BrowserWindow> {
  createNecessaryFolders()
  configStore.set('userHome', userHome)
  mainWindow = await createMainWindow()

  mainWindow.webContents.on('input-event', (ev, inputEv) => {
    if (eventsToCloseMetaMaskPopupOn.includes(inputEv.type)) {
      backendEvents.emit('removePopup')
    }
  })

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
    const appSettings = configStore.get_nodefault('settings')
    const shouldCheckForUpdates = appSettings?.checkForUpdatesOnStartup === true
    if (shouldCheckForUpdates) {
      autoUpdater.checkForUpdates().then((val) => {
        logInfo(
          `Auto Updater found version: ${val?.updateInfo.version} released on ${val?.updateInfo.releaseDate} with name ${val?.updateInfo.releaseName}`
        )
      })
    }
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
  app.on('second-instance', async (event, argv) => {
    // Someone tried to run a second instance, we should focus the overlay or the main window if no overlay is running.
    const hpOverlay = await getHpOverlay()
    if (hpOverlay?.overlayIsRunning()) {
      hpOverlay.toggleOverlay({ action: 'ON', actionCause: 'AUTOMATED' })
    } else {
      const mainWindow = getMainWindow()
      mainWindow?.show()
    }

    handleProtocol(argv)
  })
  app.whenReady().then(async () => {
    trackEvent({
      event: 'HyperPlay Launched'
    })

    initStoreManagers()

    initLogger()

    createInjectedProviderWindow()

    const providerPreloadPath = path.join(
      __dirname,
      '../preload/providerPreload.js'
    )
    const hpWindowsSession = session.fromPartition('persist:hyperplay_windows')
    // inject window.ethereum into the main window and the overlay window
    hpWindowsSession.setPreloads([providerPreloadPath])

    const ses = session.fromPartition(
      'persist:InPageWindowEthereumExternalWallet'
    )
    ses.setPreloads([providerPreloadPath])

    const authSession = session.fromPartition('persist:auth')
    authSession.setPreloads([
      providerPreloadPath,
      path.join(__dirname, '../preload/auth_provider_preload.js')
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
    const g7PortalSession = session.fromPartition('persist:g7portal')
    g7PortalSession.setPreloads([
      path.join(__dirname, '../preload/hyperplay_store_preload.js'),
      providerPreloadPath
    ])

    // keyboards with alt and no option key can be used with mac so register both
    const hpOverlay = await getHpOverlay()
    const toggle = () =>
      hpOverlay?.toggleOverlay({ action: 'TOGGLE', actionCause: 'HOTKEY' }) ??
      (() =>
        logInfo(
          'Cannot toggle overlay without @hyperplay/overlay package',
          LogPrefix.HyperPlay
        ))
    const openOverlayAccelerator = 'Alt+X'
    globalShortcut.register(openOverlayAccelerator, toggle)
    const openOverlayAcceleratorMac = 'Option+X'
    globalShortcut.register(openOverlayAcceleratorMac, toggle)

    initOverlay(hpApi)
    initOnlineMonitor()

    initImagesCache()

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

    initLDClient(ldUser)

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

    // Setup the compatibility layer if not on Windows
    if (!isWindows) {
      initializeCompatibilityLayer()
    }

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

    // Call checkGameUpdates for HyperPlay games every hour
    const checkGameUpdatesInterval = 1 * 60 * 60 * 1000
    setInterval(async () => {
      try {
        await checkGameUpdates(['hyperplay'])
      } catch (error) {
        logError(`Error checking game updates: ${error}`, LogPrefix.Backend)
      }
    }, checkGameUpdatesInterval)

    return
  })
}
ipcMain.once('loadingScreenReady', () => {
  logInfo('Loading Screen Ready', LogPrefix.Backend)
})

ipcMain.once('frontendReady', async () => {
  logInfo('Frontend Ready', LogPrefix.Backend)
  await initExtension(hpApi)
  // wait for mm SW to initialize
  await wait(5000)
  ipcMain.emit('reloadApp')
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

/// IPC handlers begin here.

ipcMain.handle('getLocalPeloadPath', async () => {
  return fixAsarPath(join(publicDir, 'webviewPreload.js'))
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

let powerDisplayId: number | null
let gamePlaySessionStartTimes: Record<string, bigint> = {}

function startNewPlaySession(appName: string) {
  const prevStartTime = gamePlaySessionStartTimes[appName]
  gamePlaySessionStartTimes = {}
  // Uses hrtime for monotonic timer not subject to clock drift or sync errors
  const startPlayingTimeMonotonic = hrtime.bigint()
  gamePlaySessionStartTimes[appName] = startPlayingTimeMonotonic
  return prevStartTime
}

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

ipcMain.handle(
  'syncPlaySession',
  async (e, appName: string, runner: Runner) => {
    const sessionPlaytimeInMs = syncPlaySession(appName)
    await postPlaySession(appName, runner, sessionPlaytimeInMs)
  }
)

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

function watchLibraryChanges() {
  // workaround for https://github.com/sindresorhus/electron-store/issues/165
  sideloadLibraryStore.onDidChange('games', (newValue) =>
    sendFrontendMessage('onLibraryChanged', 'sideload', newValue)
  )
  hpLibraryStore.onDidChange('games', (newValue) => {
    for (const win of BrowserWindow.getAllWindows()) {
      win.webContents.send('onLibraryChanged', 'hyperplay', newValue)
    }
  })
}

/*
 * INSERT OTHER IPC HANDLERS HERE
 */

import './storeManagers/legendary/eos_overlay/ipc_handler'
