import { OverlayRenderState } from 'common/types'
import { Toast } from 'frontend/store/types'

export interface ExtensionStateInterface {
  isPopupOpen: boolean
  isNotificationOpen: boolean
}

export interface TransactionStateInterface {
  isInitialToastShown: boolean
  latestToast: Toast | null
}

export type OverlayMode =
  | 'HyperPlay Extension'
  | 'HyperPlay Exit Game'
  | 'HyperPlay Toasts'
  | 'HyperPlay Hint Text'
  | 'HyperPlay Browser Game'
  | 'HyperPlay Extension Overlay'
  | null

export interface OverlayStateInterface {
  renderState: OverlayRenderState
  showOverlay: boolean | null
  isFullscreenOverlay: boolean
  title: OverlayMode
}
