import { useContext, useEffect, useMemo, useState } from 'react'
import ContextProvider from 'frontend/state/ContextProvider'
import { DropdownItemType } from '@hyperplay/ui'
import { FavouriteGame, GameInfo, GameStatus, HiddenGame } from 'common/types'
import { Category, Platform } from 'frontend/types'
import { getPlatformName } from 'frontend/helpers'
import Fuse from 'fuse.js'
import {
  epicCategories,
  gogCategories,
  hyperPlayCategories,
  sideloadedCategories
} from 'frontend/helpers/library'

const storage = window.localStorage

export default function useGetLibrary(selectedFilterInit: DropdownItemType) {
  const {
    libraryStatus,
    category,
    epic,
    gog,
    sideloadedLibrary,
    favouriteGames,
    libraryTopSection,
    filterText,
    filterPlatforms,
    hiddenGames,
    showHidden,
    showFavourites: showFavouritesLibrary,
    showNonAvailable,
    hyperPlayLibrary
  } = useContext(ContextProvider)
  const [selectedFilter, setSelectedFilter] = useState(selectedFilterInit)
  const [showOnlyDownloaded, setShowOnlyDownloaded] = useState(false)

  // cache list of games being installed
  const [installing, setInstalling] = useState<string[]>([])

  useEffect(() => {
    const newInstalling = libraryStatus
      .filter((st: GameStatus) => st.status === 'installing')
      .map((st: GameStatus) => st.appName)

    setInstalling(newInstalling)
  }, [libraryStatus])

  // this filter is only true/active when selected and false/inactive otherwise
  const sortInstalled = selectedFilter.id === 'sortByInstalled'

  // this filter retains its last value and thus can be combined with other filters
  const [sortAscending, setSortAscending] = useState(true)
  useEffect(() => {
    if (selectedFilter.id === 'alphabeticalAscending') {
      setSortAscending(true)
    } else if (selectedFilter.id === 'alphabeticalDescending') {
      setSortAscending(false)
    }
  }, [selectedFilter])

  const showFavourites =
    libraryTopSection === 'favourites' && !!favouriteGames.list.length

  const favourites = useMemo(() => {
    const tempArray: GameInfo[] = []
    if (showFavourites || showFavouritesLibrary) {
      const favouriteAppNames = favouriteGames.list.map(
        (favourite: FavouriteGame) => favourite.appName
      )
      epic.library.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      gog.library.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      sideloadedLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
      hyperPlayLibrary.forEach((game) => {
        if (favouriteAppNames.includes(game.app_name)) tempArray.push(game)
      })
    }
    return tempArray
  }, [showFavourites, favouriteGames, epic, gog])

  /*
   * For installed games, we filter on the install platform
   * For non-installed games, we check if a build exists for the platform
   */
  const gameSupportsAtLeastOneFilteredPlatform = (
    game: GameInfo,
    platformsToInclude: Platform[]
  ) => {
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

  const filterByPlatform = (
    library: GameInfo[],
    platformsToInclude: Platform[]
  ) => {
    if (!library) {
      return []
    }

    return library.filter((game) =>
      gameSupportsAtLeastOneFilteredPlatform(game, platformsToInclude)
    )
  }

  function generateLibrary(category: Category) {
    let library: Array<GameInfo> = []
    if (showFavouritesLibrary) {
      library = [...favourites].filter((g) =>
        category === 'all' ? g : g.runner === category
      )
    } else {
      const isEpic = epic.username && epicCategories.includes(category)
      const isGog = gog.username && gogCategories.includes(category)
      const epicLibrary = isEpic ? epic.library : []
      const gogLibrary = isGog ? gog.library : []
      const sideloadedApps = sideloadedCategories.includes(category)
        ? sideloadedLibrary
        : []
      const HPLibrary = hyperPlayCategories.includes(category)
        ? hyperPlayLibrary
        : []

      library = [...HPLibrary, ...sideloadedApps, ...epicLibrary, ...gogLibrary]

      if (!showNonAvailable) {
        const nonAvailbleGames = storage.getItem('nonAvailableGames') || '[]'
        const nonAvailbleGamesArray = JSON.parse(nonAvailbleGames)
        library = library.filter(
          (game) => !nonAvailbleGamesArray.includes(game.app_name)
        )
      }
    }

    // filter
    try {
      const filteredLibrary = filterByPlatform(library, filterPlatforms)
      const options = {
        minMatchCharLength: 1,
        threshold: 0.4,
        useExtendedSearch: true,
        keys: ['title']
      }
      const fuse = new Fuse(filteredLibrary, options)

      if (filterText) {
        const fuzzySearch = fuse.search(filterText).map((g) => g.item)
        library = fuzzySearch
      } else {
        library = filteredLibrary
      }
    } catch (error) {
      console.log(error)
    }

    // hide hidden
    const hiddenGamesAppNames = hiddenGames.list.map(
      (hidden: HiddenGame) => hidden?.appName
    )

    if (!showHidden) {
      library = library.filter(
        (game) => !hiddenGamesAppNames.includes(game?.app_name)
      )
    }

    // sort
    library = library.sort((a: { title: string }, b: { title: string }) => {
      const gameA = a.title.toUpperCase().replace('THE ', '')
      const gameB = b.title.toUpperCase().replace('THE ', '')
      return sortAscending ? (gameA < gameB ? -1 : 1) : gameA > gameB ? -1 : 1
    })
    const installed = library.filter((g) => g.is_installed)
    const notInstalled = showOnlyDownloaded
      ? []
      : library.filter(
          (g) => !g.is_installed && !installing.includes(g.app_name)
        )

    const installingGames = library.filter(
      (g) => !g.is_installed && installing.includes(g.app_name)
    )
    library = sortInstalled
      ? [...installed, ...installingGames, ...notInstalled]
      : library

    return [...library]
  }
  // select library
  const libraryToShow = useMemo(() => {
    return generateLibrary(category)
  }, [
    category,
    epic.library,
    gog.library,
    filterText,
    filterPlatforms,
    sortAscending,
    sortInstalled,
    showHidden,
    hiddenGames,
    showFavouritesLibrary,
    showNonAvailable,
    sideloadedLibrary,
    hyperPlayLibrary,
    showOnlyDownloaded
  ])

  return {
    libraryToShow,
    favourites,
    selectedFilter,
    setSelectedFilter,
    showFavourites,
    showOnlyDownloaded,
    setShowOnlyDownloaded
  }
}
