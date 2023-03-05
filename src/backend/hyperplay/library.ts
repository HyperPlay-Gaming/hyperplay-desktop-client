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
