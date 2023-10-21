import { EventEmitter } from 'node:events'
import {
  BrowserWindowConstructorOptions,
  Display,
  MenuItemConstructorOptions
} from 'electron'
import { tmpdir } from 'os'
import { join } from 'path'

const fs = jest.createMockFromModule('fs')

const appBasePath = tmpdir()
const dialog = {
  // dialog override
  showErrorBox: jest.fn(),
  showMessageBox: jest.fn()
}

const app = {
  // app override
  getPath: jest.fn().mockImplementation((path: string) => {
    return join(appBasePath, path)
  }),
  getVersion(): string {
    // TODO: What should we return here?
    return '1.0.0'
  }
}

class Notification {
  public show() {
    return
  }

  public isSupported() {
    return false
  }
}

class WebContents {
  emitter: EventEmitter = new EventEmitter()
  send(topic: string, ...args: any[]): any {
    this.emitter.emit(topic, ...args)
  }
}

class BrowserWindow {
  static windows: BrowserWindow[] = []
  options: BrowserWindowConstructorOptions = {}
  static maxWindowId = 0
  id: number = -1
  webContents: WebContents = new WebContents()

  constructor(options: BrowserWindowConstructorOptions) {
    this.options = options
    this.id = BrowserWindow.maxWindowId
    BrowserWindow.maxWindowId += 1
    BrowserWindow.windows.push(this)
  }

  static getAllWindows() {
    return this.windows
  }

  static setAllWindows(windows: BrowserWindow[]) {
    this.windows = windows
  }

  public getOptions() {
    return this.options
  }

  static fromId(id: number): BrowserWindow | undefined {
    return BrowserWindow.windows.find((val) => val.id === id)
  }
}

const Menu = {
  buildFromTemplate(options: MenuItemConstructorOptions[]) {
    return options
  }
}

const nativeImage = {
  createFromPath: (path: string) => ({
    resize: (size: { width: number; height: number }) =>
      `${path} width=${size.width} height=${size.height}`
  })
}

const screen = {
  getPrimaryDisplay: () => {
    return {
      workAreaSize: {
        height: 1280,
        width: 1920
      }
    }
  }
}

class Tray {
  icon: string = ''
  menu: MenuItemConstructorOptions[] = []
  tooltip: string = ''

  constructor(icon: string) {
    this.icon = icon
  }

  on(event: string) {}

  setContextMenu(menu: MenuItemConstructorOptions[]) {
    this.menu = menu
  }

  setToolTip(tooltip: string) {
    this.tooltip = tooltip
  }
}

const ipcMain = {
  on: jest.fn().mockReturnThis(),
  handle: jest.fn().mockReturnThis(),
  once: jest.fn().mockReturnThis(),
  emit: jest.fn().mockReturnThis()
}

export {
  dialog,
  app,
  Notification,
  BrowserWindow,
  Menu,
  nativeImage,
  Tray,
  ipcMain,
  screen
}
