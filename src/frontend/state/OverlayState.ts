import { OverlayRenderState } from 'common/types'
import { makeAutoObservable } from 'mobx'

class OverlayState {
  state: OverlayRenderState = {
    showToasts: false,
    showBrowserGame: false,
    browserGameUrl: '',
    showHintText: false,
    showExitGameButton: false,
    showExtension: false
  }

  constructor() {
    makeAutoObservable(this)
  }

  handleUpdateOverlayRenderState(
    event: Electron.IpcRendererEvent,
    renderState: OverlayRenderState
  ) {
    this.state = renderState
  }

  init() {
    console.log('init overlay state')
    window.api.handleUpdateOverlayRenderState(
      this.handleUpdateOverlayRenderState
    )
  }

  get isFullscreenOverlay() {
    return (
      this.state.showToasts &&
      this.state.showExtension &&
      this.state.showExitGameButton
    )
  }
}

export default new OverlayState()
