import React, { useEffect } from 'react'
import { GenericStore } from './types'
import { questPlayStreakSyncState } from '@hyperplay/quests-ui'
import { useQueryClient } from '@tanstack/react-query'

const StoreController = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const stores = import.meta.glob<{ default: GenericStore }>([
      './*Store.ts*',
      '../state/*State.ts*'
    ])
    const storeKeys = Object.keys(stores)

    async function initializableStores() {
      for await (const storeKey of storeKeys) {
        const store = (await stores[storeKey]()).default

        await store.init?.()
      }
      questPlayStreakSyncState.init({
        getQuests: window.api.getQuests,
        getQuest: window.api.getQuest,
        getUserPlayStreak: window.api.getUserPlayStreak,
        syncPlaySession: window.api.syncPlaySession,
        appQueryClient: queryClient
      })
    }

    initializableStores()
  })

  return <></>
}

export default StoreController
