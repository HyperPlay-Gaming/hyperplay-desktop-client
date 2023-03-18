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

class Application {
  private windows: Map<string, Electron.BrowserWindow>
  private tray: Electron.Tray | null
  private markQuit = false
  private scaleFactor = 1.0
  private inputInterceptEnabled = false

  private Overlay: typeof IOverlay

  constructor() {
    this.windows = new Map()
    this.tray = null
  }

  public getWindow(window: string) {
    return this.windows.get(window) || null
  }

  public startOverlay() {
    try {
      this.Overlay = require('@hyperplay/electron-overlay')
      this.Overlay!.start()

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      this.Overlay!.setEventCallback((event: string, payload: any) => {
        if (event === 'game.input') {
          const window = BrowserWindow.fromId(payload.windowId)
          if (window) {
            const inputEvent = this.Overlay!.translateInputEvent(payload)

            if (inputEvent) {
              if ('x' in inputEvent)
                inputEvent['x'] = Math.round(inputEvent['x'] / this.scaleFactor)
              if ('y' in inputEvent)
                inputEvent['y'] = Math.round(inputEvent['y'] / this.scaleFactor)
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
          const window = this.getWindow(AppWindows.STATUS_BAR)
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

  public addOverlayWindow(
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
      width: Math.floor(window.getBounds().width * this.scaleFactor),
      height: Math.floor(window.getBounds().height * this.scaleFactor)
    }

    this.Overlay!.addWindow(window.id, {
      name,
      transparent,
      resizable: window.isResizable(),
      maxWidth: window.isResizable()
        ? display.bounds.width * this.scaleFactor
        : rect.width,
      maxHeight: window.isResizable()
        ? display.bounds.height * this.scaleFactor
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
        if (this.markQuit) {
          return
        }

        this.Overlay!.sendFrameBuffer(
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
      this.Overlay!.sendWindowBounds(window.id, {
        rect: {
          x: window.getBounds().x,
          y: window.getBounds().y,
          width: Math.floor(window.getBounds().width * this.scaleFactor),
          height: Math.floor(window.getBounds().height * this.scaleFactor)
        }
      })
    })

    window.on('move', () => {
      this.Overlay!.sendWindowBounds(window.id, {
        rect: {
          x: window.getBounds().x,
          y: window.getBounds().y,
          width: Math.floor(window.getBounds().width * this.scaleFactor),
          height: Math.floor(window.getBounds().height * this.scaleFactor)
        }
      })
    })

    const windowId = window.id
    window.on('closed', () => {
      this.Overlay!.closeWindow(windowId)
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
        this.Overlay!.sendCommand({ command: 'cursor', cursor })
      }
    })
  }

  public createToastOverlay() {
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
    const window = this.createWindow(name, options)

    window.setPosition(0, 0)

    window.loadURL(
      !app.isPackaged
        ? 'http://localhost:5173?view=ToastOverlay'
        : `file://${path.join(buildDir, './index.html?view=ToastOverlay')}`
    )

    this.addOverlayWindow(name, window, 10, 40)
    return window
  }

  public createHyperplayOverlay() {
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
    const window = this.createWindow(name, options)

    window.setPosition(0, 0)

    window.loadURL(
      !app.isPackaged
        ? 'http://localhost:5173?view=HyperplayOverlay'
        : `file://${path.join(buildDir, './index.html?view=HyperplayOverlay')}`
    )

    this.addOverlayWindow(name, window, 10, 40)
    return window
  }

  public closeAllWindows() {
    const windows = this.windows.values()
    for (const window of windows) {
      window.close()
    }
  }

  public closeWindow(name: string) {
    const window = this.windows.get(name)
    if (window) {
      window.close()
    }
  }

  public hideWindow(name: string) {
    const window = this.windows.get(name)
    if (window) {
      window.hide()
    }
  }

  public showAndFocusWindow(name: string) {
    const window = this.windows.get(name)
    if (window) {
      window.show()
      window.focus()
    }
  }

  public start() {
    this.scaleFactor = screen.getDisplayNearestPoint({
      x: 0,
      y: 0
    }).scaleFactor

    this.setupIpc()
  }

  public quit() {
    this.markQuit = true
    // this.closeMainWindow()
    this.closeAllWindows()
    if (this.tray) {
      this.tray.destroy()
    }

    if (this.Overlay) {
      this.Overlay.stop()
    }
  }

  public openLink(url: string) {
    shell.openExternal(url)
  }

  private createWindow(
    name: string,
    option: Electron.BrowserWindowConstructorOptions
  ) {
    const window = new BrowserWindow(option)
    this.windows.set(name, window)
    window.on('closed', () => {
      this.windows.delete(name)
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

  public async inject(param: { pid?: string; title?: string }) {
    if (!this.Overlay) return
    const { pid, title } = param
    console.log(
      `--------------------\n try inject method ${JSON.stringify(param)}`
    )

    for (const window of this.Overlay.getTopWindows()) {
      if (window.processId.toString() === pid || window.title === title) {
        try {
          const injectResult = this.Overlay.injectProcess(window)
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

  public toggleIntercept() {
    if (!this.Overlay) return
    this.inputInterceptEnabled = !this.inputInterceptEnabled
    if (this.inputInterceptEnabled) {
      this.Overlay!.sendCommand({
        command: 'input.intercept',
        intercept: true
      })
    } else {
      this.Overlay!.sendCommand({
        command: 'input.intercept',
        intercept: false
      })
    }
  }

  private setupIpc() {
    if (!this.Overlay) {
      this.startOverlay()
      if (!this.Overlay) return

      this.createHyperplayOverlay()
      this.createToastOverlay()
    }
  }
}

export const OverlayApp = new Application()
