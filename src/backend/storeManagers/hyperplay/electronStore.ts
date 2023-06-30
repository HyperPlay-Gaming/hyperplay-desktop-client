import { TypeCheckedStoreBackend } from '../../electron_store'
import { appNameToProjectIdMap } from './legacy_listings'

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
    '0.2.3': (store) => {
      const currentLibrary = store.get('games', [])

      const newLibrary = currentLibrary.map((game) => {
        //for delisted games (games not in map) should create a new main channel and map release data to that
        if (!Object.hasOwn(appNameToProjectIdMap, game.app_name)) {
          //game might be delisted or it was listed after the old db schema was migrated
          //reverse the logic in convertToLegacy function on dev portal then return
          return {
            //
          }
        }
        game.app_name = appNameToProjectIdMap[game.app_name]
        return game
      })

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
