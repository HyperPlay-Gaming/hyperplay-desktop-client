import { AchievementsInfo } from '@hyperplay/ui'
import React, { useEffect, useState } from 'react'
import walletStore from 'frontend/store/WalletStore'
import { useAchievementStore } from '../AchievementStoreContext'

export const AchievementsStats = () => {
  const [stats, setStats] = useState({
    newAchievements: 0,
    mintedAchievements: 0,
    totalAchievements: 0,
    totalGames: 0,
    numFreeMints: 0
  })
  const { store, playerStoreId } = useAchievementStore()

  useEffect(() => {
    const getStats = async () => {
      const stats = await window.api.getAchievementsStats({
        store,
        playerStoreId,
        playerAddress: walletStore.address
      })
      setStats(stats)
    }

    getStats()
  }, [])

  return (
    <AchievementsInfo
      newAchievementsValue={`${stats.newAchievements}`}
      mintedValue={`${stats.mintedAchievements}/${stats.totalAchievements} `}
      gamesValue={`${stats.totalGames}`}
    />
  )
}
