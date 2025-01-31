import { app, BrowserWindow, session } from 'electron';
import { publicDir } from './constants';
import path from 'path';

let injectedBrowserWindow: BrowserWindow | null = null

export const getInjectedBrowserWindow = () => {
  return injectedBrowserWindow
}

let injectedProviderSession: Electron.Session | null = null

export const getInjectedProviderSession = () => {
    if (injectedProviderSession === null){
        injectedProviderSession = session.fromPartition('persist:injectedProvider')
    }
    return injectedProviderSession
}

export function createInjectedProviderWindow(){
    const sessionForInjectedProviderWindow = getInjectedProviderSession()
    injectedBrowserWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: true,
            webSecurity: app.isPackaged,
            session: sessionForInjectedProviderWindow,
            preload: path.join(__dirname, '../preload/preload.js'),
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
