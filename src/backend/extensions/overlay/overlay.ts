import { OverlayMode } from 'common/state/interfaces'
import { OverlayAction, OverlayRenderState, Runner } from 'common/types'

import fs from 'fs';
import path from 'path';

const modulePath = path.resolve(__dirname, 'backend/hyperplay-overlay/model');

export async function importOverlayModule(moduleName: string) {
  if (fs.existsSync(modulePath)) {
    const module = await import(`backend/hyperplay-overlay/${moduleName}`);
    return module;
  }
  return null;
}

export async function openOverlay(appName: string, runner: Runner){
  const module = await importOverlayModule('openOverlay');
  if (module) {
    return module.openOverlay(appName, runner);
  }
  return false;
}

export async function closeOverlay(){
  const module = await importOverlayModule('closeOverlay');
  if (module) {
    return module.closeOverlay();
  }
  return false
}

export async function toggleOverlay({
  action = 'TOGGLE'
}: {
  action?: OverlayAction
} = {}) {
  const module = await importOverlayModule('toggleOverlay');
  if (module) {
    return module.toggleOverlay({ action });
  }
  return false
}

export async function updatePopupInOverlay(show: boolean){
  const module = await importOverlayModule('updatePopupInOverlay');
  if (module) {
    return module.updatePopupInOverlay(show);
  }
    return false
}

export async function initOverlayRenderState(webContentsId: number, renderState: OverlayRenderState, title: OverlayMode){
  const module = await importOverlayModule('initOverlayRenderState');
  if (module) {
    return module.initOverlayRenderState(webContentsId, renderState, title);
  }
    return false
}
