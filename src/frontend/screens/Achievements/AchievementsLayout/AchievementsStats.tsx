import { AchievementsInfo } from '@hyperplay/ui'
import React from 'react'
import { observer } from 'mobx-react-lite'
import AchievementState from 'frontend/state/AchievementState'

export const AchievementsStats = observer(() => {
  const { newAchievements, mintedAchievements, totalAchievements, totalGames } =
    AchievementState

  return (
    <AchievementsInfo
      newAchievementsValue={`${newAchievements}`}
      mintedValue={`${mintedAchievements}/${totalAchievements} `}
      gamesValue={`${totalGames}`}
    />
  )
})
