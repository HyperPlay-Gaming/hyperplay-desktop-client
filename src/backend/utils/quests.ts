import { LogPrefix, logInfo } from 'backend/logger/logger'
import getPartitionCookies from './get_partition_cookies'
import { DEV_PORTAL_URL } from 'common/constants'
import { fetchWithCookie } from './fetch_with_cookie'

export async function postPlaySessionTime(
  appName: string,
  playSessionInSeconds: number
) {
  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })
  const result = await fetch(`${DEV_PORTAL_URL}api/v1/quests/playStreak`, {
    method: 'POST',
    headers: {
      Cookie: cookieString
    },
    body: JSON.stringify({
      project_id: appName,
      play_session_in_seconds: playSessionInSeconds
    })
  })
  const resultJson = await result.json()
  logInfo(
    `Posted playstreak playsession. response: ${JSON.stringify(
      resultJson,
      null,
      4
    )}`,
    LogPrefix.HyperPlay
  )
}

export async function checkG7ConnectionStatus() {
  const url = `${DEV_PORTAL_URL}api/v1/game7/user/connected`
  const response = await fetchWithCookie({ url, method: 'GET' })
  return response.connected
}
