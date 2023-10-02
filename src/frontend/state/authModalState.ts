import { makeAutoObservable } from 'mobx'

class AuthModalState {
  private open = true

  constructor() {
    makeAutoObservable(this)
  }

  get isOpen() {
    return this.open
  }

  openModal() {
    this.open = true
  }

  closeModal() {
    this.open = false
  }
}

const authModalState = new AuthModalState()

export default authModalState
