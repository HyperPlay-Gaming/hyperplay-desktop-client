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

export interface OverlayStateInterface {
  renderState: OverlayRenderState
  showOverlay: boolean | null
  isFullscreenOverlay: boolean
  title: string
}
