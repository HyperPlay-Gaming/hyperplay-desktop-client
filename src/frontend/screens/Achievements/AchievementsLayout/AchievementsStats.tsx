import { AchievementsInfo } from '@hyperplay/ui'
import React from 'react'
import { useAchievementStore } from '../AchievementStoreContext'

export const AchievementsStats = () => {
  const { newAchievements, mintedAchievements, totalAchievements, totalGames } =
    useAchievementStore()

  return (
    <AchievementsInfo
      newAchievementsValue={`${newAchievements}`}
      mintedValue={`${mintedAchievements}/${totalAchievements} `}
      gamesValue={`${totalGames}`}
    />
  )
}
