import { getHandleFunction } from 'backend/utils/ipc_renderer_helper'
import { OverlayMode } from 'common/state/interfaces'
import { OverlayRenderState, WrapRendererCallback } from 'common/types'
import { PROVIDERS } from 'common/types/proxy-types'
import { ipcRenderer } from 'electron'
import { Toast, ToastKey } from 'frontend/store/types'

export const getExtensionId = async () => ipcRenderer.invoke('getExtensionId')

export const handleStateUpdate = {
  overlay: {
    renderState: getHandleFunction<
      WrapRendererCallback<(renderState: OverlayRenderState) => void>
    >('overlay_state_update_renderState'),
    isFullscreenOverlay: getHandleFunction<
      WrapRendererCallback<(isFullscreenOverlay: boolean) => void>
    >('overlay_state_update_isFullscreenOverlay'),
    showOverlay: getHandleFunction<
      WrapRendererCallback<(showOverlay: boolean) => void>
    >('overlay_state_update_showOverlay'),
    title: getHandleFunction<
      WrapRendererCallback<(title: OverlayMode) => void>
    >('overlay_state_update_title')
  },
  extension: {
    isPopupOpen: getHandleFunction<
      WrapRendererCallback<(isPopupOpen: boolean) => void>
    >('extension_state_update_isPopupOpen'),
    isNotificationOpen: getHandleFunction<
      WrapRendererCallback<(isNotificationOpen: boolean) => void>
    >('extension_state_update_isNotificationOpen')
  },
  transaction: {
    isInitialToastShown: getHandleFunction<
      WrapRendererCallback<(isInitialToastShown: boolean) => void>
    >('transaction_state_update_isInitialToastShown'),
    latestToast: getHandleFunction<
      WrapRendererCallback<(latestToast: Toast) => void>
    >('transaction_state_update_latestToast')
  },
  walletState: {
    address: getHandleFunction<WrapRendererCallback<(address: string) => void>>(
      'wallet_state_update_address'
    ),
    isConnected: getHandleFunction<
      WrapRendererCallback<(isConnected: boolean) => void>
    >('wallet_state_update_isConnected'),
    provider: getHandleFunction<
      WrapRendererCallback<(provider: PROVIDERS) => void>
    >('wallet_state_update_provider'),
    otp: getHandleFunction<WrapRendererCallback<(otp: string) => void>>(
      'wallet_state_update_otp'
    )
  }
}

export const initialState = {
  walletState: {
    address: async () => ipcRenderer.invoke('get_wallet_state_address'),
    isConnected: async () => ipcRenderer.invoke('get_wallet_state_isConnected'),
    provider: async () => ipcRenderer.invoke('get_wallet_state_provider'),
    otp: async () => ipcRenderer.invoke('get_wallet_state_otp')
  },
  extensionState: {
    isPopupOpen: async () =>
      ipcRenderer.invoke('get_extension_state_isPopupOpen')
  }
}
export const toggleIsPopupOpen = () => ipcRenderer.send('toggleIsPopupOpen')

export const showPopup = () => ipcRenderer.send('showPopup')

export const overlayReady = () => ipcRenderer.send('overlayReady')

export const toastCloseOnClick = (key: ToastKey) =>
  ipcRenderer.send('toastCloseOnClick', key)

export const lockPopup = (lock: boolean) => ipcRenderer.send('lockPopup', lock)

export const killOverlay = () => ipcRenderer.send('killOverlay')
