import { app } from 'electron';
import { join } from 'path';

export function getBasePath() {
  const configFolder = app.getPath('appData')
  return join(configFolder, 'hyperplay', 'tools', 'ipdt')
}
