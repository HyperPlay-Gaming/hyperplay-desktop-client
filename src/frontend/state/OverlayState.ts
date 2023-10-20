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

  constructor() {
    makeAutoObservable(this)
  }

  get url() {
    return this.browserGameUrl
  }

  handleUpdateOverlayRenderState(
    event: Electron.IpcRendererEvent,
    renderState: OverlayRenderState
  ) {
    Object.assign(this, renderState)
  }

  init() {
    window.api.handleUpdateOverlayRenderState(
      this.handleUpdateOverlayRenderState.bind(this)
    )
    window.api.handleUpdateOverlayVisibility(
      this.handleUpdateOverlayVisibility.bind(this)
    )
    window.api.overlayReady()
  }

  get isFullscreenOverlay() {
    return this.showToasts && this.showExtension && this.showExitGameButton
  }
}

const overlayState = new OverlayState()
export default overlayState
