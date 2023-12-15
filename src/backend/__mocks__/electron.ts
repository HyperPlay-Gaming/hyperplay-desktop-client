import { EventEmitter } from 'node:events'
import {
  BrowserWindowConstructorOptions,
  Display,
  MenuItemConstructorOptions
} from 'electron'
import { tmpdir } from 'os'
import { join } from 'path'
import { vi } from 'vitest'

const fs = vi.mock('fs')

const appBasePath = tmpdir()
const dialog = {
  // dialog override
  showErrorBox: vi.fn(),
  showMessageBox: vi.fn()
}

const app = {
  // app override
  getPath: vi.fn().mockImplementation((path: string) => {
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
  static contents: WebContents[] = []
  static maxContentsId = 0
  id: number = -1

  constructor() {
    this.id = WebContents.maxContentsId
    WebContents.maxContentsId += 1
    WebContents.contents.push(this)
  }

  emitter: EventEmitter = new EventEmitter()
  send(topic: string, ...args: any[]): any {
    this.emitter.emit(topic, ...args)
  }
  on(topic: string, cb: (...args: any[]) => void): any {
    this.emitter.on(topic, cb)
  }
  static fromId(id: number): WebContents | undefined {
    return WebContents.contents.find((val) => val.id === id)
  }

  isDestroyed() {
    return false
  }
}

export const webContents = {
  fromId(id: number): WebContents | undefined {
    return WebContents.fromId(id)
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

  static fromWebContents(wc: WebContents) {
    return BrowserWindow.windows.find((val) => val.webContents.id === wc.id)
  }

  isDestroyed() {
    return false
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
  on: vi.fn().mockReturnThis(),
  handle: vi.fn().mockReturnThis(),
  once: vi.fn().mockReturnThis(),
  emit: vi.fn().mockReturnThis(),
  prependListener: vi.fn().mockReturnThis()
}

export {
  dialog,
  app,
  Notification,
  BrowserWindow,
  WebContents,
  Menu,
  nativeImage,
  Tray,
  ipcMain,
  screen
}
