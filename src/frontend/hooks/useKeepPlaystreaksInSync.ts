import { questPlayStreakSyncState } from '@hyperplay/quests-ui'
import { useEffect, useState } from 'react'

export function useKeepPlaystreaksInSync(appName: string) {
  const [syncInitialized, setSyncInitialized] = useState(false)
  useEffect(() => {
    if (syncInitialized) {
      return questPlayStreakSyncState.clearAllTimers
    }
    return
  }, [syncInitialized])
  useEffect(() => {
    async function initSync() {
      await questPlayStreakSyncState.keepProjectQuestsInSync(appName)
      setSyncInitialized(true)
    }
    initSync()
  }, [])
}
