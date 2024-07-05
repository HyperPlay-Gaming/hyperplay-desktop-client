import { DEV_PORTAL_URL } from 'common/constants'
import getPartitionCookies from './get_partition_cookies'

export async function fetchWithCookie(url: string, method: string) {
  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const result = await fetch(url, {
    method: method,
    headers: {
      Cookie: cookieString
    }
  })
  const resultJson = await result.json()
  return resultJson
}
