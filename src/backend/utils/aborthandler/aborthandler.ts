import { LogPrefix, logError, logInfo } from './../../logger/logger'

const abortControllers = new Map<string, AbortController>()

function createAbortController(id: string): AbortController {
  const abortController = new AbortController()
  // add or update map entry
  logInfo(`Creating abort controller for ${id}`, LogPrefix.Backend)
  abortControllers.set(id, abortController)
  return abortController
}

function callAbortController(id: string) {
  if (abortControllers.has(id)) {
    const abortController = abortControllers.get(id)!
    logInfo(`Aborting ${id}`, LogPrefix.Backend)
    if (abortController && !abortController.signal.aborted) {
      logInfo(`Aborted ${id}`, LogPrefix.Backend)
      return abortController.abort()
    }
  }

  logError(
    [
      'Aborting not possible. Could not find a matching abort controller for',
      id
    ],
    LogPrefix.Backend
  )
}

function callAllAbortControllers() {
  for (const key in abortControllers.keys()) {
    callAbortController(key)
  }
}

function deleteAbortController(id: string) {
  logInfo(`Deleting abort controller for ${id}`, LogPrefix.Backend)
  abortControllers.delete(id)
}

export {
  createAbortController,
  callAbortController,
  callAllAbortControllers,
  deleteAbortController
}
