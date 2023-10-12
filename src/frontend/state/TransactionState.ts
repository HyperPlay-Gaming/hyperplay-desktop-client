import { autorun, makeAutoObservable } from 'mobx'
import {
  TransactionMap,
  TRANSACTION_STATE,
  Transaction,
  Toast
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
  transactions: TransactionMap = new Map()
  recentToasts: Toast[] = []

  // txn id for mm mobile and wallet connect wallets
  maxId = -1

  showInitialToast = false

  constructor() {
    makeAutoObservable(this)

    this.init()
  }

  init() {
    window.api.handleProviderRequestInitiated((_e, id, method) => {
      const txn = {
        id,
        method,
        isOpen: true,
        state: TRANSACTION_STATE.INITIATED
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestPending((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TRANSACTION_STATE.PENDING
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestCompleted((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TRANSACTION_STATE.CONFIRMED
      }
      this.addTransactionAndUpdateId(id, txn)
    })

    window.api.handleProviderRequestFailed((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TRANSACTION_STATE.FAILED
      }
      this.addTransactionAndUpdateId(id, txn)
    })
  }

  removeTransaction(id: number) {
    this.transactions.delete(id)
    this.updateMaxId(id)
  }

  closeTransaction(id: number) {
    const transaction = this.transactions.get(id)

    if (
      transaction?.state === TRANSACTION_STATE.FAILED ||
      transaction?.state === TRANSACTION_STATE.CONFIRMED
    ) {
      this.removeTransaction(id)
    } else {
      const txn = {
        ...transaction!,
        isOpen: false
      }
      this.addTransactionAndUpdateId(id, txn)
    }
  }

  updateMaxId(id: number) {
    if (id >= this.maxId) {
      this.maxId = id
    }
  }

  addTransactionAndUpdateId(id: number, txn: Transaction) {
    this.transactions.set(id, txn)
    this.updateMaxId(id)
    if (id === this.maxId) {
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
      setTimeout(() => this.removeTransaction(txn.id), 5000)
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
      }
    }

    this.recentToasts.push(initialToast)

    setTimeout(() => {
      this.showInitialToast = false
    }, 11000)
  }

  get latestToast(): Toast | null {
    const lastToast = this.recentToasts.at(-1)
    if (lastToast === undefined || !lastToast.isOpen) {
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
      }
    }
    transactionState.recentToasts.push(extensionNotificationToast)
  }
})
