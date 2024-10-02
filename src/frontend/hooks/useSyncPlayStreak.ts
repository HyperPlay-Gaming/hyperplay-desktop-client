import { useAccount, useConnect, useSignMessage } from 'wagmi'
import useAuthSession from './useAuthSession'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useMutation } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import authState from 'frontend/state/authState'
import alertStore from 'frontend/store/AlertStore'
import { useTranslation } from 'react-i18next'

export function useSyncPlayStreak({
  refreshPlayStreak
}: {
  refreshPlayStreak: () => void
}) {
  const flags = useFlags()
  const { isSignedIn } = useAuthSession()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { connectAsync } = useConnect()
  const questsWithExternalSync: number[] = flags.questsWithExternalSync
  const { t } = useTranslation()

  const { mutate } = useMutation({
    mutationFn: async (questId: number) => {
      if (questsWithExternalSync.includes(questId)) {
        const currentProvider = await window.api.getConnectedProvider()
        const isWalletConnected = currentProvider !== 'Unconnected'

        // we do window.api.focusMainWindow() instead of onboardingStore.openOnboarding()
        // because this can be called from a game window, not the main window
        if (!isWalletConnected) {
          alertStore.setAlert(
            'warning',
            t(
              'quests.playstreak.walletNotConnected',
              'Please connect a wallet to sync your progress.'
            )
          )
          window.api.focusMainWindow()
          window.api.openOnboarding()
          return
        }

        let wallet = address

        if (!address) {
          const { accounts } = await connectAsync({ connector: injected() })
          wallet = accounts[0]
        }

        if (!wallet) {
          alertStore.setAlert(
            'warning',
            t(
              'quests.playstreak.walletNotConnected',
              'Please connect a wallet to sync your progress.'
            )
          )
          window.api.focusMainWindow()
          window.api.openOnboarding()
          return
        }

        let hasPendingSync = false

        try {
          hasPendingSync = await window.api.checkPendingSync({
            wallet,
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
      authState.openSignInModal()
      return
    }

    mutate(questId)
  }

  return {
    syncPlayStreak
  }
}
