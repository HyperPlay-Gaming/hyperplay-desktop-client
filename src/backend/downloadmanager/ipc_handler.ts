import { ipcMain } from 'electron'
import {
  addToQueue,
  cancelCurrentDownload,
  getQueueInformation,
  pauseCurrentDownload,
  removeFromQueue,
  resumeCurrentDownload
} from './downloadqueue'

ipcMain.on('addToDMQueue', (e, element) => {
  addToQueue(element)
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
