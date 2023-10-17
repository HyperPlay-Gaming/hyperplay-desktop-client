/** @jest-environment jsdom */

import {
  ProxiedProviderEventInitiatedCallback,
  ProxiedProviderEventCallback
} from '../../../backend/hyperplay-proxy-server/providers/types'
import TransactionState from '../TransactionState'
import { TxnStateToStatusMap } from '../../../frontend/screens/TransactionNotification/constants'
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

Object.defineProperty(window, 'api', {
  writable: true,
  value: {
    handleProviderRequestInitiated,
    handleProviderRequestPending,
    handleProviderRequestCompleted,
    handleProviderRequestFailed
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
})
