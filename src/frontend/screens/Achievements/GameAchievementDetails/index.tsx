import { GameAchievements } from '@hyperplay/ui'
import React, { useEffect, useState } from 'react'
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

  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])

  const achievementsToBeMinted = MintAchievementsState.achievementsToBeMinted
  const isLoading = MintAchievementsState.isLoading
  const handleMint = MintAchievementsState.handleMint
  const handleUpdate = MintAchievementsState.handleUpdate
  const achievementsToBeUpdated = MintAchievementsState.achievementsToBeUpdated

  const numFreeMints = AchievementStoreState.numFreeMints
  const individualAchievements = AchievementStoreState.individualAchievements
  const summaryAchievement = AchievementStoreState.summaryAchievements.data[0]

  useEffect(() => {
    AchievementStoreState.getSummaryAchievements({
      page: 1,
      pageSize,
      sort: selectedSort.value,
      filter: 'ALL'
    })
    AchievementStoreState.getIndividualAchievements({
      gameId: id as string,
      page: 1,
      pageSize,
      sort: selectedSort.value
    })
  }, [])

  const handleNextPage = () => {
    const nextPage = individualAchievements.currentPage + 1
    AchievementStoreState.getIndividualAchievements({
      gameId: id as string,
      page: nextPage,
      pageSize,
      sort: selectedSort.value
    })
  }

  const handlePrevPage = () => {
    const prevPage = individualAchievements.currentPage - 1
    AchievementStoreState.getIndividualAchievements({
      gameId: id as string,
      page: prevPage,
      pageSize,
      sort: selectedSort.value
    })
  }

  const isDisabled = isLoading || !walletStore.isConnected

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
      achievements={individualAchievements.data.map((achievement) => ({
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
            AchievementStoreState.getIndividualAchievements({
              gameId: id as string,
              page: 1,
              pageSize,
              sort: chosenItem.value
            })

            setSelectedSort(chosenItem)
          }
        }
      }}
      paginationProps={{
        currentPage: individualAchievements.currentPage,
        totalPages: individualAchievements.totalPages,
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
          mintedLabel: t('achievements.progress.minted', 'on chain'),
          notMintedLabel: t('achievements.progress.notMinted', 'off chain')
        }
      }}
    />
  )
})
