import useSetting from 'frontend/hooks/useSetting'
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'

import { AchievementStore as StoreType } from '../../../../common/types'
import walletStore from 'frontend/store/WalletStore'

interface AchievementStoreType {
  store: StoreType
  playerStoreId: string
  setStore: React.Dispatch<React.SetStateAction<StoreType>>
  newAchievements: number
  mintedAchievements: number
  totalAchievements: number
  totalGames: number
  numFreeMints: number
  syncAchievements: (store: StoreType) => void
}

const AchievementStore = createContext<AchievementStoreType>({
  store: 'STEAM',
  playerStoreId: '',
  setStore: () => {
    console.log('not nested in achievement context')
  },
  newAchievements: 0,
  mintedAchievements: 0,
  totalAchievements: 0,
  totalGames: 0,
  numFreeMints: 0,
  syncAchievements: () => {
    return
  }
})

interface AchievementStoreProviderProps {
  children: ReactNode
}

const AchievementStoreProvider: React.FC<AchievementStoreProviderProps> = ({
  children
}) => {
  const [store, setStore] = useState<StoreType>('STEAM')
  const [stats, setStats] = useState({
    newAchievements: 0,
    mintedAchievements: 0,
    totalAchievements: 0,
    totalGames: 0,
    numFreeMints: 0
  })
  const [steamId] = useSetting('steamId', '')

  const playerStoreId = useMemo(() => {
    return store === 'STEAM' ? steamId : ''
  }, [store, steamId])

  const syncAchievements = useCallback(
    (store: StoreType) => {
      window.api.syncAchievements({
        store,
        playerStoreId,
        playerAddress: walletStore.address
      })
    },
    [playerStoreId, walletStore.address]
  )

  useEffect(() => {
    const getAchievements = async () => {
      syncAchievements(store)

      const stats = await window.api.getAchievementsStats({
        store,
        playerStoreId,
        playerAddress: walletStore.address
      })
      setStats(stats)
    }

    getAchievements()
  }, [store, playerStoreId, walletStore.address])

  const value = useMemo(() => {
    return {
      store,
      playerStoreId,
      setStore,
      syncAchievements,
      ...stats
    }
  }, [steamId, store, stats, playerStoreId, syncAchievements])

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
