import { ipcMain, session, webContents } from 'electron'
import getPartitionCookies from '../utils/get_partition_cookies'
import { DEV_PORTAL_URL } from '../../common/constants'
import { LogPrefix } from '../logger/logger'
import { AuthSession } from '../../common/types/auth'
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
  refreshAllSessions()
})

ipcMain.on('authDisconnected', () => {
  refreshAllSessions()
})
