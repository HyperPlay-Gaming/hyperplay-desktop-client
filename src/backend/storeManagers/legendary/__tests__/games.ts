import { LegendaryGame } from '../games'
import * as library from '../library'
import { vi, describe, expect, it } from 'vitest'

vi.mock('../../logger/logger')
vi.mock('../../logger/logfile')

describe('LegendaryGame', () => {
  it('Save-sync uses correct path', async () => {
    const spy = vi
      .spyOn(library, 'runLegendaryCommand')
      .mockImplementation(async () => {
        return { stderr: '', stdout: '' }
      })
    const game = LegendaryGame.get('SomeAppName')

    const paths = ['C:\\my\\path', '/home/someone/saves/path']
    for (const path of paths) {
      await game.syncSaves('', path)
      expect(spy.mock.lastCall[0]).toEqual([
        'sync-saves',
        '',
        '--save-path',
        path,
        'SomeAppName',
        '-y'
      ])
    }
  })

  it('Save-sync fails with empty path', async () => {
    vi.spyOn(library, 'runLegendaryCommand')
    const game = LegendaryGame.get('SomeAppName')
    expect(await game.syncSaves('', '')).toBe('No path provided.')
  })
})
