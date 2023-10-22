import { makeAutoObservable } from 'mobx'
import { Toast } from 'frontend/store/types'
import { OverlayWindowState } from 'common/types/proxy-types'
import { TransactionStateInterface } from 'common/state/interfaces'

class TransactionState implements TransactionStateInterface {
  isInitialToastShown = false
  latestToast: Toast | null = null
  overlayWindowState: OverlayWindowState | undefined

  // PUBLIC FUNCTIONS
  constructor() {
    makeAutoObservable(this)
  }

  init() {
    /*
     * The assumption is that a request is always initiated before
     * pending, completed, or failed
     */
    window.api.handleStateUpdate.transaction.isInitialToastShown(
      this.handleIsInitialToastShown.bind(this)
    )

    window.api.handleStateUpdate.transaction.latestToast(
      this.handleLatestToast.bind(this)
    )

    window.api.handleStateUpdate.transaction.overlayWindowState(
      this.handleOverlayWindowState.bind(this)
    )
  }

  private handleIsInitialToastShown(
    e: Electron.IpcRendererEvent,
    isInitialToastShown: boolean
  ) {
    this.isInitialToastShown = isInitialToastShown
  }

  private handleLatestToast(e: Electron.IpcRendererEvent, latestToast: Toast) {
    this.latestToast = latestToast
  }

  private handleOverlayWindowState(
    e: Electron.IpcRendererEvent,
    overlayWindowState: OverlayWindowState
  ) {
    this.overlayWindowState = overlayWindowState
  }
}

export default new TransactionState()
