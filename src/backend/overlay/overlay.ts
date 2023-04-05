import { app, BrowserWindow, screen, shell } from 'electron'
import * as path from 'path'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
let IOverlay: any
try {
  IOverlay = require('@hyperplay/electron-overlay')
} catch (e) {
  console.log(
    'optional hyperplay-electron-overlay could not be imported on this OS'
  )
}

import { resolve } from 'path'
const buildDir = resolve(__dirname, '../../build')

enum AppWindows {
  MAIN_OVERLAY = 'MainOverlay',
  STATUS_BAR = 'StatusBar',
  OVERLAY_TIP = 'OverlayTip'
}

const DEBUG = true

const windows: Map<string, Electron.BrowserWindow> = new Map()
const tray: Electron.Tray | null = null
let markQuit = false
let scaleFactor = 1.0
let inputInterceptEnabled = false

let Overlay: typeof IOverlay

export function getWindow(window: string) {
  return windows.get(window) || null
}

export function startOverlay() {
  try {
    Overlay = require('@hyperplay/electron-overlay')
    Overlay!.start()

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Overlay!.setEventCallback((event: string, payload: any) => {
      if (event === 'game.input') {
        const window = BrowserWindow.fromId(payload.windowId)
        if (window) {
          const inputEvent = Overlay!.translateInputEvent(payload)

          if (inputEvent) {
            if ('x' in inputEvent)
              inputEvent['x'] = Math.round(inputEvent['x'] / scaleFactor)
            if ('y' in inputEvent)
              inputEvent['y'] = Math.round(inputEvent['y'] / scaleFactor)
            try {
              window.webContents.sendInputEvent(inputEvent)
              window.webContents.send(
                'proxyWebViewInput',
                JSON.stringify(inputEvent)
              )
            } catch (error) {
              console.log(`error: `, JSON.stringify(error))
            }
          }
        }
      } else if (event === 'graphics.fps') {
        const window = getWindow(AppWindows.STATUS_BAR)
        if (window) {
          window.webContents.send('fps', payload.fps)
        }
      } else if (event === 'game.hotkey.down') {
        //
      } else if (event === 'game.window.focused') {
        console.log('focusWindowId', payload.focusWindowId)

        BrowserWindow.getAllWindows().forEach((window) => {
          window.blurWebView()
        })

        const focusWin = BrowserWindow.fromId(payload.focusWindowId)
        if (focusWin) {
          focusWin.focusOnWebView()
          focusWin.focus()
        }
      }
    })
  } catch (e) {
    console.log(
      'optional hyperplay-electron-overlay could not be imported on this OS'
    )
  }
}

export function addOverlayWindow(
  name: string,
  window: Electron.BrowserWindow,
  dragborder = 0,
  captionHeight = 0,
  transparent = false
) {
  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())

  const rect = {
    x: window.getBounds().x,
    y: window.getBounds().y,
    width: Math.floor(window.getBounds().width * scaleFactor),
    height: Math.floor(window.getBounds().height * scaleFactor)
  }

  Overlay!.addWindow(window.id, {
    name,
    transparent,
    resizable: window.isResizable(),
    maxWidth: window.isResizable()
      ? display.bounds.width * scaleFactor
      : rect.width,
    maxHeight: window.isResizable()
      ? display.bounds.height * scaleFactor
      : rect.height,
    minWidth: window.isResizable() ? 100 : rect.width,
    minHeight: window.isResizable() ? 100 : rect.height,
    nativeHandle: window.getNativeWindowHandle().readUInt32LE(0),
    rect,
    caption: {
      left: dragborder,
      right: dragborder,
      top: dragborder,
      height: captionHeight
    },
    dragBorderWidth: dragborder
  })

  window.webContents.on(
    'paint',
    (event, dirty, image: Electron.NativeImage) => {
      if (markQuit) {
        return
      }

      Overlay!.sendFrameBuffer(
        window.id,
        image.getBitmap(),
        image.getSize().width,
        image.getSize().height
      )
    }
  )

  window.on('ready-to-show', () => {
    window.focusOnWebView()
  })

  window.webContents.on('dom-ready', () => {
    window.webContents.send('dom-ready')
  })

  window.on('resize', () => {
    Overlay!.sendWindowBounds(window.id, {
      rect: {
        x: window.getBounds().x,
        y: window.getBounds().y,
        width: Math.floor(window.getBounds().width * scaleFactor),
        height: Math.floor(window.getBounds().height * scaleFactor)
      }
    })
  })

  window.on('move', () => {
    Overlay!.sendWindowBounds(window.id, {
      rect: {
        x: window.getBounds().x,
        y: window.getBounds().y,
        width: Math.floor(window.getBounds().width * scaleFactor),
        height: Math.floor(window.getBounds().height * scaleFactor)
      }
    })
  })

  const windowId = window.id
  window.on('closed', () => {
    Overlay!.closeWindow(windowId)
  })

  window.webContents.on('cursor-changed', (event, type) => {
    let cursor
    switch (type) {
      case 'default':
        cursor = 'IDC_ARROW'
        break
      case 'pointer':
        cursor = 'IDC_HAND'
        break
      case 'crosshair':
        cursor = 'IDC_CROSS'
        break
      case 'text':
        cursor = 'IDC_IBEAM'
        break
      case 'wait':
        cursor = 'IDC_WAIT'
        break
      case 'help':
        cursor = 'IDC_HELP'
        break
      case 'move':
        cursor = 'IDC_SIZEALL'
        break
      case 'nwse-resize':
        cursor = 'IDC_SIZENWSE'
        break
      case 'nesw-resize':
        cursor = 'IDC_SIZENESW'
        break
      case 'ns-resize':
        cursor = 'IDC_SIZENS'
        break
      case 'ew-resize':
        cursor = 'IDC_SIZEWE'
        break
      case 'none':
        cursor = ''
        break
    }
    if (cursor) {
      Overlay!.sendCommand({ command: 'cursor', cursor })
    }
  })
}

export function createToastOverlay() {
  const isTesting = false

  const options: Electron.BrowserWindowConstructorOptions = {
    height: 240,
    width: 500,
    frame: false,
    show: isTesting,
    transparent: true,
    resizable: false,
    backgroundColor: '#00000000',
    webPreferences: {
      webviewTag: true,
      offscreen: !isTesting,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  const name = AppWindows.OVERLAY_TIP
  const window = createWindow(name, options)

  window.setPosition(0, 0)

  window.loadURL(
    !app.isPackaged
      ? 'http://localhost:5173?view=ToastOverlay'
      : `file://${path.join(buildDir, './index.html?view=ToastOverlay')}`
  )

  addOverlayWindow(name, window, 10, 40)
  return window
}

export function createHyperplayOverlay() {
  const isTesting = false

  const options: Electron.BrowserWindowConstructorOptions = {
    height: 800,
    width: 1280,
    frame: false,
    show: isTesting,
    transparent: true,
    resizable: false,
    backgroundColor: '#00000000',
    webPreferences: {
      webviewTag: true,
      offscreen: !isTesting,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  const name = AppWindows.MAIN_OVERLAY
  const window = createWindow(name, options)

  window.setPosition(0, 0)

  window.loadURL(
    !app.isPackaged
      ? 'http://localhost:5173?view=HyperplayOverlay'
      : `file://${path.join(buildDir, './index.html?view=HyperplayOverlay')}`
  )

  addOverlayWindow(name, window, 10, 40)
  return window
}

export function closeAllWindows() {
  const windowsValues = windows.values()
  for (const window of windowsValues) {
    window.close()
  }
}

export function closeWindow(name: string) {
  const window = windows.get(name)
  if (window) {
    window.close()
  }
}

export function hideWindow(name: string) {
  const window = windows.get(name)
  if (window) {
    window.hide()
  }
}

export function showAndFocusWindow(name: string) {
  const window = windows.get(name)
  if (window) {
    window.show()
    window.focus()
  }
}

export function start() {
  scaleFactor = screen.getDisplayNearestPoint({
    x: 0,
    y: 0
  }).scaleFactor

  setupIpc()
}

export function quit() {
  markQuit = true
  // closeMainWindow()
  closeAllWindows()
  if (tray) {
    tray.destroy()
  }

  if (Overlay) {
    Overlay.stop()
  }
}

export function openLink(url: string) {
  shell.openExternal(url)
}

function createWindow(
  name: string,
  option: Electron.BrowserWindowConstructorOptions
) {
  const window = new BrowserWindow(option)
  windows.set(name, window)
  window.on('closed', () => {
    windows.delete(name)
  })
  window.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  if (DEBUG) {
    window.webContents.on(
      'before-input-event',
      (event: Electron.Event, input: Electron.Input) => {
        if (input.key === 'F12' && input.type === 'keyDown') {
          window.webContents.openDevTools()
        }
      }
    )
  }

  return window
}

export async function inject(param: { pid?: string; title?: string }) {
  if (!Overlay) return
  const { pid, title } = param
  console.log(
    `--------------------\n try inject method ${JSON.stringify(param)}`
  )

  for (const window of Overlay.getTopWindows()) {
    if (window.processId.toString() === pid || window.title === title) {
      try {
        const injectResult = Overlay.injectProcess(window)
        console.log('inject result = ', JSON.stringify(injectResult, null, 4))
      } catch (e) {
        console.log('error: ', JSON.stringify(e))
      }
    }
  }

  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send('injectionSuccess')
  }
}

/*
 * toggles the browser game and desktop game overlays
 * shouldShowOverride optionally overrides the overlay shown state instead of toggling
 */
export function toggleIntercept(shouldShowOverride?: boolean) {
  let showOverlay = !inputInterceptEnabled
  if (shouldShowOverride !== undefined) showOverlay = shouldShowOverride

  inputInterceptEnabled = showOverlay

  // send event to show overlay in browser and desktop game overlays
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send('updateOverlayVisibility', showOverlay)
  }

  if (!Overlay) return
  Overlay!.sendCommand({
    command: 'input.intercept',
    intercept: showOverlay
  })
}

function setupIpc() {
  if (!Overlay) {
    startOverlay()
    if (!Overlay) return

    createHyperplayOverlay()
    createToastOverlay()
  }
}
