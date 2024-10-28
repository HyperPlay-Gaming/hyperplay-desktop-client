import React, { useCallback } from 'react'
import { QuestDetailsWrapper } from '@hyperplay/quests-ui'
import { Reward, Quest } from '@hyperplay/utils'
import useAuthSession from 'frontend/hooks/useAuthSession'
import useGetUserPlayStreak from 'frontend/hooks/useGetUserPlayStreak'
import authState from 'frontend/state/authState'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useSyncPlayStreakWithExternalSource } from 'frontend/hooks/useSyncPlayStreakWithExternalSource'

export default function QuestDetails({
  questId,
  className,
  isQuestsPage,
  onPlayClick
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
  const { invalidateQuery } = useGetUserPlayStreak(questId)

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
      trackEvent={window.api.trackEvent}
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
