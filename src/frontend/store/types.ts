import { TransactionToastProps } from '@hyperplay/ui'

export interface InitializableStore {
  init(): void | Promise<void>
}

export interface GenericStore {
  init: undefined | InitializableStore['init']
}

export enum TRANSACTION_STATE {
  INITIATED = 'initiated',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export type Transaction = {
  id: number
  method: string
  state: TRANSACTION_STATE
}

export type TransactionMap = Map<number, Transaction>

export interface ToastKey {
  type: 'initial' | 'transaction' | 'extension_notfication'
  txnId?: number
  txnState?: TRANSACTION_STATE
}

export interface Toast extends TransactionToastProps {
  isOpen: boolean
  key: ToastKey
}
