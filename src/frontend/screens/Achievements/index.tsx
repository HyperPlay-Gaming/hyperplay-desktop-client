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
import {
  AchievementFilter,
  AchievementSort,
  SummaryAchievement
} from 'common/types'

const pageSize = 12
const achievementsSortOptions = [
  { text: 'Alphabetically (ASC)', value: 'ALPHA_A_TO_Z' },
  { text: 'Alphabetically (DES)', value: 'ALPHA_Z_TO_A' }
] as { text: string; value: AchievementSort }[]

export default React.memo(function Achievements(): JSX.Element {
  const [selectedSort, setSelectedSort] = useState(achievementsSortOptions[0])
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('ALL')
  const [achievementsData, setAchievementData] = useState<{
    currentPage: number
    totalPages: number
    games: SummaryAchievement[]
  }>({ currentPage: 0, totalPages: 0, games: [] })
  const [achievementsToBeMinted, setAchievementsToBeMinted] = useState<
    string[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getAchievements = async () => {
      const { data, totalPages, currentPage } =
        await window.api.getSummaryAchievements({
          store: 'steam',
          filter: activeFilter,
          sort: selectedSort.value,
          page: 1,
          pageSize
        })
      setAchievementData({ currentPage, totalPages, games: data })
    }

    getAchievements()
  }, [])

  const handleNextPage = useCallback(async () => {
    const nextPage = achievementsData.currentPage + 1
    const { data, totalPages, currentPage } =
      await window.api.getSummaryAchievements({
        store: 'steam',
        filter: activeFilter,
        sort: selectedSort.value,
        page: nextPage,
        pageSize
      })
    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const handlePrevPage = useCallback(async () => {
    const prevPage = achievementsData.currentPage - 1
    const { data, totalPages, currentPage } =
      await window.api.getSummaryAchievements({
        store: 'steam',
        filter: activeFilter,
        sort: selectedSort.value,
        page: prevPage,
        pageSize
      })
    setAchievementData({ currentPage, totalPages, games: data })
  }, [achievementsData, activeFilter, selectedSort])

  const handleAdd = useCallback(
    (id: string) => {
      if (achievementsToBeMinted.includes(id)) {
        setAchievementsToBeMinted((state) =>
          state.filter((item) => item !== id)
        )
      } else {
        setAchievementsToBeMinted((state) => [...state, id])
      }
    },
    [achievementsToBeMinted]
  )

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

  const filter = useMemo(() => {
    if (activeFilter === 'NEW') return 'new'
    if (activeFilter === 'MINTED') return 'minted'
    return 'all'
  }, [activeFilter])

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
            <AchievementSummaryTable
              games={achievementsData.games.map((game, index) => {
                // TODO: remove when there is a real id
                const id = `${game.gameName}-${index}`
                const state = achievementsToBeMinted.includes(id)
                  ? 'active'
                  : 'default'

                return {
                  id,
                  title: game.gameName,
                  image: game.icon,
                  mintableAchievementsCount: game.mintableAchievementsCount,
                  mintedAchievementsCount: game.mintedAchievementCount,
                  totalAchievementsCount: game.totalAchievementCount,
                  isNewAchievement: game.isNewAchievement,
                  state: walletStore.isConnected ? 'disabled' : state,
                  ctaProps: {
                    onClick: () => handleAdd(id),
                    disabled: isDisabled
                  }
                }
              })}
              sortProps={{
                options: achievementsSortOptions,
                selected: selectedSort,
                onItemChange: async (sortOption) => {
                  const chosenItem = achievementsSortOptions.find(
                    (option) => option.text === sortOption.text
                  )

                  if (chosenItem) {
                    const { data, totalPages, currentPage } =
                      await window.api.getSummaryAchievements({
                        store: 'steam',
                        filter: activeFilter,
                        sort: chosenItem.value,
                        page: 1,
                        pageSize
                      })
                    setSelectedSort(chosenItem)
                    setAchievementData({ currentPage, totalPages, games: data })
                  }
                }
              }}
              paginationProps={{
                currentPage: achievementsData.currentPage,
                totalPages: achievementsData.totalPages,
                handleNextPage,
                handlePrevPage
              }}
              filterProps={{
                activeFilter: filter,
                setActiveFilter: async (filter) => {
                  let newFilter = 'ALL' as AchievementFilter
                  if (filter === 'new') newFilter = 'NEW'
                  if (filter === 'minted') newFilter = 'MINTED'

                  const { data, totalPages, currentPage } =
                    await window.api.getSummaryAchievements({
                      store: 'steam',
                      filter: newFilter,
                      sort: selectedSort.value,
                      page: 1,
                      pageSize
                    })
                  setActiveFilter(newFilter)
                  setAchievementData({ currentPage, totalPages, games: data })
                }
              }}
              mintButtonProps={{
                onClick: handleMint,
                disabled: isDisabled ?? achievementsToBeMinted.length === 0
              }}
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  )
})
