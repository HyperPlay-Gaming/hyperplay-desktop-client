import { HyperPlayGameOS } from 'common/types'
import { ipcRenderer } from 'electron'

export const getHyperPlayInstallInfo = async (
  appName: string,
  platform: HyperPlayGameOS
) => ipcRenderer.invoke('getHyperPlayInstallInfo', appName, platform)
