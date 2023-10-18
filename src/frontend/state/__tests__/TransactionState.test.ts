/** @jest-environment jsdom */

import {
  ProxiedProviderEventInitiatedCallback,
  ProxiedProviderEventCallback
} from '../../../backend/hyperplay-proxy-server/providers/types'
import TransactionState from '../TransactionState'
import ExtensionState from '../ExtensionState'
import {
  EXTENSION_NOTIFICATION,
  INITIAL_TOAST,
  TxnStateToStatusMap
} from '../../../frontend/screens/TransactionNotification/constants'
/* eslint-disable @typescript-eslint/no-empty-function */

import i18next from 'i18next'
import translations_en from '../../../../public/locales/en/translation.json'
i18next.init({ resources: { en: { translations_en } } })

export type WrapRendererCallbackAny<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFunction extends (...args: any) => any
> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  ...args: [...Parameters<TFunction>]
) => ReturnType<TFunction>

let providerRequestInitiated: WrapRendererCallbackAny<
  ProxiedProviderEventInitiatedCallback
> = () => {}
function handleProviderRequestInitiated(cb: () => void) {
  providerRequestInitiated = cb
}

let providerRequestPending: WrapRendererCallbackAny<
  ProxiedProviderEventCallback
> = () => {}
function handleProviderRequestPending(cb: () => void) {
  providerRequestPending = cb
}

let providerRequestCompleted: WrapRendererCallbackAny<
  ProxiedProviderEventCallback
> = () => {}
function handleProviderRequestCompleted(cb: () => void) {
  providerRequestCompleted = cb
}

let providerRequestFailed: WrapRendererCallbackAny<
  ProxiedProviderEventCallback
> = () => {}
function handleProviderRequestFailed(cb: () => void) {
  providerRequestFailed = cb
}

let showNotificationInWebview = () => {}
function handleShowNotificationInWebview(cb: () => void) {
  showNotificationInWebview = cb
}

let showInitialToast = () => {}
function handleShowInitialToast(cb: () => void) {
  showInitialToast = cb
}

Object.defineProperty(window, 'api', {
  writable: true,
  value: {
    handleProviderRequestInitiated,
    handleProviderRequestPending,
    handleProviderRequestCompleted,
    handleProviderRequestFailed,
    handleShowNotificationInWebview,
    getExtensionId: jest.fn(),
    handleRemoveNotificationInWebview: jest.fn(),
    handleShowPopupInWebview: jest.fn(),
    handleRemovePopupInWebview: jest.fn(),
    handleShowInitialToast
  }
})

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

describe('TransactionState.ts', () => {
  beforeEach(() => {
    TransactionState.reset()
    TransactionState.init()
    ExtensionState.init()
  })
  test('should show txn initiated toast', async () => {
    providerRequestInitiated({}, 1, 'default')

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(
        translations_en.hyperplayOverlay.txnRequest.INITIATED
      )
      expect(toast.subtext).toBe(
        translations_en.hyperplayOverlay.description.INITIATED
      )
      expect(toast.status).toBe(TxnStateToStatusMap.initiated)
      expect(toast.isOpen).toBe(true)
    }
  })

  test('should show txn pending toast then close it', async () => {
    providerRequestInitiated({}, 1, 'default')
    providerRequestPending({}, 1)

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(
        translations_en.hyperplayOverlay.txnRequest.PENDING
      )
      expect(toast.subtext).toBe(
        translations_en.hyperplayOverlay.description.PENDING
      )
      expect(toast.status).toBe(TxnStateToStatusMap.pending)
      expect(toast.isOpen).toBe(true)

      // close toast
      TransactionState.closeToast(toast.key)
      expect(TransactionState.latestToast?.isOpen).toBe(false)
    }
  })

  test('should show txn confirmed toast then close it', async () => {
    providerRequestInitiated({}, 1, 'default')
    providerRequestPending({}, 1)
    providerRequestCompleted({}, 1)

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(
        translations_en.hyperplayOverlay.txnRequest.CONFIRMED
      )
      expect(toast.subtext).toBe(
        translations_en.hyperplayOverlay.description.CONFIRMED
      )
      expect(toast.status).toBe(TxnStateToStatusMap.confirmed)
      expect(toast.isOpen).toBe(true)

      // close toast
      TransactionState.closeToast(toast.key)
      expect(TransactionState.latestToast?.isOpen).toBe(false)
    }
  })

  test('should show txn confirmed toast then close it after delay', async () => {
    providerRequestInitiated({}, 1, 'default')
    providerRequestPending({}, 1)
    TransactionState.TXN_CONFIRMED_DELAY_MS = 100
    providerRequestCompleted({}, 1)

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      await wait(150)
      expect(TransactionState.latestToast?.isOpen).toBe(false)
    }
  })

  test('should show txn failed toast', async () => {
    providerRequestInitiated({}, 1, 'default')
    providerRequestPending({}, 1)
    providerRequestFailed({}, 1)

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(
        translations_en.hyperplayOverlay.txnRequest.FAILED
      )
      expect(toast.subtext).toBe(
        translations_en.hyperplayOverlay.description.FAILED
      )
      expect(toast.status).toBe(TxnStateToStatusMap.failed)
      expect(toast.isOpen).toBe(true)
    }
  })

  test('should show extension notification toast', async () => {
    showNotificationInWebview()

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(EXTENSION_NOTIFICATION.TITLE())
      expect(toast.subtext).toBe(EXTENSION_NOTIFICATION.DESCRIPTION(false))
      expect(toast.status).toBe(EXTENSION_NOTIFICATION.STATUS)
      expect(toast.isOpen).toBe(true)
    }
  })

  test('should show initial toast then hide after delay', async () => {
    TransactionState.INITIAL_TOAST_DELAY_MS = 100
    showInitialToast()

    const toast = TransactionState.latestToast
    expect(toast !== null).toBe(true)
    if (toast !== null) {
      expect(toast.title).toBe(INITIAL_TOAST.TITLE())
      expect(toast.subtext).toBe(INITIAL_TOAST.DESCRIPTION(false))
      expect(toast.status).toBe(INITIAL_TOAST.STATUS)
      expect(toast.isOpen).toBe(true)
      await wait(150)
      expect(TransactionState.latestToast?.isOpen).toBe(false)
    }
  })
})
