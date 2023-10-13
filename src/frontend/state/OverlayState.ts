import { OverlayRenderState } from 'common/types'
import { PROVIDERS } from 'common/types/proxy-types'
import { autorun, makeAutoObservable } from 'mobx'
import WalletState from './WalletState'

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

  updateOverlayVisibility(show: boolean) {
    this.showOverlay = show
  }

  handleUpdateOverlayVisibility(
    event: Electron.IpcRendererEvent,
    show: boolean
  ) {
    this.updateOverlayVisibility(show)
  }

  init() {
    console.log('init overlay state')
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

autorun(() => {
  switch (WalletState.provider) {
    case PROVIDERS.METAMASK_EXTENSION:
      overlayState.showExtension = true
      break
    case PROVIDERS.WALLET_CONNECT:
      overlayState.showExtension = false
      break
    case PROVIDERS.METAMASK_MOBILE:
      overlayState.showExtension = false
      break
    case PROVIDERS.UNCONNECTED:
      overlayState.showExtension = false
      break
  }
})
