import getPartitionCookies from './utils/get_partition_cookies'
import { DEV_PORTAL_URL } from '../common/constants'
import { LogPrefix } from './logger/logger'
import { AuthSession } from '../common/types/auth'
import { captureException } from '@sentry/electron'

export async function getAuthSession() {
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
    const responseError = await response.text()
    captureException(responseError, {
      tags: {
        event: 'getAuthSession Error'
      }
    })
    throw new Error(
      `${LogPrefix.Backend} Failed to get auth session. Status text: ${response.statusText}. Error message: ${responseError}`
    )
  }

  const body = await response.json()

  if (Object.keys(body).length === 0) {
    return null
  }

  return body as AuthSession
}
