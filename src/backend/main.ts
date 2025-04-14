import { initImagesCache } from './images_cache'
import { downloadAntiCheatData } from './anticheat/utils'
import * as path from 'path'
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  protocol,
  screen,
  session
} from 'electron'
import { uuid } from 'short-uuid'
import { autoUpdater } from 'electron-updater'
import { platform } from 'os'
import { existsSync, watch } from 'graceful-fs'
import Backend from 'i18next-fs-backend'
import i18next from 'i18next'
import { GlobalConfig } from './config'
import { LegendaryUser } from 'backend/storeManagers/legendary/user'
import { GOGUser } from './storeManagers/gog/user'
import { handleExit, wait, checkGameUpdates } from './utils'
import {
  configStore,
  createNecessaryFolders,
  eventsToCloseMetaMaskPopupOn,
  icon,
  installed,
  isCLIFullscreen,
  isCLINoGui,
  isSteamDeckGameMode,
  publicDir,
  userHome
} from './constants'
import { handleOtp, handleProtocol } from './protocol'
import {
  initLogger,
  logError,
  logInfo,
  LogPrefix,
  logWarning
} from './logger/logger'
import { gameInfoStore } from 'backend/storeManagers/legendary/electronStores'
import { initQueue } from './downloadmanager/downloadqueue'
import { initOnlineMonitor, runOnceWhenOnline } from './online_monitor'
import { initTrayIcon } from './tray_icon/tray_icon'
import {
  createMainWindow,
  getMainWindow,
  sendFrontendMessage
} from './main_window'

import * as HyperPlayLibraryManager from 'backend/storeManagers/hyperplay/library'
import { syncQueuedPlaytimeGOG } from 'backend/storeManagers/gog/games'
import { playtimeSyncQueue } from './storeManagers/gog/electronStores'
import * as LegendaryLibraryManager from 'backend/storeManagers/legendary/library'
import { initLDClient } from './flags/flags'
import { initStoreManagers } from './storeManagers'

import * as Sentry from '@sentry/electron'
import { devSentryDsn, prodSentryDsn } from 'common/constants'
import { getHpOverlay, initOverlay } from './overlay'

import { initExtension } from './extension/importer'
import { hpApi } from './utils/hyperplay_api'
import { initializeCompatibilityLayer } from './utils/compatibility_layers'

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
import './storeManagers/legendary/eos_overlay/ipc_handler'
import './ipcHandlers/index'

import { metricsAreEnabled, trackEvent } from './metrics/metrics'
import { hpLibraryStore } from './storeManagers/hyperplay/electronStore'
import { libraryStore as sideloadLibraryStore } from 'backend/storeManagers/sideload/electronStores'
import { backendEvents } from 'backend/backend_events'
import { PROVIDERS } from 'common/types/proxy-types'

import 'backend/utils/auto_launch'

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

    const currentStoredVersion = configStore.get('appVersion', '')
    const currentVersion = app.getVersion()

    if (currentStoredVersion !== currentVersion) {
      logInfo(
        `App version changed from ${currentStoredVersion} to ${app.getVersion()}`,
        LogPrefix.Backend
      )
      configStore.set('appVersion', currentVersion)
    }

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
  const currentVersion = app.getVersion()
  const lastVersion = configStore.get('appVersion', '')

  await initExtension(hpApi)

  // Only reload the app if the app version has changed
  if (!lastVersion || lastVersion !== currentVersion) {
    logInfo(
      'App version changed and wallet connected, reloading to update MM',
      LogPrefix.Backend
    )
    // wait for mm SW to initialize
    await wait(5000)
    ipcMain.emit('reloadApp')
  }

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
