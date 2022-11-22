import { BrowserView, ipcMain, BrowserWindow, session } from 'electron'
import path from 'path'

let extensionId = ''
let window: BrowserWindow

export const initExtensionIpcHandlerWindow = function (
  windowInit: BrowserWindow
) {
  window = windowInit
}

export const initExtensionIpcHandlerExtId = function (extId: string) {
  extensionId = extId
}

const getPopupUrl = function (extensionId: string) {
  //this will return the manifest JSON object
  const manifest = session.defaultSession.getExtension(extensionId).manifest
  const popupPath =
    manifest?.action?.default_popup || manifest?.browser_action?.default_popup
  return popupPath && `chrome-extension://${extensionId}/${popupPath}`
}

ipcMain.handle('showPopup', () => {
  const popupUrl = getPopupUrl(extensionId)

  const mmBrowserView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  window.addBrowserView(mmBrowserView)
  mmBrowserView.webContents.loadURL(popupUrl)
  mmBrowserView.setBounds({ x: 300, y: 10, width: 1400, height: 800 })
  mmBrowserView.setAutoResize({ width: true, height: true })

  console.log(`opened popup: ${popupUrl}`)
})

let testWindow

ipcMain.handle('showMetaMaskExtensionHomePage', async () => {
  // const mmBrowserView = new BrowserView({
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js')
  //   }
  // })
  // window.addBrowserView(mmBrowserView)
  // // mmBrowserView.webContents.loadURL(
  // //   `chrome-extension://${extensionId}/home.html`
  // // )
  // mmBrowserView.webContents.loadURL(
  //   `chrome-extension://${extensionId}/background.html`
  // )
  // mmBrowserView.setBounds({ x: 300, y: 10, width: 1400, height: 800 })
  // mmBrowserView.setAutoResize({ width: true, height: true })

  // return 'test'

  testWindow = new BrowserWindow({
    height: 690,
    width: 1200,
    x: 0,
    y: 0,
    minHeight: 345,
    minWidth: 600,
    show: false,

    webPreferences: {
      webviewTag: true,
      //the preload script needs access to window.chrome to extend the api so contextIsolation needs to be false
      contextIsolation: false,
      nodeIntegration: true,
      // sandbox: false,
      preload: path.join(__dirname, 'extensionPreload.js')
    }
  })

  testWindow.loadURL(`chrome-extension://${extensionId}/home.html`)
  testWindow.show()
})

export const initExtension = async function () {
  // this is necessary to extend the chrome api on the background script
  session.defaultSession.setPreloads([
    path.join(__dirname, 'extensionPreload.js')
  ])
  const extPath = path.resolve('./extensions/mmExtProd')
  const extension = await session.defaultSession.loadExtension(extPath)

  initExtensionIpcHandlerExtId(extension.id)
}
