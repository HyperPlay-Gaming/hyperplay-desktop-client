import { useAccount, useSignMessage } from 'wagmi'
import useAuthSession from './useAuthSession'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useMutation } from '@tanstack/react-query'

export function useSyncPlayStreak({
  refreshPlayStreak
}: {
  refreshPlayStreak: () => void
}) {
  const flags = useFlags()
  const { isSignedIn } = useAuthSession()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const questsWithExternalSync: number[] = flags.questsWithExternalSync

  const { mutate } = useMutation({
    mutationFn: async (questId: number) => {
      if (questsWithExternalSync.includes(questId)) {
        let hasPendingSync = false

        if (!address) {
          alert('Please connect your wallet to sync your play streak')
          return
        }

        try {
          hasPendingSync = await window.api.checkPendingSync({
            wallet: address,
            questId
          })
        } catch (error) {
          console.error('Error checking pending sync', error)
        }

        if (!hasPendingSync) {
          return
        }

        const csrfToken = await window.api.getCSRFToken()
        const message = `Sync play-streak of quest with ID: ${questId} \n\nNonce: ${csrfToken}`
        const signature = await signMessageAsync({ message })

        await window.api.syncPlayStreakWithExternalSource({
          quest_id: questId,
          signature
        })
      }
    },
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
  })

  const syncPlayStreak = async (questId: number) => {
    if (!isSignedIn) {
      alert('Please sign in to sync your play streak')
      return
    }

    mutate(questId)
  }

  return {
    syncPlayStreak
  }
}
