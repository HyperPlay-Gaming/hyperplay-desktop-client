import { sendFrontendMessage } from './../main_window'

import { hpLibraryStore } from './electronStore'
import { GameInfo, HyperPlayRelease } from 'common/types'
import axios from 'axios'

export async function addGameToLibrary(appId: string) {
  const currentLibrary = hpLibraryStore.get('games', [])

  // TODO refactor this to constant time check with a set
  // not important for alpha release
  const sameGameInLibrary = currentLibrary.find((val) => {
    return val.app_name === appId
  })

  if (sameGameInLibrary !== undefined) {
    return
  }

  const res = await axios.get<HyperPlayRelease[]>(
    `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  )

  const data = res.data[0]

  const isWebGame = Object.hasOwn(data.releaseMeta.platforms, 'web')

  const gameInfo: GameInfo = {
    app_name: data._id,
    extra: {
      about: {
        description: data.projectMeta.description,
        shortDescription: data.projectMeta.short_description
      },
      reqs: [
        {
          minimum: JSON.stringify(data.projectMeta.systemRequirements),
          recommended: JSON.stringify(data.projectMeta.systemRequirements),
          title: data.projectMeta.name
        }
      ],
      storeUrl: `https://store.hyperplay.xyz/game/${data.projectName}`
    },
    thirdPartyManagedApp: undefined,
    web3: { supported: true },
    runner: 'hyperplay',
    title: data.projectMeta.name,
    art_cover: data.releaseMeta.image,
    art_square: data.projectMeta.main_capsule,
    is_installed: Boolean(data.releaseMeta.platforms.web),
    cloud_save_enabled: false,
    namespace: '',
    developer: data.accountName,
    store_url: `https://store.hyperplay.xyz/game/${data.projectName}`,
    folder_name: data.projectName,
    save_folder: '',
    is_mac_native: false,
    is_linux_native: false,
    canRunOffline: false,
    install: isWebGame ? { platform: 'web' } : {},
    releaseMeta: data.releaseMeta
  }

  if (isWebGame) {
    gameInfo.browserUrl = data.releaseMeta.platforms.web.external_url
  }

  hpLibraryStore.set('games', [...currentLibrary, gameInfo])

  sendFrontendMessage('refreshLibrary')
}

/**
 * Refreshes the game info for a game
 * @param appId the id of the game
 * @returns void
 **/
export async function refreshHPGameInfo(appId: string): Promise<void> {
  const gameIdUrl = `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex((val) => val.app_name === appId)

  if (gameIndex === -1) {
    return
  }

  const currentInfo = currentLibrary[gameIndex]
  const res = await axios.get<HyperPlayRelease>(gameIdUrl)
  const data = res.data

  const gameInfo: GameInfo = {
    ...currentInfo,
    extra: {
      ...currentInfo.extra,
      about: {
        description: data.projectMeta.description,
        shortDescription: data.projectMeta.short_description
      },
      reqs: [
        {
          minimum: JSON.stringify(data.projectMeta.systemRequirements),
          recommended: JSON.stringify(data.projectMeta.systemRequirements),
          title: data.projectMeta.name
        }
      ]
    },
    art_square:
      data.projectMeta.main_capsule ||
      data.releaseMeta.image ||
      currentInfo.art_square,
    art_cover:
      data.releaseMeta.image ||
      data.projectMeta.main_capsule ||
      currentInfo.art_cover
  }

  currentLibrary[gameIndex] = gameInfo

  return hpLibraryStore.set('games', currentLibrary)
}

/**
 * Checks if the game has an update
 * @param appId the id of the game
 * @returns true if the game has an update, false if not
 * @example
 * const hasUpdate = await checkHpGameUpdates('5f9b9b0b0e1c9c0001e8b0b8')
 * console.log(hasUpdate) // true
 **/
export async function checkHpGameUpdates(appId: string): Promise<boolean> {
  const url = `https://developers.hyperplay.xyz/api/listings?id=${appId}`
  const res = await axios.get<HyperPlayRelease>(url)
  const data = res.data

  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const gameIndex = currentLibrary.findIndex((val) => val.app_name === appId)

  if (gameIndex === -1) {
    return false
  }

  const currentInfo = currentLibrary[gameIndex]

  if (
    currentInfo?.releaseMeta?._metadata_version !==
    data.releaseMeta._metadata_version
  ) {
    return true
  }
  return false
}

/**
 * Refreshes the entire library
 * this is a very expensive operation
 * and should be used sparingly
 * it is recommended to use `refreshHPGameInfo` instead
 * if you only want to refresh a single game
 * this is only used when the user clicks the refresh button
 * in the library
 * @returns void
 * @example
 * await refreshHPLibrary()
 * console.log('done')
 * // done
 **/
export async function refreshHPLibrary() {
  const currentLibrary = hpLibraryStore.get('games', []) as GameInfo[]
  const currentLibraryIds = currentLibrary.map((val) => val.app_name)

  for (const gameId of currentLibraryIds) {
    await refreshHPGameInfo(gameId)
  }
  return
}
