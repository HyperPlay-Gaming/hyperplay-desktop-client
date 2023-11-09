import { makeAutoObservable } from 'mobx'
import { Toast } from 'frontend/store/types'
import { TransactionStateInterface } from 'common/state/interfaces'

class TransactionState implements TransactionStateInterface {
  isInitialToastShown = false
  latestToast: Toast | null = null

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
  }

  private handleIsInitialToastShown(
    e: Electron.IpcRendererEvent,
    isInitialToastShown: boolean
  ) {
    this.isInitialToastShown = isInitialToastShown
  }

  private handleLatestToast(e: Electron.IpcRendererEvent, latestToast: Toast) {
    this.latestToast = latestToast
    this.latestToast.onClick = () =>
      window.api.toastCloseOnClick(latestToast.key)
  }
}

export default new TransactionState()
