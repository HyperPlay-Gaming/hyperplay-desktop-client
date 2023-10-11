import React, { PureComponent } from 'react'

import {
  ConnectivityStatus,
  GameInfo,
  GameStatus,
  Runner,
  WineVersionInfo,
  InstallParams,
  LibraryTopSectionOptions,
  MetricsOptInStatus
} from 'common/types'
import {
  Category,
  ContextType,
  DialogModalOptions,
  ExternalLinkDialogOptions
} from 'frontend/types'
import { withTranslation } from 'react-i18next'
import { getGameInfo, launch, notify } from '../helpers'
import { TFunction, i18n, t } from 'i18next'

import ContextProvider from './ContextProvider'

import {
  configStore,
  gogConfigStore,
  metricsStore,
  nileConfigStore,
  wineDownloaderInfoStore
} from 'frontend/helpers/electronStores'
import { InstallModal } from 'frontend/screens/Library/components'
import { IpcRendererEvent } from 'electron/renderer'
import { NileRegisterData } from 'common/types/nile'
import libraryState from 'frontend/state/libraryState'
import storeAuthState from './storeAuthState'

const storage: Storage = window.localStorage

const RTL_LANGUAGES = ['fa', 'ar']

type T = TFunction<'gamepage'> & TFunction<'translations'>

interface Props {
  children: React.ReactNode
  i18n: i18n
  t: T
}

interface StateProps {
  category: Category
  wineVersions: WineVersionInfo[]
  error: boolean
  language: string
  layout: string
  libraryStatus: GameStatus[]
  platform: NodeJS.Platform | 'unknown'
  refreshing: boolean
  refreshingInTheBackground: boolean
  theme: string
  zoomPercent: number
  primaryFontFamily: string
  secondaryFontFamily: string
  allTilesInColor: boolean
  sidebarCollapsed: boolean
  activeController: string
  connectivity: { status: ConnectivityStatus; retryIn: number }
  dialogModalOptions: DialogModalOptions
  externalLinkDialogOptions: ExternalLinkDialogOptions
  showInstallModal: {
    show: boolean
    gameInfo: GameInfo | null
    appName: string
    runner: Runner
  }
  settingsModalOpen: {
    value: boolean
    type: 'settings' | 'log'
    gameInfo?: GameInfo | null
  }
  showMetaMaskBrowserSidebarLinks: boolean
  metricsOptInStatus: MetricsOptInStatus
}

class GlobalState extends PureComponent<Props> {
  state: StateProps = {
    category: (storage.getItem('category') as Category) || 'legendary',
    wineVersions: wineDownloaderInfoStore.get('wine-releases', []),
    error: false,
    language: this.props.i18n.language,
    layout: storage.getItem('layout') || 'grid',
    libraryStatus: [],
    platform: 'unknown',
    refreshing: false,
    refreshingInTheBackground: true,
    sidebarCollapsed: JSON.parse(
      storage.getItem('sidebar_collapsed') || 'false'
    ),
    theme: configStore.get('theme', ''),
    zoomPercent: configStore.get('zoomPercent', 100),
    secondaryFontFamily:
      configStore.get_nodefault('contentFontFamily') ||
      getComputedStyle(document.documentElement).getPropertyValue(
        '--default-secondary-font-family'
      ),
    primaryFontFamily:
      configStore.get_nodefault('actionsFontFamily') ||
      getComputedStyle(document.documentElement).getPropertyValue(
        '--default-primary-font-family'
      ),
    allTilesInColor: configStore.get('allTilesInColor', false),
    activeController: '',
    connectivity: { status: 'offline', retryIn: 0 },
    showInstallModal: {
      show: false,
      appName: '',
      runner: 'legendary',
      gameInfo: null
    },
    dialogModalOptions: { showDialog: false },
    externalLinkDialogOptions: { showDialog: false },
    settingsModalOpen: { value: false, type: 'settings', gameInfo: undefined },
    showMetaMaskBrowserSidebarLinks: false,
    metricsOptInStatus: metricsStore.get(
      'metricsOptInStatus',
      MetricsOptInStatus.undecided
    ) as MetricsOptInStatus
  }

  setLanguage = (newLanguage: string) => {
    this.setState({ language: newLanguage })
  }

  setTheme = (newThemeName: string) => {
    configStore.set('theme', newThemeName)
    this.setState({ theme: newThemeName })
    window.setTheme(newThemeName)
  }

  zoomTimer: NodeJS.Timeout | undefined = undefined
  setZoomPercent = (newZoomPercent: number) => {
    if (this.zoomTimer) clearTimeout(this.zoomTimer)

    configStore.set('zoomPercent', newZoomPercent)
    this.setState({ zoomPercent: newZoomPercent })

    this.zoomTimer = setTimeout(() => {
      window.api.setZoomFactor((newZoomPercent / 100).toString())
    }, 500)
  }

  setPrimaryFontFamily = (newFontFamily: string, saveToFile = true) => {
    if (saveToFile) configStore.set('actionsFontFamily', newFontFamily)
    document.documentElement.style.setProperty(
      '--primary-font-family',
      newFontFamily
    )
  }

  setSecondaryFontFamily = (newFontFamily: string, saveToFile = true) => {
    if (saveToFile) configStore.set('contentFontFamily', newFontFamily)
    document.documentElement.style.setProperty(
      '--secondary-font-family',
      newFontFamily
    )
  }

  setAllTilesInColor = (value: boolean) => {
    configStore.set('allTilesInColor', value)
    this.setState({ allTilesInColor: value })
  }

  setShowHidden = (value: boolean) => {
    this.setState({ showHidden: value })
  }

  setShowFavourites = (value: boolean) => {
    this.setState({ showFavourites: value })
  }

  setShowNonAvailable = (value: boolean) => {
    this.setState({ showNonAvailable: value })
  }

  setSideBarCollapsed = (value: boolean) => {
    this.setState({ sidebarCollapsed: value })
  }

  setShowMetaMaskBrowserSidebarLinks = (value: boolean) => {
    this.setState({ showMetaMaskBrowserSidebarLinks: value })
  }

  hideGame = (appNameToHide: string, appTitle: string) => {
    if (libraryState.hiddenGames === undefined) return
    const newHiddenGames = [
      ...libraryState.hiddenGames.list,
      { appName: appNameToHide, title: appTitle }
    ]

    libraryState.hiddenGames.list = newHiddenGames
    configStore.set('games.hidden', newHiddenGames)
  }

  unhideGame = (appNameToUnhide: string) => {
    if (libraryState.hiddenGames === undefined) return
    const newHiddenGames = libraryState.hiddenGames.list.filter(
      ({ appName }) => appName !== appNameToUnhide
    )

    libraryState.hiddenGames.list = newHiddenGames
    configStore.set('games.hidden', newHiddenGames)
  }

  addGameToFavourites = (appNameToAdd: string, appTitle: string) => {
    if (libraryState.favouriteGames === undefined) return
    const newFavouriteGames = [
      ...libraryState.favouriteGames.list.filter(
        (fav) => fav.appName !== appNameToAdd
      ),
      { appName: appNameToAdd, title: appTitle }
    ]

    libraryState.favouriteGames.list = newFavouriteGames
    configStore.set('games.favourites', newFavouriteGames)
  }

  removeGameFromFavourites = (appNameToRemove: string) => {
    if (libraryState.favouriteGames === undefined) return
    const newFavouriteGames = libraryState.favouriteGames.list.filter(
      ({ appName }) => appName !== appNameToRemove
    )

    libraryState.favouriteGames.list = newFavouriteGames
    configStore.set('games.favourites', newFavouriteGames)
  }

  handleShowDialogModal = ({
    showDialog = true,
    ...options
  }: DialogModalOptions) => {
    this.setState({
      dialogModalOptions: { showDialog, ...options }
    })
  }

  showResetDialog = (() => {
    this.handleShowDialogModal({
      title: t('box.reset-app.question.title', 'Reset HyperPlay'),
      message: t(
        'box.reset-app.question.message',
        "Are you sure you want to reset HyperPlay? This will remove all Settings and Caching but won't remove your Installed games or your Epic credentials. Portable versions (AppImage, WinPortable, ...) of hyperplay needs to be restarted manually afterwards."
      ),
      buttons: [
        { text: t('box.yes'), onClick: window.api.resetApp },
        { text: t('box.no') }
      ]
    })
  }).bind(this)

  handleExternalLinkDialog = (value: ExternalLinkDialogOptions) => {
    this.setState({ externalLinkDialogOptions: value })
  }

  handleLibraryTopSection = (value: LibraryTopSectionOptions) => {
    this.setState({ libraryTopSection: value })
  }

  handleSuccessfulLogin = (runner: Runner) => {
    libraryState.category = 'all'
    libraryState.refreshLibrary({
      runInBackground: false,
      library: runner
    })
  }

  epicLogin = async (sid: string) => {
    console.log('logging epic')
    const response = await window.api.login(sid)

    if (response.status === 'done') {
      libraryState.epicLibrary = []
      storeAuthState.epic.username = response.data?.displayName ?? ''

      this.handleSuccessfulLogin('legendary')
    }

    return response.status
  }

  epicLogout = async () => {
    this.setState({ refreshing: true })
    await window.api.logoutLegendary().finally(() => {
      libraryState.epicLibrary = []
      storeAuthState.epic.username = ''
    })
    console.log('Logging out from epic')
    this.setState({ refreshing: false })
    window.location.reload()
  }

  gogLogin = async (token: string) => {
    console.log('logging gog')
    const response = await window.api.authGOG(token)

    if (response.status === 'done') {
      libraryState.gogLibrary = []
      storeAuthState.gog.username = response.data?.username ?? ''

      this.handleSuccessfulLogin('gog')
    }

    return response.status
  }

  gogLogout = async () => {
    await window.api.logoutGOG()
    libraryState.epicLibrary = []
    storeAuthState.epic.username = ''
    console.log('Logging out from gog')
    window.location.reload()
  }

  amazonLogin = async (data: NileRegisterData) => {
    console.log('logging amazon')
    const response = await window.api.authAmazon(data)

    if (response.status === 'done') {
      libraryState.amazonLibrary = []
      storeAuthState.amazon.user_id = response.user?.user_id ?? ''
      storeAuthState.amazon.username = response.user?.name ?? ''

      this.handleSuccessfulLogin('nile')
    }

    return response.status
  }

  amazonLogout = async () => {
    await window.api.logoutAmazon()
    this.setState({
      amazon: {
        library: [],
        user_id: null,
        username: null
      }
    })
    console.log('Logging out from amazon')
    window.location.reload()
  }

  getAmazonLoginData = async () => window.api.getAmazonLoginData()

  handleSettingsModalOpen = (
    value: boolean,
    type?: 'settings' | 'log',
    gameInfo?: GameInfo
  ) => {
    if (gameInfo) {
      this.setState({
        settingsModalOpen: { value, type, gameInfo }
      })
    } else {
      this.setState({
        settingsModalOpen: { value, gameInfo: null }
      })
    }
  }

  refreshWineVersionInfo = async (fetch: boolean): Promise<void> => {
    if (this.state.platform === 'win32') {
      return
    }
    window.api.logInfo('Refreshing wine downloader releases')
    this.setState({ refreshing: true })
    await window.api
      .refreshWineVersionInfo(fetch)
      .then(() => {
        this.setState({
          refreshing: false
        })
        return
      })
      .catch(async () => {
        this.setState({ refreshing: false })
        window.api.logError('Sync with upstream releases failed')

        notify({
          title: 'Wine-Manager',
          body: t(
            'notify.refresh.error',
            "Couldn't fetch releases from upstream, maybe because of Github API restrictions! Try again later."
          )
        })
        return
      })
  }

  handleLayout = (layout: string) => this.setState({ layout })

  handleGameStatus = async ({
    appName,
    status,
    folder,
    progress,
    runner
  }: GameStatus) => {
    const { libraryStatus } = this.state
    const currentApp = libraryStatus.find((game) => game.appName === appName)

    // add app to libraryStatus if it was not present
    if (!currentApp) {
      return this.setState({
        libraryStatus: [
          ...libraryStatus,
          { appName, status, folder, progress, runner }
        ]
      })
    }

    // if the app's status didn't change, do nothing
    if (currentApp.status === status) {
      return
    }

    // if the app's status did change, remove it from the current list and then handle the new status
    const newLibraryStatus = libraryStatus.filter(
      (game) => game.appName !== appName
    )

    // in these cases we just add the new status
    if (
      ['installing', 'updating', 'playing', 'extracting', 'preparing'].includes(
        status
      )
    ) {
      currentApp.status = status
      newLibraryStatus.push(currentApp)
      this.setState({ libraryStatus: newLibraryStatus })
    }

    // when error or done we remove it from the status info
    if (['error', 'done'].includes(status)) {
      // also remove from updates if it was updating
      if (currentApp.status === 'updating') {
        const updatedGamesUpdates = libraryState.gameUpdates.filter(
          (game) => game !== appName
        )
        // This avoids calling legendary again before the previous process is killed when canceling
        libraryState.refreshLibrary({
          checkForUpdates: true,
          runInBackground: true,
          library: runner
        })

        libraryState.gameUpdates = updatedGamesUpdates

        return this.setState({
          libraryStatus: newLibraryStatus
        })
      }

      libraryState.refreshLibrary({ runInBackground: true, library: runner })
      this.setState({ libraryStatus: newLibraryStatus })
    }
  }

  async componentDidMount() {
    const { t } = this.props
    const { libraryStatus, category } = this.state
    const oldCategory: string = category
    if (oldCategory === 'epic') {
      libraryState.category = 'all'
    }
    // Deals launching from protocol. Also checks if the game is already running
    window.api.handleLaunchGame(
      async (
        e: Electron.IpcRendererEvent,
        appName: string,
        runner: Runner
      ): Promise<{ status: 'done' | 'error' | 'abort' }> => {
        const currentApp = libraryStatus.filter(
          (game) => game.appName === appName
        )[0]
        if (!currentApp) {
          return launch({
            appName,
            t,
            runner,
            hasUpdate: false,
            showDialogModal: this.handleShowDialogModal
          })
        }
        return { status: 'error' }
      }
    )

    // TODO: show the install modal instead of just installing like this since it has no options to choose
    window.api.handleInstallGame(
      async (e: Electron.IpcRendererEvent, args: InstallParams) => {
        const currentApp = libraryStatus.filter(
          (game) => game.appName === appName
        )[0]
        const { appName, runner } = args
        if (!currentApp || (currentApp && currentApp.status !== 'installing')) {
          const gameInfo = await getGameInfo(appName, runner)
          if (!gameInfo || gameInfo.runner === 'sideload') {
            return
          }
          return this.setState({
            showInstallModal: {
              show: true,
              appName,
              runner,
              gameInfo
            }
          })
        }
      }
    )

    window.api.handleGameStatus(
      async (e: Electron.IpcRendererEvent, args: GameStatus) => {
        return this.handleGameStatus({ ...args })
      }
    )

    window.api.handleRefreshLibrary(
      async (e: Electron.IpcRendererEvent, runner: Runner) => {
        libraryState.refreshLibrary({
          checkForUpdates: true,
          runInBackground: true,
          library: runner
        })
      }
    )

    window.api.handleGamePush((e: IpcRendererEvent, args: GameInfo) => {
      if (!args.app_name) return
      if (args.runner === 'gog') {
        const library = [...libraryState.gogLibrary]
        const index = library.findIndex(
          (game) => game.app_name === args.app_name
        )
        if (index !== -1) {
          library.splice(index, 1)
        }
        this.setState({
          gog: {
            library: [...library, args],
            username: storeAuthState.gog.username
          }
        })
      }
    })

    const legendaryUser = configStore.has('userInfo')
    const gogUser = gogConfigStore.has('userData')
    const amazonUser = nileConfigStore.has('userData')
    const platform = await window.api.getPlatform()

    if (legendaryUser) {
      await window.api.getUserInfo()
    }

    if (amazonUser) {
      await window.api.getAmazonUserInfo()
    }

    if (amazonUser) {
      await window.api.getAmazonUserInfo()
    }

    if (!libraryState.gameUpdates.length) {
      const storedGameUpdates = JSON.parse(storage.getItem('updates') || '[]')
      this.setState({ gameUpdates: storedGameUpdates })
    }

    this.setState({ platform })

    if (legendaryUser || gogUser || amazonUser) {
      libraryState.refreshLibrary({
        checkForUpdates: true,
        runInBackground: Boolean(libraryState.epicLibrary.length)
      })
    }

    window.addEventListener(
      'controller-changed',
      (e: CustomEvent<{ controllerId: string }>) => {
        this.setState({ activeController: e.detail.controllerId })
      }
    )

    // listen to custom connectivity-changed event to update state
    window.api.onConnectivityChanged((_, connectivity) => {
      this.setState({ connectivity })
    })

    window.api.onOptInStatusChange((_, metricsOptInStatus) => {
      this.setState({ metricsOptInStatus })
    })

    // get the current status
    window.api
      .getConnectivityStatus()
      .then((connectivity) => this.setState({ connectivity }))

    this.setPrimaryFontFamily(this.state.primaryFontFamily, false)
    this.setSecondaryFontFamily(this.state.secondaryFontFamily, false)

    window.api.frontendReady()
  }

  componentDidUpdate() {
    const { libraryStatus, layout, sidebarCollapsed } = this.state

    storage.setItem('category', libraryState.category)
    storage.setItem('layout', layout)
    storage.setItem('updates', JSON.stringify(libraryState.gameUpdates))
    storage.setItem('show_hidden', JSON.stringify(libraryState.showHidden))
    storage.setItem(
      'show_favorites',
      JSON.stringify(libraryState.showFavourites)
    )
    storage.setItem('sidebar_collapsed', JSON.stringify(sidebarCollapsed))

    const pendingOps = libraryStatus.filter(
      (game) => game.status !== 'playing' && game.status !== 'done'
    ).length

    if (pendingOps) {
      window.api.lock()
    } else {
      window.api.unlock()
    }
  }

  render() {
    const { showInstallModal, language, settingsModalOpen } = this.state
    const isRTL = RTL_LANGUAGES.includes(language)

    const contextValue: ContextType = {
      ...this.state,
      epic: {
        login: this.epicLogin,
        logout: this.epicLogout
      },
      gog: {
        login: this.gogLogin,
        logout: this.gogLogout
      },
      amazon: {
        getLoginData: this.getAmazonLoginData,
        login: this.amazonLogin,
        logout: this.amazonLogout
      },
      handleLayout: this.handleLayout,
      setLanguage: this.setLanguage,
      isRTL,
      refreshWineVersionInfo: this.refreshWineVersionInfo,
      setTheme: this.setTheme,
      setZoomPercent: this.setZoomPercent,
      setAllTilesInColor: this.setAllTilesInColor,
      setSideBarCollapsed: this.setSideBarCollapsed,
      setPrimaryFontFamily: this.setPrimaryFontFamily,
      setSecondaryFontFamily: this.setSecondaryFontFamily,
      showDialogModal: this.handleShowDialogModal,
      showResetDialog: this.showResetDialog,
      handleExternalLinkDialog: this.handleExternalLinkDialog,
      isSettingsModalOpen: settingsModalOpen,
      setIsSettingsModalOpen: this.handleSettingsModalOpen,
      setShowMetaMaskBrowserSidebarLinks:
        this.setShowMetaMaskBrowserSidebarLinks
    }

    return (
      <ContextProvider.Provider value={contextValue}>
        {this.props.children}
        {showInstallModal.show && (
          <InstallModal
            appName={showInstallModal.appName}
            runner={showInstallModal.runner}
            gameInfo={showInstallModal.gameInfo}
            backdropClick={() =>
              this.setState({
                showInstallModal: { ...showInstallModal, show: false }
              })
            }
          />
        )}
      </ContextProvider.Provider>
    )
  }
}

export default withTranslation()(GlobalState)
