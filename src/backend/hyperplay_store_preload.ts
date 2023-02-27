import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getInfo: () => console.log('getInfo is not implemented yet!'),
  // returns isInstalled and updateAvailable booleans
  install: async (gameId: string) =>
    ipcRenderer.invoke('addHyperplayGame', gameId),
  update: (gameId: string) =>
    console.log(`update is not implemented yet! gameId = ${gameId}`)
})
