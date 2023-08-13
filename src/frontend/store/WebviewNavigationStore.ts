import { InitializableStore } from './types'
import { makeAutoObservable } from 'mobx'

export class WebviewNavigationStore implements InitializableStore {
  currentUrl = ''

  init() {
    makeAutoObservable(this)
  }
}

const webviewNavigationStore = new WebviewNavigationStore()

export default webviewNavigationStore
