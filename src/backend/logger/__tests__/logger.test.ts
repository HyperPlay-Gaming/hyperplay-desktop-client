import * as logger from '../logger'
import { appendMessageToLogFile } from '../logfile'
import { showDialogBoxModalAuto } from '../../dialog/dialog'
import { platform } from 'os'
import { vi, it } from 'vitest'

vi.mock('../logfile')
vi.mock('../../dialog/dialog')

const testData = [
  1234,
  undefined,
  true,
  'normalString',
  ['string1', 'string2'],
  { key1: 100, key2: 'value', key3: { subKey: ['hello', 'world'] } },
  'Error: FAILED'
]

type logLevel = 'WARNING' | 'ERROR' | 'INFO' | 'DEBUG'

function getStringPassedToLogFile(type: logLevel, skipMessagePrefix = false) {
  let messagePrefix = '1234 undefined true normalString string1,string2 {'
  if (!skipMessagePrefix) {
    messagePrefix = `${type}:${' '.repeat(7 - type.length)} [${
      logger.LogPrefix.Backend
    }]:  ${messagePrefix}`
  }

  return [
    messagePrefix,
    '  "key1": 100,',
    '  "key2": "value",',
    '  "key3": {',
    '    "subKey": [',
    '      "hello",',
    '      "world"',
    '    ]',
    '  }',
    '} Error: FAILED'
  ].join('\n')
}

const shouldSkip = platform() === 'win32'
const skipMessage = 'on windows so skipping test'
const emptyTest = it('should do nothing', () => {
  console.log('running empty test')
})

describe('logger/logger.ts', () => {
  if (shouldSkip) {
    console.log(skipMessage)
    emptyTest
    return
  }
  afterEach(vi.restoreAllMocks)

  test('log invokes console', () => {
    const spyConsoleError = vi
      .spyOn(global.console, 'error')
      .mockImplementation(global.console.error)
    const spyConsoleLog = vi
      .spyOn(global.console, 'log')
      .mockImplementation(global.console.log)
    const spyConsoleWarn = vi
      .spyOn(global.console, 'warn')
      .mockImplementation(global.console.warn)

    interface TestCaseProps {
      function: logger.LogFunction
      spyConsole: any
    }

    const testCases = new Map<logLevel, TestCaseProps>([
      ['ERROR', { function: logger.logError, spyConsole: spyConsoleError }],
      ['INFO', { function: logger.logInfo, spyConsole: spyConsoleLog }],
      ['WARNING', { function: logger.logWarning, spyConsole: spyConsoleWarn }],
      ['DEBUG', { function: logger.logDebug, spyConsole: spyConsoleLog }]
    ])

    testCases.forEach((props, level) => {
      props.function(testData, {
        prefix: logger.LogPrefix.Backend,
        skipLogToFile: true
      })

      expect(props.spyConsole).toBeCalledWith(
        expect.stringContaining(
          `${level}:${' '.repeat(7 - level.length)} [${
            logger.LogPrefix.Backend
          }]`
        ),
        ...testData
      )
    })
  })

  test('log appends to log file', () => {
    vi.spyOn(global.console, 'error').mockImplementation(global.console.error)
    vi.spyOn(global.console, 'log').mockImplementation(global.console.log)
    vi.spyOn(global.console, 'warn').mockImplementation(global.console.warn)

    const testCases = new Map<logLevel, logger.LogFunction>([
      ['ERROR', logger.logError],
      ['INFO', logger.logInfo],
      ['WARNING', logger.logWarning],
      ['DEBUG', logger.logDebug]
    ])

    testCases.forEach((logFunction, level) => {
      logFunction(testData, logger.LogPrefix.Backend)

      expect(appendMessageToLogFile).toBeCalledWith(
        expect.stringContaining(getStringPassedToLogFile(level))
      )
    })
  })

  test('log can be shown as dialog', () => {
    vi.spyOn(global.console, 'error').mockImplementation(global.console.error)
    vi.spyOn(global.console, 'log').mockImplementation(global.console.log)
    vi.spyOn(global.console, 'warn').mockImplementation(global.console.warn)

    const testCases = new Map<logLevel, logger.LogFunction>([
      ['ERROR', logger.logError],
      ['INFO', logger.logInfo],
      ['WARNING', logger.logWarning],
      ['DEBUG', logger.logDebug]
    ])

    testCases.forEach((logFunction, level) => {
      logFunction(testData, {
        prefix: logger.LogPrefix.Backend,
        skipLogToFile: true,
        showDialog: true
      })

      expect(showDialogBoxModalAuto).toBeCalledWith({
        title: 'Backend',
        message: getStringPassedToLogFile(level, true),
        type: 'ERROR'
      })
    })
  })

  test('log undefined variable works', () => {
    vi.spyOn(global.console, 'error').mockImplementation(global.console.error)
    const spyConsoleLog = vi
      .spyOn(global.console, 'log')
      .mockImplementation(global.console.log)
    vi.spyOn(global.console, 'warn').mockImplementation(global.console.warn)

    logger.logInfo(undefined, logger.LogPrefix.Backend)

    expect(spyConsoleLog).toBeCalledWith(
      expect.stringContaining(`INFO:    [${logger.LogPrefix.Backend}]`),
      undefined
    )

    expect(appendMessageToLogFile).toBeCalledWith(
      expect.stringContaining('INFO:    [Backend]:  undefined')
    )
  })
})
