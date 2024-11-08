import { questPlayStreakSyncState } from '@hyperplay/quests-ui'
import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Runner } from '@hyperplay/utils'

export function useKeepPlaystreaksInSync(appName: string, runner: Runner) {
  const syncInitializedRef = useRef(false)
  const queryClient = useQueryClient()

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

        await questPlayStreakSyncState.keepProjectQuestsInSync(appName, runner)
        syncInitializedRef.current = true
      } catch (error) {
        console.error('Failed to initialize sync:', error)
      }
    }
    initSync()

    return () => {
      if (syncInitializedRef.current) {
        questPlayStreakSyncState.clearAllTimers()
      }
    }
  }, [appName])
}
