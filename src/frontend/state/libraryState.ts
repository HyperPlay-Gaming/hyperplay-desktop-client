import {
  FavouriteGame,
  GameCollection,
  GameInfo,
  GameStatus,
  HiddenGame
} from 'common/types'
import { Category, Platform } from 'frontend/types'
import { makeAutoObservable } from 'mobx'
import { getPlatformName } from 'frontend/helpers'
import { DropdownItemType } from '@hyperplay/ui'
import Fuse from 'fuse.js'
import {
  gogInstalledGamesStore,
  gogLibraryStore,
  libraryStore,
  sideloadLibrary,
  hyperPlayLibraryStore
} from 'frontend/helpers/electronStores'
import {
  epicCategories,
  gogCategories,
  hyperPlayCategories,
  sideloadedCategories
} from 'frontend/helpers/library'

class LibraryState {
  epicLibrary: GameInfo[] = []
  gogLibrary: GameInfo[] = []
  sideloadedLibrary: GameInfo[] = []
  hyperPlayLibrary: GameInfo[] = []
  nonAvailbleGames: GameInfo[] = []
  filterPlatforms: Platform[] = []
  category: Category = 'all'
  private gameStatuses: GameStatus[] = []
  // cache list of games being installed
  installing: string[] = []
  showRecentGames = false
  showFavouritesLibrary = false
  libraryTopSection = ''
  favouriteGames: GameCollection | undefined
  hiddenGames: GameCollection | undefined
  selectedFilter: DropdownItemType | undefined
  showOnlyDownloaded = false
  showHidden = false
  showNonAvailable = true
  filterText = ''

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    this.refresh()
    this.watchLibraryChanges()
  }

  watchLibraryChanges() {
    window.api.onLibraryChange((_e, runner, newLibrary) => {
      if (runner === 'legendary') {
        this.epicLibrary = newLibrary
      } else if (runner === 'gog') {
        this.gogLibrary = newLibrary
      } else if (runner === 'sideload') {
        this.sideloadedLibrary = newLibrary
      } else if (runner === 'hyperplay') {
        this.hyperPlayLibrary = newLibrary
      }
    })
  }

  refresh() {
    this.refreshEpicLibrary()
    this.refreshGogLibrary()
    this.refreshSideloadedLibrary()
    this.refreshHyperplayLibrary()
  }

  refreshEpicLibrary() {
    this.epicLibrary = libraryStore.get('library', [])
  }

  refreshGogLibrary() {
    const games = gogLibraryStore.get('games', [])

    const installedGames = [...gogInstalledGamesStore.get('installed', [])]
    for (const igame in games) {
      for (const installedGame of installedGames) {
        if (installedGame.appName === games[igame].app_name) {
          games[igame].install = installedGame
          games[igame].is_installed = true
        }
      }
    }

    this.gogLibrary = games
  }

  refreshHyperplayLibrary() {
    this.hyperPlayLibrary = hyperPlayLibraryStore.get('games', [])
  }

  refreshSideloadedLibrary() {
    this.sideloadedLibrary = sideloadLibrary.get('games', [])
  }

  setGameStatuses(newGameStatuses: GameStatus[]) {
    this.gameStatuses = newGameStatuses
    const newInstalling = this.gameStatuses
      .filter((st: GameStatus) => st.status === 'installing')
      .map((st: GameStatus) => st.appName)

    this.installing = newInstalling
  }

  /*
   * For installed games, we filter on the install platform
   * For non-installed games, we check if a build exists for the platform
   */
  gameSupportsAtLeastOneFilteredPlatform(
    game: GameInfo,
    platformsToInclude: Platform[]
  ) {
    if (platformsToInclude.length === 0) return true

    const macArray = ['osx', 'Mac']

    if (platformsToInclude.includes('win')) {
      if (game.is_installed) {
        if (
          game.install.platform &&
          getPlatformName(game.install.platform).toLowerCase() === 'windows'
        )
          return true
      } else {
        if (game.is_windows_native) return true
      }
    }

    if (platformsToInclude.includes('mac')) {
      if (game.is_installed) {
        if (
          game.install.platform &&
          macArray.includes(getPlatformName(game.install.platform))
        )
          return true
      } else {
        if (game.is_mac_native) return true
      }
    }

    if (platformsToInclude.includes('linux')) {
      if (game.is_installed) {
        if (
          game.install.platform &&
          getPlatformName(game.install.platform).toLowerCase() === 'linux'
        )
          return true
      } else {
        if (game.is_linux_native) return true
      }
    }

    if (game.browserUrl && platformsToInclude.includes('browser')) return true

    return false
  }

  filterByPlatform(library: GameInfo[], platformsToInclude: Platform[]) {
    if (!library) {
      return []
    }

    return library.filter((game) =>
      this.gameSupportsAtLeastOneFilteredPlatform(game, platformsToInclude)
    )
  }

  get favourites() {
    const tempArray: GameInfo[] = []
    if (this.showFavourites || this.showFavouritesLibrary) {
      const favouriteAppNames = this.favouriteGames?.list.map(
        (favourite: FavouriteGame) => favourite.appName
      )
      if (favouriteAppNames === undefined) return tempArray
      this.epicLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      this.gogLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      this.sideloadedLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      this.hyperPlayLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
    }
    return tempArray
  }

  // automatically inferred as computed by makeAutoObservable
  get library() {
    let library: Array<GameInfo> = []
    if (this.showFavouritesLibrary) {
      library = [...this.favourites].filter((g) =>
        this.category === 'all' ? g : g.runner === this.category
      )
    } else {
      const isEpic = epicCategories.includes(this.category)
      const isGog = gogCategories.includes(this.category)
      const epicLibrary = isEpic ? this.epicLibrary : []
      const gogLibrary = isGog ? this.gogLibrary : []
      const sideloadedApps = sideloadedCategories.includes(this.category)
        ? this.sideloadedLibrary
        : []
      const HPLibrary = hyperPlayCategories.includes(this.category)
        ? this.hyperPlayLibrary
        : []

      library = [...HPLibrary, ...sideloadedApps, ...epicLibrary, ...gogLibrary]

      if (!this.showNonAvailable) {
        // TODO: refactor to linear algo with non available game map
        library = library.filter(
          (game) =>
            this.nonAvailbleGames.findIndex(
              (val) => val.app_name === game.app_name
            ) === -1
        )
      }
    }

    // filter
    try {
      const filteredLibrary = this.filterByPlatform(
        library,
        this.filterPlatforms
      )
      const options = {
        minMatchCharLength: 1,
        threshold: 0.4,
        useExtendedSearch: true,
        keys: ['title']
      }
      const fuse = new Fuse(filteredLibrary, options)

      if (this.filterText) {
        const fuzzySearch = fuse.search(this.filterText).map((g) => g.item)
        library = fuzzySearch
      } else {
        library = filteredLibrary
      }
    } catch (error) {
      console.log(error)
    }

    // hide hidden
    const hiddenGamesAppNames = this.hiddenGames?.list.map(
      (hidden: HiddenGame) => hidden?.appName
    )

    if (!this.showHidden) {
      library = library.filter(
        (game) => !hiddenGamesAppNames?.includes(game?.app_name)
      )
    }

    // sort
    library = library.sort((a: { title: string }, b: { title: string }) => {
      const gameA = a.title.toUpperCase().replace('THE ', '')
      const gameB = b.title.toUpperCase().replace('THE ', '')
      return this.sortAscending
        ? gameA < gameB
          ? -1
          : 1
        : gameA > gameB
        ? -1
        : 1
    })
    console.log('4 library in get library = ', JSON.stringify(library, null, 4))
    const installed = library.filter((g) => g.is_installed)
    const notInstalled = this.showOnlyDownloaded
      ? []
      : library.filter(
          (g) => !g.is_installed && !this.installing.includes(g.app_name)
        )

    const installingGames = library.filter(
      (g) => !g.is_installed && this.installing.includes(g.app_name)
    )
    library = this.sortInstalled
      ? [...installed, ...installingGames, ...notInstalled]
      : library

    return [...library]
  }

  get showFavourites() {
    return (
      this.libraryTopSection === 'favourites' &&
      !!this.favouriteGames?.list.length
    )
  }

  // this filter retains its last value and thus can be combined with other filters
  get sortAscending() {
    if (this.selectedFilter?.id === 'alphabeticalAscending') {
      return true
    } else if (this.selectedFilter?.id === 'alphabeticalDescending') {
      return false
    }
    return true
  }

  // this filter is only true/active when selected and false/inactive otherwise
  get sortInstalled() {
    return this.selectedFilter?.id === 'sortByInstalled'
  }

  get numberOfGames() {
    if (!this.library) {
      return 0
    }

    // is_dlc is only applicable when the game is from legendary, but checking anyway doesn't cause errors and enable accurate counting in the 'ALL' game tab
    const dlcCount = this.library.filter(
      (lib) => lib.runner !== 'sideload' && lib.install.is_dlc
    ).length

    const total = this.library.length - dlcCount
    return total > 0 ? `${total}` : 0
  }
}

export default new LibraryState()
