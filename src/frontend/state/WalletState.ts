import { makeAutoObservable } from 'mobx'
import { InitializableStore } from '../store/types'
import { PROVIDERS } from 'common/types/proxy-types'

class WalletState implements InitializableStore {
  address = ''
  otp = ''
  provider: PROVIDERS = PROVIDERS.UNCONNECTED
  isConnected = false

  constructor() {
    makeAutoObservable(this)
  }

  async init() {
    //get initial state
    this.address = await window.api.initialState.walletState.address()
    this.provider = await window.api.initialState.walletState.provider()
    this.isConnected = await window.api.initialState.walletState.isConnected()
    this.otp = await window.api.initialState.walletState.otp()

    //listen to state changes
    window.api.handleStateUpdate.walletState.address((ev, val) => {
      this.address = val
    })
    window.api.handleStateUpdate.walletState.isConnected((ev, val) => {
      this.isConnected = val
    })
    window.api.handleStateUpdate.walletState.provider((ev, val) => {
      this.provider = val
    })
  }
}

export default new WalletState()
