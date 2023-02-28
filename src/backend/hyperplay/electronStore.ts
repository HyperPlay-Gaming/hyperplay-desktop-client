import { TypeCheckedStoreBackend } from './../electron_store'

export const hpLibraryStore = new TypeCheckedStoreBackend('hpLibraryStore', {
  cwd: 'hp_store',
  name: 'library',
  clearInvalidConfig: true
})

export const hpInstalledGamesStore = new TypeCheckedStoreBackend(
  'hpInstalledGamesStore',
  {
    cwd: 'hp_store',
    name: 'installed'
  }
)
