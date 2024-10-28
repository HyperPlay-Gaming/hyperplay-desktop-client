import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { Alert } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import useAuthSession from 'frontend/hooks/useAuthSession'
import '@hyperplay/quests-ui/style.css'
import useGetQuests from 'frontend/hooks/useGetQuests'
import QuestDetails from '../QuestDetails'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const questResults = useGetQuests(appName)
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()
  const quests = questResults?.data?.data
  const initialQuestId = quests?.[0]?.id ?? null
  const visibleQuestId = selectedQuestId ?? initialQuestId

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
        <QuestDetails
          questId={visibleQuestId}
          appName={appName}
          className={styles.detailsWrapper}
        />
      </div>
    </div>
  )
}
