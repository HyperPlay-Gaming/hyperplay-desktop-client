import {
  configStore,
  gogConfigStore,
  nileConfigStore
} from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class StoreAuthState {
  epic = {
    username: ''
  }
  gog = {
    username: ''
  }
  amazon = {
    user_id: '',
    username: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.epic.username = configStore.get_nodefault('userInfo.displayName') ?? ''
    this.gog.username = gogConfigStore.get_nodefault('userData.username') ?? ''
    this.amazon.user_id =
      nileConfigStore.get_nodefault('userData.user_id') ?? ''
    this.amazon.username = nileConfigStore.get_nodefault('userData.name') ?? ''
  }
}

export default new StoreAuthState()
