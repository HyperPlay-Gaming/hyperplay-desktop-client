import { OverlayStateInterface } from 'common/state/interfaces'
import { OverlayRenderState } from 'common/types'
import { makeAutoObservable } from 'mobx'

class OverlayState implements OverlayStateInterface {
  renderState: OverlayRenderState = {
    showToasts: false,
    showBrowserGame: false,
    browserGameUrl: '',
    showHintText: false,
    showExitGameButton: false,
    showExtension: false,
    showBackgroundTint: false
  }

  showOverlay = false

  isFullscreenOverlay = false

  title = null

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        deep: true,
        proxy: false,
        name: 'OverlayState'
      }
    )
  }

  get url() {
    return this.renderState.browserGameUrl
  }

  private handleUpdateOverlayRenderState(
    event: Electron.IpcRendererEvent,
    renderState: OverlayRenderState
  ) {
    Object.assign(this.renderState, renderState)
  }

  private handleUpdateOverlayIsFullscreenOverlay(
    event: Electron.IpcRendererEvent,
    isFullscreenOverlay: boolean
  ) {
    this.isFullscreenOverlay = isFullscreenOverlay
  }

  private handleUpdateOverlayShowOverlay(
    event: Electron.IpcRendererEvent,
    showOverlay: boolean
  ) {
    this.showOverlay = showOverlay
  }

  private handleUpdateOverlayTitle(
    event: Electron.IpcRendererEvent,
    title: string
  ) {
    this.title = title
  }

  init() {
    window.api.handleStateUpdate.overlay.renderState(
      this.handleUpdateOverlayRenderState.bind(this)
    )
    window.api.handleStateUpdate.overlay.isFullscreenOverlay(
      this.handleUpdateOverlayIsFullscreenOverlay.bind(this)
    )
    window.api.handleStateUpdate.overlay.showOverlay(
      this.handleUpdateOverlayShowOverlay.bind(this)
    )
    window.api.handleStateUpdate.overlay.title(
      this.handleUpdateOverlayTitle.bind(this)
    )

    // This indicates the overlay state is ready to receive update overlay render state events
    window.api.overlayReady()
  }
}

export default new OverlayState()
