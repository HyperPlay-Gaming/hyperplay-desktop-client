import { TransactionState } from 'frontend/store/types'

type ModalText = Record<string, Record<TransactionState, string>>

const signatureRequestTexts = {
  [TransactionState.INITIATED]: 'Signature request pending',
  [TransactionState.PENDING]: '',
  [TransactionState.FAILED]: 'Signature interrupted',
  [TransactionState.CONFIRMED]: 'Signature submitted'
}

const txnRequestTexts = {
  [TransactionState.INITIATED]: 'Transaction request pending',
  [TransactionState.PENDING]: 'Transaction submitted',
  [TransactionState.FAILED]: 'Transaction interrupted',
  [TransactionState.CONFIRMED]: 'Transaction confirmed'
}

const chainTexts = {
  [TransactionState.INITIATED]: 'Custom network request',
  [TransactionState.PENDING]: '',
  [TransactionState.FAILED]: 'Custom network canceled',
  [TransactionState.CONFIRMED]: 'Custom network added'
}

export const TITLE: ModalText = {
  default: txnRequestTexts,
  eth_sendTransaction: txnRequestTexts,
  eth_sendRawTransaction: txnRequestTexts,
  eth_signTransaction: signatureRequestTexts,
  eth_signTypedData_v1: signatureRequestTexts,
  eth_signTypedData_v3: signatureRequestTexts,
  eth_signTypedData_v4: signatureRequestTexts,
  eth_personalSign: signatureRequestTexts,
  wallet_watchAsset: {
    [TransactionState.INITIATED]: 'Add custom token request pending',
    [TransactionState.PENDING]: '',
    [TransactionState.FAILED]: 'Custom token request canceled',
    [TransactionState.CONFIRMED]: 'Custom token added'
  },
  wallet_addEthereumChain: chainTexts,
  wallet_switchEthereumChain: chainTexts
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
