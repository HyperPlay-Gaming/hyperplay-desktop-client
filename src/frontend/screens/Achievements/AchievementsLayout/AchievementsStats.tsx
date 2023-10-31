import { AchievementsInfo } from '@hyperplay/ui'
import React from 'react'
import { observer } from 'mobx-react-lite'
import AchievementStoreState from 'frontend/state/AchievementStoreState'

export const AchievementsStats = observer(() => {
  const newAchievements = AchievementStoreState.newAchievements
  const mintedAchievements = AchievementStoreState.mintedAchievements
  const totalAchievements = AchievementStoreState.totalAchievements
  const totalGames = AchievementStoreState.totalGames

  return (
    <AchievementsInfo
      newAchievementsValue={`${newAchievements}`}
      mintedValue={`${mintedAchievements}/${totalAchievements} `}
      gamesValue={`${totalGames}`}
    />
  )
})
