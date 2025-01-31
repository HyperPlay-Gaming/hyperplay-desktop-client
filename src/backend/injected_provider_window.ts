import { app, BrowserWindow } from 'electron'
import { publicDir } from './constants'
import path from 'path'

let injectedBrowserWindow: BrowserWindow | null = null

export const getInjectedBrowserWindow = () => {
  return injectedBrowserWindow
}

export function createInjectedProviderWindow() {
  // must be the default session to prevent wiping old wallets
  injectedBrowserWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: app.isPackaged,
      preload: path.join(__dirname, '../preload/preload.js')
    }
  })

  const devAppUrl = 'http://localhost:5173/?view=InjectedProviderApp'
  const prodAppUrl = `file://${path.join(
    publicDir,
    '../build/index.html?view=InjectedProviderApp'
  )}`
  const url = app.isPackaged ? prodAppUrl : devAppUrl
  injectedBrowserWindow.loadURL(url)
  return injectedBrowserWindow
}
