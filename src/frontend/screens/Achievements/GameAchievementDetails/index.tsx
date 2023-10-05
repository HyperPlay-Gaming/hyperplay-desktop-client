import { GameAchievements } from '@hyperplay/ui'
import { Achievement, Game } from 'common/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { achievementsSortOptions } from '..'
import { useMintAchievements } from '../MintAchievements'
import walletStore from 'frontend/store/WalletStore'

const pageSize = 6

function isTimestampInPast(unixTimestamp: number) {
  const currentTime = new Date().getTime()
  const timestampInMilliseconds = unixTimestamp * 1000 // Convert to milliseconds

  return timestampInMilliseconds < currentTime
}

export default React.memo(function GameAchievementDetails(): JSX.Element {
  const { id } = useParams()
  const [game, setGame] = useState<Game>()
  const [achievementsData, setAchievementData] = useState<{
    data: Achievement[]
    currentPage: number
    totalPages: number
  }>({ data: [], currentPage: 0, totalPages: 0 })
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [freeMints, setFreeMints] = useState(0)
  const { achievementsToBeMinted, handleMint, isLoading } =
    useMintAchievements()

  useEffect(() => {
    const getAchievements = async () => {
      const gameData = await window.api.getGame(Number(id))
      setGame(gameData)

      const achievements = await window.api.getIndividualAchievements({
        gameId: Number(id),
        sort: selectedSort.value,
        page: 1,
        pageSize
      })
      setAchievementData(achievements)

      const freeMintsData = await window.api.getFreeMints()
      setFreeMints(freeMintsData)
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

  if (!game) return <></>

  return (
    <GameAchievements
      achievementNavProps={{
        freeMints,
        basketAmount: achievementsToBeMinted.length
      }}
      game={{
        title: game.name,
        tags: game.tags
      }}
      mintedAchievementsCount={game.mintedAchievementCount}
      totalAchievementsCount={game.totalAchievementCount}
      mintableAchievementsCount={game.mintableAchievementsCount}
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
        disabled: isDisabled ?? achievementsToBeMinted.length === 0
      }}
    />
  )
})
