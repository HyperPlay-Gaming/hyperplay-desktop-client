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
import ContextProvider from 'frontend/state/ContextProvider'
import GamesList from './components/GamesList'
import { GameInfo, Runner } from 'common/types'
import ErrorComponent from 'frontend/components/UI/ErrorComponent'
import { epicCategories, gogCategories } from 'frontend/helpers/library'
import RecentlyPlayed from './components/RecentlyPlayed'
import { InstallModal } from './components'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Background, DropdownItemType } from '@hyperplay/ui'
import { Platform } from 'frontend/types'
import { LibraryTopBar } from './components/LibraryTopBar'
import useGetLibrary from './useGetLibrary'

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
    refreshing,
    refreshingInTheBackground,
    category,
    epic,
    gog,
    libraryTopSection,
    platform,
    filterPlatforms,
    showHidden,
    handleCategory,
    showFavourites: showFavouritesLibrary,
    setShowFavourites,
    showNonAvailable,
    refreshLibrary,
    setShowHidden,
    setShowNonAvailable,
    handlePlatformFilters
  } = useContext(ContextProvider)
  const { t } = useTranslation()

  //only show epic or gog if the user is logged in with epic.username && or gog.username && check

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
  const {
    libraryToShow,
    favourites,
    selectedFilter,
    setSelectedFilter,
    showFavourites,
    showOnlyDownloaded,
    setShowOnlyDownloaded
  } = useGetLibrary(filters[0])

  const [showModal, setShowModal] = useState<ModalState>({
    game: '',
    show: false,
    runner: 'legendary',
    gameInfo: null
  })

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

  useEffect(() => {
    // This code avoids getting stuck on a empty library after logout of the current selected store
    if (epicCategories.includes(category) && !epic.username) {
      handleCategory('all')
    }
    if (gogCategories.includes(category) && !gog.username) {
      handleCategory('all')
    }
  }, [epic.username, gog.username])

  // top section
  const showRecentGames = libraryTopSection.startsWith('recently_played')

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
        <LibraryTopBar
          filters={filters}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          otherFiltersData={otherFiltersData}
        />
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
