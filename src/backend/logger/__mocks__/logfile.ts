import { vi } from 'vitest'
const logfile = await vi.importActual('../logfile')
console.log('mocking logfile')
export const createNewLogFileAndClearOldOnes = vi.fn().mockReturnValue('')
export const appendMessageToLogFile = vi.fn()

export default logfile
