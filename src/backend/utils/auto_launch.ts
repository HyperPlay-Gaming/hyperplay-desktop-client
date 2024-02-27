import AutoLaunch from 'auto-launch'
import { GlobalConfig } from 'backend/config'
import { ipcMain } from 'electron'

export const hyperPlayAutoLauncher = new AutoLaunch({
  name: 'HyperPlay',
  path: process.execPath
})

export async function updateAutoLaunch(enable: boolean) {
  if (enable) {
    return hyperPlayAutoLauncher.enable()
  } else {
    return hyperPlayAutoLauncher.disable()
  }
}

export async function hyperPlayAutoLaunchIsEnabled() {
  return hyperPlayAutoLauncher.isEnabled()
}

ipcMain.handle('updateAutoLaunch', async () => {
  const settings = GlobalConfig.get().getSettings()
  const { autoLaunchHyperPlay } = settings
  return updateAutoLaunch(autoLaunchHyperPlay)
})

const settings = GlobalConfig.get().getSettings()
const { autoLaunchHyperPlay } = settings

// default to true on fresh install
if (autoLaunchHyperPlay === undefined) {
  updateAutoLaunch(true)
  GlobalConfig.get().setSetting('autoLaunchHyperPlay', true)
}
