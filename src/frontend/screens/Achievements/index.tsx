import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Background,
  AchievementsInfo,
  AchievementSummaryTable,
  StoreRow,
  Images
} from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'
import { StatusIconState } from '@hyperplay/ui/dist/components/AchievementCard/components/StatusIcon'
import { Game } from '@hyperplay/ui/dist/components/AchievementSummaryTable'

// TODO Remove - Fake Data For Now
const gamesDefault = [
  {
    id: '1',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Diablo II',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    state: 'default' as StatusIconState,
    totalAchievementsCount: 30
  },
  {
    id: '2',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'default' as StatusIconState,
    ctaProps: { disabled: true }
  },
  {
    id: '3',
    image: 'https://i.imgur.com/Cij5vdL.png',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    state: 'active' as StatusIconState
  },
  {
    id: '4',
    image: '',
    title: 'Star Wars: Knights of the Old Republic',
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: 30,
    isNewAchievement: true,
    state: 'default' as StatusIconState
  }
]

type AchievementFilter = 'all' | 'new' | 'minted'

// TODO: Remove - When api paginates
function paginate(array: Game[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
}
const pageSize = 12

export default React.memo(function Achievements(): JSX.Element {
  const achievementsSortOptions = [{ text: 'Alphabetically' }]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')
  const [achievementsData, setAchievementData] = useState<{ currentPage: number; totalPages: number; games: Game[] }>({ currentPage: 0, totalPages: 0, games: [] })

  const filteredGames = useMemo(() => {
    if (activeFilter === 'minted') {
      return achievementsData.games.filter((game) => game.state === 'active')
    }
    if (activeFilter === 'new') {
      return achievementsData.games.filter((game) => game.isNewAchievement)
    }
    return achievementsData.games
  }, [activeFilter, achievementsData])

  useEffect(() => {
    const getAchievements = async () => {
      const achievementApiData = await window.api.getAchievements('hyperplay')
      const firstPage = paginate(achievementApiData.data, 1, pageSize) as Game[]
      const totalPages = Math.ceil(achievementApiData.data.length / pageSize)
      setAchievementData({ currentPage: 1, totalPages, games: firstPage })
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const achievementApiData = await window.api.getAchievements('hyperplay')
    const totalPages = Math.ceil(achievementApiData.data.length / pageSize)
    const nextPage = achievementsData.currentPage + 1
    const data = paginate(achievementApiData.data, nextPage, 12)
    setAchievementData({ currentPage: nextPage, totalPages, games: data })
  }, [achievementsData])

  const handlePrevPage = useCallback(async () => {
    const achievementApiData = await window.api.getAchievements('hyperplay')
    const totalPages = Math.ceil(achievementApiData.data.length / pageSize)
    const previousPage = achievementsData.currentPage - 1
    const data = paginate(achievementApiData.data, previousPage, 12)
    setAchievementData({ currentPage: previousPage, totalPages, games: data })
  }, [achievementsData])

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
              games={filteredGames.map(game => ({ id: game.gameId, title: game.gameName, image: game.icon, state: 'disabled', ctaProps: { onClick: () => console.log('click') } }))}
              sortProps={{
                options: achievementsSortOptions,
                selected: selectedSort,
                onItemChange: setSelectedSort
              }}
              paginationProps={{
                currentPage: achievementsData.currentPage,
                totalPages: achievementsData.totalPages,
                handleNextPage,
                handlePrevPage,
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
