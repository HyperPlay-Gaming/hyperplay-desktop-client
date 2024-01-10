import { DEV_PORTAL_URL } from '../../common/constants'
import { AuthSession } from '../../common/types'
import getPartitionCookies from '../utils/get_partition_cookies'
import { ipcMain } from 'electron'

ipcMain.handle('getAuthSession', async () => {
  const cookieString = await getPartitionCookies('persist:auth')

  const response = await fetch(`${DEV_PORTAL_URL}/api/auth/session`, {
    method: 'GET',
    headers: {
      Cookie: cookieString
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to get auth session: ${response.statusText}`)
  }

  const body = await response.json()

  if (Object.keys(body).length === 0) {
    return null
  }

  return body as AuthSession
})
