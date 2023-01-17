import { app, BrowserWindow, ipcMain, screen, shell } from 'electron'
// import { Menu, Tray } from 'electron'
import * as path from 'path'
// import { fileUrl } from './utils/utils'

import * as IOverlay from 'electron-overlay'

import { wait } from '../../common/types/proxy-types'
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

  // @ts-expect-error TODO
  private Overlay: typeof IOverlay

  constructor() {
    this.windows = new Map()
    this.tray = null
  }

  public getWindow(window: string) {
    return this.windows.get(window) || null
  }

  public startOverlay() {
    this.Overlay = require('electron-overlay')
    this.Overlay!.start()
    this.Overlay!.setHotkeys([
      {
        name: 'overlay.toggleInputIntercept',
        keyCode: 113,
        modifiers: { ctrl: true }
      },
      { name: 'app.doit', keyCode: 114, modifiers: { ctrl: true } }
    ])

    this.Overlay!.setEventCallback((event: string, payload) => {
      if (event === 'game.input') {
        const window = BrowserWindow.fromId(payload.windowId)
        if (window) {
          const inputEvent = this.Overlay!.translateInputEvent(payload)

          if (inputEvent) {
            window.webContents.sendInputEvent(inputEvent)
          }
        }
      } else if (event === 'graphics.fps') {
        const window = this.getWindow(AppWindows.STATUS_BAR)
        if (window) {
          window.webContents.send('fps', payload.fps)
        }
      } else if (event === 'game.hotkey.down') {
        // if (payload.name === 'app.doit') {
        //   this.doit()
        // }
      } else if (event === 'game.window.focused') {
        console.log('focusWindowId', payload.focusWindowId)

        BrowserWindow.getAllWindows().forEach((window) => {
          window.blurWebView()
        })

        const focusWin = BrowserWindow.fromId(payload.focusWindowId)
        if (focusWin) {
          focusWin.focusOnWebView()
        }
      }
    })
  }

  public addOverlayWindow(
    name: string,
    window: Electron.BrowserWindow,
    dragborder = 0,
    captionHeight = 0,
    transparent = false
  ) {
    console.log('adding window ', name, ' with id ', window.id)
    const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())

    this.Overlay!.addWindow(window.id, {
      name,
      transparent,
      resizable: window.isResizable(),
      maxWidth: window.isResizable()
        ? display.bounds.width
        : window.getBounds().width,
      maxHeight: window.isResizable()
        ? display.bounds.height
        : window.getBounds().height,
      minWidth: window.isResizable() ? 100 : window.getBounds().width,
      minHeight: window.isResizable() ? 100 : window.getBounds().height,
      nativeHandle: window.getNativeWindowHandle().readUInt32LE(0),
      rect: {
        ...window.getBounds()
      },
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

    window.on('resize', () => {
      this.Overlay!.sendWindowBounds(window.id, { rect: window.getBounds() })
    })

    window.on('move', () => {
      this.Overlay!.sendWindowBounds(window.id, { rect: window.getBounds() })
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

  public createHyperplayOverlay() {
    const options: Electron.BrowserWindowConstructorOptions = {
      height: 400,
      width: 800,
      frame: false,
      show: false,
      transparent: true,
      resizable: false,
      backgroundColor: '#00000000',
      webPreferences: {
        offscreen: true,
        nodeIntegration: true,
        contextIsolation: true,
        // preload: path.join(__dirname, 'overlayPreload.js')
        preload: path.join(__dirname, 'preload.js')
      }
    }

    const name = AppWindows.OVERLAY_TIP
    const window = this.createWindow(name, options)

    window.setPosition(0, 0)

    console.log(
      'loading url from ',
      path.join(buildDir, './index.html?HyperplayOverlay')
    )
    window.loadURL(
      !app.isPackaged
        ? 'http://localhost:5173?HyperplayOverlay'
        : `file://${path.join(buildDir, './index.html?HyperplayOverlay')}`
    ) //'index/osr.html')))

    this.addOverlayWindow(name, window, 10, 40)
    console.log('OSR WINDOW CREATED AND ADDED')
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

  public async inject(pid: string) {
    console.log(`--------------------\n try inject method ${pid}`)
    // TO DO: Find a way to listen to when window is created at pid and inject on handle that event
    await wait(5000)
    for (const window of this.Overlay.getTopWindows()) {
      if (window.processId.toString() === pid) {
        try {
          const injectResult = this.Overlay.injectProcess(window)
          console.log('inject result = ', JSON.stringify(injectResult, null, 4))
        } catch (e) {
          console.log('error: ', JSON.stringify(e))
        }
      }
    }
  }

  private setupIpc() {
    if (!this.Overlay) {
      this.startOverlay()

      this.createHyperplayOverlay()
    }

    ipcMain.on('inject', (event, arg: string) => {
      console.log(`--------------------\n try inject ${arg}`)
      for (const window of this.Overlay.getTopWindows()) {
        if (window.title.indexOf(arg) !== -1) {
          console.log('window injecting = ', JSON.stringify(window, null, 4))
          try {
            const result = this.Overlay.injectProcess(window)
            console.log('RESULT from INJECTING = ', result)
          } catch (e) {
            console.log('error: ', JSON.stringify(e))
          }
        }
      }
      console.log('done injecting')
    })

    ipcMain.on('startIntercept', () => {
      this.Overlay!.sendCommand({
        command: 'input.intercept',
        intercept: true
      })
    })

    ipcMain.on('stopIntercept', () => {
      this.Overlay!.sendCommand({
        command: 'input.intercept',
        intercept: false
      })
    })
  }
}

export { Application }
