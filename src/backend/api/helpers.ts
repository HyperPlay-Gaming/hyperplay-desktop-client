import { ipcRenderer } from 'electron'
import {
  Runner,
  InstallPlatform,
  WineCommandArgs,
  ConnectivityChangedCallback,
  ConnectivityStatus
} from 'common/types'

export const notify = (notification: string[]) =>
  ipcRenderer.send('Notify', notification)
export const openLoginPage = () => ipcRenderer.send('openLoginPage')
export const openSidInfoPage = () => ipcRenderer.send('openSidInfoPage')
export const openSupportPage = () => ipcRenderer.send('openSupportPage')
export const quit = () => ipcRenderer.send('quit')
export const showAboutWindow = () => ipcRenderer.send('showAboutWindow')
export const openDiscordLink = () => ipcRenderer.send('openDiscordLink')
export const openWinePrefixFAQ = () => ipcRenderer.send('openWinePrefixFAQ')
export const openCustomThemesWiki = () =>
  ipcRenderer.send('openCustomThemesWiki')
export const createNewWindow = (url: string) =>
  ipcRenderer.send('createNewWindow', url)

export const readConfig = async (file: string) =>
  ipcRenderer.invoke('readConfig', file)
export const getPlatform = async () => ipcRenderer.invoke('getPlatform')
export const isLoggedIn = async () => ipcRenderer.invoke('isLoggedIn')
export const writeConfig = async (data: [appName: string, x: unknown]) =>
  ipcRenderer.invoke('writeConfig', data)
export const kill = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('kill', appName, runner)
export const abort = async (id: string) => ipcRenderer.send('abort', id)
export const getUserInfo = async () => ipcRenderer.invoke('getUserInfo')
export const syncSaves = async (
  args: [arg: string | undefined, path: string, appName: string, runner: string]
) => ipcRenderer.invoke('syncSaves', args)
export const getGameInfo = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('getGameInfo', appName, runner)
export const getGameSettings = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('getGameSettings', appName, runner)
export const getInstallInfo = async (
  appName: string,
  runner: Runner,
  installPlatform?: InstallPlatform | string
) => ipcRenderer.invoke('getInstallInfo', appName, runner, installPlatform)

export const runWineCommand = async (args: WineCommandArgs) =>
  ipcRenderer.invoke('runWineCommand', args)
export const runWineCommandForGame = async (args: {
  appName: string
  runner: Runner
  commandParts: string[]
}) => ipcRenderer.invoke('runWineCommandForGame', args)
export const requestSettings = async (appName: string) =>
  ipcRenderer.invoke('requestSettings', appName)

export const onConnectivityChanged = async (
  callback: ConnectivityChangedCallback
) => ipcRenderer.on('connectivity-changed', callback)
export const getConnectivityStatus = async (): Promise<ConnectivityStatus> =>
  ipcRenderer.invoke('get-connectivity-status', [])
export const connectivityChanged = async (newStatus: ConnectivityStatus) =>
  ipcRenderer.send('connectivity-changed', newStatus)

export const getThemeCSS = async (theme: string): Promise<string> =>
  ipcRenderer.invoke('getThemeCSS', theme)
export const getCustomThemes = async (): Promise<string[]> =>
  ipcRenderer.invoke('getCustomThemes')

export const isNative = async (args: { appName: string; runner: Runner }) =>
  ipcRenderer.invoke('isNative', args) as Promise<boolean>
