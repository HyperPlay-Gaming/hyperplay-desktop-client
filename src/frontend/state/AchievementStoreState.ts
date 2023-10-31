import { makeAutoObservable } from 'mobx'
import walletStore from 'frontend/store/WalletStore'
import type { AchievementStore, AchievementsStats } from 'common/types'

class AchievementStoreState {
  store = 'STEAM' as AchievementStore
  playerStoreId = '76561199276514967'
  newAchievements = 0
  totalAchievements = 0
  totalGames = 0
  mintedAchievements = 0
  numFreeMints = 0

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
