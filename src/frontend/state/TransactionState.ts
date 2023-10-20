import { makeAutoObservable } from 'mobx'
import { TRANSACTION_STATE } from 'frontend/store/types'

class TransactionState {
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
  }
}
const transactionState = new TransactionState()
export default transactionState
