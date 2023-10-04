import React, { PropsWithChildren } from 'react'

import { Background, AchievementsInfo, StoreRow, Images } from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'

export default React.memo(function AchievementsLayout({
  children
}: PropsWithChildren): JSX.Element {
  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className={`contentContainer ${styles.fullHeight}`}>
        <Grid className={`${styles.gridItems}`}>
          <Grid.Col span={4}>
            <Flex
              direction="column"
              gap="16px"
              className={`${styles.fullHeight}`}
            >
              <AchievementsInfo
                newAchievementsValue={'1,337'}
                mintedValue={'4/1,000'}
                gamesValue={'7'}
              />
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
    </>
  )
})
