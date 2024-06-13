import { LogPrefix, logError } from 'backend/logger/logger'
import { HyperPlayAPI } from '@hyperplay/utils'

export async function getHpOverlay() {
  try {
    const hpOverlay = await import('@hyperplay/overlay')
    return hpOverlay
  } catch (err) {
    logError(`Error initializing overlay ${err}`, LogPrefix.HyperPlay)
  }
  return undefined
}

export const initOverlay = async function (api: HyperPlayAPI) {
  const hpOverlay = await getHpOverlay()
  hpOverlay?.initOverlay(api)
}
