import { GameInfo } from 'common/types'
import { ipcRenderer } from 'electron'

/**
 * Store api module
 * @module hyperplay-api-module
 */
export const api = {
  /**
   * Get info for the game listing
   * @param gameId HyperPlay listing projectId
   * @returns GameInfo for the listing or null if it does not exist
   */
  getInfo: async (gameId: string): Promise<GameInfo | null> =>
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
    ipcRenderer.invoke('appIsInLibrary', gameId, 'hyperplay')
}
