import { GlobalConfig } from 'backend/config'
import { LDEnvironmentId } from 'backend/ldconstants'
import { ipcMain } from 'electron'

ipcMain.handle('getLDEnvConfig', async () => {
  const ldUser = GlobalConfig.get().getSettings().ldUser
  return { envId: LDEnvironmentId, ldUser }
})
