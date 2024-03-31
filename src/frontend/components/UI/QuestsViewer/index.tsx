import React, { useState } from 'react'
import {
  QuestLog,
  QuestDetails,
  QuestDetailsProps,
  QuestLogInfo
} from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'
import { Quest } from 'common/types'
import styles from './index.module.scss'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const questsResults = useGetQuests(appName)
  const quests = questsResults?.data?.data

  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  let questLog = null
  if (Array.isArray(quests)) {
    const questsUi = quests.map((val: Quest) => {
      const questUi_i: QuestLogInfo = {
        questType: 'REPUTATION',
        title: val.name,
        state: 'ACTIVE',
        onClick: () => setSelectedQuestId(val.id),
        selected: false
      }
      return questUi_i
    })
    questLog = <QuestLog quests={questsUi} className={styles.questLog} />
  }

  let questDetails = null
  if (selectedQuestId !== null && Array.isArray(quests)) {
    const questMeta = quests.find((val) => val.id === selectedQuestId) as Quest
    const questDetailsProps: QuestDetailsProps = {
      title: questMeta.name,
      description: questMeta.description,
      eligibility: {
        reputation: {
          games: [],
          completionPercent: questMeta.eligibility.completion_threshold,
          eligible: false,
          steamAccountLinked: false
        }
      },
      rewards: questMeta.rewards.map((val) => ({
        title: val.name,
        imageUrl: ''
      })),
      onClaimClick: () => console.log('claim clicked for ', questMeta.name)
    }
    questDetails = <QuestDetails {...questDetailsProps} />
  }

  return (
    <div className={styles.questsViewerContainer}>
      {questLog}
      {questDetails}
    </div>
  )
}
