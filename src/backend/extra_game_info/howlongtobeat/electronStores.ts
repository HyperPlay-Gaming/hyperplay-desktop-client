import { TypeCheckedStoreBackend } from 'backend/electron_store'

export const wikiGameInfoStore = new TypeCheckedStoreBackend('wikigameinfo', {
  cwd: 'store',
  clearInvalidConfig: true
})
