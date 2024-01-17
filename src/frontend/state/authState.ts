import { onboardingStore } from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class AuthState {
  private signInModalOpen = false
  private pendingSignatureRequest = false
  authToken = ''

  constructor() {
    makeAutoObservable(this)
    this.signInModalOpen = onboardingStore.get(
      'openAuthModalIfAppReloads',
      false
    )
    onboardingStore.set('openAuthModalIfAppReloads', false)
  }

  get hasPendingSignatureRequest() {
    return this.pendingSignatureRequest
  }

  get isSignInModalOpen() {
    return this.signInModalOpen
  }

  openSignInModal() {
    this.signInModalOpen = true
  }

  closeSignInModal() {
    this.signInModalOpen = false
  }

  setPendingSignatureRequest(pending: boolean) {
    this.pendingSignatureRequest = pending
  }
}

const authState = new AuthState()

export default authState
