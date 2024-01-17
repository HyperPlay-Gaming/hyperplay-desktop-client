import React, { useEffect, useState } from 'react'

import {
  Button,
  Images,
  LinkAccountDialog,
  ModalAnimation,
  StoreRow
} from '@hyperplay/ui'
import { Flex } from '@mantine/core'

import styles from './index.module.css'

import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import AchievementState from 'frontend/state/AchievementState'
import walletState from 'frontend/state/WalletState'
import { useTranslation } from 'react-i18next'
import useAuthSession from '../../../hooks/useAuthSession'
import { DEV_PORTAL_URL } from '../../../../common/constants'

export const AchievementStores = observer(() => {
  const { t } = useTranslation()
  const { data: authSession, isLoading } = useAuthSession()
  const [showLinkDialog, setShowLinkDialog] = useState(
    !authSession?.linkedAccounts.has('steam')
  )

  const {
    store,
    totalGames,
    setStore,
    syncAchievements,
    setPlayerStoreId,
    getAchievementsStats
  } = AchievementState

  const activeSecondaryText = `${totalGames} Games`
  const isSteam = store === 'STEAM'

  const handleDialogClose = () => setShowLinkDialog(true)

  useEffect(() => {
    const steamId = authSession?.linkedAccounts.get('steam')
    if (isLoading || !steamId) return
    setPlayerStoreId(steamId)
    getAchievementsStats()
    // syncAchievements('STEAM')
  }, [isLoading, authSession, walletState.address])

  useEffect(() => {
    if (isLoading) return
    setShowLinkDialog(!authSession?.linkedAccounts.has('steam'))
  }, [isLoading, authSession])

  return (
    <div className={`${styles.storeCard}`}>
      <ModalAnimation isOpen={showLinkDialog} onClose={handleDialogClose}>
        {isLoading ? (
          'loading...'
        ) : (
          <LinkAccountDialog
            i18n={{
              connectTitle: t(
                'hyperplay.linkSteamAccountTitle',
                'Link Steam Account'
              ),
              connectSubtitle: t(
                'hyperplay.linkSteamAccountDescription',
                'Sign in to Steam to link your HyperPlay account.'
              ),
              callToActionText: t(
                'hyperplay.linkSteamAccountCta',
                'Go to Steam sign in'
              )
            }}
            open={true}
            onClose={() => setShowLinkDialog(true)}
            onConnectTap={() =>
              window.api.openExternalUrl(`${DEV_PORTAL_URL}/oauth/steam`)
            }
          />
        )}
      </ModalAnimation>
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
                  onClick={async () => syncAchievements('STEAM')}
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
