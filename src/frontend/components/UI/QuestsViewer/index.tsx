import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { QuestDetailsWrapper } from './components/QuestDetailsWrapper'
import { Alert } from '@hyperplay/ui'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()

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
        <QuestDetailsWrapper selectedQuestId={selectedQuestId} />
      </div>
    </div>
  )
}
