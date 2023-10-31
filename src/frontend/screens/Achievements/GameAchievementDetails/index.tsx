import { GameAchievements } from '@hyperplay/ui'
import { Achievement, AchievementSort, SummaryAchievement } from 'common/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { achievementsSortOptions } from '..'
import walletStore from 'frontend/store/WalletStore'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AchievementStoreState from 'frontend/state/AchievementStoreState'
import MintAchievementsState from 'frontend/state/MintAchievementsState'

const pageSize = 6

function isTimestampInPast(unixTimestamp: number) {
  const currentTime = new Date().getTime()
  const timestampInMilliseconds = unixTimestamp * 1000 // Convert to milliseconds

  return timestampInMilliseconds < currentTime
}

export default observer(function GameAchievementDetails(): JSX.Element {
  const { t } = useTranslation()
  const { id } = useParams()
  const [summaryAchievement, setSummaryAchievement] =
    useState<SummaryAchievement>()
  const [achievementsData, setAchievementData] = useState<{
    data: Achievement[]
    currentPage: number
    totalPages: number
  }>({ data: [], currentPage: 0, totalPages: 0 })

  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])

  const achievementsToBeMinted = MintAchievementsState.achievementsToBeMinted
  const isLoading = MintAchievementsState.isLoading
  const handleMint = MintAchievementsState.handleMint
  const handleUpdate = MintAchievementsState.handleUpdate
  const achievementsToBeUpdated = MintAchievementsState.achievementsToBeUpdated

  const store = AchievementStoreState.store
  const playerStoreId = AchievementStoreState.playerStoreId
  const numFreeMints = AchievementStoreState.numFreeMints

  const fetchAchievements = useCallback(
    async ({ page, sort }: { page: number; sort?: AchievementSort }) => {
      return window.api.getIndividualAchievements({
        gameId: Number(id),
        store,
        sort: sort ?? selectedSort.value,
        page,
        pageSize,
        playerStoreId,
        playerAddress: walletStore.address
      })
    },
    [store, selectedSort, playerStoreId, walletStore.address, id]
  )

  useEffect(() => {
    const getAchievements = async () => {
      const { data } = await window.api.getSummaryAchievements({
        store,
        filter: 'ALL',
        sort: 'ALPHA_A_TO_Z',
        page: 1,
        pageSize: 1,
        playerStoreId,
        playerAddress: walletStore.address
      })
      setSummaryAchievement(data[0])

      const achievements = await fetchAchievements({ page: 1 })
      setAchievementData(achievements)
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const nextPage = achievementsData.currentPage + 1
    const achievements = await fetchAchievements({ page: nextPage })
    setAchievementData(achievements)
  }, [achievementsData, selectedSort])

  const handlePrevPage = useCallback(async () => {
    const prevPage = achievementsData.currentPage - 1
    const achievements = await fetchAchievements({ page: prevPage })
    setAchievementData(achievements)
  }, [achievementsData, selectedSort])

  const isDisabled = useMemo(() => {
    return isLoading || !walletStore.isConnected
  }, [isLoading, walletStore.isConnected])

  if (!summaryAchievement) return <></>

  return (
    <GameAchievements
      achievementNavProps={{
        freeMints: numFreeMints,
        basketAmount: achievementsToBeMinted.length
      }}
      game={{
        title: summaryAchievement.gameName,
        tags: summaryAchievement.tags ?? []
      }}
      mintedAchievementsCount={summaryAchievement.mintedAchievementCount}
      totalAchievementsCount={summaryAchievement.totalAchievementCount}
      mintableAchievementsCount={summaryAchievement.mintableAchievementsCount}
      achievements={achievementsData.data.map((achievement) => ({
        id: achievement.id,
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
            const { data, totalPages, currentPage } = await fetchAchievements({
              page: 1,
              sort: chosenItem.value
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
        disabled: achievementsToBeMinted.length === 0 ?? isDisabled,
        totalToMint: achievementsToBeMinted.length
      }}
      updateButtonProps={{
        onClick: handleUpdate,
        disabled: achievementsToBeUpdated.length === 0 ?? isDisabled,
        totalToUpdate: achievementsToBeUpdated.length
      }}
      progressKeyProps={{
        i18n: {
          mintedLabel: t('achievements.progress.minted'),
          notMintedLabel: t('achievements.progress.notMinted')
        }
      }}
    />
  )
})
