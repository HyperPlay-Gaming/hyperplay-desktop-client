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
}

export default new StoreAuthState()
