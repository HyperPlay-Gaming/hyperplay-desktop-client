import { makeAutoObservable } from 'mobx'

class ExtensionState {
  extensionId = ''
  popupIsLocked = false

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.fetchExtensionId()

    /*
     * break these out into separate functions so they are marked as actions
     * otherwise you'll get the following warning
     * Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed.
     */
    window.api.handleShowNotificationInWebview(
      this.handleShowNotificationInWebview.bind(this)
    )
    window.api.handleShowPopupInWebview(
      this.handleShowPopupInWebview.bind(this)
    )
  }

  async fetchExtensionId() {
    const extensionId = await window.api.getExtensionId()

    this.extensionId = extensionId

    return extensionId
  }

  toggleIsPopupOpen() {
    this.isMetaMaskPopupWindowOpen = !this.isMetaMaskPopupWindowOpen
  }

  lockPopup() {
    this.popupIsLocked = true
  }

  unlockPopup() {
    this.popupIsLocked = false
  }

  get isPopupOpen(): boolean {
    return (
    )
  }

  get isNotificationOpen(): boolean {
    return (
    )
  }
}

const extensionState = new ExtensionState()

export default extensionState
