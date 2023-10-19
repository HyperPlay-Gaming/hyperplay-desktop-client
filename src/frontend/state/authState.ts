import { makeAutoObservable } from 'mobx'

class AuthState {
  #qaModeActive = false
  #singInModalOpen = true
  #signedIn = false

  constructor() {
    makeAutoObservable(this)
  }

  get isSingInModalOpen() {
    return this.#singInModalOpen
  }

  get isSignedIn() {
    return this.#signedIn
  }

  get isQaModeActive() {
    return this.#qaModeActive
  }

  openSignInModal() {
    this.#singInModalOpen = true
  }

  closeSignInModal() {
    this.#singInModalOpen = false
  }

  activateQaMode() {
    this.#qaModeActive = true
  }

  setSignedIn() {
    this.#signedIn = true
  }
}

const authState = new AuthState()

export default authState
