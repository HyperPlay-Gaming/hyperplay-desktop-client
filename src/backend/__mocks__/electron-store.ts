import { StoreOptions } from './../../common/types/electron_store'
import tmp from 'tmp'
import { join } from 'path'
import { vi } from 'vitest'

const OriginalStore = await vi.importActual('electron-store')
const tmpStoreRootDirectory = tmp.dirSync({ unsafeCleanup: true })

export default class Store<
  T extends Record<string, any> = Record<string, unknown>
> {
  constructor(options?: StoreOptions<T>) {
    if (options) {
      if (options.cwd) {
        options.cwd = join(tmpStoreRootDirectory.name, options.cwd)
      } else {
        options.cwd = tmpStoreRootDirectory.name
      }
    } else {
      options = {
        cwd: tmpStoreRootDirectory.name
      }
    }
    // super(options)
  }
}
