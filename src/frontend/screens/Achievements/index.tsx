import React, { useCallback, useEffect, useMemo, useState } from 'react'
import walletStore from 'frontend/store/WalletStore'

import {
  Background,
  AchievementsInfo,
  AchievementSummaryTable,
  StoreRow,
  Images
} from '@hyperplay/ui'
import { Flex, Grid } from '@mantine/core'

import styles from './index.module.css'
import { Achievement } from 'common/types'
import { AchievementFilter } from '@hyperplay/ui/dist/components/AchievementSummaryTable'

// TODO: Remove - When api has all the data
type AchievementData = Achievement & { id: string; mintedAchievementsCount: number; mintableAchievementsCount: number; totalAchievementsCount: number }

// TODO: Remove - When api paginates
function paginate(array: AchievementData[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
}

const pageSize = 12

const testData = [
  {
    achieved: 1,
    apiname: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    defaultvalue: 0,
    description: 'Lose an unfinished Castle that is at least 95% complete.',
    displayName: 'Castle of Doubt',
    gameIconURL: 'e2b5a7beb58136b892e517cb93ae08b36065363c',
    gameId: 813780,
    gameName: 'Age of Empires II: Definitive Edition',
    hidden: 0,
    icon: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/904a7a952309aacaf63168d1c018f8f6dd814926.jpg',
    iconName: 'Castle of Doubt',
    icongray: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/212553af5507838878a54d03a1282303c532d3ce.jpg',
    name: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    id: 'id-1',
    unlocktime: 1628474277,
    mintableAchievementsCount: 40,
    mintedAchievementsCount: 20,
    totalAchievementsCount: 50,
  },
  {
    achieved: 1,
    apiname: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    defaultvalue: 0,
    description: 'Lose an unfinished Castle that is at least 95% complete.',
    displayName: 'Castle of Doubt',
    gameIconURL: 'e2b5a7beb58136b892e517cb93ae08b36065363c',
    gameId: 813780,
    gameName: 'Age of Empires II: Definitive Edition',
    hidden: 0,
    icon: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/904a7a952309aacaf63168d1c018f8f6dd814926.jpg',
    iconName: 'Castle of Doubt',
    icongray: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/212553af5507838878a54d03a1282303c532d3ce.jpg',
    name: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    id: 'id-2',
    unlocktime: 1628474277,
    mintableAchievementsCount: 40,
    mintedAchievementsCount: 20,
    totalAchievementsCount: 50,
  },
  {
    achieved: 1,
    apiname: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    defaultvalue: 0,
    description: 'Lose an unfinished Castle that is at least 95% complete.',
    displayName: 'Castle of Doubt',
    gameIconURL: 'e2b5a7beb58136b892e517cb93ae08b36065363c',
    gameId: 813780,
    gameName: 'Age of Empires II: Definitive Edition',
    hidden: 0,
    icon: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/904a7a952309aacaf63168d1c018f8f6dd814926.jpg',
    iconName: 'Castle of Doubt',
    icongray: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/212553af5507838878a54d03a1282303c532d3ce.jpg',
    name: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    id: 'id-3',
    unlocktime: 1628474277,
    mintableAchievementsCount: 40,
    mintedAchievementsCount: 20,
    totalAchievementsCount: 50,
  },
  {
    achieved: 1,
    apiname: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    defaultvalue: 0,
    description: 'Lose an unfinished Castle that is at least 95% complete.',
    displayName: 'Castle of Doubt',
    gameIconURL: 'e2b5a7beb58136b892e517cb93ae08b36065363c',
    gameId: 813780,
    gameName: 'Age of Empires II: Definitive Edition',
    hidden: 0,
    icon: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/904a7a952309aacaf63168d1c018f8f6dd814926.jpg',
    iconName: 'Castle of Doubt',
    icongray: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/813780/212553af5507838878a54d03a1282303c532d3ce.jpg',
    name: 'ACHIEVEMENT_CASTLE_OF_DOUBT',
    id: 'id-4',
    unlocktime: 1628474277,
    mintableAchievementsCount: 40,
    mintedAchievementsCount: 20,
    totalAchievementsCount: 50,
  }
]

export default React.memo(function Achievements(): JSX.Element {
  const achievementsSortOptions = [{ text: 'Alphabetically' }]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')
  const [achievementsData, setAchievementData] = useState<{ currentPage: number; totalPages: number; games: AchievementData[] }>({ currentPage: 0, totalPages: 0, games: [] })
  const [achievementsToBeMinted, setAchievementsToBeMinted] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const filteredGames = useMemo(() => {
    if (activeFilter === 'minted') {
      return achievementsData.games.filter((game) => game.mintedAchievementsCount > 0)
    }
    if (activeFilter === 'new') {
      return achievementsData.games.filter((game) => game.mintedAchievementsCount === 0)
    }
    return achievementsData.games
  }, [activeFilter, achievementsData])

  useEffect(() => {
    const getAchievements = async () => {
      // TODO: Remove - When api returns the correct data format
      // const achievementApiData = await window.api.getAchievements('hyperplay') as { data: AchievementData[] }
      const achievementApiData = { data: testData }
      const { data } = achievementApiData 
      const totalPages = Math.ceil(data.length / pageSize)
      setAchievementData({ currentPage: 1, totalPages, games: paginate(data, 1, pageSize) })
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    // TODO: Remove - When api returns the correct data format
    // const achievementApiData = await window.api.getAchievements('hyperplay') as { data: AchievementData[] }
    const achievementApiData = { data: testData }
    const { data } = achievementApiData 
    const totalPages = Math.ceil(data.length / pageSize)
    const nextPage = achievementsData.currentPage + 1
    setAchievementData({ currentPage: nextPage, totalPages, games: paginate(data, nextPage, 12) })
  }, [achievementsData])

  const handlePrevPage = useCallback(async () => {
    // TODO: Remove - When api returns the correct data format
    // const achievementApiData = await window.api.getAchievements('hyperplay') as { data: AchievementData[] }
    const achievementApiData = { data: testData }
    const { data } = achievementApiData 
    const totalPages = Math.ceil(data.length / pageSize)
    const previousPage = achievementsData.currentPage - 1
    setAchievementData({ currentPage: previousPage, totalPages, games: paginate(data, previousPage, 12) })
  }, [achievementsData])

  const handleAdd = useCallback((id: string) => {
    if (achievementsToBeMinted.includes(id)) {
      setAchievementsToBeMinted((state) => state.filter((item) => item !== id))
    } else {
      setAchievementsToBeMinted((state) => ([...state, id]))
    }
  }, [achievementsToBeMinted])

  const handleMint = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAchievementsToBeMinted([])
    }, 3000)
  }, [achievementsToBeMinted])

  const isDisabled = useMemo(() => {
    return !walletStore.isConnected || isLoading
  }, [isLoading, walletStore.isConnected])

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
          <Grid.Col
            span={8}
            className={`${styles.fullHeight}`}
          >
            <AchievementSummaryTable
              games={filteredGames.map((game) => {
                const state = achievementsToBeMinted.includes(game.id) ? 'active' : 'default'

                return ({
                  id: game.id,
                  title: game.gameName,
                  image: game.icon,
                  mintableAchievementsCount: game.mintableAchievementsCount,
                  mintedAchievementsCount: game.mintedAchievementsCount,
                  totalAchievementsCount: game.totalAchievementsCount,
                  isNewAchievement: game.mintableAchievementsCount === 0,
                  state: walletStore.isConnected ? 'disabled' : state,
                  ctaProps: {
                    onClick: () => handleAdd(game.id),
                    disabled: isDisabled
                  }
                })
              })}
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
              mintButtonProps={{
                onClick: handleMint,
                disabled: isDisabled ?? achievementsToBeMinted.length === 0,
              }}
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  )
})
