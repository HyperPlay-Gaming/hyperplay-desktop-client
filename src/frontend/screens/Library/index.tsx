import styles from './index.module.scss'

import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect
} from 'react'

import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import { UpdateComponent } from 'frontend/components/UI'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'

import ContextProvider from 'frontend/state/ContextProvider'

import GamesList from './components/GamesList'
import {
  FavouriteGame,
  GameInfo,
  GameStatus,
  HiddenGame,
  Runner
} from 'common/types'
import ErrorComponent from 'frontend/components/UI/ErrorComponent'
import {
  epicCategories,
  gogCategories,
  hyperPlayCategories,
  sideloadedCategories
} from 'frontend/helpers/library'
import RecentlyPlayed from './components/RecentlyPlayed'
import { InstallModal } from './components'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Dropdown,
  Tabs,
  Toggle,
  Background,
  DropdownItemType,
  GenericDropdown,
  Menu
} from '@hyperplay/ui'
import { Category, Platform } from 'frontend/types'
import { getPlatformName } from 'frontend/helpers'

const storage = window.localStorage

type ModalState = {
  game: string
  show: boolean
  runner: Runner
  gameInfo: GameInfo | null
}

export default React.memo(function Library(): JSX.Element {
  const {
    layout,
    libraryStatus,
    refreshing,
    refreshingInTheBackground,
    category,
    epic,
    gog,
    sideloadedLibrary,
    favouriteGames,
    libraryTopSection,
    filterText,
    platform,
    filterPlatforms,
    hiddenGames,
    showHidden,
    handleCategory,
    showFavourites: showFavouritesLibrary,
    setShowFavourites,
    showNonAvailable,
    hyperPlayLibrary,
    refreshLibrary,
    setShowHidden,
    setShowNonAvailable,
    handlePlatformFilters
  } = useContext(ContextProvider)
  const { t } = useTranslation()

  const isGOGLoggedin = gog.username
  const isEpicLoggedin = epic.username

  const filters: DropdownItemType[] = [
    {
      text: t('library.sortByStatus', 'Sort by Status'),
      id: 'sortByInstalled'
    },
    {
      text: t('library.alphabeticalAZ', 'Alphabetical A-Z'),
      id: 'alphabeticalAscending'
    },
    {
      text: t('library.alphabeticalZA', 'Alphabetical Z-A'),
      id: 'alphabeticalDescending'
    }
  ]
  const [selectedFilter, setSelectedFilter] = useState(filters[0])
  const [showModal, setShowModal] = useState<ModalState>({
    game: '',
    show: false,
    runner: 'legendary',
    gameInfo: null
  })

  const [showOnlyDownloaded, setShowOnlyDownloaded] = useState(false)
  // this filter retains its last value and thus can be combined with other filters
  const [sortAscending, setSortAscending] = useState(true)
  useEffect(() => {
    if (selectedFilter.id === 'alphabeticalAscending') {
      setSortAscending(true)
    } else if (selectedFilter.id === 'alphabeticalDescending') {
      setSortAscending(false)
    }
  }, [selectedFilter])
  // this filter is only true/active when selected and false/inactive otherwise
  const sortInstalled = selectedFilter.id === 'sortByInstalled'

  const backToTopElement = useRef(null)
  const listing = useRef<HTMLDivElement>(null)

  //Remember scroll position
  useLayoutEffect(() => {
    const scrollPosition = parseInt(storage?.getItem('scrollPosition') || '0')

    if (listing.current !== null && scrollPosition > 0) {
      listing.current.scrollTo(0, scrollPosition)
    }
    return () => {
      if (listing.current !== null) {
        storage?.setItem('scrollPosition', listing.current.scrollTop.toString())
      }
    }
  }, [listing])

  // bind back to top button
  useEffect(() => {
    if (backToTopElement.current) {
      const listing = document.querySelector('.listing')
      if (listing) {
        listing.addEventListener('scroll', () => {
          const btn = document.getElementById('backToTopBtn')
          const topSpan = document.getElementById('top')
          if (btn && topSpan) {
            btn.style.visibility =
              listing.scrollTop > 450 ? 'visible' : 'hidden'
          }
        })
      }
    }
  }, [backToTopElement])

  // Track the screen view once and only once.
  useEffect(() => {
    window.api.trackScreen('Library')
  }, [])

  const backToTop = () => {
    const anchor = document.getElementById('top')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function handleModal(
    appName: string,
    runner: Runner,
    gameInfo: GameInfo | null
  ) {
    setShowModal({ game: appName, show: true, runner, gameInfo })
  }

  // cache list of games being installed
  const [installing, setInstalling] = useState<string[]>([])

  useEffect(() => {
    const newInstalling = libraryStatus
      .filter((st: GameStatus) => st.status === 'installing')
      .map((st: GameStatus) => st.appName)

    setInstalling(newInstalling)
  }, [libraryStatus])

  useEffect(() => {
    // This code avoids getting stuck on a empty library after logout of the current selected store
    if (epicCategories.includes(category) && !epic.username) {
      handleCategory('all')
    }
    if (gogCategories.includes(category) && !gog.username) {
      handleCategory('all')
    }
  }, [epic.username, gog.username])

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

  // top section
  const showRecentGames = libraryTopSection.startsWith('recently_played')

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

  const numberOfGames = useMemo(() => {
    if (!libraryToShow) {
      return 0
    }
    // is_dlc is only applicable when the game is from legendary, but checking anyway doesn't cause errors and enable accurate counting in the 'ALL' game tab
    const dlcCount = libraryToShow.filter(
      (lib) => lib.runner !== 'sideload' && lib.install.is_dlc
    ).length

    const total = libraryToShow.length - dlcCount
    return total > 0 ? `${total}` : 0
  }, [libraryToShow, category])

  if (!epic && !gog) {
    return (
      <ErrorComponent
        message={t(
          'generic.error.component',
          'No Games found - Try to logout and login again or one of the options bellow'
        )}
      />
    )
  }

  function getLibrary() {
    if (category === 'all') {
      return category
    }

    if (epicCategories.includes(category)) {
      return 'legendary'
    }

    if (category === 'sideload') {
      return 'sideload'
    }

    return 'gog'
  }

  const onPlatformFilterChange = (platform: Platform) => {
    return (checked: boolean) => {
      const showPlatformGames = filterPlatforms.includes(platform)
      const newFilterPlatforms = [...filterPlatforms]
      if (checked) {
        if (!showPlatformGames) {
          newFilterPlatforms.push(platform)
          handlePlatformFilters(newFilterPlatforms)
        }
      } else {
        if (showPlatformGames) {
          newFilterPlatforms.splice(filterPlatforms.indexOf(platform), 1)
          handlePlatformFilters(newFilterPlatforms)
        }
      }
    }
  }

  const otherFiltersData = [
    // {
    //   text: 'Token required',
    //   defaultValue: false,
    //   onChange: (checked: boolean) => {}
    // },
    {
      text: 'Installed',
      defaultValue: showOnlyDownloaded,
      onChange: (checked: boolean) => {
        setShowOnlyDownloaded(checked)
      }
    },
    {
      text: t('header.show_hidden', 'Show Hidden'),
      defaultValue: showHidden,
      onChange: (checked: boolean) => {
        setShowHidden(checked)
      }
    },
    {
      text: t('header.show_available_games', 'Show non-available games'),
      defaultValue: showNonAvailable,
      onChange: (checked: boolean) => {
        setShowNonAvailable(checked)
      }
    },
    {
      text: 'Show favorites',
      defaultValue: showFavouritesLibrary,
      onChange: (checked: boolean) => {
        setShowFavourites(checked)
      }
    },
    {
      text: 'Windows',
      defaultValue: filterPlatforms.includes('win'),
      onChange: onPlatformFilterChange('win')
    },
    {
      text: 'Browser',
      defaultValue: filterPlatforms.includes('browser'),
      onChange: onPlatformFilterChange('browser')
    }
  ]

  if (platform === 'linux')
    otherFiltersData.push({
      text: 'Linux',
      defaultValue: filterPlatforms.includes('linux'),
      onChange: onPlatformFilterChange('linux')
    })

  if (platform === 'darwin')
    otherFiltersData.push({
      text: 'macOS',
      defaultValue: filterPlatforms.includes('mac'),
      onChange: onPlatformFilterChange('mac')
    })

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className="contentContainer">
        <div className={styles.libraryTopHeader}>
          <h3>{t('library.label', 'Library')}</h3>
          <span className={`${styles.numberOfgames} title`}>
            {numberOfGames}
          </span>
          <Button
            className={styles.refreshButton}
            type="tertiary"
            title={t('generic.library.refresh', 'Refresh Library')}
            onClick={async () =>
              refreshLibrary({
                checkForUpdates: true,
                runInBackground: false,
                library: getLibrary()
              })
            }
          >
            <FontAwesomeIcon
              className={classNames('FormControl__segmentedFaIcon', {
                ['fa-spin']: refreshing
              })}
              icon={faSyncAlt}
            />
          </Button>
          <Button
            type="tertiary"
            onClick={() => handleModal('', 'sideload', null)}
            leftIcon={<FontAwesomeIcon icon={faPlus} height={14} width={14} />}
          >
            {t('add_game', 'Add Game')}
          </Button>
        </div>
        <Tabs
          onTabChange={(val: Category) => handleCategory(val)}
          defaultValue={category}
        >
          <Tabs.List className={styles.tabsList} type="outline">
            <div>
              <Dropdown
                options={filters}
                onItemChange={setSelectedFilter}
                selected={selectedFilter}
                targetWidth={275}
              />
            </div>
            <div>
              <GenericDropdown
                target={
                  <GenericDropdown.GenericButton
                    text={'Other filters'}
                    style={{ width: '340px' }}
                  ></GenericDropdown.GenericButton>
                }
              >
                {otherFiltersData.map((val, index) => (
                  <Menu.Item
                    closeMenuOnClick={false}
                    key={`toggleItem${index}`}
                  >
                    <Toggle
                      defaultChecked={val.defaultValue}
                      labelPosition="right"
                      onChange={
                        //eslint-disable-next-line
                        (e: any) => {
                          val.onChange(e.target.checked)
                        }
                      }
                    >
                      <div
                        className="body"
                        style={{
                          paddingLeft: 'var(--space-sm)',
                          margin: 'auto 0px'
                        }}
                      >
                        {val.text}
                      </div>
                    </Toggle>
                  </Menu.Item>
                ))}
              </GenericDropdown>
            </div>
            <Tabs.Tab value="all">
              <div className="menu">{t('ALL', 'ALL')}</div>
            </Tabs.Tab>
            <Tabs.Tab value="hyperplay">
              <div className="menu">{t('HyperPlay')}</div>
            </Tabs.Tab>
            {isEpicLoggedin && (
              <Tabs.Tab value="legendary">
                <div className="menu">EPIC</div>
              </Tabs.Tab>
            )}
            {isGOGLoggedin && (
              <Tabs.Tab value="gog">
                <div className="menu">GOG</div>
              </Tabs.Tab>
            )}
            <Tabs.Tab value="sideload">
              <div className="menu">{t('Other')}</div>
            </Tabs.Tab>
            <div id="alignEnd">
              {/* <div>
              <Button type="tertiary" className={styles.gridListButton}>
                <Images.Grid fill="white" height={24} width={24} />
              </Button>
            </div>
            <div>
              <Button type="tertiary" className={styles.gridListButton}>
                <Images.List fill="white" height={24} width={24} />
              </Button>
            </div> */}
            </div>
          </Tabs.List>
        </Tabs>
        <div className={styles.listing} ref={listing}>
          <span id="top" />
          {showRecentGames && (
            <RecentlyPlayed
              handleModal={handleModal}
              onlyInstalled={libraryTopSection.endsWith('installed')}
            />
          )}

          {showFavourites && !showFavouritesLibrary && (
            <>
              <h3 className={styles.libraryHeader}>
                {t('favourites', 'Favourites')}
              </h3>
              <GamesList
                library={favourites}
                handleGameCardClick={handleModal}
                isFirstLane
              />
            </>
          )}

          {refreshing && !refreshingInTheBackground && (
            <UpdateComponent inline />
          )}

          {(!refreshing || refreshingInTheBackground) && (
            <GamesList
              library={libraryToShow}
              layout={layout}
              handleGameCardClick={handleModal}
            />
          )}
        </div>

        <button id="backToTopBtn" onClick={backToTop} ref={backToTopElement}>
          <ArrowDropUp id="backToTopArrow" className="material-icons" />
        </button>

        {showModal.show && (
          <InstallModal
            appName={showModal.game}
            runner={showModal.runner}
            gameInfo={showModal.gameInfo}
            backdropClick={() =>
              setShowModal({
                game: '',
                show: false,
                runner: 'legendary',
                gameInfo: null
              })
            }
          />
        )}
      </div>
    </>
  )
})
