import { vi } from 'vitest'
/* eslint-disable @typescript-eslint/no-explicit-any */
const allStores: Map<string, Map<any, any>> = new Map()
vi.mock('electron-store', () => {
  class MockElectronStore {
    store_name
    constructor(args: Record<string, any>) {
      this.store_name = args.name
      if (!allStores.has(this.store_name)) {
        const x = new Map()
        allStores.set(this.store_name, x)
      }
    }
    get(key: any, defaultValue: any) {
      return allStores.get(this.store_name)?.has(key)
        ? allStores.get(this.store_name)?.get(key)
        : defaultValue
    }
    set(key: any, value: any) {
      allStores.get(this.store_name)?.set(key, value)
      return true
    }
    has(key: any) {
      return allStores.get(this.store_name)?.has(key)
    }
    delete(key: any) {
      return allStores.get(this.store_name)?.delete(key)
    }
    clear() {
      allStores.get(this.store_name)?.clear()
    }
  }
  return { default: MockElectronStore }
})
