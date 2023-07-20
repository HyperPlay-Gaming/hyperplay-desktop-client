import { GameInfo } from 'common/types'
import { TypeCheckedStoreBackend } from '../../electron_store'

/*
 * migrations runs if: previous app version migrations were run on < candidate version <= new app version (version in package.json)
 * where candidate version is the key in the migrations object
 * if no migrations have been performed, previous migration version is '0.0.0'
 * semver ranges are supported as well. see 'conf' npm package for more info
 */
export const hpLibraryStore = new TypeCheckedStoreBackend('hpLibraryStore', {
  cwd: 'hp_store',
  name: 'library',
  clearInvalidConfig: true,
  beforeEachMigration: (store, context) => {
    console.log(
      `[hpLibraryStore] migrate from ${context.fromVersion} → ${context.toVersion}`
    )
  },
  migrations: {
    '0.5.0': (store) => {
      const currentLibrary = store.get('games', [])

      function updateGameInfo(game: GameInfo): GameInfo {
        //prior to this release the only channel available was main so we map to that
        if (game.is_installed && game.install.executable) {
          game.install.channelName = 'main'
        }
        return game
      }

      const newLibrary = currentLibrary.map((game) => updateGameInfo(game))

      store.set('games', newLibrary)
    }
  }
})

export const hpInstalledGamesStore = new TypeCheckedStoreBackend(
  'hpInstalledGamesStore',
  {
    cwd: 'hp_store',
    name: 'installed'
  }
)
