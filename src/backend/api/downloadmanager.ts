import { DownloadManagerState, GameInfo } from './../../common/types'
import { ipcRenderer } from 'electron'
import { DMQueueElement, InstallParams } from 'common/types'

export const install = async (args: InstallParams) => {
  const dmQueueElement: DMQueueElement = {
    params: args,
    type: 'install',
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }

  await ipcRenderer.invoke('addToDMQueue', dmQueueElement)

  // Add Dlcs to the queue
  if (Array.isArray(args.installDlcs) && args.installDlcs.length > 0) {
    args.installDlcs.forEach(async (dlc) => {
      const dlcArgs: InstallParams = {
        ...args,
        appName: dlc,
        installDlcs: false
      }
      const dlcQueueElement: DMQueueElement = {
        params: dlcArgs,
        type: 'install',
        addToQueueTime: Date.now(),
        endTime: 0,
        startTime: 0
      }
      await ipcRenderer.invoke('addToDMQueue', dlcQueueElement)
    })
  }
}

export const updateGame = (gameInfo: GameInfo) => {
  const {
    app_name: appName,
    runner,
    install: { install_path, platform }
  } = gameInfo

  const dmQueueElement: DMQueueElement = {
    params: {
      gameInfo,
      appName,
      runner,
      path: install_path!,
      platformToInstall: platform!
    },
    type: 'update',
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }

  ipcRenderer.invoke('addToDMQueue', dmQueueElement)

  ipcRenderer.invoke('trackEvent', {
    event: 'Game Update Requested',
    properties: { game_name: appName, store_name: runner }
  })
}

export const getDMQueueInformation = async () =>
  ipcRenderer.invoke('getDMQueueInformation')

export const removeFromDMQueue = (appName: string) =>
  ipcRenderer.send('removeFromDMQueue', appName)

export const handleDMQueueInformation = (
  onChange: (
    e: Electron.IpcRendererEvent,
    elements: DMQueueElement[],
    state: DownloadManagerState
  ) => void
) => {
  ipcRenderer.on('changedDMQueueInformation', onChange)
  return () => {
    ipcRenderer.removeListener('changedDMQueueInformation', onChange)
  }
}

export const cancelDownload = (removeDownloaded: boolean) =>
  ipcRenderer.send('cancelDownload', removeDownloaded)

export const cancelExtraction = (appName: string) =>
  ipcRenderer.send('cancelExtraction', appName)

export const resumeCurrentDownload = () =>
  ipcRenderer.send('resumeCurrentDownload')

export const pauseCurrentDownload = async () =>
  ipcRenderer.invoke('pauseCurrentDownload')
