import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { QuestDetailsWrapper } from './components/QuestDetailsWrapper'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)

  return (
    <div className={styles.questsViewerContainer}>
      <QuestLogWrapper
        projectId={appName}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
      />
      <QuestDetailsWrapper selectedQuestId={selectedQuestId} />
    </div>
  )
}
