import { makeAutoObservable } from 'mobx'

class ExtensionState {
  extensionId = ''
  isMetaMaskNotificationWindowOpen = false
  isMetaMaskPopupWindowOpen = false
  popupIsLocked = false

  constructor() {
    makeAutoObservable(this)

    this.init()
  }

  init() {
    this.fetchExtensionId()

    window.api.handleShowNotificationInWebview(() => {
      this.isMetaMaskNotificationWindowOpen = true

      this.isMetaMaskPopupWindowOpen = true
    })

    window.api.handleRemoveNotificationInWebview(() => {
      this.isMetaMaskNotificationWindowOpen = false
    })

    window.api.handleShowPopupInWebview(() => {
      this.isMetaMaskPopupWindowOpen = true
    })

    window.api.handleRemovePopupInWebview(() => {
      if (!this.popupIsLocked) {
        this.isMetaMaskPopupWindowOpen = false
      }
    })
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
}

const extensionState = new ExtensionState()

export default extensionState
