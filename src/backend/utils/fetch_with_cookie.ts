import { DEV_PORTAL_URL } from 'common/constants'
import getPartitionCookies from './get_partition_cookies'

export async function fetchWithCookie({
  url,
  method,
  partition
}: {
  url: string
  method: string
  partition?: string
}) {
  const cookieString = await getPartitionCookies({
    partition: partition ?? 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const response = await fetch(url, {
    method: method,
    headers: {
      Cookie: cookieString
    }
  })
  if (!response.ok) {
    throw await response.text()
  }
  const resultJson = await response.json()
  return resultJson
}
