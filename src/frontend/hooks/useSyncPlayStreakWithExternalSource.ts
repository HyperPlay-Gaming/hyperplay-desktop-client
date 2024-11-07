import { useAccount, useSignMessage } from 'wagmi'
import { useSyncPlayStreakWithExternalSource as useSyncPlayStreakWithExternalSourceCore } from '@hyperplay/quests-ui'

// @dev: this hook needs to be used in a component with MobX observer
export function useSyncPlayStreakWithExternalSource({
  refreshPlayStreak
}: {
  refreshPlayStreak: () => void
}) {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const { mutateAsync } = useSyncPlayStreakWithExternalSourceCore({
    getCSRFToken: async () => {
      return window.api.getCSRFToken()
    },
    syncPlayStreakWithExternalSource: async ({ quest_id, signature }) => {
      return window.api.syncPlayStreakWithExternalSource({
        quest_id,
        signature
      })
    },
    checkPendingSync: async ({ wallet, questId }) => {
      return window.api.checkPendingSync({ wallet, questId })
    },
    signMessage: async (message) => {
      return signMessageAsync({ message })
    },
    mutationOptions: {
      onSuccess: async () => {
        refreshPlayStreak()
        console.log('Playstreak synced with external source')
        window.api.logInfo('Playstreak synced with external source')
      },
      onError: (error) => {
        console.error(`Error syncing playstreak with external source`, error)
        window.api.logError(
          `Error syncing playstreak with external source: ${error.message}`
        )
      }
    }
  })

  const syncPlayStreakWithExternalSource = async (questId: number) => {
    // we don't need to do anything here because the button is not shown if the user is not signed in
    // or doesn't have a wallet connected
    if (!address) return
    return mutateAsync({ questId, address })
  }

  return {
    syncPlayStreakWithExternalSource
  }
}
