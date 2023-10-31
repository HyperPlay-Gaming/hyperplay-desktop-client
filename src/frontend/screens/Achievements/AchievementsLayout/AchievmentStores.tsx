import React from 'react'

import { StoreRow, Images } from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'
import { useAchievementStore } from '../AchievementStoreContext'
import classNames from 'classnames'

export const AchievementStores = () => {
  const { store, setStore, totalGames, syncAchievements } = useAchievementStore()

  const activeSecondaryText = `${totalGames} Games`
  const isSteam = store === 'STEAM'

  return (
    <div className={`${styles.storeCard} ${styles.fullHeight}`}>
      <div className={`${styles.storeTitle}`}>My Stores</div>
      <Flex direction="column" gap="4px" className={`${styles.fullHeight}`}>
        <div className={classNames(isSteam ? '' : styles.notActive)}>
          <StoreRow
            store="steam"
            secondaryText={isSteam ? activeSecondaryText : '0 Games'}
          >
            <div>
              <button onClick={() => { if (isSteam) setStore('STEAM') }}>
                {isSteam ? <Images.Eye /> : <Images.EyeOff />}
              </button>
              <button onClick={() => syncAchievements('STEAM')}>
                <Images.Refresh />
              </button>
            </div>
          </StoreRow>
        </div>
      </Flex>
    </div>
  )
}
