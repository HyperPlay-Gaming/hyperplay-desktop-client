import { vi } from 'vitest'

const constants = await vi.importActual('../constants')

constants.currentLogFile = 'current.log'
constants.lastLogFile = 'last.log'
constants.isSteamDeckGameMode = false

export default constants
