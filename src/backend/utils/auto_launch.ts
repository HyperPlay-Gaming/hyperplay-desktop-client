import AutoLaunch from 'auto-launch'
import { GlobalConfig } from 'backend/config'
import { isMac } from 'backend/constants'
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

// default to true on fresh install. except for on Mac
// see: https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/issues/770
if (autoLaunchHyperPlay === undefined && !isMac) {
  updateAutoLaunch(true)
  GlobalConfig.get().setSetting('autoLaunchHyperPlay', true)
}
