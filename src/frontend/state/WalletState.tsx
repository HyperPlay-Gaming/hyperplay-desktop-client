import { makeAutoObservable } from 'mobx'
import { InitializableStore } from '../store/types'
import { PROVIDERS } from 'common/types/proxy-types'

class WalletState implements InitializableStore {
  address = ''
  otp = ''
  provider: PROVIDERS = PROVIDERS.UNCONNECTED

  constructor() {
    makeAutoObservable(this)
  }

  handleAccountsUpdated(
    _e: Electron.IpcRendererEvent,
    accounts: string[],
    provider?: PROVIDERS
  ) {
    this.address = accounts[0]
    if (provider) {
      this.provider = provider
    }
  }

  init() {
    window.api.getConnectedProvider().then((val) => (this.provider = val))

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

export default new WalletState()
