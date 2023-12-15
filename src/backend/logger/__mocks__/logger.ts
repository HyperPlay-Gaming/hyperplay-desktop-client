import { vi } from 'vitest'

const logger = vi.importActual('../logger')

logger.logError = vi.fn()
logger.logInfo = vi.fn()
logger.logDebug = vi.fn()
logger.logWarning = vi.fn()

export default logger
