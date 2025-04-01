import { DirResult, dirSync } from 'tmp'
import graceful_fs from 'graceful-fs'
// import { join } from 'path'
import { app } from 'electron'
import { configStore } from '../../constants'
import * as logfile from '../logfile'
import { logError } from '../logger'
import { platform } from 'os'
import { vi, test, describe, expect, beforeEach, it, afterEach } from 'vitest'

vi.mock('electron')
vi.mock('electron-store')
vi.mock('../../constants')
vi.mock('../logger')
vi.unmock('../logfile')
vi.mock('backend/vite_constants', () => ({
  VITE_IPFS_API: 'https://ipfs.io/ipfs/'
}))
vi.mock('backend/flags/flags', () => ({
  VITE_LD_ENVIRONMENT_ID: '123'
}))
let tmpDir = {} as DirResult

const shouldSkip = platform() === 'win32'
const skipMessage = 'on windows so skipping test'
const emptyTest = it('should do nothing', () => {
  console.log('running empty test')
})

describe('logger/logfile.ts', () => {
  if (shouldSkip) {
    console.log(skipMessage)
    emptyTest
    return
  }
  beforeEach(() => {
    tmpDir = dirSync({ unsafeCleanup: true })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    tmpDir.removeCallback()
  })

  test('createNewLogFileAndClearOldOnes fails because logDir does not exist', () => {
    const spyAppGetPath = vi.spyOn(app, 'getPath').mockReturnValue('invalid')
    const spyOpenSync = vi.spyOn(graceful_fs, 'openSync')

    logfile.createNewLogFileAndClearOldOnes()

    expect(spyOpenSync).toBeCalledWith(
      expect.stringContaining('invalid/hyperplay-'),
      'w'
    )
    expect(spyAppGetPath).toBeCalledWith('logs')
    expect(logError).toBeCalledWith(
      [
        expect.stringContaining(`Open invalid/hyperplay-`),
        expect.objectContaining(
          Error("ENOENT: no such file or directory, open 'invalid/hyperplay-")
        )
      ],
      { prefix: 'Backend', skipLogToFile: true }
    )
  })

  test('createNewLogFileAndClearOldOnes success', () => {
    vi.spyOn(app, 'getPath').mockReturnValue(tmpDir.name)

    configStore.set('general-logs', {
      currentLogFile: 'old/log/path/file.log',
      lastLogFile: '',
      legendaryLogFile: '',
      gogdlLogFile: ''
    })

    vi.spyOn(app, 'requestSingleInstanceLock').mockImplementation(() => true)
    const data = logfile.createNewLogFileAndClearOldOnes()

    expect(logError).not.toBeCalled()
    expect(data).toStrictEqual({
      currentLogFile: expect.any(String),
      lastLogFile: expect.any(String),
      legendaryLogFile: expect.any(String),
      gogdlLogFile: expect.any(String)
    })
  })

  test('getLogFile all possible values', () => {
    expect(logfile.getLogFile('hyperplay')).toMatch(/hyperplay.*\.log$/)
    expect(logfile.getLogFile('legendary')).toMatch(/legendary.*\.log$/)
    expect(logfile.getLogFile('gogdl')).toMatch(/gogdl.*\.log$/)
    // get game log
    expect(logfile.getLogFile('MyApp')).toMatch(/MyApp.*\.log$/)
  })

  test('appendMessageToLogFile success', () => {
    const appendFileSyncSpy = vi
      .spyOn(graceful_fs, 'appendFileSync')
      .mockReturnValue()

    logfile.appendMessageToLogFile('Hello World')
    expect(appendFileSyncSpy).toBeCalledWith('current.log', 'Hello World\n')
  })

  test('appendMessageToLogFile logfile undefined', () => {
    const appendFileSyncSpy = vi
      .spyOn(graceful_fs, 'appendFileSync')
      .mockReturnValue()

    logfile.appendMessageToLogFile('Hello World')

    expect(appendFileSyncSpy).not.toBeCalled()
  })

  test('appendMessageToLogFile fails', () => {
    vi.spyOn(graceful_fs, 'appendFileSync').mockImplementation(() => {
      throw Error('append failed')
    })

    logfile.appendMessageToLogFile('Hello World')
    expect(logError).toBeCalledWith(
      ['Writing log file failed with', Error('append failed')],
      { prefix: 'Backend', skipLogToFile: true }
    )
  })
})
