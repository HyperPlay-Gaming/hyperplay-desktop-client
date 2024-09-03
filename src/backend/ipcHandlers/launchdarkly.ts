import { GlobalConfig } from 'backend/config'
import { LDEnvironmentId } from 'backend/ldconstants'
import { ipcMain } from 'electron'
import { getAppVersion } from '../utils'

ipcMain.handle('getLDEnvConfig', async () => {
  const ldUser = GlobalConfig.get().getSettings().ldUser
  const appVersion = getAppVersion()
  return { envId: LDEnvironmentId, ldUser, appVersion }
})
