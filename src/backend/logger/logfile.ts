import {
  existsSync,
  openSync,
  readdirSync,
  unlinkSync,
  appendFileSync
} from 'graceful-fs'

import { configStore, currentLogFile, gamesConfigPath } from '../constants'
import { app } from 'electron'
import { join } from 'path'
import { logError, LogPrefix, logsDisabled } from './logger'

interface createLogFileReturn {
  currentLogFile: string
  lastLogFile: string
  legendaryLogFile: string
  gogdlLogFile: string
  nileLogFile: string
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
  const newNileLogFile = join(logDir, `nile-${fmtDate}.log`)

  createLogFile(newLogFile)
  createLogFile(newLegendaryLogFile)
  createLogFile(newGogdlLogFile)
  createLogFile(newNileLogFile)

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
        if (log.match(/(hyperplay|legendary|gogdl|nile)-/)) {
          const dateString = log
            .replace(/(hyperplay|legendary|gogdl|nile)-/, '')
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

  const logs = configStore.get('general-logs', {
    currentLogFile: '',
    lastLogFile: '',
    legendaryLogFile: '',
    gogdlLogFile: '',
    nileLogFile: ''
  })

  logs.lastLogFile = logs.currentLogFile
  logs.currentLogFile = newLogFile
  logs.legendaryLogFile = newLegendaryLogFile
  logs.gogdlLogFile = newGogdlLogFile
  logs.nileLogFile = newNileLogFile

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
 * @param appNameOrRunner     if given returns game log
 * @returns path to log file
 */
export function getLogFile(appNameOrRunner: string): string {
  const logs = configStore.get('general-logs', {
    currentLogFile: '',
    lastLogFile: '',
    legendaryLogFile: '',
    gogdlLogFile: '',
    nileLogFile: ''
  })

  switch (appNameOrRunner) {
    case 'heroic':
      return logs.currentLogFile
    case 'legendary':
      return logs.legendaryLogFile
    case 'gogdl':
      return logs.gogdlLogFile
    case 'nile':
      return logs.nileLogFile
    default:
      return join(gamesConfigPath, appNameOrRunner + '-lastPlay.log')
  }
}

/**
 * Appends given message to the current log file
 * @param message message to append
 */
export function appendMessageToLogFile(message: string) {
  try {
    if (!logsDisabled && currentLogFile) {
      appendFileSync(currentLogFile, `${message}\n`)
    }
  } catch (error) {
    logError(['Writing log file failed with', error], {
      prefix: LogPrefix.Backend,
      skipLogToFile: true
    })
  }
}
