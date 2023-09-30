import { makeAutoObservable } from 'mobx'
import { InitializableStore } from './types'
import onboardingStore from './OnboardingStore'
import { PROVIDERS } from 'common/types/proxy-types'

class WalletStore implements InitializableStore {
  address = ''
  otp = ''

  constructor() {
    makeAutoObservable(this)
  }

  handleAccountsUpdated(
    _e: Electron.IpcRendererEvent,
    accounts: string[],
    provider: PROVIDERS
  ) {
    this.address = accounts[0]

    if (onboardingStore.shouldReportNextConnectionEvent) {
      console.log('tracking wallet connected')
      onboardingStore.shouldReportNextConnectionEvent = false
      window.api.trackEvent({
        event: 'Wallet Connected',
        properties: { provider }
      })
    }
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
