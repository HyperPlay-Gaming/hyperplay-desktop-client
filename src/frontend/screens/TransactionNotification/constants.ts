import { TransactionState } from 'frontend/store/types'
import { t } from 'i18next'

type ModalText = Record<string, Record<TransactionState, () => string>>

const signatureRequestTexts = {
  [TransactionState.INITIATED]: () =>
    t(
      'hyperplayOverlay.signatureRequest.INITIATED',
      'Signature request pending'
    ),
  [TransactionState.PENDING]: () => '',
  [TransactionState.FAILED]: () =>
    t('hyperplayOverlay.signatureRequest.FAILED', 'Signature interrupted'),
  [TransactionState.CONFIRMED]: () =>
    t('hyperplayOverlay.signatureRequest.CONFIRMED', 'Signature submitted')
}

const txnRequestTexts = {
  [TransactionState.INITIATED]: () =>
    t('hyperplayOverlay.txnRequest.INITIATED', 'Transaction request pending'),
  [TransactionState.PENDING]: () =>
    t('hyperplayOverlay.txnRequest.PENDING', 'Transaction submitted'),
  [TransactionState.FAILED]: () =>
    t('hyperplayOverlay.txnRequest.FAILED', 'Transaction interrupted'),
  [TransactionState.CONFIRMED]: () =>
    t('hyperplayOverlay.txnRequest.CONFIRMED', 'Transaction confirmed')
}

const chainTexts = {
  [TransactionState.INITIATED]: () =>
    t('hyperplayOverlay.chainRequest.INITIATED', 'Custom network request'),
  [TransactionState.PENDING]: () => '',
  [TransactionState.FAILED]: () =>
    t('hyperplayOverlay.chainRequest.FAILED', 'Custom network canceled'),
  [TransactionState.CONFIRMED]: () =>
    t('hyperplayOverlay.chainRequest.CONFIRMED', 'Custom network added')
}

const walletWatchTexts = {
  [TransactionState.INITIATED]: () =>
    t(
      'hyperplayOverlay.walletWatch.INITIATED',
      'Add custom token request pending'
    ),
  [TransactionState.PENDING]: () => '',
  [TransactionState.FAILED]: () =>
    t('hyperplayOverlay.walletWatch.FAILED', 'Custom token request canceled'),
  [TransactionState.CONFIRMED]: () =>
    t('hyperplayOverlay.walletWatch.CONFIRMED', 'Custom token added')
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
  wallet_watchAsset: walletWatchTexts,
  wallet_addEthereumChain: chainTexts,
  wallet_switchEthereumChain: chainTexts
}

export const DESCRIPTION: Record<TransactionState, () => string> = {
  [TransactionState.INITIATED]: () =>
    t(
      'hyperplayOverlay.description.INITIATED',
      'A wallet confirmation is pending in your mobile wallet'
    ),
  [TransactionState.PENDING]: () =>
    t(
      'hyperplayOverlay.description.PENDING',
      "Waiting for blockchain confirmation. We'll let you know when it's confirmed"
    ),
  [TransactionState.FAILED]: () =>
    t(
      'hyperplayOverlay.description.FAILED',
      'The transaction was canceled or not submitted, please try again'
    ),
  [TransactionState.CONFIRMED]: () =>
    t(
      'hyperplayOverlay.description.CONFIRMED',
      'The transaction was successfully confirmed!'
    )
}

// todo: import from hyperplay/ui package
export type statusType =
  | 'pending'
  | 'submitted'
  | 'error'
  | 'alert'
  | 'success'
  | 'error'

type TxnStateToStatusMapType = {
  [key in TransactionState]: statusType
}
export const TxnStateToStatusMap: TxnStateToStatusMapType = {
  initiated: 'pending',
  pending: 'submitted',
  confirmed: 'success',
  failed: 'error'
}

interface EXTENSION_NOTIFICATION_TYPE {
  TITLE: () => string
  DESCRIPTION: () => string
  STATUS: statusType
}

export const EXTENSION_NOTIFICATION: EXTENSION_NOTIFICATION_TYPE = {
  TITLE: () =>
    t('hyperplayOverlay.extensionNotification.TITLE', 'Transaction requested'),
  DESCRIPTION: () =>
    t(
      'hyperplayOverlay.extensionNotification.DESCRIPTION',
      'Press Alt + X to see this transaction'
    ),
  STATUS: 'pending'
}
