import { GamePageActions } from 'common/types'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getInfo: async (gameId: string) =>
    ipcRenderer.invoke('getGameInfo', gameId, 'hyperplay'),
  // returns isInstalled and updateAvailable booleans
  install: async (projectName: string, accountName: string) =>
    ipcRenderer.invoke('addHyperplayGame', projectName, accountName),
  update: (gameId: string) =>
    console.log(`update is not implemented yet! gameId = ${gameId}`),
  getAppVersion: async () => ipcRenderer.invoke('getAppVersion'),
  isHidden: async (gameId: string) =>
    ipcRenderer.invoke('isGameHidden', gameId),
  unhide: async (gameId: string) => ipcRenderer.invoke('unhideGame', gameId),
  openExternalUrl: (url: string) => ipcRenderer.send('openExternalUrl', url),
  openGameInEpicStore: (url: string) =>
    ipcRenderer.send('openGameInEpicStore', url),
  apiVersion: 1,
  appIsInLibrary: async (gameId: string) =>
    ipcRenderer.invoke('appIsInLibrary', gameId, 'hyperplay'),
  goToGamePage: (gameId: string, action: GamePageActions) =>
    ipcRenderer.send('goToGamePage', gameId, action),
  navigate: (route: string) => ipcRenderer.send('navigate', route)
})
