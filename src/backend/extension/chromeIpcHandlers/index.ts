import { ipcMain } from 'electron'

ipcMain.handle('something', () => {
  console.log('chrome ipchandler handling something')
})
