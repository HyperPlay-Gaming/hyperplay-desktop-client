import styles from './index.module.scss'
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect
} from 'react'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import { UpdateComponent } from 'frontend/components/UI'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import GamesList from './components/GamesList'
import { FilterItem, GameInfo, Runner } from 'common/types'
import ErrorComponent from 'frontend/components/UI/ErrorComponent'
import {
  amazonCategories,
  epicCategories,
  gogCategories
} from 'frontend/helpers/library'
import RecentlyPlayed from './components/RecentlyPlayed'
import { InstallModal } from './components'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Background } from '@hyperplay/ui'
import { Platform } from 'frontend/types'
import { LibraryTopBar } from './components/LibraryTopBar'
import libraryState from '../../state/libraryState'
import { observer } from 'mobx-react-lite'
import storeAuthState from 'frontend/state/storeAuthState'

const storage = window.localStorage

type ModalState = {
  game: string
  show: boolean
  runner: Runner
  gameInfo: GameInfo | null
}

export default observer(function Library(): JSX.Element {
  const { layout, epic, gog, platform, amazon } = useContext(ContextProvider)
  const { t } = useTranslation()

  const libraryToShow = libraryState.library
  const numberOfGames = libraryState.numberOfGames

  //only show epic or gog if the user is logged in with epic.username && or gog.username && check

  const filters: FilterItem[] = [
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

    const storeScrollPosition = () => {
      storage?.setItem(
        'scrollPosition',
        listing.current?.scrollTop.toString() || '0'
      )
    }

    listing.current?.addEventListener('scroll', storeScrollPosition)
    listing.current?.scrollTo(0, scrollPosition || 0)

    return () => {
      listing.current?.removeEventListener('scroll', storeScrollPosition)
    }
  }, [listing.current])

  // Track the screen view once and only once.
  useEffect(() => {
    window.api.trackScreen('Library')
    libraryState.selectedFilter = filters[0]
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

  // This code avoids getting stuck on a empty library after logout of the current selected store
  if (
    epicCategories.includes(libraryState.category) &&
    !storeAuthState.epic.username
  ) {
    libraryState.category = 'all'
  }
  if (
    gogCategories.includes(libraryState.category) &&
    !storeAuthState.gog.username
  ) {
    libraryState.category = 'all'
  }
  if (
    amazonCategories.includes(libraryState.category) &&
    !storeAuthState.amazon.user_id
  ) {
    libraryState.category = 'all'
  }

  const showRecentGames = libraryState.showRecentGames

  if (!epic && !gog && !amazon) {
    return (
      <ErrorComponent
        message={t(
          'generic.error.component',
          'No Games found - Try to logout and login again or one of the options bellow'
        )}
      />
    )
  }

  const onPlatformFilterChange = (platform: Platform) => {
    return (checked: boolean) => {
      const showPlatformGames = libraryState.filterPlatforms.includes(platform)
      const newFilterPlatforms = [...libraryState.filterPlatforms]
      if (checked) {
        if (!showPlatformGames) {
          newFilterPlatforms.push(platform)
          libraryState.filterPlatforms = newFilterPlatforms
        }
      } else {
        if (showPlatformGames) {
          newFilterPlatforms.splice(
            libraryState.filterPlatforms.indexOf(platform),
            1
          )
          libraryState.filterPlatforms = newFilterPlatforms
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
      defaultValue: libraryState.showOnlyDownloaded,
      onChange: (checked: boolean) => {
        libraryState.showOnlyDownloaded = checked
      }
    },
    {
      text: t('header.show_hidden', 'Show Hidden'),
      defaultValue: libraryState.showHidden,
      onChange: (checked: boolean) => {
        libraryState.showHidden = checked
      }
    },
    {
      text: t('header.show_available_games', 'Show non-available games'),
      defaultValue: libraryState.showNonAvailable,
      onChange: (checked: boolean) => {
        libraryState.showNonAvailable = checked
      }
    },
    {
      text: 'Show favorites',
      defaultValue: libraryState.showFavouritesLibrary,
      onChange: (checked: boolean) => {
        libraryState.showFavouritesLibrary = checked
      }
    },
    {
      text: 'Windows',
      defaultValue: libraryState.filterPlatforms.includes('win'),
      onChange: onPlatformFilterChange('win')
    },
    {
      text: 'Browser',
      defaultValue: libraryState.filterPlatforms.includes('browser'),
      onChange: onPlatformFilterChange('browser')
    }
  ]

  if (platform === 'linux')
    otherFiltersData.push({
      text: 'Linux',
      defaultValue: libraryState.filterPlatforms.includes('linux'),
      onChange: onPlatformFilterChange('linux')
    })

  if (platform === 'darwin')
    otherFiltersData.push({
      text: 'macOS',
      defaultValue: libraryState.filterPlatforms.includes('mac'),
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
              libraryState.refreshSelectedLibrary({
                checkForUpdates: true,
                runInBackground: false
              })
            }
          >
            <FontAwesomeIcon
              className={classNames('FormControl__segmentedFaIcon', {
                ['fa-spin']: libraryState.refreshing
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
          setSelectedFilter={(filter) => {
            libraryState.selectedFilter = filter as FilterItem
          }}
          // the default for library state if selectedFilter undefined is alphabetical ascending
          selectedFilter={libraryState.selectedFilter ?? filters[1]}
          otherFiltersData={otherFiltersData}
        />
        <div className={styles.listing} ref={listing}>
          <span id="top" />
          {showRecentGames && (
            <RecentlyPlayed
              handleModal={handleModal}
              onlyInstalled={libraryState.libraryTopSection.endsWith(
                'installed'
              )}
            />
          )}

          {libraryState.showFavourites && !libraryState.showFavouritesLibrary && (
            <>
              <h3 className={styles.libraryHeader}>
                {t('favourites', 'Favourites')}
              </h3>
              <GamesList
                library={libraryState.favourites}
                handleGameCardClick={handleModal}
                isFirstLane
              />
            </>
          )}

          {libraryState.refreshing &&
            !libraryState.refreshingInTheBackground && (
              <UpdateComponent inline />
            )}

          {(!libraryState.refreshing ||
            libraryState.refreshingInTheBackground) && (
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
