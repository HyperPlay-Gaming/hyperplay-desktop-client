import { InitializableStore } from './types'
import { makeAutoObservable } from 'mobx'

export class WebviewNavigationStore implements InitializableStore {
  private url = ''

  init() {
    makeAutoObservable(this)
  }

  get currentUrl() {
    return this.url
  }

  setCurrentUrl(url: string) {
    this.url = url
  }
}

const webviewNavigationStore = new WebviewNavigationStore()

export default webviewNavigationStore
