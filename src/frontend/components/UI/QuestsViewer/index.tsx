import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { QuestDetailsWrapper } from './components/QuestDetailsWrapper'
import { Alert } from '@hyperplay/ui'
import useAuthSession from 'frontend/hooks/useAuthSession'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()

  let alertComponent = null
  if (!isSignedIn) {
    alertComponent = (
      <Alert
        className={styles.alert}
        message="Be sure to log into HyperPlay to maintain your play streak progress."
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
