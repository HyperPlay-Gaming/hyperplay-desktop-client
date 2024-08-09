import { wait } from '@hyperplay/utils'
import { resetSessionStartedTime } from 'frontend/helpers/getPlaystreakArgsFromQuestData'
import { useEffect } from 'react'

export function useSyncPlaySession(
  projectId: string,
  invalidateQuery: () => Promise<void>
) {
  useEffect(() => {
    const syncTimer = setInterval(async () => {
      await window.api.syncPlaySession(projectId, 'hyperplay')
      // allow for some time before read
      await wait(5000)
      await invalidateQuery()
      resetSessionStartedTime()
    }, 1000 * 60)

    return () => {
      clearInterval(syncTimer)
    }
  }, [projectId, invalidateQuery])
}
