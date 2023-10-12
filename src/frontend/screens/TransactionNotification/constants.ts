import { TRANSACTION_STATE } from 'frontend/store/types'
import { t } from 'i18next'

type ModalText = Record<string, Record<TRANSACTION_STATE, () => string>>

const signatureRequestTexts = {
  [TRANSACTION_STATE.INITIATED]: () =>
    t(
      'hyperplayOverlay.signatureRequest.INITIATED',
      'Signature request pending'
    ),
  [TRANSACTION_STATE.PENDING]: () => '',
  [TRANSACTION_STATE.FAILED]: () =>
    t('hyperplayOverlay.signatureRequest.FAILED', 'Signature interrupted'),
  [TRANSACTION_STATE.CONFIRMED]: () =>
    t('hyperplayOverlay.signatureRequest.CONFIRMED', 'Signature submitted')
}

const txnRequestTexts = {
  [TRANSACTION_STATE.INITIATED]: () =>
    t('hyperplayOverlay.txnRequest.INITIATED', 'Transaction request pending'),
  [TRANSACTION_STATE.PENDING]: () =>
    t('hyperplayOverlay.txnRequest.PENDING', 'Transaction submitted'),
  [TRANSACTION_STATE.FAILED]: () =>
    t('hyperplayOverlay.txnRequest.FAILED', 'Transaction interrupted'),
  [TRANSACTION_STATE.CONFIRMED]: () =>
    t('hyperplayOverlay.txnRequest.CONFIRMED', 'Transaction confirmed')
}

const chainTexts = {
  [TRANSACTION_STATE.INITIATED]: () =>
    t('hyperplayOverlay.chainRequest.INITIATED', 'Custom network request'),
  [TRANSACTION_STATE.PENDING]: () => '',
  [TRANSACTION_STATE.FAILED]: () =>
    t('hyperplayOverlay.chainRequest.FAILED', 'Custom network canceled'),
  [TRANSACTION_STATE.CONFIRMED]: () =>
    t('hyperplayOverlay.chainRequest.CONFIRMED', 'Custom network added')
}

const walletWatchTexts = {
  [TRANSACTION_STATE.INITIATED]: () =>
    t(
      'hyperplayOverlay.walletWatch.INITIATED',
      'Add custom token request pending'
    ),
  [TRANSACTION_STATE.PENDING]: () => '',
  [TRANSACTION_STATE.FAILED]: () =>
    t('hyperplayOverlay.walletWatch.FAILED', 'Custom token request canceled'),
  [TRANSACTION_STATE.CONFIRMED]: () =>
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

export const DESCRIPTION: Record<TRANSACTION_STATE, () => string> = {
  [TRANSACTION_STATE.INITIATED]: () =>
    t(
      'hyperplayOverlay.description.INITIATED',
      'A wallet confirmation is pending in your mobile wallet'
    ),
  [TRANSACTION_STATE.PENDING]: () =>
    t(
      'hyperplayOverlay.description.PENDING',
      "Waiting for blockchain confirmation. We'll let you know when it's confirmed"
    ),
  [TRANSACTION_STATE.FAILED]: () =>
    t(
      'hyperplayOverlay.description.FAILED',
      'The transaction was canceled or not submitted, please try again'
    ),
  [TRANSACTION_STATE.CONFIRMED]: () =>
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
  [key in TRANSACTION_STATE]: statusType
}
export const TxnStateToStatusMap: TxnStateToStatusMapType = {
  initiated: 'pending',
  pending: 'submitted',
  confirmed: 'success',
  failed: 'error'
}

interface EXTENSION_NOTIFICATION_TYPE {
  TITLE: () => string
  DESCRIPTION: (isMac: boolean) => string
  STATUS: statusType
}

export const EXTENSION_NOTIFICATION: EXTENSION_NOTIFICATION_TYPE = {
  TITLE: () =>
    t('hyperplayOverlay.extensionNotification.TITLE', 'Transaction requested'),
  DESCRIPTION: (isMac: boolean) => {
    return t('hyperplayOverlay.extensionNotification.DESCRIPTION', {
      defaultValue: 'Press {{overlayKeyMod}} + X to see this transaction',
      overlayKeyMod: isMac ? 'Option' : 'Alt'
    })
  },

  STATUS: 'pending'
}
