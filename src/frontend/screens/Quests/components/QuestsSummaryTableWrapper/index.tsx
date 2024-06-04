import React, { useState } from 'react'
import { QuestsSummaryTable, QuestCard } from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'

export interface QuestsSummaryTableWrapperProps {
  projectId: string
  selectedQuestId: number | null
  setSelectedQuestId: (id: number | null) => void
}

export function QuestsSummaryTableWrapper({
  projectId: appName,
  selectedQuestId,
  setSelectedQuestId
}: QuestsSummaryTableWrapperProps) {
  const questsResults = useGetQuests(appName)
  const quests = questsResults?.data?.data

  // set outline css on selected
  const gameElements =
    quests?.map(({ id, ...rest }) => (
      <QuestCard key={id} {...rest} onClick={() => setSelectedQuestId(id)} />
    )) ?? []

  const [activeFilter, setActiveFilter] = useState('all')

  const achievementsSortOptions = [
    { text: 'Alphabetically (ASC)' },
    { text: 'Alphabetically (DES)' }
  ]
  const selectedSort = achievementsSortOptions[0]

  return (
    <QuestsSummaryTable
      games={gameElements}
      imagesToPreload={[]}
      sortProps={{
        options: achievementsSortOptions,
        selected: selectedSort,
        onItemChange: (val) => console.log(`Sort item changed to ${val}`)
      }}
      filterProps={{ activeFilter: activeFilter, setActiveFilter }}
      isFetching={questsResults?.data.isFetching}
      isPageLoading={questsResults?.data.isLoading}
      activeTab={'ACTIVE'}
      tabs={[
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Claim Ready', value: 'CLAIM_READY' },
        { label: 'Completed', value: 'COMPLETED' }
      ]}
      messageModalProps={{
        title: 'msg modal title',
        message: 'msg modal msg'
      }}
    />
  )
}
