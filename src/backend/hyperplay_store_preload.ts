import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getInfo: async (gameId: string) =>
    ipcRenderer.invoke('getGameInfo', gameId, 'hyperplay'),
  // returns isInstalled and updateAvailable booleans
  install: async (gameId: string) =>
    ipcRenderer.invoke('addHyperplayGame', gameId),
  update: (gameId: string) =>
    console.log(`update is not implemented yet! gameId = ${gameId}`),
  isHidden: async (gameId: string) =>
    ipcRenderer.invoke('isGameHidden', gameId),
  unhide: async (gameId: string) => ipcRenderer.invoke('unhideGame', gameId)
})
