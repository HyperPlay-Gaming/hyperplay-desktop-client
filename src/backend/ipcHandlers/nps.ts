import { npsStore } from 'backend/constants'
import { app, ipcMain } from 'electron'
import { major } from 'semver'

let npsAlreadyPromptedForThisSession = false

ipcMain.on('npsSubmitted', () => {
  npsStore.set('lastClientVersionNpsSubmitted', app.getVersion())
})

ipcMain.handle('shouldPromptNps', async () => {
  const lastAppVersion = npsStore.get('lastClientVersionNpsSubmitted', '0.0.0')
  const currentAppVersion = app.getVersion()

  const userHasNeverBeenPrompted = lastAppVersion === '0.0.0'
  if (userHasNeverBeenPrompted) {
    return true
  }
  const haveNotPromptedUserOnThisMajorVersion =
    major(lastAppVersion) < major(currentAppVersion)

  if (
    haveNotPromptedUserOnThisMajorVersion &&
    !npsAlreadyPromptedForThisSession
  ) {
    npsAlreadyPromptedForThisSession = true
    return true
  }
  return false
})
