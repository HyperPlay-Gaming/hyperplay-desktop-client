import { configStore, gogConfigStore } from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class StoreAuthState {
  epic = {
    username: ''
  }
  gog = {
    username: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.epic.username = configStore.get_nodefault('userInfo.displayName') ?? ''
    this.gog.username = gogConfigStore.get_nodefault('userData.username') ?? ''
  }
}

export default new StoreAuthState()
