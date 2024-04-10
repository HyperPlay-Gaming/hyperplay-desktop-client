import { DEV_PORTAL_URL } from 'common/constants'
import getPartitionCookies from './get_partition_cookies'

export async function fetchWithCookie(url: string, fetchParams: RequestInit) {
  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  /* eslint-disable-next-line */
  const { headers, ...rest } = fetchParams
  const data = await fetch(url, {
    headers: {
      Cookie: cookieString
    },
    ...rest
  })

  if (!data.ok) {
    const errMessage = await data.text()
    throw errMessage
  }
  const dataJson = await data.json()
  return dataJson
}
