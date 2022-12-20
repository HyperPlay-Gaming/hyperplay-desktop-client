import { makeAutoObservable, when } from 'mobx'
import walletStore from './WalletStore'

class OnboardingStore {
  isOnboardingOpen = true
  walletStore = walletStore

  constructor() {
    makeAutoObservable(this)
  }

  openOnboarding() {
    this.isOnboardingOpen = true
  }

  closeOnboarding() {
    this.isOnboardingOpen = false
  }

  startOnboarding = async (): Promise<void> =>
    new Promise((resolve, reject) => {
      this.openOnboarding()

      when(
        () => !this.isOnboardingOpen,
        () => reject(new Error('Onboarding closed'))
      )

      when(
        () => this.walletStore.isConnected,
        () => resolve()
      )
    })
}

export default new OnboardingStore()
