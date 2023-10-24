import { ExtensionStateInterface } from 'common/state/interfaces'
import { makeAutoObservable } from 'mobx'

class ExtensionState implements ExtensionStateInterface {
  extensionId = ''

  isPopupOpen = false
  isNotificationOpen = false

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
    window.api.handleStateUpdate.extension.isPopupOpen(
      this.handleIsPopupOpen.bind(this)
    )
    window.api.handleStateUpdate.extension.isNotificationOpen(
      this.handleIsNotificationOpen.bind(this)
    )
  }

  private handleIsPopupOpen(
    e: Electron.IpcRendererEvent,
    isPopupOpen: boolean
  ) {
    this.isPopupOpen = isPopupOpen
  }

  private handleIsNotificationOpen(
    e: Electron.IpcRendererEvent,
    isNotificationOpen: boolean
  ) {
    this.isNotificationOpen = isNotificationOpen
  }

  private async fetchExtensionId() {
    const extensionId = await window.api.getExtensionId()

    this.extensionId = extensionId

    return extensionId
  }

  lockPopup() {
    window.api.lockPopup(true)
  }

  unlockPopup() {
    window.api.lockPopup(false)
  }

  toggleIsPopupOpen() {
    window.api.toggleIsPopupOpen()
  }
}

const extensionState = new ExtensionState()

export default extensionState
