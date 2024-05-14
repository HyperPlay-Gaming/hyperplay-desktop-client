import {
  newsLetterStore,
  onboardingStore
} from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class EmailSubscriptionState {
  private modalOpen = false

  constructor() {
    makeAutoObservable(this)
    const isAlreadySubscribed = newsLetterStore.get('subscribed', false)
    const hasAlreadySkipped = newsLetterStore.get('skipped', false)

    if (!isAlreadySubscribed && !hasAlreadySkipped) {
      this.modalOpen = onboardingStore.get('openEmailModalIfAppReloads', false)
    }

    onboardingStore.set('openEmailModalIfAppReloads', false)
  }

  get isEmailModalOpen() {
    return this.modalOpen
  }

  openEmailModal() {
    this.modalOpen = true
  }

  closeEmailModal() {
    this.modalOpen = false
  }

  enableOpenEmailModalOnAppReload() {
    onboardingStore.set('openEmailModalIfAppReloads', true)
  }
}

const emailSubscriptionState = new EmailSubscriptionState()

export default emailSubscriptionState
