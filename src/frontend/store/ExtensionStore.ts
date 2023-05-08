import { makeAutoObservable } from 'mobx'

class ExtensionStore {
  extensionId = ''
  isNotificationOpen = false
  isPopupOpen = false
  popupIsLocked = false

  constructor() {
    makeAutoObservable(this)

    this.init()
  }

  init() {
    this.fetchExtensionId()

    window.api.handleShowNotificationInWebview(() => {
      this.setIsNotificationOpen(true)

      this.setIsPopupOpen(true)
    })

    window.api.handleRemoveNotificationInWebview(() => {
      this.setIsNotificationOpen(false)

      this.setIsPopupOpen(false)
    })

    window.api.handleShowPopupInWebview(() => {
      this.setIsPopupOpen(true)
    })

    window.api.handleRemovePopupInWebview(() => {
      if (!this.popupIsLocked) {
        this.setIsPopupOpen(false)
      }
    })
  }

  async fetchExtensionId() {
    const extensionId = await window.api.getExtensionId()

    this.extensionId = extensionId

    return extensionId
  }

  setIsPopupOpen(isOpen: boolean) {
    this.isPopupOpen = isOpen
  }

  toggleIsPopupOpen() {
    this.setIsPopupOpen(!this.isPopupOpen)
  }

  lockPopup() {
    this.popupIsLocked = true
  }

  unlockPopup() {
    this.popupIsLocked = false
  }

  private setIsNotificationOpen(isOpen: boolean) {
    this.isNotificationOpen = isOpen
  }
}

const extensionStore = new ExtensionStore()

export default extensionStore
