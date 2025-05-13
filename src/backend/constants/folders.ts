import { app } from 'electron'
import { join, resolve } from 'path'

export const configFolder = app.getPath('appData')
export const appConfigFolder = join(configFolder, 'hyperplay')
export const publicDir = resolve(
  __dirname,
  '..',
  app.isPackaged ? '' : '../public'
)
export function fixAsarPath(origin: string): string {
  if (!origin.includes('app.asar.unpacked')) {
    return origin.replace('app.asar', 'app.asar.unpacked')
  }
  return origin
}
export const icon = fixAsarPath(join(publicDir, 'app_icon.png'))
