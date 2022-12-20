import React, { useEffect } from 'react'
import { GenericStore } from './types'

const StoreController = () => {
  useEffect(() => {
    const stores = import.meta.glob<{ default: GenericStore }>('./*Store.ts*')
    const storeKeys = Object.keys(stores)

    async function initializableStores() {
      for await (const storeKey of storeKeys) {
        const store = (await stores[storeKey]()).default as GenericStore

        await store.init?.()
      }
    }

    initializableStores()
  })

  return <></>
}

export default StoreController
