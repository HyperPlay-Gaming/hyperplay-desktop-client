import React, { useEffect } from 'react'

import { StoreRow, Images, Button } from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'

import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import AchievementState from 'frontend/state/AchievementState'
import useSetting from 'frontend/hooks/useSetting'
import walletState from 'frontend/state/WalletState'
import { useTranslation } from 'react-i18next'

export const AchievementStores = observer(() => {
  const [steamId] = useSetting('steamId', '')
  const { t } = useTranslation()

  const {
    store,
    totalGames,
    setStore,
    syncAchievements,
    setPlayerStoreId,
    getAchievementsStats
  } = AchievementState

  useEffect(() => {
    setPlayerStoreId(steamId)
    getAchievementsStats()
    syncAchievements('STEAM')
  }, [steamId, walletState.address])

  const activeSecondaryText = `${totalGames} Games`
  const isSteam = store === 'STEAM'

  async function handleSyncClicked() {
    syncAchievements('STEAM')
  }

  return (
    <div className={`${styles.storeCard}`}>
      <div className={`${styles.storeTitle}`}>My Stores</div>
      <Flex direction="column" gap="4px" className={`${styles.fullHeight}`}>
        <div className={classNames(isSteam ? '' : styles.notActive)}>
          <StoreRow
            store="steam"
            secondaryText={isSteam ? activeSecondaryText : '0 Games'}
          >
            <div>
              {AchievementState.storesEnabled.length > 1 ? (
                <button
                  onClick={() => {
                    if (isSteam) setStore('STEAM')
                  }}
                >
                  {isSteam ? <Images.Eye /> : <Images.EyeOff />}
                </button>
              ) : null}
              {AchievementState.syncing ? (
                <div className={styles.syncingContainer}>
                  <div className="body">
                    {t('hyperplay.syncing', 'Syncing...')}
                  </div>
                  <Images.Refresh
                    className={
                      AchievementState.syncing ? styles.refreshing : ''
                    }
                  />
                </div>
              ) : (
                <Button
                  type={'secondary'}
                  size={'small'}
                  onClick={handleSyncClicked}
                >
                  {t('hyperplay.Sync', 'Sync')}
                </Button>
              )}
            </div>
          </StoreRow>
        </div>
      </Flex>
    </div>
  )
})
