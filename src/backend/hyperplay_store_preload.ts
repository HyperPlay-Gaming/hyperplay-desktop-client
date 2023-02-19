import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getInfo: () => console.log('getInfo is not implemented yet!'),
  // returns isInstalled and updateAvailable booleans
  install: (gameId: string) =>
    console.log(`install is not implemented yet! gameId = ${gameId}`),
  update: (gameId: string) =>
    console.log(`update is not implemented yet! gameId = ${gameId}`)
})
