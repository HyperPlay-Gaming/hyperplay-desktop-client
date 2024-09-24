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
  const { isSignedIn, data } = useAuthSession()
  const { t } = useTranslation()
  const flags = useFlags()

  const sessionEmail = data?.linkedAccounts.get('email')

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

  /**
   Don't delete this comment block since it's used for translation parsing for keys that are on the quests-ui library.
   As a heads up, everytime you add a new key on any library, you need to add it as a block comment anywhere in the code as well.
   
   t("quest.claimWarning.body", "<bold>IMPORTANT:</bold> Please ensure that you are allocating enough gas on the {{networkName}} network for the transaction to be successfully confirmed <bold>within 7 days.</bold>")
    t("quest.claimWarning.body2", "Otherwise, the Quest Reward <bold>will expire and will no longer be claimable.</bold>")
    t('quest.claimWarning.cancel', 'Cancel')
    t('quest.claimWarning.confirm', 'Confirm')
   */

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
          sessionEmail={sessionEmail}
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
