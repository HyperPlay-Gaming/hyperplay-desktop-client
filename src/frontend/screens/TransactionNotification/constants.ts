import { TransactionState } from 'frontend/store/types'

type ModalText = Record<string, Record<TransactionState, string>>

export const TITLE: ModalText = {
  default: {
    [TransactionState.INITIATED]: 'Transaction request pending',
    [TransactionState.PENDING]: 'Transaction submitted',
    [TransactionState.FAILED]: 'Transaction interrupted',
    [TransactionState.CONFIRMED]: 'Transaction confirmed'
  },
  eth_sendTransaction: {
    [TransactionState.INITIATED]: 'Transaction request pending',
    [TransactionState.PENDING]: 'Transaction submitted',
    [TransactionState.FAILED]: 'Transaction interrupted',
    [TransactionState.CONFIRMED]: 'Transaction confirmed'
  },
  eth_signTypedData_v3: {
    [TransactionState.INITIATED]: 'Signature request pending',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Signature interrupted',
    [TransactionState.CONFIRMED]: 'Signature submitted'
  },
  eth_personalSign: {
    [TransactionState.INITIATED]: 'Signature request pending',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Signature interrupted',
    [TransactionState.CONFIRMED]: 'Signature submitted'
  },
  wallet_watchAsset: {
    [TransactionState.INITIATED]: 'Custom token pending',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Custom token canceled',
    [TransactionState.CONFIRMED]: 'Custom token added'
  },
  wallet_addEthereumChain: {
    [TransactionState.INITIATED]: 'Custom network request',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Custom network canceled',
    [TransactionState.CONFIRMED]: 'Custom network added'
  },
  wallet_switchEthereumChain: {
    [TransactionState.INITIATED]: 'Custom network request',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Custom network canceled',
    [TransactionState.CONFIRMED]: 'Custom network added'
  }
}

export const DESCRIPTION: Record<TransactionState, string> = {
  [TransactionState.INITIATED]:
    'A wallet confirmation is pending in your mobile wallet',
  [TransactionState.PENDING]:
    "Waiting for blockchain confirmation. We'll let you know when it's confirmed",
  [TransactionState.FAILED]:
    'The transaction was canceled or not submitted, please try again',
  [TransactionState.CONFIRMED]: 'The transaction was successfully confirmed!'
}
