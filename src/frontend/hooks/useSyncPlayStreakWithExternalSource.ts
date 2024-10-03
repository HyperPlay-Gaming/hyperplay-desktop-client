import { useAccount, useConnect, useSignMessage } from 'wagmi'
import useAuthSession from './useAuthSession'
import { injected } from 'wagmi/connectors'
import alertStore from 'frontend/store/AlertStore'
import { useTranslation } from 'react-i18next'
import extensionState from 'frontend/state/ExtensionState'
import { useSyncPlayStreakWithExternalSource as useSyncPlayStreakWithExternalSourceCore } from '@hyperplay/quests-ui'
import authState from 'frontend/state/authState'

// @dev: this hook needs to be used in a component with MobX observer
export function useSyncPlayStreakWithExternalSource({
  refreshPlayStreak
}: {
  refreshPlayStreak: () => void
}) {
  const { isSignedIn } = useAuthSession()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { connectAsync } = useConnect()
  const { t } = useTranslation()

  const showWalletWarning = () => {
    alertStore.setAlert(
      'warning',
      t(
        'quests.playstreak.walletNotConnected',
        'Please connect a wallet to sync your progress.'
      )
    )
  }

  const { mutate } = useSyncPlayStreakWithExternalSourceCore({
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
    if (!isSignedIn) {
      authState.openSignInModal()
      return
    }
    const currentProvider = await window.api.getConnectedProvider()
    const web3Provider = await window.api.getCurrentWeb3Provider()
    const isWalletUnConnected =
      currentProvider === 'Unconnected' && !web3Provider
    // we do window.api.focusMainWindow() instead of onboardingStore.openOnboarding()
    // because this can be called from a game window, not the main window
    if (isWalletUnConnected) {
      showWalletWarning()
      window.api.focusMainWindow()
      window.api.openOnboarding()
      return
    }
    let connectedAddress = address
    if (!connectedAddress) {
      showWalletWarning()
      extensionState.showPopup()
      const { accounts } = await connectAsync({ connector: injected() })
      connectedAddress = accounts[0]
    }
    if (!connectedAddress) {
      showWalletWarning()
      return
    }
    mutate({ questId, address: connectedAddress })
  }

  return {
    syncPlayStreakWithExternalSource
  }
}
