import React, { useMemo, useState } from 'react'

import {
  Background,
  AchievementsInfo,
  AchievementSummaryTable,
  StoreRow,
  Images
} from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'

// TODO Remove - Fake Data For Now
const games = [
  {
    id: '1',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Diablo II',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    state: 'default',

    totalAchievementsCount: 30
  },
  {
    id: '2',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'default',

    ctaProps: { disabled: true }
  },
  {
    id: '3',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'active'
  },
  {
    id: '4',
    image: '',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    isNewAchievement: true,
    state: 'default'
  }
]

type AchievementFilter = 'all' | 'new' | 'minted'

export default React.memo(function Achievements(): JSX.Element {
  const achievementsSortOptions = [{ text: 'Alphabetically' }]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')
  const filteredGames = useMemo(() => {
    if (activeFilter === 'minted') {
      return games.filter((game) => game.state === 'active')
    }
    if (activeFilter === 'new') {
      return games.filter((game) => game.isNewAchievement)
    }
    return games
  }, [activeFilter])

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className={`contentContainer ${styles.fullHeight}`}>
        <Grid className={`${styles.gridItems}`}>
          <Grid.Col span={4}>
            <Flex
              direction="column"
              gap="8px"
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
          <Grid.Col
            span={8}
            className={`${styles.fullHeight} ${styles.achievementTable}`}
          >
            <AchievementSummaryTable
              games={filteredGames}
              sortProps={{
                options: achievementsSortOptions,
                selected: selectedSort,
                onItemChange: setSelectedSort
              }}
              paginationProps={{
                currentPage: 1,
                totalPages: 3,
                handleNextPage: () => console.log('next page'),
                handlePrevPage: () => console.log('prev page')
              }}
              filterProps={{
                activeFilter,
                setActiveFilter
              }}
              mintButtonProps={{ onClick: () => console.log('mint') }}
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  )
})
