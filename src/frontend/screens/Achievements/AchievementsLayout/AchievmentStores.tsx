import React from 'react'

import { StoreRow, Images } from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'
import { useAchievementStore } from '../AchievementStoreContext'
import classNames from 'classnames'

export const AchievementStores = () => {
  const { store, setStore, totalGames } = useAchievementStore()

  const activeSecondaryText = `${totalGames} Games`
  const isSteam = store === 'STEAM'
  const isHyperplay = store === 'HYPERPLAY'
  const isEpic = store === 'EPIC'

  return (
    <div className={`${styles.storeCard} ${styles.fullHeight}`}>
      <div className={`${styles.storeTitle}`}>My Stores</div>
      <Flex direction="column" gap="4px" className={`${styles.fullHeight}`}>
        <div className={classNames(isHyperplay ? '' : styles.notActive)}>
          <StoreRow
            store="hyperplay"
            secondaryText={isHyperplay ? activeSecondaryText : '0 Games'}
          >
            <button onClick={() => setStore('HYPERPLAY')}>
              <Images.Eye />
            </button>
          </StoreRow>
        </div>
        <div className={classNames(isSteam ? '' : styles.notActive)}>
          <StoreRow
            store="steam"
            secondaryText={isSteam ? activeSecondaryText : '0 Games'}
          >
            <button onClick={() => setStore('STEAM')}>
              <Images.Eye />
            </button>
          </StoreRow>
        </div>
        <div className={classNames(isEpic ? '' : styles.notActive)}>
          <StoreRow
            store="epic"
            secondaryText={isEpic ? activeSecondaryText : '0 Games'}
          >
            <button onClick={() => setStore('EPIC')}>
              <p>Link Store</p>
            </button>
          </StoreRow>
        </div>
      </Flex>
    </div>
  )
}
