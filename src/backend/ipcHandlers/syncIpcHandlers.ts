import {
  app,
  BrowserWindow,
  clipboard,
  ipcMain,
  powerSaveBlocker,
  screen
} from 'electron'
import { join } from 'path'
import i18next from 'i18next'
import { existsSync, unlinkSync, writeFileSync } from 'graceful-fs'
import {
  openUrlOrFile,
  resetApp,
  showAboutWindow,
  showItemInFolder
} from '../utils'
import {
  configPath,
  customThemesWikiLink,
  discordLink,
  epicLoginUrl,
  gamesConfigPath,
  githubURL,
  hyperplaySite,
  sidInfoUrl,
  supportURL,
  twitterLink,
  weblateUrl,
  wineprefixFAQ,
  wikiLink,
  setQaToken
} from 'backend/constants'
import { LogPrefix, logError, logInfo } from '../logger/logger'
import { notify, showDialogBoxModalAuto } from '../dialog/dialog'
import { getMainWindow, sendFrontendMessage } from '../main_window'
import { clearCache } from 'backend/utils'
import { getHpOverlay } from '../overlay'
import { hpApi } from '../utils/hyperplay_api'
import { onboardLocalStore } from '../constants'
import { addNewApp } from 'backend/api/library'
import { GlobalConfig } from 'backend/config'
import { GameConfig } from 'backend/game_config'
import * as HyperPlayLibraryManager from 'backend/storeManagers/hyperplay/library'
import { autoUpdater } from 'electron-updater'
import { GOGUser } from 'backend/storeManagers/gog/user'

const mainWindow = getMainWindow()

ipcMain.on('focusMainWindow', () => {
  if (!mainWindow) {
    return
  }

  mainWindow.show()
  mainWindow?.focus()
})

ipcMain.on('notify', (event, args) => notify(args))

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
  return openUrlOrFile(join(gamesConfigPath, `${appName}.json`))
})

ipcMain.on('setZoomFactor', async (event, zoomFactor) => {
  if (!mainWindow) {
    return
  }

  mainWindow.webContents.setZoomFactor(
    processZoomForScreen(parseFloat(zoomFactor))
  )
})

ipcMain.on('clearCache', (event, showDialog, fromVersionChange = false) => {
  clearCache(undefined, fromVersionChange)
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
  const extensionImporter = await import('@hyperplay/extension-importer')
  extensionImporter.resetExtension(hpApi)
  ipcMain.emit('ignoreExitToTray')
  app.quit()
})

ipcMain.on('createNewWindow', (e, url) => {
  new BrowserWindow({ height: 700, width: 1200 }).loadURL(url)
})

ipcMain.on('goToGamePage', async (event, gameId, action) => {
  return sendFrontendMessage('goToGamePage', gameId, action)
})

ipcMain.on('navigate', async (event, appName) => {
  return sendFrontendMessage('navigate', appName)
})

ipcMain.on('setSetting', (event, { appName, key, value }) => {
  if (appName === 'default') {
    GlobalConfig.get().setSetting(key, value)
  } else {
    GameConfig.get(appName).setSetting(key, value)
  }
})

ipcMain.on('logError', (e, err, options) =>
  logError(err, { ...options, prefix: LogPrefix.Frontend })
)

ipcMain.on('logInfo', (e, info) => logInfo(info, LogPrefix.Frontend))

ipcMain.on('clipboardWriteText', (e, text) => clipboard.writeText(text))

ipcMain.on('addNewApp', (e, args) => addNewApp(args))

ipcMain.on('openHyperplaySite', async () => openUrlOrFile(hyperplaySite))

ipcMain.on('reloadApp', async () => {
  for (const win of BrowserWindow.getAllWindows()) {
    win.loadURL(win.webContents.getURL())
  }
})

ipcMain.on('removeFromLibrary', (event, appName) => {
  HyperPlayLibraryManager.removeFromLibrary(appName)
})

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

ipcMain.on('killOverlay', async () => {
  const hpOverlay = await getHpOverlay()
  hpOverlay?.closeOverlay()
})

ipcMain.on('toggleOverlay', async (ev, ...args) => {
  const hpOverlay = await getHpOverlay()
  hpOverlay?.toggleOverlay(...args)
})

const processZoomForScreen = (zoomFactor: number) => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize.width
  if (screenSize < 1200) {
    const extraDPIZoomIn = screenSize / 1200
    return zoomFactor * extraDPIZoomIn
  } else {
    return zoomFactor
  }
}

ipcMain.on('showItemInFolder', async (e, item) => showItemInFolder(item))
ipcMain.on('restartClient', () => autoUpdater.quitAndInstall())
ipcMain.on('logoutGOG', GOGUser.logout)
