/** @jest-environment jsdom */

Object.defineProperty(window, 'api', {
  writable: true,
  value: {
    install: jest.fn(),
    storeNew: jest.fn(),
    storeGet: jest.fn(),
    storeSet: jest.fn()
  }
})

import libraryState, { GameCollectionClass } from '../libraryState'
import { Filter, GameInfo } from '../../../common/types'

function resetLibraryState() {
  libraryState.epicLibrary = []
  libraryState.gogLibrary = []
  libraryState.sideloadedLibrary = []
  libraryState.hyperPlayLibrary = []
  libraryState.nonAvailableGames = []
  libraryState.installing = []
  libraryState.libraryTopSection = 'disabled'
  libraryState.favouriteGames = new GameCollectionClass()
  libraryState.hiddenGames = new GameCollectionClass()
  libraryState.filterText = ''
  libraryState.category = 'all'
  libraryState.selectedFilter = undefined
  libraryState.showFavouritesLibrary = false
  libraryState.showOnlyDownloaded = false
  libraryState.showHidden = false
  libraryState.showNonAvailable = true
  libraryState.filterPlatforms = []
}

function getDummyGameInfo(props: Partial<GameInfo>) {
  return {
    runner: props.runner ?? 'legendary',
    app_name: props.app_name ?? props.title ?? 'no app name',
    art_cover: 'art cover',
    art_square: 'art square',
    install: props.install ?? {},
    is_installed: props.is_installed ?? true,
    title: props.title ?? 'no title',
    canRunOffline: true,
    browserUrl: props.browserUrl
  } as GameInfo
}

const FILTER_IDS: Record<string, Filter> = {
  ALPHA_ASC: 'alphabeticalAscending',
  ALPHA_DES: 'alphabeticalDescending',
  SORT_INSTALLED: 'sortByInstalled'
}

describe('libraryState.ts', () => {
  beforeEach(() => {
    resetLibraryState()
  })

  // filters
  test('alphabetical ascending filter', async () => {
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'a' }),
      getDummyGameInfo({ title: 'b' })
    ]
    libraryState.category = 'all'
    libraryState.selectedFilter = {
      text: FILTER_IDS.ALPHA_ASC,
      id: FILTER_IDS.ALPHA_ASC
    }

    expect(libraryState.library[0].app_name).toBe('a')
    expect(libraryState.library[1].app_name).toBe('b')
  })

  test('alphabetical descending filter', async () => {
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'a' }),
      getDummyGameInfo({ title: 'b' })
    ]
    libraryState.category = 'all'
    libraryState.selectedFilter = {
      text: FILTER_IDS.ALPHA_DES,
      id: FILTER_IDS.ALPHA_DES
    }

    expect(libraryState.library[0].app_name).toBe('b')
    expect(libraryState.library[1].app_name).toBe('a')
  })

  test('sort by installed filter', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'a', is_installed: false }),
      getDummyGameInfo({ title: 'b', is_installed: true })
    ]
    libraryState.category = 'all'
    libraryState.selectedFilter = {
      text: FILTER_IDS.SORT_INSTALLED,
      id: FILTER_IDS.SORT_INSTALLED
    }

    expect(libraryState.library[0].app_name).toBe('b')
    expect(libraryState.library[1].app_name).toBe('a')
  })

  // store selector
  test('only show HyperPlay games', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.hyperPlayLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: true, runner: 'hyperplay' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'a', is_installed: false, runner: 'gog' })
    ]
    libraryState.category = 'hyperplay'

    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('b')
  })

  test('only show Epic games', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: true, runner: 'legendary' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'a', is_installed: false, runner: 'gog' })
    ]
    libraryState.category = 'legendary'

    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('b')
  })

  test('only show gog games', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: true, runner: 'legendary' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'c', is_installed: false, runner: 'gog' })
    ]
    libraryState.category = 'gog'

    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('c')
  })

  // toggles
  test('only show favorite games', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: true, runner: 'legendary' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'c', is_installed: false, runner: 'gog' })
    ]

    libraryState.favouriteGames = {
      list: [{ appName: 'c', title: 'c' }],
      add: () => {
        console.log('add')
      },
      remove: () => {
        console.log('remove')
      }
    }
    expect(libraryState.library.length).toBe(2)

    libraryState.showFavouritesLibrary = true

    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('c')
  })

  test('show hidden games along with the others', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: true, runner: 'legendary' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'c', is_installed: false, runner: 'gog' })
    ]

    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
    libraryState.hiddenGames = {
      list: [{ appName: 'b', title: 'b' }],
      add: () => {
        console.log('add')
      },
      remove: () => {
        console.log('remove')
      }
    }
    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('c')

    libraryState.showHidden = true
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
  })

  test('show only downloaded', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({ title: 'b', is_installed: false, runner: 'legendary' })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'c', is_installed: true, runner: 'gog' })
    ]

    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
    libraryState.showOnlyDownloaded = true
    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('c')
    libraryState.showOnlyDownloaded = false
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
  })

  test('show non available games along with the others', async () => {
    // default filter is sort by alphabetical ascending
    const game_b = getDummyGameInfo({
      title: 'b',
      is_installed: false,
      runner: 'legendary'
    })
    libraryState.epicLibrary = [game_b]
    libraryState.gogLibrary = [
      getDummyGameInfo({ title: 'c', is_installed: true, runner: 'gog' })
    ]

    libraryState.nonAvailableGames = [game_b]

    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
    libraryState.showNonAvailable = false
    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('c')
    libraryState.showNonAvailable = true
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
  })

  test('test platform filters', async () => {
    // default filter is sort by alphabetical ascending
    libraryState.epicLibrary = [
      getDummyGameInfo({
        title: 'b',
        is_installed: true,
        runner: 'legendary',
        install: {
          platform: 'Windows'
        }
      })
    ]
    libraryState.gogLibrary = [
      getDummyGameInfo({
        title: 'c',
        is_installed: true,
        runner: 'gog',
        install: {
          platform: 'osx'
        }
      })
    ]
    libraryState.hyperPlayLibrary = [
      getDummyGameInfo({
        title: 'd',
        is_installed: true,
        runner: 'gog',
        install: {
          platform: 'linux_amd64'
        }
      }),
      getDummyGameInfo({
        title: 'e',
        is_installed: true,
        runner: 'gog',
        install: {
          platform: 'web'
        },
        browserUrl: 'https://dummyurl.xyz'
      })
    ]

    expect(libraryState.library.length).toBe(4)
    expect(libraryState.library[0].app_name).toBe('b')
    libraryState.filterPlatforms = ['win']
    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('b')
    libraryState.filterPlatforms = ['win', 'mac']
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
    expect(libraryState.library[1].app_name).toBe('c')
    libraryState.filterPlatforms = ['win', 'linux']
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('b')
    expect(libraryState.library[1].app_name).toBe('d')
    libraryState.filterPlatforms = ['mac', 'linux']
    expect(libraryState.library.length).toBe(2)
    expect(libraryState.library[0].app_name).toBe('c')
    expect(libraryState.library[1].app_name).toBe('d')
    libraryState.filterPlatforms = ['mac', 'linux', 'win']
    expect(libraryState.library.length).toBe(3)
    expect(libraryState.library[0].app_name).toBe('b')
    expect(libraryState.library[1].app_name).toBe('c')
    expect(libraryState.library[2].app_name).toBe('d')
    libraryState.filterPlatforms = ['browser']
    expect(libraryState.library.length).toBe(1)
    expect(libraryState.library[0].app_name).toBe('e')
  })

  test('show recent games', async () => {
    expect(libraryState.showRecentGames).toBe(false)
    libraryState.libraryTopSection = 'recently_played_installed'
    expect(libraryState.showRecentGames).toBe(true)
    libraryState.libraryTopSection = 'disabled'
    expect(libraryState.showRecentGames).toBe(false)
  })
})

export {}
