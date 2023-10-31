import React, { useEffect } from 'react'

import { StoreRow, Images } from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'

import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import AchievementStoreState from 'frontend/state/AchievementStoreState'
import useSetting from 'frontend/hooks/useSetting'

export const AchievementStores = observer(() => {
  const [steamId] = useSetting('steamId', '')

  const store = AchievementStoreState.store
  const totalGames = AchievementStoreState.totalGames
  const setStore = AchievementStoreState.setStore
  const syncAchievements = AchievementStoreState.syncAchievements
  const setPlayerStoreId = AchievementStoreState.setPlayerStoreId
  const getAchievementsStats = AchievementStoreState.getAchievementsStats

  useEffect(() => {
    setPlayerStoreId(steamId)
    getAchievementsStats()
    syncAchievements('STEAM')
  }, [steamId])

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
              <button
                onClick={() => {
                  if (isSteam) setStore('STEAM')
                }}
              >
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
})
