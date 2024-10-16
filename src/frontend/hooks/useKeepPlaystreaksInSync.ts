import { questPlayStreakSyncState } from '@hyperplay/quests-ui'
import { useEffect, useRef } from 'react'

export function useKeepPlaystreaksInSync(appName: string) {
  const syncInitializedRef = useRef(false)

  useEffect(() => {
    return () => {
      if (syncInitializedRef.current) {
        questPlayStreakSyncState.clearAllTimers()
      }
    }
  }, [])

  useEffect(() => {
    const initSync = async () => {
      try {
        await questPlayStreakSyncState.keepProjectQuestsInSync(appName)
        syncInitializedRef.current = true
      } catch (error) {
        console.error('Failed to initialize sync:', error)
      }
    }
    initSync()
  }, [appName])
}
