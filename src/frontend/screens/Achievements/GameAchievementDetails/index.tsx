import { GameAchievements } from '@hyperplay/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import walletState from 'frontend/state/WalletState'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AchievementState, {
  ACHIVEMENT_SORT_OPTIONS
} from 'frontend/state/AchievementState'
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

  const [selectedSort, setSelectedSort] = useState(ACHIVEMENT_SORT_OPTIONS[0])

  const achievementsToBeMinted = MintAchievementsState.achievementsToBeMinted
  const isLoading = MintAchievementsState.isLoading
  const handleMint = MintAchievementsState.handleMint
  const handleUpdate = MintAchievementsState.handleUpdate
  const achievementsToBeUpdated = MintAchievementsState.achievementsToBeUpdated

  const numFreeMints = AchievementState.numFreeMints
  const individualAchievements = AchievementState.individualAchievements
  // TODO: get the game id from the path param and find it in achievement state summaries
  const summaryAchievement = AchievementState.summaryAchievementsToDisplay![0]
  const navigate = useNavigate()

  useEffect(() => {
    AchievementState.getIndividualAchievements({
      gameId: id as string,
      page: 1,
      pageSize,
      sort: selectedSort.value
    })
  }, [])

  const handlePrevPage = () => {
    navigate('/achievements')
  }

  const isDisabled = isLoading || !walletState.isConnected

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
        options: ACHIVEMENT_SORT_OPTIONS,
        selected: selectedSort,
        onItemChange: async (sortOption) => {
          const chosenItem = ACHIVEMENT_SORT_OPTIONS.find(
            (option) => option.text === sortOption.text
          )

          if (chosenItem) {
            AchievementState.getIndividualAchievements({
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
        currentPage: 0,
        totalPages: 0,
        handlePrevPage,
        handleNextPage: () => {
          console.log('next page')
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
      progressKeyProps={{
        i18n: {
          mintedLabel: t('achievements.progress.minted', 'on chain'),
          notMintedLabel: t('achievements.progress.notMinted', 'off chain')
        }
      }}
    />
  )
})
