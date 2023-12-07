import { GameAchievements, DropdownItemType } from '@hyperplay/ui'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import walletState from 'frontend/state/WalletState'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AchievementState, {
  ACHIEVEMENT_SORT_OPTIONS
} from 'frontend/state/AchievementState'
import MintAchievementsState from 'frontend/state/MintAchievementsState'
import { isTimestampInPast } from 'frontend/helpers/achievementUtils'

const pageSize = 100

export default observer(function GameAchievementDetails(): JSX.Element {
  const { t } = useTranslation()
  const { id } = useParams()

  const {
    achievementsToBeMinted,
    achievementsToBeUpdated,
    isLoading,
    handleMint,
    handleUpdate
  } = MintAchievementsState

  const numFreeMints = AchievementState.numFreeMints
  const individualAchievements = AchievementState.individualAchievementsForGame(
    id ?? '0'
  )

  const summaryAchievement = AchievementState.getSummaryAchievement(
    id as string
  )

  useEffect(() => {
    AchievementState.fetchIndividualAchievements({
      gameId: id as string,
      page: 1,
      pageSize
    })
  }, [])

  const navigate = useNavigate()
  const handlePrevPage = () => {
    navigate('/achievements')
  }

  const isDisabled = isLoading || !walletState.isConnected

  if (!summaryAchievement) return <></>

  async function sortUpdated(sortOption: DropdownItemType) {
    const chosenItem = ACHIEVEMENT_SORT_OPTIONS.find(
      (option) => option.text === sortOption.text
    )

    if (chosenItem) {
      AchievementState.currentIndividualSort = chosenItem
      AchievementState.fetchIndividualAchievements({
        gameId: id as string,
        page: 1,
        pageSize
      })
    }
  }

  return (
    <GameAchievements
      achievementNavProps={{
        freeMints: numFreeMints,
        basketAmount: achievementsToBeMinted.length,
        showGameAddButton: false,
        gamesAdded: [],
        i18n: {
          addThisGameText: t(
            'hyperplay.achievements.addThisGame',
            'Add this game'
          ),
          gamesToMintLabelText: t(
            'hyperplay.achievements.gamesToMint',
            'Games to mint'
          )
        }
      }}
      game={{
        title: summaryAchievement.gameName
      }}
      mintedAchievementsCount={summaryAchievement.mintedAchievementCount}
      totalAchievementsCount={summaryAchievement.totalAchievementCount}
      mintableAchievementsCount={summaryAchievement.mintableAchievementsCount}
      achievements={
        individualAchievements?.data.map((achievement) => ({
          id: achievement.id,
          title: achievement.displayName,
          description: achievement.description,
          image: achievement.icon,
          isLocked: !isTimestampInPast(achievement.unlocktime)
        })) ?? []
      }
      sortProps={{
        options: ACHIEVEMENT_SORT_OPTIONS,
        selected: AchievementState.currentIndividualSort,
        onItemChange: sortUpdated
      }}
      paginationProps={{
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
      loadingAchievements={individualAchievements === undefined}
      gameCardImage={summaryAchievement.gameImageURL}
    />
  )
})
