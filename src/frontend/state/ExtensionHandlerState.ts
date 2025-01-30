import { makeAutoObservable, runInAction } from 'mobx'

class ExtensionHandlerState {
  navigateTo: string | null = null

  async handleOpenMMHomePage(
    event: Electron.IpcRendererEvent,
    pathname: string
  ) {
    runInAction(() => {
      this.navigateTo = 'metamaskHome' + pathname
    })
  }

  async handleOpenMMSnapsPage() {
    this.navigateTo = 'metamaskSnaps'
  }

  async handleOpenMMPortfolioPage(
    event: Electron.IpcRendererEvent,
    pathname: string
  ) {
    this.navigateTo = 'metamaskPortfolio' + pathname
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new ExtensionHandlerState()
