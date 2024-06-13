import { LogPrefix, logError } from 'backend/logger/logger'
import { HyperPlayAPI } from '@hyperplay/utils'

export async function getHpOverlay() {
  try {
    const hpOverlay = await import('@hyperplay/overlay')
    if (!Object.hasOwn(hpOverlay, 'toggleOverlay')) {
      return undefined
    }
    return hpOverlay
  } catch (err) {
    logError(`Error getting overlay ${err}`, LogPrefix.HyperPlay)
  }
  return undefined
}

export const initOverlay = async function (api: HyperPlayAPI) {
  try {
    const hpOverlay = await getHpOverlay()
    hpOverlay?.initOverlay(api)
  } catch (err) {
    logError(`Error initializing overlay ${err}`, LogPrefix.HyperPlay)
  }
}
