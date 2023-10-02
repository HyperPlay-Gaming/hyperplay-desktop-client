import { makeAutoObservable } from 'mobx'

class AuthStore {
  authToken = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAuthToken(token: string) {
    this.authToken = token
  }
}

export const authStore = new AuthStore()

export default authStore
