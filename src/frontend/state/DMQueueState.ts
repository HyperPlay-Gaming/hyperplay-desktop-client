import { DMQueueElement, DownloadManagerState } from 'common/types'
import { DMQueue } from 'frontend/types'
import { makeAutoObservable } from 'mobx'

class DMQueueState {
  dmState: DownloadManagerState = 'idle'
  currentElement: DMQueueElement | undefined

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    window.api.getDMQueueInformation().then(this.setDmState.bind(this))
    window.api.handleDMQueueInformation(
      this.handleDMQueueInformation.bind(this)
    )
  }

  handleDMQueueInformation(
    e: Electron.IpcRendererEvent,
    elements: DMQueueElement[],
    state: DownloadManagerState
  ) {
    if (elements) {
      this.currentElement = elements[0]
      this.dmState = state
    }
  }

  setDmState({ state }: DMQueue) {
    this.dmState = state
  }

  isPaused(appName: string) {
    return (
      this.dmState === 'paused' &&
      this.currentElement?.params.appName === appName
    )
  }

  isInstalling(appName: string) {
    return (
      this.dmState === 'running' &&
      this.currentElement?.params.appName === appName
    )
  }
}

export default new DMQueueState()
