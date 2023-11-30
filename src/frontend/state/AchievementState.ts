import { makeAutoObservable } from 'mobx'
import walletState from 'frontend/state/WalletState'
import type {
  Achievement,
  AchievementFilter,
  AchievementSort,
  AchievementStore,
  AchievementsStats,
  SummaryAchievement
} from 'common/types'

interface AchievementData {
  data: SummaryAchievement[]
  pagesFetched: number
  totalPages: number
}

interface AchievementRequestKey {
  filter: AchievementFilter
  sort: AchievementSort
}

interface AchievementSortOption {
  text: string
  value: AchievementSort
}

export const ACHIVEMENT_SORT_OPTIONS = [
  { text: 'Alphabetically (ASC)', value: 'ALPHA_A_TO_Z' },
  { text: 'Alphabetically (DES)', value: 'ALPHA_Z_TO_A' }
] as AchievementSortOption[]

class AchievementState {
  store = 'STEAM' as AchievementStore
  playerStoreId = ''

  // Stats
  newAchievements = 0
  totalAchievements = 0
  totalGames = 0
  mintedAchievements = 0
  numFreeMints = 0

  // Summary Achievements
  summaryAchievements = new Map<string, AchievementData>()
  currentFilter: AchievementFilter = 'ALL'
  currentSort: AchievementSortOption = ACHIVEMENT_SORT_OPTIONS[0]

  // Individual Achievements
  individualAchievements = {
    data: [] as Achievement[],
    totalPages: 0
  }

  // Achievements Feature Flag
  showAchievements = false

  fetching = false

  syncing = false

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    window.api
      .shouldShowAchievements()
      .then((res) => (this.showAchievements = res))
  }

  getAchievementsStats = () => {
    window.api
      .getAchievementsStats({
        store: this.store,
        playerStoreId: this.playerStoreId,
        playerAddress: walletState.address
      })
      .then(this.setStats.bind(this))
  }

  getIndividualAchievements = async ({
    gameId,
    page,
    pageSize,
    sort
  }: {
    gameId: string
    page: number
    pageSize: number
    sort: AchievementSort
  }) => {
    const individualAchievements = await window.api.getIndividualAchievements({
      gameId: Number(gameId),
      store: this.store,
      sort,
      page,
      pageSize,
      playerStoreId: this.playerStoreId,
      playerAddress: walletState.address
    })
    this.individualAchievements = individualAchievements
  }

  async fetchMoreSummaryAchievements() {
    if (this.fetching) {
      return
    }
    if (!this.playerStoreId) {
      console.error('player store id is not set!')
      return
    }
    this.fetching = true
    const pagesFetched = this.currentSummaryAchievements?.pagesFetched
    const totalPages = this.currentSummaryAchievements?.totalPages
    const alreadyFetchedAllPages =
      pagesFetched !== undefined &&
      totalPages !== undefined &&
      pagesFetched >= totalPages
    if (alreadyFetchedAllPages) {
      this.fetching = false
      return
    }
    const requestKey: AchievementRequestKey = {
      filter: this.currentFilter,
      sort: this.currentSort.value
    }

    const nextPageOfSummaryAchievements =
      await window.api.getSummaryAchievements({
        store: this.store,
        filter: requestKey.filter,
        sort: requestKey.sort,
        // api is one indexed not zero indexed
        page: pagesFetched ? pagesFetched + 1 : 1,
        playerStoreId: this.playerStoreId,
        playerAddress: walletState.address
      })

    const valRef = this.summaryAchievements.get(JSON.stringify(requestKey))

    if (valRef !== undefined) {
      valRef.data = valRef.data.concat(nextPageOfSummaryAchievements.data)
      valRef.pagesFetched += 1
    } else {
      this.summaryAchievements.set(JSON.stringify(requestKey), {
        data: nextPageOfSummaryAchievements.data,
        pagesFetched: 1,
        totalPages: nextPageOfSummaryAchievements.totalPages
      })
    }
    this.fetching = false
  }

  get currentSummaryAchievements() {
    const key = {
      filter: this.currentFilter,
      sort: this.currentSort.value
    }
    return this.summaryAchievements.get(JSON.stringify(key))
  }

  get summaryAchievementsToDisplay() {
    return this.currentSummaryAchievements?.data
  }

  /**
   * Fetch for current key if no game summaries have been fetched
   */
  initGameSummaryKey() {
    if (this.summaryAchievementsToDisplay === undefined) {
      this.fetchMoreSummaryAchievements()
    }
  }

  setFilter(filter: AchievementFilter) {
    this.currentFilter = filter
    this.initGameSummaryKey()
  }

  setSort(sort: AchievementSortOption) {
    this.currentSort = sort
    this.initGameSummaryKey()
  }

  async syncAchievements(store: AchievementStore) {
    if (!this.playerStoreId) {
      console.error('Player store id is not set!')
      return
    }
    if (this.syncing) {
      return
    }
    this.syncing = true
    await window.api.syncAchievements({
      store,
      playerStoreId: this.playerStoreId,
      playerAddress: walletState.address
    })
    this.syncing = false
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

  get filterDisplayName() {
    const activeFilter = this.currentFilter
    if (activeFilter === 'NEW') return 'new'
    if (activeFilter === 'MINTED') return 'minted'
    return 'all'
  }

  getFilterNameFromDisplayName(displayName: string) {
    let newFilter = 'ALL' as AchievementFilter
    if (displayName === 'new') newFilter = 'NEW'
    if (displayName === 'minted') newFilter = 'MINTED'
    return newFilter
  }
}

export default new AchievementState()
