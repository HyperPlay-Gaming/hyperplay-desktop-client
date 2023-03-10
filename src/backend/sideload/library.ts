import { isMac } from 'backend/constants'
import { GameInfo } from 'common/types'
import { readdirSync } from 'graceful-fs'
import { dirname, join } from 'path'
import { libraryStore } from './electronStores'
import { addShortcuts } from './games'

export function addNewApp({
  app_name,
  title,
  install: { executable, platform },
  art_cover,
  art_square,
  web3,
  browserUrl,
  is_installed = true,
  description,
  wineSupport,
  systemRequirements
}: GameInfo): void {
  const game: GameInfo = {
    runner: 'sideload',
    app_name,
    title,
    install: {
      executable,
      platform
    },
    folder_name: executable !== undefined ? dirname(executable) : undefined,
    art_cover,
    is_installed: is_installed !== undefined ? is_installed : true,
    art_square,
    canRunOffline: !browserUrl,
    browserUrl,
    web3,
    description,
    wineSupport,
    systemRequirements
  }

  if (isMac && executable?.endsWith('.app')) {
    const macAppExecutable = readdirSync(
      join(executable, 'Contents', 'MacOS')
    )[0]
    game.install.executable = join(
      executable,
      'Contents',
      'MacOS',
      macAppExecutable
    )
  }

  const current = libraryStore.get('games', [])

  const gameIndex = current.findIndex((value) => value.app_name === app_name)

  // edit app in case it exists
  if (gameIndex !== -1) {
    current[gameIndex] = { ...current[gameIndex], ...game }
  } else {
    current.push(game)
    addShortcuts(app_name)
  }

  libraryStore.set('games', current)
  return
}
