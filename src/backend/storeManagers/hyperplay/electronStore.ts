import { TypeCheckedStoreBackend } from '../../electron_store'
import { app } from 'electron'

interface V1Indices {
  projectName: string
  accountName: string
}

const appNameToAcctProjNameMap: Record<string, V1Indices> = {
  '63ff5425069b92b74c91f67c': {
    projectName: 'rocketmonsters',
    accountName: 'rocketmonsters'
  },
  '645d19cd6e1720d987676cf4': {
    projectName: 'onisquest',
    accountName: 'yokaikingdom'
  }
}

//make a map from currently listed game app id's to project account name using developers.hyperplay.xyz/api/v1/listings and api.valist.io/listings

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

        if (!Object.hasOwn(appNameToAcctProjNameMap, game.app_name)) return game
        const newIndices = appNameToAcctProjNameMap[game.app_name]
        game.app_name = newIndices.projectName
        game.project_name = newIndices.projectName
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
