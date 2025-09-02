import { SteamLoginUser } from 'common/types/steam'
import { configStore, gogConfigStore } from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class StoreAuthState {
  epic = {
    username: ''
  }
  gog = {
    username: ''
  }
  steam = {
    enabledUsers: [] as SteamLoginUser[]
  }

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.epic.username = configStore.get_nodefault('userInfo.displayName') ?? ''
    this.gog.username = gogConfigStore.get_nodefault('userData.username') ?? ''
    this.steam.enabledUsers =
      configStore.get_nodefault('steamEnabledUsers') ?? []
  }
}

export default new StoreAuthState()
