import { autorun, makeAutoObservable } from 'mobx'
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
  EXTENSION_NOTIFICATION
} from 'frontend/screens/TransactionNotification/constants'
import { t } from 'i18next'
import DeviceState from './DeviceState'

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
  #maxId = -1

  showInitialToast = false

  TXN_CONFIRMED_DELAY_MS = 5000

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
  }

  reset() {
    this.#maxId = -1
    this.showInitialToast = false
    this.transactions.clear()
    this.recentToasts = []
    this.TXN_CONFIRMED_DELAY_MS = 5000
  }

  removeTransaction(id: number) {
    this.transactions.delete(id)
    this.#updateMaxId(id)
  }

  #removeTxnIfFinished(key: ToastKey) {
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

  closeToast(key: ToastKey) {
    const transaction = this.#removeTxnIfFinished(key)

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

  #updateMaxId(id: number) {
    if (id >= this.#maxId) {
      this.#maxId = id
    }
  }

  addTransactionAndUpdateId(id: number, txn: Transaction) {
    this.transactions.set(id, txn)
    this.#updateMaxId(id)
    if (id === this.#maxId) {
      this.addTransaction(txn)
    }
  }

  /*
   * Called to show initial toast and MetaMask extension toast
   */
  addTransaction(txn: Transaction) {
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

  getToastFromTransaction(txn: Transaction): Toast {
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

  // TODO: hook up to window.api listener
  handleShowInitialToast() {
    this.showInitialToast = true

    const initialToast: Toast = {
      status: 'success',
      title: t('hyperplayOverlay.greeting.title', 'HyperPlay Overlay'),
      subtext: t('hyperplayOverlay.greeting.description', {
        defaultValue:
          'HyperPlay Overlay is ready! Press {{overlayKeyMod}} + X to show or hide it.',
        overlayKeyMod: DeviceState.isMac ? 'Option' : 'Alt'
      }),
      isOpen: true,
      onClick: function () {
        this.isOpen = false
      },
      key: {
        type: 'initial'
      }
    }

    this.recentToasts.push(initialToast)

    setTimeout(() => {
      this.showInitialToast = false
    }, 11000)
  }

  get latestToast(): Toast | null {
    const lastToast = this.recentToasts.at(-1)
    if (lastToast === undefined) {
      return null
    }
    return lastToast
  }
}
const transactionState = new TransactionState()
export default transactionState

autorun(() => {
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
})
