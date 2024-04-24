import { ipcMain, session } from 'electron'
import getPartitionCookies from '../utils/get_partition_cookies'
import { DEV_PORTAL_URL } from '../../common/constants'
import { LogPrefix } from '../logger/logger'
import { AuthSession } from '../../common/types/auth'

ipcMain.handle('getAuthSession', async () => {
  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const response = await fetch(`${DEV_PORTAL_URL}/api/auth/session`, {
    method: 'GET',
    headers: {
      Cookie: cookieString
    }
  })

  if (!response.ok) {
    throw new Error(
      `${LogPrefix.Backend} Failed to get auth session: ${response.statusText}`
    )
  }

  const body = await response.json()

  if (Object.keys(body).length === 0) {
    return null
  }

  return body as AuthSession
})

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
