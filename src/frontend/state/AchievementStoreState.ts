import { makeAutoObservable } from 'mobx'
import walletStore from 'frontend/store/WalletStore'
import type {
  AchievementFilter,
  AchievementSort,
  AchievementStore,
  AchievementsStats,
  SummaryAchievement
} from 'common/types'

class AchievementStoreState {
  store = 'STEAM' as AchievementStore
  playerStoreId = '76561199276514967'
  // Stats
  newAchievements = 0
  totalAchievements = 0
  totalGames = 0
  mintedAchievements = 0
  numFreeMints = 0
  // Summary Achievements
  summaryAchievements = {
    data: [] as SummaryAchievement[],
    totalPages: 0,
    currentPage: 0
  }

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.syncAchievements(this.store)
  }

  getAchievementsStats = () => {
    window.api
      .getAchievementsStats({
        store: this.store,
        playerStoreId: this.playerStoreId,
        playerAddress: walletStore.address
      })
      .then(this.setStats.bind(this))
  }

  getSummaryAchievements = async ({
    page,
    pageSize,
    filter,
    sort
  }: {
    page: number
    pageSize: number
    filter: AchievementFilter
    sort: AchievementSort
  }) => {
    const summaryAchievements = await window.api.getSummaryAchievements({
      store: this.store,
      filter,
      sort,
      page,
      pageSize,
      playerStoreId: this.playerStoreId,
      playerAddress: walletStore.address
    })
    this.summaryAchievements = summaryAchievements
  }

  syncAchievements = (store: AchievementStore) => {
    window.api.syncAchievements({
      store,
      playerStoreId: this.playerStoreId,
      playerAddress: walletStore.address
    })
  }

  setStats = (state: AchievementsStats) => {
    this.newAchievements = state.newAchievements
    this.totalAchievements = state.totalAchievements
    this.totalGames = state.totalGames
    this.mintedAchievements = state.mintedAchievements
    this.numFreeMints = state.numFreeMints
  }

  setStore = (store: AchievementStore) => {
    this.store = store
  }

  setPlayerStoreId = (playerStoreId: string) => {
    this.playerStoreId = playerStoreId
  }
}

export default new AchievementStoreState()
