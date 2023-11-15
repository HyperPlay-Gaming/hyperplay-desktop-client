import React, { useEffect, useMemo, useState } from 'react'
import walletState from 'frontend/state/WalletState'

import { AchievementCard, AchievementSummaryTable } from '@hyperplay/ui'
import { AchievementFilter, AchievementSort } from 'common/types'
import { NavLink } from 'react-router-dom'
import { StatusIconState } from '@hyperplay/ui/dist/components/AchievementCard/components/StatusIcon'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AchievementStoreState from 'frontend/state/AchievementStoreState'
import MintAchievementsState from 'frontend/state/MintAchievementsState'

const pageSize = 12
export const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)', value: 'ALPHA_A_TO_Z' },
  { text: 'Alphabetically (DES)', value: 'ALPHA_Z_TO_A' }
] as { text: string; value: AchievementSort }[]

export default observer(function Achievements(): JSX.Element {
  const { t } = useTranslation()

  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('ALL')

  const store = AchievementStoreState.store
  const playerStoreId = AchievementStoreState.playerStoreId
  const numFreeMints = AchievementStoreState.numFreeMints

  const achievementsToBeMinted = MintAchievementsState.achievementsToBeMinted
  const toggleAchievementToBeMinted =
    MintAchievementsState.toggleAchievementToBeMinted
  const isLoading = MintAchievementsState.isLoading
  const handleMint = MintAchievementsState.handleMint
  const handleUpdate = MintAchievementsState.handleUpdate
  const achievementsToBeUpdated = MintAchievementsState.achievementsToBeUpdated
  const toggleAchievementToBeUpdated =
    MintAchievementsState.toggleAchievementToBeUpdated
  const achievementsData = AchievementStoreState.summaryAchievements

  useEffect(() => {
    AchievementStoreState.getSummaryAchievements({
      page: 1,
      pageSize,
      filter: activeFilter,
      sort: selectedSort.value
    })
  }, [store, playerStoreId, walletState.address])

  const handleNextPage = () => {
    const nextPage = achievementsData.currentPage + 1
    AchievementStoreState.getSummaryAchievements({
      page: nextPage,
      pageSize,
      filter: activeFilter,
      sort: selectedSort.value
    })
  }

  const handlePrevPage = () => {
    const prevPage = achievementsData.currentPage - 1
    AchievementStoreState.getSummaryAchievements({
      page: prevPage,
      pageSize,
      filter: activeFilter,
      sort: selectedSort.value
    })
  }

  const isDisabled = isLoading || !walletState.isConnected

  const filterMap = useMemo(() => {
    if (activeFilter === 'NEW') return 'new'
    if (activeFilter === 'MINTED') return 'minted'
    return 'all'
  }, [activeFilter])

  return (
    <>
      <AchievementSummaryTable
        games={achievementsData.data.map((game) => {
          const id = String(game.gameId)
          const isUpdate =
            game.isNewAchievement && game.mintedAchievementCount > 0
          const state = !walletState.isConnected
            ? 'disabled'
            : achievementsToBeMinted.includes(id) ||
              achievementsToBeUpdated.includes(id)
            ? 'active'
            : isUpdate
            ? 'update'
            : 'default'

          return (
            <NavLink key={id} to={`/achievements/${game.gameId}`}>
              <AchievementCard
                id={id}
                title={game.gameName}
                image={game.gameImageURL}
                mintableAchievementsCount={game.mintableAchievementsCount}
                mintedAchievementsCount={game.mintedAchievementCount}
                totalAchievementsCount={game.totalAchievementCount}
                isNewAchievement={game.isNewAchievement}
                state={state as StatusIconState}
                ctaProps={{
                  onClick: (e) => {
                    e.preventDefault()
                    if (isUpdate) {
                      toggleAchievementToBeUpdated(id)
                    } else {
                      toggleAchievementToBeMinted(id)
                    }
                  },
                  disabled: isDisabled
                }}
                progressKeyProps={{
                  i18n: {
                    mintedLabel: t('achievements.progress.minted', 'on chain'),
                    notMintedLabel: t(
                      'achievements.progress.notMinted',
                      'off chain'
                    )
                  }
                }}
              />
            </NavLink>
          )
        })}
        sortProps={{
          options: achievementsSortOptions,
          selected: selectedSort,
          onItemChange: async (sortOption) => {
            const chosenItem = achievementsSortOptions.find(
              (option) => option.text === sortOption.text
            )

            if (chosenItem) {
              AchievementStoreState.getSummaryAchievements({
                page: 1,
                pageSize,
                filter: activeFilter,
                sort: chosenItem.value
              })

              setSelectedSort(chosenItem)
            }
          }
        }}
        paginationProps={{
          currentPage: achievementsData.currentPage,
          totalPages: achievementsData.totalPages,
          handleNextPage,
          handlePrevPage
        }}
        filterProps={{
          activeFilter: filterMap,
          setActiveFilter: async (filter) => {
            let newFilter = 'ALL' as AchievementFilter
            if (filter === 'new') newFilter = 'NEW'
            if (filter === 'minted') newFilter = 'MINTED'

            AchievementStoreState.getSummaryAchievements({
              page: 1,
              pageSize,
              filter: newFilter,
              sort: selectedSort.value
            })

            setActiveFilter(newFilter)
          }
        }}
        mintButtonProps={{
          onClick: handleMint,
          disabled: isDisabled || achievementsToBeMinted.length === 0,
          totalToMint: achievementsToBeMinted.length
        }}
        updateButtonProps={{
          onClick: handleUpdate,
          disabled: isDisabled || achievementsToBeUpdated.length === 0,
          totalToUpdate: achievementsToBeUpdated.length
        }}
        achievementNavProps={{
          freeMints: numFreeMints,
          basketAmount:
            achievementsToBeMinted.length + achievementsToBeUpdated.length
        }}
      />
    </>
  )
})
