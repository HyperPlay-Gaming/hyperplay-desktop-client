import { OverlayRenderState } from 'common/types'
import { makeAutoObservable } from 'mobx'

class OverlayState {
  showToasts = false
  showBrowserGame = false
  browserGameUrl = ''
  showHintText = false
  showExitGameButton = false
  showExtension = false
  showBackgroundTint = false

  showOverlay = false

  isFullscreenOverlay = false

  constructor() {
    makeAutoObservable(this)
  }

  get url() {
    return this.browserGameUrl
  }

  private handleUpdateOverlayRenderState(
    event: Electron.IpcRendererEvent,
    renderState: OverlayRenderState
  ) {
    Object.assign(this, renderState)
  }

  private handleUpdateOverlayIsFullscreenOverlay(
    event: Electron.IpcRendererEvent,
    isFullscreenOverlay: boolean
  ) {
    this.isFullscreenOverlay = isFullscreenOverlay
  }

  init() {
    window.api.handleStateUpdate.overlay.renderState(
      this.handleUpdateOverlayRenderState.bind(this)
    )
    window.api.handleStateUpdate.overlay.isFullscreenOverlay(
      this.handleUpdateOverlayIsFullscreenOverlay.bind(this)
    )
  }
}

export default new OverlayState()
