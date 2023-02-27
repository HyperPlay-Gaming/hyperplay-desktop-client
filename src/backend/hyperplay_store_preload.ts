import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    getInfo: () => console.log('getInfo is not implemented yet!'),
    // returns isInstalled and updateAvailable booleans
    install: (gameId: string) =>
        ipcRenderer.send('addHyperplayGame', gameId),
    update: (gameId: string) =>
        console.log(`update is not implemented yet! gameId = ${gameId}`)
})