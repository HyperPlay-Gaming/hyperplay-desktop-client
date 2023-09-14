import { makeAutoObservable } from 'mobx'

export class WebviewNavigationStore {
  private url = ''

  constructor() {
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
