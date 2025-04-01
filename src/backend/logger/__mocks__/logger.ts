import { vi } from 'vitest'

const logger = vi.requireActual('../logger')

logger.logError = vi.fn()
logger.logInfo = vi.fn()
logger.logDebug = vi.fn()
logger.logWarning = vi.fn()

module.exports = logger
export {}
