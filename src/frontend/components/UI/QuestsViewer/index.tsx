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
          className={styles.detailsWrapper}
        />
      </div>
    </div>
  )
}
