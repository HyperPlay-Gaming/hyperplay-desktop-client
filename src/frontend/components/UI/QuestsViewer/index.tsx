import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import '@hyperplay/quests-ui/style.css'
import useGetQuests from 'frontend/hooks/useGetQuests'
import QuestDetails from '../QuestDetails'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const questResults = useGetQuests(appName)
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const quests = questResults?.data?.data

  const initialQuestId = quests?.[0]?.id ?? null
  const visibleQuestId = selectedQuestId ?? initialQuestId

  return (
    <div className={styles.container}>
      <div className={styles.questsViewerContainer}>
        <QuestLogWrapper
          isLoading={questResults?.data.isPending}
          quests={quests}
          projectId={appName}
          selectedQuestId={visibleQuestId}
          setSelectedQuestId={setSelectedQuestId}
        />
        <QuestDetails
          questId={visibleQuestId}
          className={styles.detailsWrapper}
          streakIsProgressing={true}
        />
      </div>
    </div>
  )
}
