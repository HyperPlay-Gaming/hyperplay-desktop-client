import React, { useEffect } from 'react'
import { GenericStore } from './types'

const StoreController = () => {
  useEffect(() => {
    const stores = import.meta.glob<{ default: GenericStore }>([
      './*Store.ts*',
      '../state/*State.ts*'
    ])
    const storeKeys = Object.keys(stores)

    async function initializableStores() {
      for await (const storeKey of storeKeys) {
        try {
          const store = (await stores[storeKey]()).default

          await store.init?.()
        } catch (err) {
          console.error(`Error initializing store ${storeKey} ${err}`)
        }
      }
    }

    initializableStores()
  })

  return <></>
}

export default StoreController
