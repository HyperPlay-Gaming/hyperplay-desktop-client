export interface InitializableStore {
  init(): void | Promise<void>
}

export interface GenericStore {
  init: undefined | InitializableStore['init']
}
