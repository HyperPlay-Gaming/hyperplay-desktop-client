import { ipcMain } from 'electron'
import {
  cancelCurrentDownload,
  getQueueInformation,
  pauseCurrentDownload,
  removeFromQueue,
  resumeCurrentDownload
} from './downloadqueue'
import addToDMQueue from './utils/addToDMQueue'

ipcMain.handle('addToDMQueue', async (e, args, type) => {
  return addToDMQueue(args, type)
})

ipcMain.on('removeFromDMQueue', (e, appName) => {
  removeFromQueue(appName)
})

ipcMain.on('resumeCurrentDownload', () => {
  resumeCurrentDownload()
})

ipcMain.on('pauseCurrentDownload', () => {
  pauseCurrentDownload()
})

ipcMain.on('cancelDownload', (e, removeDownloaded) => {
  cancelCurrentDownload({ removeDownloaded })
})

ipcMain.handle('getDMQueueInformation', getQueueInformation)
