import { makeAutoObservable } from 'mobx'
import { InitializableStore } from './types'

class WalletStore implements InitializableStore {
  address = ''
  otp = ''

  constructor() {
    makeAutoObservable(this)
  }

  handleAccountsUpdated(_e: Electron.IpcRendererEvent, accounts: string[]) {
    this.address = accounts[0]
  }

  init() {
    window.api.handleAccountsChanged(this.handleAccountsUpdated.bind(this))

    window.api.handleDisconnected(() => {
      this.address = ''
    })

    window.api.handleConnected(this.handleAccountsUpdated.bind(this))

    window.api.metamaskOtpUpdated(
      (_e: Electron.IpcRendererEvent, newOtp: string) => {
        this.otp = newOtp
      }
    )
  }

  get isConnected() {
    return !!this.address
  }
}

export default new WalletStore()
