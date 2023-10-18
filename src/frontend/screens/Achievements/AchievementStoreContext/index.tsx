import useSetting from 'frontend/hooks/useSetting'
import React, { createContext, useContext, ReactNode, useMemo } from 'react'

import { AchievementStore as StoreType } from '../../../../common/types'

interface AchievementStoreType {
  store: StoreType
  playerStoreId: string
}

const AchievementStore = createContext<AchievementStoreType>({
  store: 'STEAM',
  playerStoreId: ''
})

interface AchievementStoreProviderProps {
  children: ReactNode
}

const AchievementStoreProvider: React.FC<AchievementStoreProviderProps> = ({
  children
}) => {
  const [steamId] = useSetting('steamId', '')

  const value = useMemo(() => {
    return {
      store: 'STEAM' as StoreType,
      playerStoreId: steamId
    }
  }, [steamId])

  return (
    <AchievementStore.Provider value={value}>
      {children}
    </AchievementStore.Provider>
  )
}

const useAchievementStore = () => {
  const context = useContext(AchievementStore)

  if (context === undefined) {
    throw new Error(
      'useAchievementStore must be used within a AchievementStoreProvider and SettingsProvider'
    )
  }

  return context
}

export { AchievementStoreProvider, useAchievementStore }
