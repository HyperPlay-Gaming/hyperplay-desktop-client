import React, { PropsWithChildren } from 'react'

import { Background, StoreRow, Images } from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'
import { MintAchievementsProvider } from '../MintAchievementsContext'
import { AchievementsStats } from '../components/AchievementsStats'
import useSettingsContext from 'frontend/hooks/useSettingsContext'
import SettingsContext from 'frontend/screens/Settings/SettingsContext'
import { AchievementStoreProvider } from '../AchievementStoreContext'

export default React.memo(function AchievementsLayout({
  children
}: PropsWithChildren): JSX.Element {
  const contextValues = useSettingsContext({
    appName: 'default',
    runner: 'hyperplay',
    gameInfo: null
  })

  if (!contextValues) {
    return <></>
  }

  return (
    <SettingsContext.Provider value={contextValues}>
      <AchievementStoreProvider>
        <MintAchievementsProvider>
          <Background style={{ position: 'absolute' }}></Background>
          <div className={`contentContainer ${styles.fullHeight}`}>
            <Grid className={`${styles.gridItems}`}>
              <Grid.Col span={4}>
                <Flex
                  direction="column"
                  gap="16px"
                  className={`${styles.fullHeight}`}
                >
                  <AchievementsStats />
                  <div className={`${styles.storeCard} ${styles.fullHeight}`}>
                    <div className={`${styles.storeTitle}`}>My Stores</div>
                    <Flex
                      direction="column"
                      gap="4px"
                      className={`${styles.fullHeight}`}
                    >
                      <StoreRow store="hyperplay" secondaryText="10 Games">
                        <Images.Eye />
                      </StoreRow>
                      <StoreRow store="steam" secondaryText="10 Games">
                        <Images.Eye />
                      </StoreRow>
                      <StoreRow store="epic" secondaryText="10 Games">
                        <p>Link Store</p>
                      </StoreRow>
                    </Flex>
                  </div>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8} className={`${styles.fullHeight}`}>
                {children}
              </Grid.Col>
            </Grid>
          </div>
        </MintAchievementsProvider>
      </AchievementStoreProvider>
    </SettingsContext.Provider>
  )
})
