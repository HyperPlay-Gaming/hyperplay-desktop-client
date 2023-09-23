/** @jest-environment jsdom */

Object.defineProperty(window, 'api', {
  writable: true,
  value: {
    install: jest.fn(),
    storeNew: jest.fn()
  }
})

import libraryState from '../libraryState'
import { GameInfo } from '../../../common/types'

function getDummyGameInfo(title: string) {
  return {
    runner: 'legendary',
    app_name: title,
    art_cover: 'art cover',
    art_square: 'art square',
    install: {},
    is_installed: true,
    title: title,
    canRunOffline: true
  } as GameInfo
}

describe('libraryState.ts', () => {
  test('test one', async () => {
    console.log('libraryState.library ', libraryState.library)
    libraryState.epicLibrary = [getDummyGameInfo('a'), getDummyGameInfo('b')]
    libraryState.category = 'all'
    console.log(
      'libraryState.library ',
      JSON.stringify(libraryState.library, null, 4)
    )
  })
})

export {}
