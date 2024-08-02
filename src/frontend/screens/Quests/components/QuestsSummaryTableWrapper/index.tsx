import React, { useState } from 'react'
import { QuestsSummaryTable, QuestCard, QuestFilter } from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
import { itemType } from '@hyperplay/ui/dist/components/Dropdowns/Dropdown'
import useGetHyperPlayListings from 'frontend/hooks/useGetHyperPlayListings'
import { useNavigate } from 'react-router-dom'

export interface QuestsSummaryTableWrapperProps {
  selectedQuestId: number | null
}

export function QuestsSummaryTableWrapper({
  selectedQuestId
}: QuestsSummaryTableWrapperProps) {
  const { t } = useTranslation()
  const questsResults = useGetQuests()
  const quests = questsResults?.data?.data
  const hyperplayListings = useGetHyperPlayListings()
  const listings = hyperplayListings.data.data
  const navigate = useNavigate()

  const [activeFilter, setActiveFilter] = useState<QuestFilter>('all')

  const achievementsSortOptions = [
    { text: 'Alphabetically (ASC)', id: 'ALPHA_ASC' },
    { text: 'Alphabetically (DES)', id: 'ALPHA_DES' }
  ]
  const [selectedSort, setSelectedSort] = useState<itemType>(
    achievementsSortOptions[0]
  )

  if (selectedSort.id === 'ALPHA_ASC') {
    quests?.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    })
  } else if (selectedSort.id === 'ALPHA_DES') {
    quests?.sort((a, b) => {
      if (a.name > b.name) {
        return -1
      } else if (a.name < b.name) {
        return 1
      }
      return 0
    })
  }

  const imagesToPreload: string[] = []
  // set outline css on selected
  const gameElements =
    quests?.map(({ id, project_id, name, ...rest }) => {
      const imageUrl = listings
        ? listings[project_id]?.project_meta?.main_capsule
        : ''
      if (imageUrl) {
        imagesToPreload.push(imageUrl)
      }
      const title = listings ? listings[project_id]?.project_meta?.name : ''
      return (
        <QuestCard
          key={id}
          image={imageUrl}
          title={title}
          {...rest}
          onClick={() => {
            if (selectedQuestId === id) {
              navigate('/quests')
            } else {
              navigate(`/quests/${id}`)
            }
          }}
          selected={id === selectedQuestId}
          description={name}
        />
      )
    }) ?? []

  return (
    <QuestsSummaryTable
      games={gameElements}
      imagesToPreload={imagesToPreload}
      sortProps={{
        options: achievementsSortOptions,
        selected: selectedSort,
        onItemChange: setSelectedSort
      }}
      filterProps={{ activeFilter: activeFilter, setActiveFilter }}
      isFetching={questsResults?.data.isFetching}
      isPageLoading={questsResults?.data.isLoading}
      activeTab={'ACTIVE'}
      tabs={
        [
          // TODO: uncomment when we can filter based on these categories
          // { label: 'Active', value: 'ACTIVE' },
          // { label: 'Claim Ready', value: 'CLAIM_READY' },
          // { label: 'Completed', value: 'COMPLETED' }
        ]
      }
      messageModalProps={{
        title: t('quests.noneFound.title', 'No Quests Found.'),
        message: t('quests.noneFound.message', 'There were no quests found.')
      }}
      pageTitle={t('quests.quests', 'Quests')}
      className={styles.tableContainer}
    />
  )
}
