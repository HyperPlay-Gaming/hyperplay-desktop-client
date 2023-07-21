import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  ChannelReleaseMeta,
  InstallPlatform
} from 'common/types'
import axios from 'axios'
import { getTitleFromEpicStoreUrl } from 'backend/utils'
import { getValistListingApiUrl, valistListingsApiUrl } from 'backend/constants'

export async function getHyperPlayStoreRelease(appName: string) {
  const gameIdUrl = getValistListingApiUrl(appName)
  const res = await axios.get<HyperPlayRelease[]>(gameIdUrl)
  const data = res.data[0]
  return data
}

export async function getHyperPlayReleaseMap() {
  const hpStoreGameReleases = (
    await axios.get<HyperPlayRelease[]>(valistListingsApiUrl)
  ).data

  const hpStoreGameMap = new Map<string, HyperPlayRelease>()

  hpStoreGameReleases.forEach((val) => {
    hpStoreGameMap.set(val.project_id, val)
  })

  return hpStoreGameMap
}

export function handleArchAndPlatform(
  platformToInstall: InstallPlatform,
  releaseMeta: ChannelReleaseMeta
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
    case 'windows_amd64':
    case 'windows_arm64':
      return 'Windows'
    case 'linux_amd64':
    case 'linux_arm64':
      return 'Linux'
    case 'darwin_amd64':
    case 'darwin_arm64':
      return 'Mac'
    case 'web':
      return 'Browser'
    default:
      return platform
  }
}

export const macOSPlatforms = ['darwin', 'darwin_arm64', 'darwin_amd64']
export const linuxPlatforms = ['linux', 'linux_arm64', 'linux_amd64']

/**
 * This is called on every refresh which then overwrites local json store
 */
export function refreshGameInfoFromHpRelease(
  currentInfo: GameInfo,
  data: HyperPlayRelease
): GameInfo {
  const channelsMap = {}
  data.channels.forEach(
    (channel) => (channelsMap[channel.channel_name] = channel)
  )

  let latestVersion = currentInfo.version
  if (
    currentInfo.install !== undefined &&
    currentInfo.install.channelName !== undefined
  ) {
    const installedChannelName = currentInfo.install.channelName
    latestVersion = data.channels[installedChannelName].release_meta.name
  }

  let hasWindowsNativeBuild = false
  let hasMacNativeBuild = false
  let hasLinuxNativeBuild = false

  data.channels.forEach((channel) => {
    const supportedPlatforms = Object.keys(channel.release_meta.platforms)

    if (supportedPlatforms.some((val) => val.startsWith('darwin'))) {
      hasMacNativeBuild = true
    }

    if (supportedPlatforms.some((val) => val.startsWith('linux'))) {
      hasLinuxNativeBuild = true
    }

    if (supportedPlatforms.some((val) => val.startsWith('windows'))) {
      hasWindowsNativeBuild = true
    }
  })

  const newDescription = data.project_meta.description
    ? data.project_meta.description
    : ''

  const newArtSquare = data.project_meta.image || currentInfo.art_square
  const newArtCover = data.project_meta.main_capsule || currentInfo.art_cover
  return {
    ...currentInfo,
    runner: 'hyperplay',
    extra: {
      ...currentInfo.extra,
      about: {
        description: newDescription,
        shortDescription: data.project_meta.short_description
          ? data.project_meta.short_description
          : ''
      },
      reqs: [
        {
          minimum: JSON.stringify(data.project_meta.systemRequirements),
          recommended: JSON.stringify(data.project_meta.systemRequirements),
          title: data.project_meta.name
            ? data.project_meta.name
            : data.project_name
        }
      ],
      storeUrl: `https://store.hyperplay.xyz/game/${data.project_name}`
    },
    art_square: newArtSquare !== undefined ? newArtSquare : 'fallback',
    art_cover: newArtCover !== undefined ? newArtCover : 'fallback',
    developer: data.account_meta.name || data.account_name,
    version: latestVersion,
    is_windows_native: hasWindowsNativeBuild,
    channels: channelsMap,
    store_url: `https://store.hyperplay.xyz/game/${data.project_name}`,
    wineSupport: data.project_meta.wineSupport,
    description: newDescription,
    v: '1',
    project_name: data.project_name,
    web3: { supported: true },
    title: data.project_meta.name ? data.project_meta.name : data.project_name,
    canRunOffline: false,
    cloud_save_enabled: false,
    is_mac_native: hasMacNativeBuild,
    is_linux_native: hasLinuxNativeBuild
  }
}

/**
 * This is called when adding game to library and not during refresh
 */
export function getGameInfoFromHpRelease(data: HyperPlayRelease): GameInfo {
  // these are either values that should be set on initial add and not on every refreshed
  // or they are required to complete the gameinfo type
  // todo: refactor refreshGameInfoFromHpRelease to accept Partial<GameInfo>
  const gameInfo: GameInfo = refreshGameInfoFromHpRelease(
    {
      // only set on game add
      runner: 'hyperplay',
      app_name: data.project_id,
      thirdPartyManagedApp: undefined,
      is_installed: false,
      cloud_save_enabled: false,
      namespace: '',
      folder_name: data.project_name,
      save_folder: '',
      canRunOffline: false,
      install: {},
      //required to complete type
      art_square: 'fallback',
      art_cover: 'fallback',
      title: data.project_meta.name ? data.project_meta.name : data.project_name
    },
    data
  )

  return gameInfo
}

interface EpicToHpMap {
  [key: string]: GameInfo
}
export const epicTitleToHpGameInfoMap: EpicToHpMap = {}

export async function loadEpicHyperPlayGameInfoMap() {
  const res = await axios.get<HyperPlayRelease[]>(valistListingsApiUrl)

  for (const hpRelease of res.data) {
    if (!hpRelease.project_meta.epic_game_url) continue
    try {
      const epicTitle = getTitleFromEpicStoreUrl(
        hpRelease.project_meta.epic_game_url
      )

      epicTitleToHpGameInfoMap[epicTitle.toLowerCase()] =
        getGameInfoFromHpRelease(hpRelease)
    } catch (err) {
      console.error('Error while creating epic hp map', err)
      continue
    }
  }
}
