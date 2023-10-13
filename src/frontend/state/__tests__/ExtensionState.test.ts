/** @jest-environment jsdom */

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let showNotificationInWebview = () => {}
function handleShowNotificationInWebview(cb: () => void) {
  showNotificationInWebview = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let removeNotificationInWebview = () => {}
function handleRemoveNotificationInWebview(cb: () => void) {
  removeNotificationInWebview = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let showPopupInWebview = () => {}
function handleShowPopupInWebview(cb: () => void) {
  showPopupInWebview = cb
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
let removePopupInWebview = () => {}
function handleRemovePopupInWebview(cb: () => void) {
  removePopupInWebview = cb
}

const testExtensionId = '0xtestExtensionId'

Object.defineProperty(window, 'api', {
  writable: true,
  value: {
    handleShowNotificationInWebview,
    handleRemoveNotificationInWebview,
    handleShowPopupInWebview,
    handleRemovePopupInWebview,
    getExtensionId: () => testExtensionId
  }
})

import ExtensionState from '../ExtensionState'

describe('ExtensionState.ts', () => {
  test('should show notification and hide popup then hide all', async () => {
    ExtensionState.init()
    showNotificationInWebview()

    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(true)

    ExtensionState.toggleIsPopupOpen()
    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(false)

    ExtensionState.toggleIsPopupOpen()
    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(true)
  })

  test('should have the correct extension id', async () => {
    ExtensionState.init()
    expect(ExtensionState.extensionId).toBe(testExtensionId)
  })

  test('should show notification then remove it', async () => {
    ExtensionState.init()
    showNotificationInWebview()

    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(true)

    removeNotificationInWebview()

    // Should we close the popup here instead?
    expect(ExtensionState.isPopupOpen).toBe(true)
    expect(ExtensionState.isNotificationOpen).toBe(false)
  })

  test('should show popup then remove it', async () => {
    ExtensionState.init()
    showPopupInWebview()

    expect(ExtensionState.isPopupOpen).toBe(true)
    expect(ExtensionState.isNotificationOpen).toBe(false)

    removePopupInWebview()

    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(false)
  })

  test('should show popup then lock and fail to remove it, then unlock and remove', async () => {
    ExtensionState.init()
    showPopupInWebview()
    ExtensionState.lockPopup()

    expect(ExtensionState.isPopupOpen).toBe(true)
    expect(ExtensionState.isNotificationOpen).toBe(false)

    removePopupInWebview()

    expect(ExtensionState.isPopupOpen).toBe(true)
    expect(ExtensionState.isNotificationOpen).toBe(false)

    ExtensionState.unlockPopup()
    removePopupInWebview()

    expect(ExtensionState.isPopupOpen).toBe(false)
    expect(ExtensionState.isNotificationOpen).toBe(false)
  })
})
