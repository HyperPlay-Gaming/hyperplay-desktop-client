import { questPlayStreakSyncState } from '@hyperplay/quests-ui'
import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useKeepPlaystreaksInSync(appName: string) {
  const syncInitializedRef = useRef(false)
  const queryClient = useQueryClient()

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
        questPlayStreakSyncState.init({
          getQuests: window.api.getQuests,
          getQuest: window.api.getQuest,
          getUserPlayStreak: window.api.getUserPlayStreak,
          syncPlaySession: window.api.syncPlaySession,
          appQueryClient: queryClient
        })

        await questPlayStreakSyncState.keepProjectQuestsInSync(appName)
        syncInitializedRef.current = true
      } catch (error) {
        console.error('Failed to initialize sync:', error)
      }
    }
    initSync()
  }, [appName])
}
