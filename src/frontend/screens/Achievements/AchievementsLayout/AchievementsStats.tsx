import { AchievementsInfo } from '@hyperplay/ui'
import React from 'react'
import { observer } from 'mobx-react-lite'
import AchievementState from 'frontend/state/AchievementState'

export const AchievementsStats = observer(() => {
  const newAchievements = AchievementState.newAchievements
  const mintedAchievements = AchievementState.mintedAchievements
  const totalAchievements = AchievementState.totalAchievements
  const totalGames = AchievementState.totalGames

  return (
    <AchievementsInfo
      newAchievementsValue={`${newAchievements}`}
      mintedValue={`${mintedAchievements}/${totalAchievements} `}
      gamesValue={`${totalGames}`}
    />
  )
})
