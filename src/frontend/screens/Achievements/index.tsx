import React from 'react'
import walletState from 'frontend/state/WalletState'
import { AchievementCard, AchievementSummaryTable } from '@hyperplay/ui'
import { NavLink } from 'react-router-dom'
import { StatusIconState } from '@hyperplay/ui/dist/components/AchievementCard/components/StatusIcon'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import AchievementState, {
  ACHIEVEMENT_SORT_OPTIONS
} from 'frontend/state/AchievementState'
import MintAchievementsState from 'frontend/state/MintAchievementsState'

export default observer(function Achievements(): JSX.Element {
  const { t } = useTranslation()

  const numFreeMints = AchievementState.numFreeMints

  const achievementsToBeMinted = MintAchievementsState.achievementsToBeMinted
  const toggleAchievementToBeMinted =
    MintAchievementsState.toggleAchievementToBeMinted
  const isLoading = MintAchievementsState.isLoading
  const handleMint = MintAchievementsState.handleMint
  const handleUpdate = MintAchievementsState.handleUpdate
  const achievementsToBeUpdated = MintAchievementsState.achievementsToBeUpdated
  const toggleAchievementToBeUpdated =
    MintAchievementsState.toggleAchievementToBeUpdated

  const isDisabled = isLoading || !walletState.isConnected

  if (AchievementState.summaryAchievementsToDisplay === undefined) {
    AchievementState.fetchMoreSummaryAchievements()
  }

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' }
  ]
  if (AchievementState.mintedAchievements > 0) {
    tabs.push({ value: 'minted', label: 'Minted' })
  }

  const imagesToPreload =
    AchievementState?.summaryAchievementsToDisplay?.map(
      (game) => game.gameImageURL
    ) ?? []

  return (
    <>
      <AchievementSummaryTable
        imagesToPreload={imagesToPreload}
        games={
          AchievementState.summaryAchievementsToDisplay
            ? AchievementState.summaryAchievementsToDisplay.map((game) => {
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
                      showStatusIcon={false}
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
                          mintedLabel: t(
                            'achievements.progress.minted',
                            'on chain'
                          ),
                          notMintedLabel: t(
                            'achievements.progress.notMinted',
                            'off chain'
                          )
                        }
                      }}
                    />
                  </NavLink>
                )
              })
            : []
        }
        sortProps={{
          options: ACHIEVEMENT_SORT_OPTIONS,
          selected: AchievementState.currentSort,
          onItemChange: async (sortOption) => {
            const chosenItem = ACHIEVEMENT_SORT_OPTIONS.find(
              (option) => option.text === sortOption.text
            )

            if (chosenItem) {
              AchievementState.setSort(chosenItem)
            }
          }
        }}
        paginationProps={{
          handleNextPage: () => {
            console.log('handling next page')
          },
          handlePrevPage: () => {
            console.log('handling previous page')
          }
        }}
        filterProps={{
          activeFilter: AchievementState.filterDisplayName,
          setActiveFilter: async (filterDisplayName) => {
            const filter =
              AchievementState.getFilterNameFromDisplayName(filterDisplayName)
            AchievementState.setFilter(filter)
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
            achievementsToBeMinted.length + achievementsToBeUpdated.length,
          gamesAdded: []
        }}
        fetchNextPage={() => {
          AchievementState.fetchMoreSummaryAchievements()
        }}
        isPageLoading={
          AchievementState.summaryAchievementsToDisplay === undefined &&
          AchievementState.fetching
        }
        tabs={tabs}
        messageModalProps={{
          title: t('hyperplay.achievements.noAchievements.oops', 'Oops!'),
          message: t(
            'hyperplay.achievements.noAchievements.doubleCheckMessage',
            `It looks like we couldn't find any games in your Steam account at the moment. Just a quick reminder to double-check that your game details are set to public. This way, we can access your achievements and provide you with the best experience.`
          )
        }}
      />
    </>
  )
})
