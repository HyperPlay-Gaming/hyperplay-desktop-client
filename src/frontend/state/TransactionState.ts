import { makeAutoObservable, reaction } from 'mobx'
import {
  TransactionMap,
  TRANSACTION_STATE,
  Transaction,
  Toast,
  ToastKey
} from 'frontend/store/types'
import extensionState from './ExtensionState'
import {
  TITLE,
  DESCRIPTION,
  statusType,
  TxnStateToStatusMap,
  EXTENSION_NOTIFICATION,
  INITIAL_TOAST
} from 'frontend/screens/TransactionNotification/constants'
import DeviceState from './DeviceState'
import overlayState from './OverlayState'

class TransactionState {
  /*
   * @dev keeps track of in progress external transactions
   */
  transactions: TransactionMap = new Map()

  /*
   * @dev keeps track of toasts in order that they come in
   */
  recentToasts: Toast[] = []

  // txn id for mm mobile and wallet connect wallets
  private maxId = -1

  TXN_CONFIRMED_DELAY_MS = 5000

  INITIAL_TOAST_DELAY_MS = 11000

  initialTimeout: NodeJS.Timeout | undefined

  // PUBLIC FUNCTIONS

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    /*
     * The assumption is that a request is always initiated before
     * pending, completed, or failed
     */
    window.api.handleProviderRequestInitiated((_e, id, method) => {
      const txn = {
        id,
        method,
        state: TRANSACTION_STATE.INITIATED
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestPending((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        state: TRANSACTION_STATE.PENDING
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestCompleted((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        state: TRANSACTION_STATE.CONFIRMED
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestFailed((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        state: TRANSACTION_STATE.FAILED
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleShowInitialToast(this.handleShowInitialToast.bind(this))
    window.api.handleOverlayToggled(this.handleOverlayToggled.bind(this))
  }

  reset() {
    this.maxId = -1
    this.transactions.clear()
    this.recentToasts = []
    this.TXN_CONFIRMED_DELAY_MS = 5000
    this.INITIAL_TOAST_DELAY_MS = 11000
  }

  closeToast(key: ToastKey) {
    const transaction = this.removeTxnIfFinished(key)

    if (transaction !== undefined && key.txnId !== undefined) {
      this.transactions.set(key.txnId, transaction)
    }

    this.recentToasts = this.recentToasts.map((val) => {
      if (
        val.key.txnId === key.txnId &&
        val.key.type === key.type &&
        val.key.txnState === key.txnState
      ) {
        val.isOpen = false
      }
      return val
    })
  }

  get latestToast(): Toast | null {
    const lastToast = this.recentToasts.at(-1)
    if (lastToast === undefined) {
      return null
    }
    return lastToast
  }

  get isInitialToastShown(): boolean {
    return (
      this.latestToast?.isOpen === true &&
      this.latestToast.key.type === 'initial'
    )
  }

  // PRIVATE FUNCTIONS

  private handleOverlayToggled(
    event: Electron.IpcRendererEvent,
    overlayShown: boolean
  ) {
    // if user toggles overlay, use that state and clear the initial toast timeout to update it
    if (this.initialTimeout) {
      clearTimeout(this.initialTimeout)
    }

    this.updateOverlayWindow(overlayShown)
  }

  private removeTransaction(id: number) {
    this.transactions.delete(id)
    this.updateMaxId(id)
  }

  private removeTxnIfFinished(key: ToastKey) {
    if (key.txnId === undefined) {
      return
    }

    const transaction = this.transactions.get(key.txnId)
    if (transaction === undefined) {
      return
    }

    const txnIsFinished =
      transaction.state === TRANSACTION_STATE.FAILED ||
      transaction.state === TRANSACTION_STATE.CONFIRMED
    if (txnIsFinished) {
      this.removeTransaction(key.txnId)
    }
    return transaction
  }

  private updateMaxId(id: number) {
    if (id >= this.maxId) {
      this.maxId = id
    }
  }

  private addTransactionAndUpdateId(id: number, txn: Transaction) {
    this.transactions.set(id, txn)
    this.updateMaxId(id)
    if (id === this.maxId) {
      this.addTransaction(txn)
    }
  }

  /*
   * Called to show initial toast and MetaMask extension toast
   */
  private addTransaction(txn: Transaction) {
    this.recentToasts.push(this.getToastFromTransaction(txn))
    if (
      txn.state === TRANSACTION_STATE.CONFIRMED ||
      txn.state === TRANSACTION_STATE.FAILED
    ) {
      setTimeout(
        () =>
          this.closeToast({
            txnId: txn.id,
            type: 'transaction',
            txnState: txn.state
          }),
        this.TXN_CONFIRMED_DELAY_MS
      )
    }
  }

  private getToastFromTransaction(txn: Transaction): Toast {
    const title = TITLE[txn.method]
      ? TITLE[txn.method][txn.state]()
      : TITLE.default[txn.state]()
    const description = DESCRIPTION[txn.state]()
    const status: statusType = TxnStateToStatusMap[txn.state]

    const toast: Toast = {
      title,
      subtext: description,
      status,
      isOpen: true,
      onClick: function () {
        this.isOpen = false
      },
      key: {
        type: 'transaction',
        txnId: txn.id,
        txnState: txn.state
      }
    }

    return toast
  }

  private shouldShowOverlayAfterInitialToast() {
    let shouldShow = false
    for (const toast of this.recentToasts) {
      if (toast.isOpen) {
        shouldShow = true
        break
      }
    }
    return shouldShow
  }

  private handleShowInitialToast() {
    const initialToastKey: ToastKey = {
      type: 'initial'
    }
    const initialToast: Toast = {
      status: INITIAL_TOAST.STATUS,
      title: INITIAL_TOAST.TITLE(),
      subtext: INITIAL_TOAST.DESCRIPTION(DeviceState.isMac),
      isOpen: true,
      onClick: function () {
        this.isOpen = false
      },
      key: initialToastKey
    }

    this.recentToasts.push(initialToast)

    this.initialTimeout = setTimeout(() => {
      this.closeToast(initialToastKey)

      // don't toggle overlay window state if browser game
      if (overlayState.showBrowserGame) {
        return
      }

      this.updateOverlayWindow(this.shouldShowOverlayAfterInitialToast())
    }, this.INITIAL_TOAST_DELAY_MS)
  }

  private updateOverlayWindow(showOverlay: boolean) {
    if (showOverlay) {
      window.api.updateOverlayWindow({
        ignoreInput: false,
        state: 'show'
      })
    } else {
      window.api.updateOverlayWindow({
        ignoreInput: true,
        state: 'hide'
      })
    }
  }
}
const transactionState = new TransactionState()
export default transactionState

reaction(
  () => extensionState.isNotificationOpen,
  () => {
    if (extensionState.isNotificationOpen) {
      const extensionNotificationToast: Toast = {
        status: EXTENSION_NOTIFICATION.STATUS,
        title: EXTENSION_NOTIFICATION.TITLE(),
        subtext: EXTENSION_NOTIFICATION.DESCRIPTION(DeviceState.isMac),
        isOpen: true,
        onClick: function () {
          this.isOpen = false
        },
        key: {
          type: 'extension_notfication'
        }
      }
      transactionState.recentToasts.push(extensionNotificationToast)
    }
  }
)
