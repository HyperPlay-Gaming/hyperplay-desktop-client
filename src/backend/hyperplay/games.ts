import { getHyperPlayGameInfo } from 'backend/hyperplay/library'
import { existsSync } from 'graceful-fs'
import { isWindows, isMac, isLinux } from '../constants'
import { killPattern } from 'backend/utils'
import { InstallPlatform, Runner } from 'common/types'
import { hpLibraryStore } from './electronStore'
import { sendFrontendMessage } from 'backend/main_window'
import * as path from 'path'
import * as fs from 'fs'
import { LogPrefix, logInfo } from 'backend/logger/logger'

export const isHpGameAvailable = (appName: string) => {
  const hpGameInfo = getHyperPlayGameInfo(appName)
  if (hpGameInfo && hpGameInfo.install.platform === 'web') {
    return true
  }

  if (hpGameInfo.install && hpGameInfo.install.executable) {
    return existsSync(hpGameInfo.install.executable)
  }
  return false
}

export function isHpGameNative(appName: string): boolean {
  const {
    install: { platform }
  } = getHyperPlayGameInfo(appName)
  if (platform) {
    if (platform === 'web') {
      return true
    }

    if (isWindows) {
      return true
    }

    if (isMac && platform === 'Mac') {
      return true
    }

    // small hack, but needs to fix the typings
    const plat = platform.toLowerCase()
    if (isLinux && plat === 'linux') {
      return true
    }
  }

  return false
}

export async function stopHpGame(appName: string): Promise<void> {
  const {
    install: { executable = undefined }
  } = getHyperPlayGameInfo(appName)

  if (executable) {
    const split = executable.split('/')
    const exe = split[split.length - 1]
    killPattern(exe)
  }
}

export async function importGame(
  appName: string,
  pathName: string,
  runner: Runner,
  platform: InstallPlatform
) {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const gameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appName
  })

  if (gameInLibrary === undefined) {
    logInfo('Cannot find game in library so cannot import', LogPrefix.HyperPlay)
    return
  }

  let exec = ''
  const files = await fs.promises.readdir(pathName)
  files.forEach((val) => {
    const splitFile = val.split('.')
    const extension = splitFile[splitFile.length - 1]
    if (extension === 'exe') {
      exec = val
    }
  })

  gameInLibrary.install = {
    install_path: pathName,
    executable: path.join(pathName, exec),
    install_size: '0 GiB',
    is_dlc: false,
    version: '-1',
    platform: platform
  }

  gameInLibrary.is_installed = true
  hpLibraryStore.set('games', currentLibrary)

  sendFrontendMessage('refreshLibrary')
}
