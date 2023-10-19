import React, { useCallback, useEffect, useMemo, useState } from 'react'
import walletStore from 'frontend/store/WalletStore'

import { AchievementCard, AchievementSummaryTable } from '@hyperplay/ui'
import {
  AchievementFilter,
  AchievementSort,
  SummaryAchievement
} from 'common/types'
import { NavLink } from 'react-router-dom'
import { StatusIconState } from '@hyperplay/ui/dist/components/AchievementCard/components/StatusIcon'
import { useMintAchievements } from './MintAchievementsContext'
import { useTranslation } from 'react-i18next'
import { useAchievementStore } from './AchievementStoreContext'

const pageSize = 12
export const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)', value: 'ALPHA_A_TO_Z' },
  { text: 'Alphabetically (DES)', value: 'ALPHA_Z_TO_A' }
] as { text: string; value: AchievementSort }[]

export default React.memo(function Achievements(): JSX.Element {
  const { t } = useTranslation()

  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('ALL')
  const [achievementsData, setAchievementData] = useState<{
    currentPage: number
    totalPages: number
    games: SummaryAchievement[]
  }>({ currentPage: 0, totalPages: 0, games: [] })

  const { store, playerStoreId, numFreeMints } = useAchievementStore()

  const {
    achievementsToBeMinted,
    toggleAchievementToBeMinted,
    isLoading,
    handleMint,
    handleUpdate,
    achievementsToBeUpdated,
    toggleAchievementToBeUpdated
  } = useMintAchievements()

  const fetchAchievements = useCallback(
    async ({
      page,
      sort,
      filter
    }: {
      page: number
      sort?: AchievementSort
      filter?: AchievementFilter
    }) => {
      return window.api.getSummaryAchievements({
        store,
        filter: filter ?? activeFilter,
        sort: sort ?? selectedSort.value,
        page,
        pageSize,
        playerStoreId,
        playerAddress: walletStore.address
      })
    },
    [store, activeFilter, selectedSort, playerStoreId, walletStore.address]
  )

  useEffect(() => {
    const getAchievements = async () => {
      const { data, totalPages, currentPage } = await fetchAchievements({
        page: 1
      })

      setAchievementData({ currentPage, totalPages, games: data })
    }

    getAchievements()
  }, [store, playerStoreId, walletStore.address])

  const handleNextPage = useCallback(async () => {
    const nextPage = achievementsData.currentPage + 1
    const { data, totalPages, currentPage } = await fetchAchievements({
      page: nextPage
    })

    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const handlePrevPage = useCallback(async () => {
    const prevPage = achievementsData.currentPage - 1
    const { data, totalPages, currentPage } = await fetchAchievements({
      page: prevPage
    })

    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const isDisabled = useMemo(() => {
    return isLoading || !walletStore.isConnected
  }, [isLoading, walletStore.isConnected])

  const filterMap = useMemo(() => {
    if (activeFilter === 'NEW') return 'new'
    if (activeFilter === 'MINTED') return 'minted'
    return 'all'
  }, [activeFilter])

  return (
    <>
      <AchievementSummaryTable
        games={achievementsData.games.map((game) => {
          const id = String(game.gameId)
          const isUpdate =
            game.isNewAchievement && game.mintedAchievementCount > 0
          const state = !walletStore.isConnected
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
                    mintedLabel: t('achievements.progress.minted'),
                    notMintedLabel: t('achievements.progress.notMinted')
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
              const { data, totalPages, currentPage } = await fetchAchievements(
                { page: 1, sort: chosenItem.value }
              )

              setSelectedSort(chosenItem)
              setAchievementData({ currentPage, totalPages, games: data })
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

            const { data, totalPages, currentPage } = await fetchAchievements({
              page: 1,
              filter: newFilter
            })

            setActiveFilter(newFilter)
            setAchievementData({ currentPage, totalPages, games: data })
          }
        }}
        mintButtonProps={{
          onClick: handleMint,
          disabled: achievementsToBeMinted.length === 0 ?? isDisabled,
          totalToMint: achievementsToBeMinted.length
        }}
        updateButtonProps={{
          onClick: handleUpdate,
          disabled: achievementsToBeUpdated.length === 0 ?? isDisabled,
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
