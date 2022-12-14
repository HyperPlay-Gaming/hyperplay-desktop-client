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
  })
}

class Notification {
  public show() {
    return
  }

  public isSupported() {
    return false
  }
}

const ipcMain = {
  on: jest.fn().mockReturnThis(),
  handle: jest.fn().mockReturnThis()
}

export { dialog, app, Notification, ipcMain }
