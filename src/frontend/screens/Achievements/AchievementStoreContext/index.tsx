import useSetting from 'frontend/hooks/useSetting'
import React, { createContext, useContext, ReactNode, useMemo, useState } from 'react'

import { AchievementStore as StoreType } from '../../../../common/types'

interface AchievementStoreType {
  store: StoreType
  playerStoreId: string
  setStore: React.Dispatch<React.SetStateAction<StoreType>>
}

const AchievementStore = createContext<AchievementStoreType>({
  store: 'STEAM',
  playerStoreId: '',
  setStore: () => { console.log('not nested in achievement context') }
})

interface AchievementStoreProviderProps {
  children: ReactNode
}

const AchievementStoreProvider: React.FC<AchievementStoreProviderProps> = ({
  children
}) => {
  const [store, setStore] = useState<StoreType>('STEAM')
  const [steamId] = useSetting('steamId', '')

  const value = useMemo(() => {
    return {
      store,
      playerStoreId: store === 'STEAM' ? steamId : '',
      setStore
    }
  }, [steamId, store])

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
