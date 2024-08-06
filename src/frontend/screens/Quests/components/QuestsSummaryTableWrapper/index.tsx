import React, { useState } from 'react'
import { QuestsSummaryTable, QuestCard, QuestFilter } from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
import { itemType } from '@hyperplay/ui/dist/components/Dropdowns/Dropdown'
import useGetHyperPlayListings from 'frontend/hooks/useGetHyperPlayListings'
import { useLocation, useNavigate } from 'react-router-dom'
import { Quest } from 'common/types'

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

  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const searchParam = searchParams.get('search')

  const [searchText, setSearchText] = useState(searchParam ?? '')

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

  function gameTitleMatches(quest: Quest) {
    const title = listings ? listings[quest.project_id]?.project_meta?.name : ''
    const gameTitleMatch = title
      ?.toLowerCase()
      .startsWith(searchText.toLowerCase())
    return gameTitleMatch
  }

  const imagesToPreload: string[] = []
  const filteredQuests = quests?.filter((quest) => {
    const questTitleMatch = quest.name
      .toLowerCase()
      .startsWith(searchText.toLowerCase())
    return questTitleMatch || gameTitleMatches(quest)
  })

  // set outline css on selected
  const gameElements =
    filteredQuests?.map(({ id, project_id, name, ...rest }) => {
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
          image={imageUrl ?? ''}
          title={title}
          {...rest}
          //@ts-expect-error TODO: add onClick and all root props to QuestCard props
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

  let suggestedSearchTitles = undefined
  if (searchText) {
    suggestedSearchTitles = filteredQuests?.map((val) => val.name)
  }

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
      searchText={searchText}
      setSearchText={setSearchText}
      searchSuggestions={suggestedSearchTitles}
    />
  )
}
