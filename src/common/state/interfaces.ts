import { OverlayRenderState } from 'common/types'
import { OverlayWindowState } from 'common/types/proxy-types'
import { Toast } from 'frontend/store/types'

export interface ExtensionStateInterface {
  isPopupOpen: boolean
  isNotificationOpen: boolean
}

export interface TransactionStateInterface {
  isInitialToastShown: boolean
  latestToast: Toast | null
  overlayWindowState: OverlayWindowState | undefined
}

export interface OverlayStateInterface {
  renderState: OverlayRenderState
  showOverlay: boolean | null
  isFullscreenOverlay: boolean
}
