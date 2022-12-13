import {
  existsSync,
  openSync,
  readdirSync,
  unlinkSync,
  appendFileSync
} from 'graceful-fs'

import {
  configStore,
  currentLogFile,
  gamesConfigPath,
  lastLogFile
} from '../constants'
import { app } from 'electron'
import { join } from 'path'
import { logError, LogPrefix } from './logger'

interface createLogFileReturn {
  currentLogFile: string
  lastLogFile: string
  legendaryLogFile: string
  gogdlLogFile: string
}

let longestPrefix = 0
export const getLongestPrefix = (): number => longestPrefix

const createLogFile = (filePath: string) => {
  try {
    openSync(filePath, 'w')
  } catch (error) {
    logError([`Open ${filePath} failed with`, error], {
      prefix: LogPrefix.Backend,
      skipLogToFile: true
    })
  }
}

/**
 * Creates a new log file in hyperplay config path under folder Logs.
 * It also removes old logs every new month.
 * @returns path to current log file
 */
export function createNewLogFileAndClearOldOnes(): createLogFileReturn {
  const date = new Date()
  const logDir = app.getPath('logs')
  const fmtDate = date.toISOString().replaceAll(':', '_')
  const newLogFile = join(logDir, `hyperplay-${fmtDate}.log`)
  const newLegendaryLogFile = join(logDir, `legendary-${fmtDate}.log`)
  const newGogdlLogFile = join(logDir, `gogdl-${fmtDate}.log`)

  createLogFile(newLogFile)
  createLogFile(newLegendaryLogFile)
  createLogFile(newGogdlLogFile)

  // Clean out logs that are more than a month old
  if (existsSync(logDir)) {
    try {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      const logs = readdirSync(logDir, {
        withFileTypes: true
      })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name)

      logs.forEach((log) => {
        if (log.match(/(hyperplay|legendary|gogdl)-/)) {
          const dateString = log
            .replace(/(hyperplay|legendary|gogdl)-/, '')
            .replace('.log', '')
            .replaceAll('_', ':')
          const logDate = new Date(dateString)
          if (logDate <= oneMonthAgo) {
            unlinkSync(`${logDir}/${log}`)
          }
        }
      })
    } catch (error) {
      logError([`Removing old logs in ${logDir} failed with`, error], {
        prefix: LogPrefix.Backend,
        skipLogToFile: true
      })
    }
  }

  let logs: createLogFileReturn = {
    currentLogFile: '',
    lastLogFile: '',
    legendaryLogFile: '',
    gogdlLogFile: ''
  }
  if (configStore.has('general-logs')) {
    logs = configStore.get('general-logs') as createLogFileReturn
  }

  logs.lastLogFile = logs.currentLogFile
  logs.currentLogFile = newLogFile
  logs.legendaryLogFile = newLegendaryLogFile
  logs.gogdlLogFile = newGogdlLogFile

  configStore.set('general-logs', logs)

  // get longest prefix to log lines in a kind of table
  for (const prefix in LogPrefix) {
    if (longestPrefix < String(prefix).length) {
      longestPrefix = String(prefix).length
    }
  }

  return logs
}

/**
 * Returns according to options the fitting log file
 * @param appName     if given returns game log
 * @param defaultLast if set getting hyperplay default last log
 * @returns path to log file
 */
export function getLogFile(props: {
  appName?: string
  defaultLast?: boolean
}): string {
  return props.appName
    ? join(gamesConfigPath, props.appName + '-lastPlay.log')
    : props.defaultLast
    ? lastLogFile
    : currentLogFile
}

/**
 * Appends given message to the current log file
 * @param message message to append
 */
export function appendMessageToLogFile(message: string) {
  try {
    if (currentLogFile) {
      appendFileSync(currentLogFile, `${message}\n`)
    }
  } catch (error) {
    logError(['Writing log file failed with', error], {
      prefix: LogPrefix.Backend,
      skipLogToFile: true
    })
  }
}
