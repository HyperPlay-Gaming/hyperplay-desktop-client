export interface InitializableStore {
  init(): void | Promise<void>
}

export interface GenericStore {
  init: undefined | InitializableStore['init']
}

export enum TransactionState {
  INITIATED = 'initiated',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export type Transaction = {
  id: number
  method: string
  state: TransactionState
  isOpen: boolean
}

export type TransactionMap = Map<number, Transaction>
