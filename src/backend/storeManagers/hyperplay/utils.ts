import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  HyperPlayReleaseMeta,
  InstallPlatform
} from 'common/types'
import axios from 'axios'
import { getTitleFromEpicStoreUrl } from 'backend/utils'

export async function getHyperPlayStoreRelease(appName: string) {
  const gameIdUrl = `https://developers.hyperplay.xyz/api/listings?id=${appName}`
  const res = await axios.get<HyperPlayRelease[]>(gameIdUrl)
  const data = res.data[0]
  return data
}

export function handleArchAndPlatform(
  platformToInstall: InstallPlatform,
  releaseMeta: HyperPlayReleaseMeta
): AppPlatforms {
  const arch = process.arch === 'x64' ? '_amd64' : '_arm64'
  const hpPlatforms = [
    'windows_arm64',
    'linux_arm64',
    'darwin_arm64',
    'windows_amd64',
    'linux_amd64',
    'darwin_amd64',
    'web'
  ]
  const isHpPlatform = hpPlatforms.includes(platformToInstall)

  if (isHpPlatform) {
    return platformToInstall as AppPlatforms
  }

  switch (platformToInstall) {
    case 'Windows':
      if (releaseMeta.platforms[`windows${arch}`]) {
        return `windows${arch}`
      } else if (arch === '_amd64' && releaseMeta.platforms.windows_arm64) {
        return 'windows_arm64'
      } else {
        return 'windows_amd64'
      }
    case 'linux':
      if (releaseMeta.platforms[`linux${arch}`]) {
        return `linux${arch}`
      } else if (arch === '_amd64' && releaseMeta.platforms.linux_arm64) {
        return 'linux_arm64'
      } else {
        return 'linux_amd64'
      }
    case 'Mac':
      if (releaseMeta.platforms[`darwin${arch}`]) {
        return `darwin${arch}`
      } else if (arch === '_amd64' && releaseMeta.platforms.darwin_arm64) {
        return 'darwin_arm64'
      } else {
        return 'darwin_amd64'
      }
    case 'Browser':
      return 'web'
    default:
      return 'web'
  }
}

export function handlePlatformReversed(platform: string) {
  switch (platform) {
    case 'windows_arm64':
      return 'Windows'
    case 'linux_arm64':
      return 'linux'
    case 'darwin_arm64':
      return 'Mac'
    case 'windows_amd64':
      return 'Windows'
    case 'linux_amd64':
      return 'linux'
    case 'darwin_amd64':
      return 'Mac'
    case 'web':
      return 'Browser'
    default:
      return platform
  }
}

export const macOSPlatforms = ['darwin', 'darwin_arm64', 'darwin_amd64']
export const linuxPlatforms = ['linux', 'linux_arm64', 'linux_amd64']

export function getGameInfoFromHpRelease(data: HyperPlayRelease): GameInfo {
  const isWebGame = Object.hasOwn(data.releaseMeta.platforms, 'web')
  const supportedPlatforms = Object.keys(data.releaseMeta.platforms)

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
    art_square: data.projectMeta.image || data.releaseMeta.image || 'fallback',
    art_cover:
      data.releaseMeta.image || data.projectMeta.main_capsule || 'fallback',
    is_installed: Boolean(data.releaseMeta.platforms.web),
    cloud_save_enabled: false,
    namespace: '',
    developer: data.accountMeta.name || data.accountName,
    store_url: `https://store.hyperplay.xyz/game/${data.projectName}`,
    folder_name: data.projectName,
    save_folder: '',
    is_mac_native: supportedPlatforms.some((val) => val.startsWith('darwin')),
    is_linux_native: supportedPlatforms.some((val) => val.startsWith('linux')),
    canRunOffline: false,
    install: isWebGame ? { platform: 'web' } : {},
    releaseMeta: data.releaseMeta,
    version: data.releaseName
  }

  if (isWebGame) {
    gameInfo.browserUrl = data.releaseMeta.platforms.web.external_url
  }
  return gameInfo
}

interface EpicToHpMap {
  [key: string]: GameInfo
}
export const epicTitleToHpGameInfoMap: EpicToHpMap = {}

export async function loadEpicHyperPlayGameInfoMap() {
  const res = await axios.get<HyperPlayRelease[]>(
    `https://developers.hyperplay.xyz/api/listings`
  )

  for (const hpRelease of res.data) {
    if (!hpRelease.projectMeta.epic_game_url) continue
    try {
      const epicTitle = getTitleFromEpicStoreUrl(
        hpRelease.projectMeta.epic_game_url
      )

      epicTitleToHpGameInfoMap[epicTitle.toLowerCase()] =
        getGameInfoFromHpRelease(hpRelease)
    } catch (err) {
      console.error('Error while creating epic hp map', err)
      continue
    }
  }
}
