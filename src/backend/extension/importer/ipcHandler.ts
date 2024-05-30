import { dialog, ipcMain } from 'electron'
import { trackEvent } from 'backend/metrics/metrics'
import { hpApi } from 'backend/utils/hyperplay_api'
import store from './store'
import { configFolder } from 'backend/constants'

ipcMain.handle('getMetaMaskImportOptions', async () => {
  const extensionImporter = await import('@hyperplay/extension-importer')
  return extensionImporter.getAvailableMetaMaskImports(configFolder)
})

ipcMain.on('createNewMetaMaskWallet', async (e, mmInitMethod) => {
  const extensionImporter = await import('@hyperplay/extension-importer')
  await extensionImporter.createNewMetaMaskWallet(hpApi)

  trackEvent({
    event: 'MetaMask Initialized',
    properties: { initMethod: mmInitMethod }
  })
  ipcMain.emit('reloadApp')
})

ipcMain.handle('importMetaMask', async (ev, mmInitMethod, dbPath, browser) => {
  const extensionImporter = await import('@hyperplay/extension-importer')
  const success = await extensionImporter.importMetaMask(
    hpApi,
    mmInitMethod,
    dbPath,
    browser
  )
  if (success) {
    ipcMain.emit('reloadApp')
  }
  return success
})

ipcMain.handle('isExtensionInitialized', async () =>
  store.get('isInitialized', false)
)

ipcMain.handle('getImportFolderPath', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (result.canceled || result.filePaths.length === 0) return ''
  return result.filePaths[0]
})

ipcMain.handle('getExtensionId', async () => {
  const extensionImporter = await import('@hyperplay/extension-importer')
  return extensionImporter.getExtensionId()
})
