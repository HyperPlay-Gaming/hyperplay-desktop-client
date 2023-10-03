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

// TODO: Remove - When api paginates
function paginate(array: Achievement[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
}

const pageSize = 12

export default React.memo(function Achievements(): JSX.Element {
  const achievementsSortOptions = [{ text: 'Alphabetically' }]
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')
  const [achievementsData, setAchievementData] = useState<{ currentPage: number; totalPages: number; games: Achievement[] }>({ currentPage: 0, totalPages: 0, games: [] })
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
      const achievementApiData = await window.api.getAchievements('hyperplay') as { data: Achievement[] }
      const { data } = achievementApiData 
      const totalPages = Math.ceil(data.length / pageSize)
      setAchievementData({ currentPage: 1, totalPages, games: paginate(data, 1, pageSize) })
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const achievementApiData = await window.api.getAchievements('hyperplay') as { data: Achievement[] }
    const { data } = achievementApiData 
    const totalPages = Math.ceil(data.length / pageSize)
    const nextPage = achievementsData.currentPage + 1
    setAchievementData({ currentPage: nextPage, totalPages, games: paginate(data, nextPage, 12) })
  }, [achievementsData])

  const handlePrevPage = useCallback(async () => {
    const achievementApiData = await window.api.getAchievements('hyperplay') as { data: Achievement[] }
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
            className={`${styles.fullHeight}`}
          >
            <AchievementSummaryTable
              games={filteredGames.map((game, index) => {
                // TODO: Remove - When we have a real achievement id
                const id = `${game.gameId}-${index}`
                const state = achievementsToBeMinted.includes(id) ? 'active' : 'default'

                return ({
                  id: id,
                  title: game.gameName,
                  image: game.icon,
                  mintableAchievementsCount: 40,
                  mintedAchievementsCount: 20,
                  totalAchievementsCount: 50,
                  isNewAchievement: game.mintableAchievementsCount === 0,
                  state: walletStore.isConnected ? 'disabled' : state,
                  ctaProps: {
                    onClick: () => handleAdd(id),
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
