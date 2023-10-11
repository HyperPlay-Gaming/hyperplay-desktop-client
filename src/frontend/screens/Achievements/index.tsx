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

const pageSize = 12
export const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)', value: 'ALPHA_A_TO_Z' },
  { text: 'Alphabetically (DES)', value: 'ALPHA_Z_TO_A' }
] as { text: string; value: AchievementSort }[]

export default React.memo(function Achievements(): JSX.Element {
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('ALL')
  const [achievementsData, setAchievementData] = useState<{
    currentPage: number
    totalPages: number
    games: SummaryAchievement[]
  }>({ currentPage: 0, totalPages: 0, games: [] })
  const [freeMints, setFreeMints] = useState(0)

  const {
    achievementsToBeMinted,
    toggleAchievementToBeMinted,
    isLoading,
    handleMint,
    handleUpdate,
    achievementsToBeUpdated,
    toggleAchievementToBeUpdated
  } = useMintAchievements()

  useEffect(() => {
    const getAchievements = async () => {
      const { data, totalPages, currentPage } =
        await window.api.getSummaryAchievements({
          store: 'steam',
          filter: activeFilter,
          sort: selectedSort.value,
          page: 1,
          pageSize
        })
      setAchievementData({ currentPage, totalPages, games: data })

      const stats = await window.api.getAchievementsStats('steam')
      setFreeMints(stats.numFreeMints)
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const nextPage = achievementsData.currentPage + 1
    const { data, totalPages, currentPage } =
      await window.api.getSummaryAchievements({
        store: 'steam',
        filter: activeFilter,
        sort: selectedSort.value,
        page: nextPage,
        pageSize
      })
    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const handlePrevPage = useCallback(async () => {
    const prevPage = achievementsData.currentPage - 1
    const { data, totalPages, currentPage } =
      await window.api.getSummaryAchievements({
        store: 'steam',
        filter: activeFilter,
        sort: selectedSort.value,
        page: prevPage,
        pageSize
      })
    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const isDisabled = useMemo(() => {
    return !walletStore.isConnected || isLoading
  }, [isLoading, walletStore.isConnected])

  const filter = useMemo(() => {
    if (activeFilter === 'NEW') return 'new'
    if (activeFilter === 'MINTED') return 'minted'
    return 'all'
  }, [activeFilter])

  return (
    <>
      <AchievementSummaryTable
        games={achievementsData.games.map((game) => {
          const id = String(game.gameId)
          const state = !walletStore.isConnected
            ? 'disabled'
            : achievementsToBeMinted.includes(id) ||
              achievementsToBeUpdated.includes(id)
            ? 'active'
            : game.isNewAchievement
            ? 'update'
            : 'default'

          return (
            <NavLink key={id} to={`/achievements/${game.gameId}`}>
              <AchievementCard
                id={id}
                title={game.gameName}
                image={game.icon}
                mintableAchievementsCount={game.mintableAchievementsCount}
                mintedAchievementsCount={game.mintedAchievementCount}
                totalAchievementsCount={game.totalAchievementCount}
                isNewAchievement={game.isNewAchievement}
                state={state as StatusIconState}
                ctaProps={{
                  onClick: (e) => {
                    e.preventDefault()
                    if (game.isNewAchievement) {
                      toggleAchievementToBeUpdated(id)
                    } else {
                      toggleAchievementToBeMinted(id)
                    }
                  },
                  disabled: isDisabled
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
              const { data, totalPages, currentPage } =
                await window.api.getSummaryAchievements({
                  store: 'steam',
                  filter: activeFilter,
                  sort: chosenItem.value,
                  page: 1,
                  pageSize
                })
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
          activeFilter: filter,
          setActiveFilter: async (filter) => {
            let newFilter = 'ALL' as AchievementFilter
            if (filter === 'new') newFilter = 'NEW'
            if (filter === 'minted') newFilter = 'MINTED'

            const { data, totalPages, currentPage } =
              await window.api.getSummaryAchievements({
                store: 'steam',
                filter: newFilter,
                sort: selectedSort.value,
                page: 1,
                pageSize
              })
            setActiveFilter(newFilter)
            setAchievementData({ currentPage, totalPages, games: data })
          }
        }}
        mintButtonProps={{
          onClick: handleMint,
          disabled: isDisabled ?? achievementsToBeMinted.length === 0,
          totalToMint: achievementsToBeMinted.length
        }}
        updateButtonProps={{
          onClick: handleUpdate,
          disabled: isDisabled ?? achievementsToBeUpdated.length === 0,
          totalToUpdate: achievementsToBeUpdated.length
        }}
        achievementNavProps={{
          freeMints,
          basketAmount:
            achievementsToBeMinted.length + achievementsToBeUpdated.length
        }}
      />
    </>
  )
})
