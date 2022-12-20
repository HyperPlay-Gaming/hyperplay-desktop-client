import { makeAutoObservable } from 'mobx'
import { InitializableStore } from './types'

class WalletStore implements InitializableStore {
  address = ''

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    window.api.handleAccountsChanged((_e, accounts: string[]) => {
      this.address = accounts[0]
    })

    window.api.handleDisconnected(() => {
      this.address = ''
    })
  }

  get isConnected() {
    return !!this.address
  }
}

export default new WalletStore()
