import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { Alert } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import { QuestDetailsWrapper } from '@hyperplay/quests-ui'
import { useFlags } from 'launchdarkly-react-client-sdk'
import authState from 'frontend/state/authState'
import useAuthSession from 'frontend/hooks/useAuthSession'
import '@hyperplay/quests-ui/style.css'
import { Reward } from 'common/types'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()
  const flags = useFlags()

  let alertComponent = null
  if (!isSignedIn) {
    alertComponent = (
      <Alert
        className={styles.alert}
        message={t(
          'quests.playstreak.signInWarning.overlay',
          'You are currently not logged in, play streak progress will not be tracked. Please exit the game and login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  return (
    <div className={styles.root}>
      {alertComponent}
      <div className={styles.questsViewerContainer}>
        <QuestLogWrapper
          projectId={appName}
          selectedQuestId={selectedQuestId}
          setSelectedQuestId={setSelectedQuestId}
        />
        <QuestDetailsWrapper
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
          selectedQuestId={selectedQuestId}
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
          key={'questDetailsLoading'}
        />
      </div>
    </div>
  )
}
