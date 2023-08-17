import { app } from 'electron';
import { join } from 'path';

export function getBasePath() {
  const configFolder = app.getPath('appData')
  const baseRdiffPath = join(configFolder, 'hyperplay', 'tools')
  return baseRdiffPath
}
