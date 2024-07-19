import { ipcMain, session, webContents } from 'electron'
import { DEV_PORTAL_URL } from '../../common/constants'
import { logError, logInfo, LogPrefix } from '../logger/logger'
import { getAuthSession } from '../auth'

ipcMain.handle('getAuthSession', getAuthSession)

ipcMain.handle('logOut', async () => {
  const authSession = session.fromPartition('persist:auth')
  const cookiesToRemove = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token'
  ]
  await Promise.all(
    cookiesToRemove.map(async (cookie) =>
      authSession.cookies.remove(DEV_PORTAL_URL, cookie)
    )
  )
})

function refreshAllSessions() {
  webContents.getAllWebContents().forEach((val) => {
    val.send('authEvent', 'refreshSession')
  })
}

ipcMain.on('authConnected', () => {
  getAuthSession()
    .then((user) => {
      logInfo(
        `Account Connected: ${
          user ? JSON.stringify(user) : 'unknown user'
        } with userID: ${user ? user.userId : 'unknown'}`,
        LogPrefix.Auth
      )
    })
    .catch((error) =>
      logError(['Failed to fetch user information', error], LogPrefix.Auth)
    )
  refreshAllSessions()
})

ipcMain.on('authDisconnected', () => {
  refreshAllSessions()
})
