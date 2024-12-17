import React, { useCallback } from 'react'
import {
  QuestDetailsWrapper,
  claimedRewardToastState,
  useGetUserPlayStreak
} from '@hyperplay/quests-ui'
import { Reward, Quest } from '@hyperplay/utils'
import useAuthSession from 'frontend/hooks/useAuthSession'
import authState from 'frontend/state/authState'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useSyncPlayStreakWithExternalSource } from 'frontend/hooks/useSyncPlayStreakWithExternalSource'
import extensionState from 'frontend/state/ExtensionState'
import { PossibleMetricPayloads } from 'backend/metrics/types'

/**
 * Don't delete this comment block since it's used for translation parsing for keys that are on the quests-ui library.
 * As a heads up, everytime you add a new key on any library, you need to add it as a block comment anywhere in the code as well.
 *
 * t("quest.noG7ConnectionClaim", "You need to have a Game7 account linked to {{email}} to claim your rewards.")
 * t("quest.noG7ConnectionSync", "You need to have a Game7 account linked to {{email}} to resync your tasks.")
 * t("quest.notEnoughGas", "Insufficient wallet balance to claim your reward due to gas fees. Try a different wallet or replenish this one before retrying.")
 * t("quest.playstreak.syncSuccess", "Progress synced")
 * t("quest.claim", "Claim")
 * t('quest.notSignedIn.title', 'Not signed in')
 * t('quest.notSignedIn.message', 'You need to be signed in to claim your reward.')
 * t('quest.notEligible.title', 'Not eligible yet')
 * t('quest.notEligible.message', 'You have not completed the required play streak days and can not claim your reward at this time.')
 * t('quest.playstreak.sync', 'Sync Progress')
 * t('quest.noG7ConnectionSync.title', 'No G7 account linked')
 * t('quest.noG7ConnectionSync.message', 'You need to have a Game7 account linked to {{email}} to claim your rewards.')
 * t('quest.notEnoughBalance.title', 'Low balance')
 * t('quest.notEnoughGas.message', 'Insufficient wallet balance to claim your reward due to gas fees. Try a different wallet or replenish this one before retrying.')
 * t('quest.claimFailed', 'Claim failed')
 * t('quest.claimFailedMessage', 'Please try once more. If it still doesn\'t work, create a Discord support ticket.')
 * t('quest.createDiscordTicket', 'Create Discord Ticket')
 * t('quest.reward', 'Rewards')
 * t('quest.associatedGames', 'Associated games')
 * t('quest.linkAccount', 'Link your Steam account to check eligibility.')
 * t('quest.needMoreAchievements', 'You need to have completed {{percent}}% of the achievements in one of these games.')
 * t('quest.claim', 'Claim')
 * t('quest.signIn', 'Sign in')
 * t('quest.connectSteamAccount', 'Connect Steam account')
 * t('quest.type.reputation', 'Reputation')
 * t('quest.type.playstreak', 'Play Streak')
 * t('quest.sync', 'Sync')
 * t('quest.playstreak.streakProgress', 'Streak Progress')
 * t('quest.playstreak.days', 'days')
 * t('quest.playstreak.playToStart', 'Play this game to start your streak!')
 * t('quest.playstreak.playEachDay', 'Play each day so your streak won\'t reset!')
 * t('quest.playstreak.streakCompleted', 'Streak completed! Claim your rewards now.')
 * t('quest.playstreak.now', 'Now')
 * t('quest.playstreak.dayResets', 'Day resets:')
 * t('quest.playstreak.progressTowardsStreak', 'progress towards today\'s streak.')
 * t('quest.points', 'Points')
 * t('quest.claimWarning.body', '<bold>IMPORTANT:</bold> Please ensure that you are allocating enough gas on the {{networkName}} network for the transaction to be successfully confirmed <bold>within 7 days.</bold>')
 * t('quest.claimWarning.body2', 'Otherwise, the Quest Reward <bold>will expire and will no longer be claimable.</bold>')
 * t('quest.claimWarning.cancel', 'Cancel')
 * t('quest.claimWarning.confirm', 'Confirm')
 */

export default function QuestDetails({
  questId,
  className,
  isQuestsPage,
  onPlayClick = () => {}
}: {
  questId: number | null
  className?: string
  isQuestsPage?: boolean
  onPlayClick?: (quest: Quest) => void
}) {
  const { address } = useAccount()
  const { isSignedIn, data } = useAuthSession()
  const { t } = useTranslation()
  const flags = useFlags()
  const sessionEmail = data?.linkedAccounts.get('email')
  const { invalidateQuery } = useGetUserPlayStreak(
    questId,
    window.api.getUserPlayStreak
  )

  const getPendingExternalSync = useCallback(async () => {
    if (!address || !questId || !isSignedIn) return false
    return window.api.checkPendingSync({
      questId,
      wallet: address
    })
  }, [address, questId, isSignedIn])

  const { syncPlayStreakWithExternalSource } =
    useSyncPlayStreakWithExternalSource({
      refreshPlayStreak: invalidateQuery
    })

  return (
    <QuestDetailsWrapper
      onRewardClaimed={(reward) =>
        claimedRewardToastState.showClaimedReward(reward)
      }
      onShowMetaMaskPopup={async () => {
        const currentProvider = await window.api.getConnectedProvider()
        if (currentProvider === 'MetaMaskExtension') {
          extensionState.showPopup()
        }
      }}
      onPlayClick={onPlayClick}
      getPendingExternalSync={getPendingExternalSync}
      syncPlayStreakWithExternalSource={syncPlayStreakWithExternalSource}
      tOverride={t}
      sessionEmail={sessionEmail}
      className={className}
      checkG7ConnectionStatus={window.api.checkG7ConnectionStatus}
      logInfo={window.api.logInfo}
      logError={window.api.logError}
      flags={{
        rewardTypeClaimEnabled: {
          ERC20: flags.erc20RewardsClaim,
          ERC721: flags.erc721RewardsClaim,
          ERC1155: flags.erc1155RewardsClaim,
          POINTS: flags.pointsRewardsClaim,
          'EXTERNAL-TASKS': flags.externalTasksRewardsClaim
        },
        questsOverlayClaimCtaEnabled: flags.questsOverlayClaimCtaEnabled
      }}
      trackEvent={async (eventPayload) =>
        window.api.trackEvent(eventPayload as PossibleMetricPayloads)
      }
      signInWithSteamAccount={() => window.api.signInWithProvider('steam')}
      openDiscordLink={window.api.openDiscordLink}
      selectedQuestId={questId}
      getQuest={window.api.getQuest}
      getUserPlayStreak={window.api.getUserPlayStreak}
      getSteamGameMetadata={window.api.getSteamGameMetadata}
      claimPoints={async (reward: Reward) =>
        window.api.claimQuestPointsReward(reward.id.toString())
      }
      completeExternalTask={async (reward: Reward) =>
        window.api.completeExternalTask(reward.id.toString())
      }
      getQuestRewardSignature={window.api.getQuestRewardSignature}
      confirmRewardClaim={window.api.confirmRewardClaim}
      getExternalTaskCredits={window.api.getExternalTaskCredits}
      syncPlaySession={window.api.syncPlaySession}
      getDepositContracts={window.api.getDepositContracts}
      openSignInModal={authState.openSignInModal}
      resyncExternalTask={async (rewardId: string) => {
        window.api.resyncExternalTask(rewardId)
      }}
      isSignedIn={isSignedIn}
      isQuestsPage={isQuestsPage}
      key={'questDetailsLoading'}
    />
  )
}
