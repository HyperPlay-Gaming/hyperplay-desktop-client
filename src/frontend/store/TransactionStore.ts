import { makeAutoObservable } from 'mobx'
import { TransactionMap, TransactionState, Transaction } from './types'

class TransactionStore {
  transactions: TransactionMap = new Map()

  constructor() {
    makeAutoObservable(this)

    this.init()
  }

  init() {
    window.api.handleProviderRequestInitiated((_e, id, method) => {
      this.transactions.set(id, {
        id,
        method,
        isOpen: true,
        state: TransactionState.INITIATED
      })
    })

    window.api.handleProviderRequestPending((_e, id) => {
      this.transactions.set(id, {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.PENDING
      })
    })

    window.api.handleProviderRequestCompleted((_e, id) => {
      this.transactions.set(id, {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.CONFIRMED
      })
    })

    window.api.handleProviderRequestFailed((_e, id) => {
      this.transactions.set(id, {
        ...this.transactions.get(id)!,
        isOpen: true,
        state: TransactionState.FAILED
      })
    })
  }

  closeTransaction(id: number) {
    const transaction = this.transactions.get(id)

    if (
      transaction?.state === TransactionState.FAILED ||
      transaction?.state === TransactionState.CONFIRMED
    )
      this.transactions.delete(id)
    else
      this.transactions.set(id, {
        ...transaction!,
        isOpen: false
      })
  }

  get firstTransaction(): Transaction | undefined {
    const item = this.transactions.entries().next().value
    console.log(this.transactions)
    return item ? item[1] : undefined
  }
}

export default new TransactionStore()
