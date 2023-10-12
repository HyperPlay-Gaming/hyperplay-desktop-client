import { GameAchievements } from '@hyperplay/ui'
import { Achievement, SummaryAchievement } from 'common/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { achievementsSortOptions } from '..'
import { useMintAchievements } from '../MintAchievementsContext'
import walletStore from 'frontend/store/WalletStore'

const pageSize = 6

function isTimestampInPast(unixTimestamp: number) {
  const currentTime = new Date().getTime()
  const timestampInMilliseconds = unixTimestamp * 1000 // Convert to milliseconds

  return timestampInMilliseconds < currentTime
}

export default React.memo(function GameAchievementDetails(): JSX.Element {
  const { id } = useParams()
  const [summaryAchievement, setSummaryAchievement] =
    useState<SummaryAchievement>()
  const [achievementsData, setAchievementData] = useState<{
    data: Achievement[]
    currentPage: number
    totalPages: number
  }>({ data: [], currentPage: 0, totalPages: 0 })

  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [freeMints, setFreeMints] = useState(0)
  const {
    achievementsToBeMinted,
    isLoading,
    handleMint,
    handleUpdate,
    achievementsToBeUpdated
  } = useMintAchievements()

  useEffect(() => {
    const getAchievements = async () => {
      const { data } = await window.api.getSummaryAchievements({
        store: 'steam',
        filter: 'ALL',
        sort: 'ALPHA_A_TO_Z',
        page: 1,
        pageSize: 1
      })
      setSummaryAchievement(data[0])

      const achievements = await window.api.getIndividualAchievements({
        gameId: Number(id),
        sort: selectedSort.value,
        page: 1,
        pageSize
      })
      setAchievementData(achievements)

      const stats = await window.api.getAchievementsStats('steam')

      setFreeMints(stats.numFreeMints)
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const nextPage = achievementsData.currentPage + 1
    const achievements = await window.api.getIndividualAchievements({
      gameId: Number(id),
      sort: selectedSort.value,
      page: nextPage,
      pageSize
    })
    setAchievementData(achievements)
  }, [achievementsData, selectedSort])

  const handlePrevPage = useCallback(async () => {
    const prevPage = achievementsData.currentPage - 1
    const achievements = await window.api.getIndividualAchievements({
      gameId: Number(id),
      sort: selectedSort.value,
      page: prevPage,
      pageSize
    })
    setAchievementData(achievements)
  }, [achievementsData, selectedSort])

  const isDisabled = useMemo(() => {
    return !walletStore.isConnected || isLoading
  }, [isLoading, walletStore.isConnected])

  if (!summaryAchievement) return <></>

  return (
    <GameAchievements
      achievementNavProps={{
        freeMints,
        basketAmount: achievementsToBeMinted.length
      }}
      game={{
        title: summaryAchievement.name,
        tags: summaryAchievement.tags ?? []
      }}
      mintedAchievementsCount={summaryAchievement.mintedAchievementCount}
      totalAchievementsCount={summaryAchievement.totalAchievementCount}
      mintableAchievementsCount={summaryAchievement.mintableAchievementsCount}
      achievements={achievementsData.data.map((achievement, index) => ({
        // TODO: remove when there is a real id
        id: `${index}`,
        title: achievement.displayName,
        description: achievement.description,
        image: achievement.icon,
        isLocked: !isTimestampInPast(achievement.unlocktime)
      }))}
      sortProps={{
        options: achievementsSortOptions,
        selected: selectedSort,
        onItemChange: async (sortOption) => {
          const chosenItem = achievementsSortOptions.find(
            (option) => option.text === sortOption.text
          )

          if (chosenItem) {
            const { data, totalPages, currentPage } =
              await window.api.getIndividualAchievements({
                gameId: Number(id),
                sort: chosenItem.value,
                page: 1,
                pageSize
              })
            setSelectedSort(chosenItem)
            setAchievementData({ currentPage, totalPages, data })
          }
        }
      }}
      paginationProps={{
        currentPage: achievementsData.currentPage,
        totalPages: achievementsData.totalPages,
        handleNextPage,
        handlePrevPage
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
    />
  )
})
