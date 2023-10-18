import React from 'react'

import { StoreRow, Images } from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'
import { useAchievementStore } from '../AchievementStoreContext'
import classNames from 'classnames'

export const AchievementStores = () => {
  const { store } = useAchievementStore()

  return (
    <div className={`${styles.storeCard} ${styles.fullHeight}`}>
      <div className={`${styles.storeTitle}`}>My Stores</div>
      <Flex
        direction="column"
        gap="4px"
        className={`${styles.fullHeight}`}
      >
        <div className={classNames(store === 'HYPERPLAY' ? '' : styles.notActive)}>
          <StoreRow store="hyperplay" secondaryText="0 Games">
            <Images.Eye />
          </StoreRow>
        </div>
        <div className={classNames(store === 'STEAM' ? '' : styles.notActive)}>
          <StoreRow store="steam" secondaryText="10 Games">
            <Images.Eye />
          </StoreRow>
        </div>
        <div className={classNames(store === 'EPIC' ? '' : styles.notActive)}>
          <StoreRow store="epic" secondaryText="0 Games">
            <p>Link Store</p>
          </StoreRow>
        </div>
      </Flex>
    </div>
  )
}