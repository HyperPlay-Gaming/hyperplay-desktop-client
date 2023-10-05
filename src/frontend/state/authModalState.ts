import { makeAutoObservable } from 'mobx'

class AuthModalState {
  private qaModeActive = false
  private open = true

  constructor() {
    makeAutoObservable(this)
  }

  get isOpen() {
    return this.open
  }

  get isQaModeActive() {
    return this.qaModeActive
  }

  openModal() {
    this.open = true
  }

  closeModal() {
    this.open = false
  }

  activateQaMode() {
    this.qaModeActive = true
  }
}

const authModalState = new AuthModalState()

export default authModalState
