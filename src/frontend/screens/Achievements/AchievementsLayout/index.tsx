import React, { PropsWithChildren } from 'react'

import { Background } from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'
import { AchievementsStats } from './AchievementsStats'
import useSettingsContext from 'frontend/hooks/useSettingsContext'
import SettingsContext from 'frontend/screens/Settings/SettingsContext'
import { AchievementStores } from './AchievmentStores'

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
      <Background style={{ position: 'absolute' }}></Background>
      <div className={`contentContainer ${styles.achievementsContainer}`}>
        <Grid className={`${styles.gridItems}`}>
          <Grid.Col span={4}>
            <Flex
              direction="column"
              gap="16px"
              className={styles.statsAndStoresContainer}
            >
              <AchievementsStats />
              <AchievementStores />
            </Flex>
          </Grid.Col>
          <Grid.Col span={8} className={`${styles.fullHeight}`}>
            {children}
          </Grid.Col>
        </Grid>
      </div>
    </SettingsContext.Provider>
  )
})
