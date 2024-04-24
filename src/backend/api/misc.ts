import { GOGCloudSavesLocation } from 'common/types/gog'
import { ipcRenderer } from 'electron'
import {
  Runner,
  Tools,
  DialogType,
  ButtonOptions,
  GamepadActionArgs,
  WrapRendererCallback
} from 'common/types'
import { NileRegisterData } from 'common/types/nile'

export const clearCache = (showDialog?: boolean) =>
  ipcRenderer.send('clearCache', showDialog)
export const resetApp = () => ipcRenderer.send('resetApp')
export const resetExtension = () => ipcRenderer.send('resetExtension')

export const openWeblate = () => ipcRenderer.send('openWeblate')
export const changeLanguage = (newLanguage: string) =>
  ipcRenderer.send('changeLanguage', newLanguage)

export const openExternalUrl = (url: string) =>
  ipcRenderer.send('openExternalUrl', url)
export const getAppVersion = async () => ipcRenderer.invoke('getAppVersion')

export const openPatreonPage = () => ipcRenderer.send('openPatreonPage')
export const openKofiPage = () => ipcRenderer.send('openKofiPage')
export const isFullscreen = async () => ipcRenderer.invoke('isFullscreen')

export const openWebviewPage = (url: string) =>
  ipcRenderer.send('openWebviewPage', url)

export const setZoomFactor = (zoom: string) =>
  ipcRenderer.send('setZoomFactor', zoom)
export const loadingScreenReady = () => ipcRenderer.send('loadingScreenReady')
export const frontendReady = () => ipcRenderer.send('frontendReady')
export const lock = () => ipcRenderer.send('lock')
export const unlock = () => ipcRenderer.send('unlock')
export const login = async (sid: string) => ipcRenderer.invoke('login', sid)
export const logoutLegendary = async () => ipcRenderer.invoke('logoutLegendary')
export const authGOG = async (token: string) =>
  ipcRenderer.invoke('authGOG', token)
export const logoutGOG = () => ipcRenderer.send('logoutGOG')
export const getAmazonLoginData = async () =>
  ipcRenderer.invoke('getAmazonLoginData')
export const authAmazon = async (data: NileRegisterData) =>
  ipcRenderer.invoke('authAmazon', data)
export const logoutAmazon = async () => ipcRenderer.invoke('logoutAmazon')
export const checkGameUpdates = async (runners: Runner[]) =>
  ipcRenderer.invoke('checkGameUpdates', runners)
export const refreshLibrary = async (library?: Runner | 'all') =>
  ipcRenderer.invoke('refreshLibrary', library)

export const gamepadAction = async (args: GamepadActionArgs) =>
  ipcRenderer.invoke('gamepadAction', args)

export const logError = (error: string) => ipcRenderer.send('logError', error)
export const logInfo = (info: string) => ipcRenderer.send('logInfo', info)
export const showConfigFileInFolder = (appName: string) =>
  ipcRenderer.send('showConfigFileInFolder', appName)
export const openFolder = (installPath: string) =>
  ipcRenderer.send('openFolder', installPath)
export const syncGOGSaves = async (
  gogSaves: GOGCloudSavesLocation[],
  appName: string,
  arg: string
) => ipcRenderer.invoke('syncGOGSaves', gogSaves, appName, arg)
export const getFonts = async (reload: boolean) =>
  ipcRenderer.invoke('getFonts', reload)
export const checkDiskSpace = async (installPath: string) =>
  ipcRenderer.invoke('checkDiskSpace', installPath)
export const getGOGLinuxInstallersLangs = async (appName: string) =>
  ipcRenderer.invoke('getGOGLinuxInstallersLangs', appName)
export const getAlternativeWine = async () =>
  ipcRenderer.invoke('getAlternativeWine')
export const getLocalPeloadPath = async () =>
  ipcRenderer.invoke('getLocalPeloadPath')
export const getShellPath = async (saveLocation: string) =>
  ipcRenderer.invoke('getShellPath', saveLocation)
export const callTool = async (toolArgs: Tools) =>
  ipcRenderer.invoke('callTool', toolArgs)
export const getAnticheatInfo = async (namespace: string) =>
  ipcRenderer.invoke('getAnticheatInfo', namespace)

export const clipboardReadText = async () =>
  ipcRenderer.invoke('clipboardReadText')

export const clipboardWriteText = async (text: string) =>
  ipcRenderer.send('clipboardWriteText', text)

export const pathExists = async (path: string) =>
  ipcRenderer.invoke('pathExists', path)

export const handleShowDialog = (
  onMessage: (
    e: Electron.IpcRendererEvent,
    title: string,
    message: string,
    type: DialogType,
    buttons?: Array<ButtonOptions>
  ) => void
): (() => void) => {
  ipcRenderer.on('showDialog', onMessage)
  return () => {
    ipcRenderer.removeListener('showDialog', onMessage)
  }
}

export const focusMainWindow = () => ipcRenderer.send('focusMainWindow')

import Store from 'electron-store'
// TODO: Refactor this into the backend so in order to set nodeIntegration: false
// here is how the store methods can be refactored
// but converting sync methods to async propagates through frontend

// export const storeNew = async (
//   name: string,
//   options: Store.Options<Record<string, unknown>>
// ) => ipcRenderer.send('storeNew', name, options)

// export const storeSet = async (name: string, key: string, value?: unknown) =>
//   ipcRenderer.send('storeSet', name, key, value)

// export const storeHas = async (name: string, key: string) =>
//   ipcRenderer.invoke('storeHas', name, key)

// export const storeGet = async (name: string, key: string) =>
//   ipcRenderer.invoke('storeGet', name, key)

interface StoreMap {
  [key: string]: Store
}

const stores: StoreMap = {}

export const storeNew = function (
  storeName: string,
  options: Store.Options<Record<string, unknown>>
) {
  stores[storeName] = new Store(options)
}

export const storeSet = (storeName: string, key: string, value?: unknown) =>
  stores[storeName].set(key, value)

export const storeHas = (storeName: string, key: string) =>
  stores[storeName].has(key)

export const storeGet = (
  storeName: string,
  key: string,
  defaultValue?: unknown
) => stores[storeName].get(key, defaultValue)

export const storeDelete = (storeName: string, key: string) =>
  stores[storeName].delete(key)

export const handleNavToEpicAndOpen = (
  onMessage: (e: Electron.IpcRendererEvent, url: string) => void
): (() => void) => {
  ipcRenderer.on('navToEpicAndOpenGame', onMessage)
  return () => {
    ipcRenderer.removeListener('navToEpicAndOpenGame', onMessage)
  }
}

export const copyWalletConnectBaseURIToClipboard = () => {
  ipcRenderer.send('copyWalletConnectBaseURIToClipboard')
}

export const setQaToken = (token: string) => {
  ipcRenderer.send('setQaToken', token)
}

export const handleShowHiddenQaAuthTextBox = (
  onCall: () => void
): (() => void) => {
  ipcRenderer.on('showHiddenQaAuthTextBox', onCall)
  return () => {
    ipcRenderer.removeListener('showHiddenQaAuthTextBox', onCall)
  }
}

export const getWikiGameInfo = async (
  title: string,
  appName: string,
  runner: Runner
) => ipcRenderer.invoke('getWikiGameInfo', title, appName, runner)

export const fetchPlaytimeFromServer = async (
  runner: Runner,
  appName: string
) => ipcRenderer.invoke('getPlaytimeFromRunner', runner, appName)

export const getLDEnvConfig = async () => ipcRenderer.invoke('getLDEnvConfig')

export const handleQaModeActivated = (
  onChange: (e: Electron.IpcRendererEvent) => void
) => {
  ipcRenderer.on('qaModeActive', onChange)
  return () => {
    ipcRenderer.removeListener('qaModeActive', onChange)
  }
}

export const handleOtpDeepLink = (
  cb: WrapRendererCallback<(otp: string) => void>
): (() => void) => {
  ipcRenderer.on('otpDeeplink', cb)
  return () => {
    ipcRenderer.removeListener('otpDeeplink', cb)
  }
}

export const openAuthModalIfAppReloads = () => {
  ipcRenderer.send('openAuthModalIfAppReloads')
}

export const openEmailModalIfAppReloads = () => {
  ipcRenderer.send('openEmailModalIfAppReloads')
}

export const handleLogOut = (
  cb: WrapRendererCallback<() => void>
): (() => void) => {
  ipcRenderer.on('logOut', cb)
  return () => {
    ipcRenderer.removeListener('logOut', cb)
  }
}
