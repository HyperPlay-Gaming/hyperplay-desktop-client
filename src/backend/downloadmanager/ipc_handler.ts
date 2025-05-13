import { ipcMain } from 'electron'
import {
  addToQueue,
  cancelCurrentDownload,
  getQueueInformation,
  pauseCurrentDownload,
  removeFromQueue,
  resumeCurrentDownload
} from './downloadqueue'
import { cancelExtraction } from 'backend/storeManagers/hyperplay/games'

ipcMain.handle('addToDMQueue', async (e, element) => {
  await addToQueue(element)
})

ipcMain.on('removeFromDMQueue', (e, appName) => {
  removeFromQueue(appName)
})

ipcMain.on('resumeCurrentDownload', () => {
  resumeCurrentDownload()
})

ipcMain.handle('pauseCurrentDownload', async () => pauseCurrentDownload())

ipcMain.on('cancelDownload', (e, removeDownloaded) => {
  cancelCurrentDownload({ removeDownloaded })
})

ipcMain.on('cancelExtraction', (e, appName: string) => {
  cancelExtraction(appName)
})

ipcMain.handle('getDMQueueInformation', getQueueInformation)
