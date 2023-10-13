/** @jest-environment jsdom */

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let providerRequestInitiated = () => {}
function handleProviderRequestInitiated(cb: () => void) {
  providerRequestInitiated = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let providerRequestPending = () => {}
function handleProviderRequestPending(cb: () => void) {
  providerRequestPending = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let providerRequestCompleted = () => {}
function handleProviderRequestCompleted(cb: () => void) {
  providerRequestCompleted = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let providerRequestFailed = () => {}
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

import TransactionState from '../TransactionState'

describe('TransactionState.ts', () => {
  test('should ', async () => {
    TransactionState.init()
  })
})
