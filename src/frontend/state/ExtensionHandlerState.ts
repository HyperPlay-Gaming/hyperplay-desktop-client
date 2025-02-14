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

  bindListeners() {
    const removeOpenMetaMaskHomePageListener =
      window.api.handleOpenMetaMaskHomePage(
        this.handleOpenMMHomePage.bind(this)
      )
    const removeOpenMetaMaskSnapsPageListener =
      window.api.handleOpenMetaMaskSnapsPage(
        this.handleOpenMMSnapsPage.bind(this)
      )
    const removeOpenMetaMaskPortfolioPageListener =
      window.api.handleOpenMetaMaskPortfolioPage(
        this.handleOpenMMPortfolioPage.bind(this)
      )

    return () => {
      removeOpenMetaMaskHomePageListener()
      removeOpenMetaMaskSnapsPageListener()
      removeOpenMetaMaskPortfolioPageListener()
    }
  }

  constructor() {
    makeAutoObservable(this)
    this.bindListeners()
  }
}

export default new ExtensionHandlerState()
