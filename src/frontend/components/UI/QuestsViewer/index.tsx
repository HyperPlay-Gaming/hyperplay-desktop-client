import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { Alert } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import { QuestDetailsWrapper, useGetUserPlayStreak } from '@hyperplay/quests-ui'
import { useFlags } from 'launchdarkly-react-client-sdk'
import authState from 'frontend/state/authState'
import useAuthSession from 'frontend/hooks/useAuthSession'
import '@hyperplay/quests-ui/style.css'
import { Reward } from 'common/types'
import useGetQuests from 'frontend/hooks/useGetQuests'
import { useSyncPlayStreakWithExternalSource } from 'frontend/hooks/useSyncPlayStreakWithExternalSource'
import { useAccount } from 'wagmi'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const { address } = useAccount()
  const questResults = useGetQuests(appName)
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn, data } = useAuthSession()
  const { t } = useTranslation()
  const flags = useFlags()
  const quests = questResults?.data?.data
  const initialQuestId = quests?.[0]?.id ?? null
  const visibleQuestId = selectedQuestId ?? initialQuestId
  const sessionEmail = data?.linkedAccounts.get('email')
  const { invalidateQuery } = useGetUserPlayStreak(
    visibleQuestId,
    window.api.getUserPlayStreak
  )

  const getPendingExternalSync = useCallback(async () => {
    if (!address || !visibleQuestId || !isSignedIn) return false
    return window.api.checkPendingSync({
      questId: visibleQuestId,
      wallet: address
    })
  }, [address, visibleQuestId, isSignedIn])

  const { syncPlayStreakWithExternalSource } =
    useSyncPlayStreakWithExternalSource({
      refreshPlayStreak: invalidateQuery
    })

  /**
   Don't delete this comment block since it's used for translation parsing for keys that are on the quests-ui library.
   As a heads up, everytime you add a new key on any library, you need to add it as a block comment anywhere in the code as well.
   
   t("quest.noG7ConnectionClaim", "You need to have a Game7 account linked to {{email}} to claim your rewards.")
   t("quest.noG7ConnectionSync", "You need to have a Game7 account linked to {{email}} to resync your tasks.")
   t("quest.notEnoughGas", "Insufficient wallet balance to claim your reward due to gas fees. Try a different wallet or replenish this one before retrying.")
   t("quest.playstreak.syncSuccess", "Progress synced")
   */

  let alertComponent = null
  if (!isSignedIn) {
    alertComponent = (
      <Alert
        message={t(
          'quests.playstreak.signInWarning.overlay',
          'You are currently not logged in, play streak progress will not be tracked. Please exit the game and login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  /**
   Don't delete this comment block since it's used for translation parsing for keys that are on the quests-ui library.
   As a heads up, everytime you add a new key on any library, you need to add it as a block comment anywhere in the code as well.
   
   t("quest.claimWarning.body", "<bold>IMPORTANT:</bold> Please ensure that you are allocating enough gas on the {{networkName}} network for the transaction to be successfully confirmed <bold>within 7 days.</bold>")
    t("quest.claimWarning.body2", "Otherwise, the Quest Reward <bold>will expire and will no longer be claimable.</bold>")
    t('quest.claimWarning.cancel', 'Cancel')
    t('quest.claimWarning.confirm', 'Confirm')
   */

  return (
    <div className={styles.container}>
      {alertComponent}
      <div className={styles.questsViewerContainer}>
        <QuestLogWrapper
          questsResults={questResults}
          projectId={appName}
          selectedQuestId={visibleQuestId}
          setSelectedQuestId={setSelectedQuestId}
        />
        <QuestDetailsWrapper
          getPendingExternalSync={getPendingExternalSync}
          syncPlayStreakWithExternalSource={syncPlayStreakWithExternalSource}
          tOverride={t}
          sessionEmail={sessionEmail}
          className={styles.detailsWrapper}
          checkG7ConnectionStatus={window.api.checkG7ConnectionStatus}
          logInfo={window.api.logInfo}
          logError={window.api.logError}
          projectId={appName}
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
          selectedQuestId={visibleQuestId}
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
          getDepositContracts={window.api.getDepositContracts}
          openSignInModal={authState.openSignInModal}
          resyncExternalTask={async (rewardId: string) => {
            window.api.resyncExternalTask(rewardId)
          }}
          isSignedIn={isSignedIn}
          key={'questDetailsLoading'}
        />
      </div>
    </div>
  )
}
