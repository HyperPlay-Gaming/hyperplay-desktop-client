import { GameInfo } from 'common/types'
import { TypeCheckedStoreBackend } from '../../electron_store'
import { appNameToProjectIdMap } from './legacy_listings'

/*
 * migrations runs if: previous app version migrations were run on < candidate version <= new app version (version in package.json)
 * where candidate version is the key in the migrations object
 * if no migrations have been performed, previous migration version is '0.0.0'
 * if migration has been performed, check previous migration in hp_store/library.json __internal__.migrations.version
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
        if (
          game.is_installed &&
          (game.install.executable || game.install.platform === 'web')
        ) {
          game.install.channelName = 'main'
        }
        return game
      }

      const newLibrary = currentLibrary.map((game) => {
        if (!Object.hasOwn(appNameToProjectIdMap, game.app_name)) {
          //game might be delisted or it was listed after the old db schema was migrated
          //refresh will handle all fields except for install.channelName
          //app_name is the same. this was mapped as project_id for new games and does not matter for delisted games
          return updateGameInfo(game)
        }

        //game was previously listed so we map its previous app_name to its new project_id
        game.app_name = appNameToProjectIdMap[game.app_name]
        updateGameInfo(game)
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
