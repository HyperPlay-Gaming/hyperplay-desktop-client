import { makeAutoObservable } from 'mobx'

class ExtensionState {
  extensionId = ''
  isMetaMaskNotificationWindowOpen = false
  isMetaMaskPopupWindowOpen = false
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
    window.api.handleRemoveNotificationInWebview(
      this.handleRemoveNotificationInWebview.bind(this)
    )
    window.api.handleShowPopupInWebview(
      this.handleShowPopupInWebview.bind(this)
    )
    window.api.handleRemovePopupInWebview(
      this.handleRemovePopupInWebview.bind(this)
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
      extensionState.isMetaMaskPopupWindowOpen &&
      !extensionState.isMetaMaskNotificationWindowOpen
    )
  }

  get isNotificationOpen(): boolean {
    return (
      extensionState.isMetaMaskPopupWindowOpen &&
      extensionState.isMetaMaskNotificationWindowOpen
    )
  }

  // PRIVATE METHODS

  private handleShowNotificationInWebview() {
    this.isMetaMaskNotificationWindowOpen = true

    this.isMetaMaskPopupWindowOpen = true
  }

  private handleRemoveNotificationInWebview() {
    this.isMetaMaskNotificationWindowOpen = false
  }

  private handleShowPopupInWebview() {
    this.isMetaMaskPopupWindowOpen = true
  }

  private handleRemovePopupInWebview() {
    if (!this.popupIsLocked) {
      this.isMetaMaskPopupWindowOpen = false
    }
  }
}

const extensionState = new ExtensionState()

export default extensionState
