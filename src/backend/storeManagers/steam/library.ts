/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios'
import path from 'node:path'
import { parse } from '@node-steam/vdf'
import { existsSync, readFileSync } from 'graceful-fs'
import { readdir } from 'node:fs/promises'
import { getSteamLibraries } from 'backend/constants'
import { logDebug, LogPrefix, logWarning } from 'backend/logger/logger'
import { isOnline } from 'backend/online_monitor'
import { steamDBBaseURL } from 'backend/shortcuts/nonesteamgame/constants'
import {
  AppManifest,
  OwnedGame,
  SteamInstallInfo,
  SteamLoginUser
} from 'common/types/steam'
import { libraryCache, steamEnabledUsers } from './electronStores'
import { loadUsers } from './user'
import { GameInfo, InstallPlatform } from 'common/types'
import { getGamesdbData } from '../gog/library'
import { apiInfoCache } from '../gog/electronStores'

const library = new Map<string, GameInfo>()
const installed = new Map<string, SteamInstallInfo>()

export async function getOwnedGames(
  userId: string
): Promise<OwnedGame[] | undefined> {
  const url = new URL(
    'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?format=json&include_appinfo=true'
  )

  // Not sure if we want to give people ability to change key, as if it's useful
  url.searchParams.set('key', '10D00637D7AE33A263D4C05EBF6CA573')
  url.searchParams.set('steamid', userId)

  const response = await axios.get(url.toString())

  return response.data?.response.games
}

const ignoredAppIds = [
  '221410', // Steam for Linux
  '228980', // Steamworks Common Redistributables
  '1070560' // Steam Linux Runtime
]

export async function getInstalledGames() {
  const steamLibraries = await getSteamLibraries()
  const steamAppsDirs = steamLibraries.map((lib) => path.join(lib, 'steamapps'))

  logDebug(['Steam libraries found:', steamAppsDirs.join(', ')], {
    prefix: LogPrefix.Steam
  })

  installed.clear()
  for (const steamApps of steamAppsDirs) {
    if (!existsSync(steamApps)) {
      continue
    }
    const files = await readdir(steamApps)

    for (const file of files) {
      if (file.startsWith('appmanifest_')) {
        const data = readFileSync(path.join(steamApps, file), {
          encoding: 'utf-8'
        })
        try {
          const parsedManifest: AppManifest = parse(data).AppState
          installed.set(parsedManifest.appid.toString(), {
            ...parsedManifest,
            install_dir: path.join(
              steamApps,
              'common',
              parsedManifest.installdir
            )
          })
        } catch (e) {
          logWarning(['Error parsing appmanifest of', steamApps, file, e], {
            prefix: LogPrefix.Steam
          })
        }
      }
    }
  }
}

export async function refresh(): Promise<null> {
  const steamUsers = await loadUsers()

  const enabledSteamUsers = steamUsers.reduce((acc, val) => {
    if (steamEnabledUsers.get(val.id, true)) {
      acc.push(val)
    }
    return acc
  }, [] as Array<SteamLoginUser>)

  libraryCache.get('games', []).forEach((game) => {
    library.set(game.app_name, game)
  })

  await getInstalledGames()
  // Get all user owned games

  if (!isOnline()) {
    logDebug('App offline, skipping steam sync', { prefix: LogPrefix.Steam })
    return null
  }

  for (const user of enabledSteamUsers) {
    logDebug(['Loading owned games for user', user.id], {
      prefix: LogPrefix.Steam
    })
    const ownedGames = await getOwnedGames(user.id)
    if (!ownedGames?.length) {
      continue
    }
    apiInfoCache.use_in_memory()
    for (const steamGame of ownedGames) {
      if (ignoredAppIds.includes(steamGame.appid.toString())) {
        continue
      }
      const data = await getGamesdbData(
        'steam',
        steamGame.appid.toString(),
        false
      )
      if (!data) {
        continue
      }

      let artSquare = `${steamDBBaseURL}/${steamGame.appid}/library_600x900.jpg`
      let artCover = `${steamDBBaseURL}/${steamGame.appid}/header.jpg`

      try {
        await axios.head(artSquare)
      } catch (e) {
        artSquare = 'fallback'
        artCover = 'fallback'
      }

      const newGameObject: GameInfo = {
        app_name: steamGame.appid.toString(),
        runner: 'steam',
        art_square: artSquare,
        art_cover: artCover,
        canRunOffline: false,
        title: steamGame.name,
        is_installed: false,
        install: {
          is_dlc: false
        }
      }

      const installedGame = installed.get(steamGame.appid.toString())
      if (installedGame) {
        newGameObject.is_installed = true
        newGameObject.install.install_path = installedGame.install_dir
        newGameObject.install.install_size = installedGame.SizeOnDisk
      }
      library.set(steamGame.appid.toString(), newGameObject)
    }
    apiInfoCache.commit()
    logDebug(['Loaded', ownedGames.length, 'games for user', user.id], {
      prefix: LogPrefix.Steam
    })
    libraryCache.set('games', Array.from(library.values()))
    logDebug(['Loaded', Array.from(library.values()).length], {
      prefix: LogPrefix.Steam
    })
  }

  return null
}

export function getGameInfo(appName: string): GameInfo | undefined {
  return library.get(appName)
}

export async function getInstallInfo(
  appName: string,
  installPlatform: InstallPlatform,
  lang?: string
): Promise<undefined> {
  // We can't fetch such info from steam
  return undefined
}

export async function listUpdateableGames(): Promise<string[]> {
  return []
}

export function installState(appName: string, state: boolean) {
  logWarning(`installState not implemented on Steam Library Manager`)
}

export async function changeGameInstallPath(
  appName: string,
  newAppPath: string
) {
  logWarning(`changeGameInstallPath not implemented on Steam Library Manager`)
}

export async function runRunnerCommand() {
  logWarning(`runRunnerCommand not implemented on Steam Library Manager`)
  return null
}

export const getLaunchOptions = () => []
