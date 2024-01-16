import { session } from 'electron'
import { DEV_PORTAL_URL } from '../../common/constants'

// warning: this function needs to be used from the main process
export default async function getPartitionCookies(partition: string) {
  const partitionSession = session.fromPartition(partition)

  const cookies = await partitionSession.cookies.get({
    url: DEV_PORTAL_URL
  })

  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}
