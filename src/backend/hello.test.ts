import { describe, it, expect } from 'vitest'
import { getWineLibs } from './utils/compatibility_layers'
import { join } from 'path'
import { tmpdir } from 'os'
import { mkdirSync } from 'fs'

describe('some tests', () => {
  it('testing a test', () => {
    console.log('hello test')
  })

  it('should return empty strings if lib and lib32 do not exist', () => {
    const wineBin = '/path/to/wine'
    const { lib, lib32 } = getWineLibs(wineBin)
    expect(lib).toBe('')
    expect(lib32).toBe('')
  })

  it('should return the path to lib32 if it exists', () => {
    const wineBin = join(tmpdir(), 'wine_test')
    const wineDir = join(wineBin, '..')
    const lib32Path = join(wineDir, '../lib')
    mkdirSync(lib32Path, { recursive: true })
    const { lib32 } = getWineLibs(wineBin)
    expect(lib32).toBe(lib32Path)
  })

  it('should return the path to lib if it exists', () => {
    const wineBin = join(tmpdir(), 'wine_test')
    const wineDir = join(wineBin, '..')
    const libPath = join(wineDir, '../lib64')
    mkdirSync(libPath, { recursive: true })
    const { lib } = getWineLibs(wineBin)
    expect(lib).toBe(libPath)
  })

  it('should return the paths to lib and lib32 if they both exist', () => {
    const wineBin = join(tmpdir(), 'wine_test')
    const wineDir = join(wineBin, '..')
    const libPath = join(wineDir, '../lib64')
    const lib32Path = join(wineDir, '../lib')
    mkdirSync(libPath, { recursive: true })
    mkdirSync(lib32Path, { recursive: true })
    const { lib, lib32 } = getWineLibs(wineBin)
    expect(lib).toBe(libPath)
    expect(lib32).toBe(lib32Path)
  })
})
