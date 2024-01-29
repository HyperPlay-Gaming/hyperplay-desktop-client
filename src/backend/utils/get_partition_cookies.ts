import { session } from 'electron'

// warning: this function needs to be used from the main process
export default async function getPartitionCookies({
  partition,
  url
}: {
  partition: string
  url: string
}) {
  const partitionSession = session.fromPartition(partition)
  const cookies = await partitionSession.cookies.get({ url })
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}
