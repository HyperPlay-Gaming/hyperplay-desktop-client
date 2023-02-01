import { makeAutoObservable } from 'mobx'
import {
  TransactionMap,
  TransactionState,
  Transaction
} from 'frontend/store/types'

class TransactionStore {
  transactions: TransactionMap = new Map()
  latestTxn: Transaction | null = null
  maxId = -1

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
        state: TransactionState.INITIATED
      }
      this.transactions.set(id, txn)
      this.updateIfLatest(id, txn)
    })

    window.api.handleProviderRequestPending((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.PENDING
      }
      this.transactions.set(id, txn)
      this.updateIfLatest(id, txn)
    })

    window.api.handleProviderRequestCompleted((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.CONFIRMED
      }
      this.transactions.set(id, txn)
      this.updateIfLatest(id, txn)
    })

    window.api.handleProviderRequestFailed((_e, id) => {
      const txn = {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.FAILED
      }
      this.transactions.set(id, txn)
      this.updateIfLatest(id, txn)
    })
  }

  closeTransaction(id: number) {
    const transaction = this.transactions.get(id)

    if (
      transaction?.state === TransactionState.FAILED ||
      transaction?.state === TransactionState.CONFIRMED
    ) {
      this.transactions.delete(id)
      this.updateIfLatest(id, null)
    } else {
      const txn = {
        ...transaction!,
        isOpen: false
      }
      this.transactions.set(id, txn)
      this.updateIfLatest(id, txn)
    }
  }

  updateIfLatest(id: number, txn: Transaction | null) {
    if (id >= this.maxId) {
      this.maxId = id
      this.latestTxn = txn
    }
  }
}

export default new TransactionStore()
