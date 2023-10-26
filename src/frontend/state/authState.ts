import { onboardingStore } from 'frontend/helpers/electronStores'
import { makeAutoObservable } from 'mobx'

class AuthState {
  private qaModeActive = false
  private signInModalOpen = false
  private signedIn = false
  private pendingSignatureRequest = false

  constructor() {
    makeAutoObservable(this)
    this.signInModalOpen = onboardingStore.get(
      'openAuthModalIfAppReloads',
      false
    )
  }

  get hasPendingSignatureRequest() {
    return this.pendingSignatureRequest
  }

  get isSignInModalOpen() {
    return this.signInModalOpen
  }

  get isSignedIn() {
    return this.signedIn
  }

  get isQaModeActive() {
    return this.qaModeActive
  }

  openSignInModal() {
    this.signInModalOpen = true
  }

  closeSignInModal() {
    this.signInModalOpen = false
  }

  activateQaMode() {
    this.qaModeActive = true
  }

  setSignedIn() {
    this.signedIn = true
  }

  setPendingSignatureRequest(pending: boolean) {
    this.pendingSignatureRequest = pending
  }
}

const authState = new AuthState()

export default authState
