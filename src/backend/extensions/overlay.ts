import { logDebug, LogPrefix } from 'backend/logger/logger'
import { OverlayMode } from 'common/state/interfaces'
import { OverlayAction, OverlayRenderState, Runner } from 'common/types'

export const openOverlay = async (appName: string, runner: Runner) => {
    try {
      // @ts-expect-error ignore import error
    const { openOverlay: openOverlayFromImport } = await import('backend/hyperplay-overlay')
    return await openOverlayFromImport(appName, runner)
} catch (error) {
    logDebug('Overlay not available', LogPrefix.Backend)
    return false
  }
}

export const closeOverlay = async () => {
  try {
    // @ts-expect-error ignore import error
    const { closeOverlay: closeOverlayFromImport } = await import('backend/hyperplay-overlay')
    return closeOverlayFromImport
  } catch (error) {
    logDebug('Overlay not available', LogPrefix.Backend)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return false
  }
}

export async function toggleOverlay({
  action = 'TOGGLE'
}: {
  action?: OverlayAction
} = {}) {
  try {
    // @ts-expect-error ignore import error
    const { toggleOverlay: toggleOverlayFromImport } = await import('backend/hyperplay-overlay')
    return await toggleOverlayFromImport({action})
  } catch (error) {
    logDebug('Overlay not available', LogPrefix.Backend)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return false
  }
}

export const updatePopupInOverlay = async (show: boolean) => {
    try {
        // eslint-disable-next-line
        const { updatePopupInOverlay: updatePopupInOverlayFromImport } = await import('backend/hyperplay-overlay')
        return updatePopupInOverlayFromImport(show)
    } catch (error) {
        logDebug('Overlay not available', LogPrefix.Backend)
        return false
    }
    }

export const initOverlayRenderState = async (webContentsId: number, renderState: OverlayRenderState, title: OverlayMode) => {
    try {
        // eslint-disable-next-line
        const { initOverlayRenderState: initOverlayRenderStateFromImport } = await import('backend/hyperplay-overlay')
        return initOverlayRenderStateFromImport(webContentsId, renderState, title)
    } catch (error) {
        logDebug('Overlay not available', LogPrefix.Backend)
        return false
    }
    }
