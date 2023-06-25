import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  ChannelReleaseMeta,
  InstallPlatform
} from 'common/types'
import axios from 'axios'
import { getTitleFromEpicStoreUrl } from 'backend/utils'
import { mainReleaseChannelName, valistListingsApiUrl } from 'backend/constants'

export async function getHyperPlayStoreRelease(appName: string) {
  const gameIdUrl = `https://developers.hyperplay.xyz/api/listings?id=${appName}`
  const res = await axios.get<HyperPlayRelease[]>(gameIdUrl)
  const data = res.data[0]
  return data
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
  if (currentInfo.install.channelName !== undefined) {
    const installedChannelName = currentInfo.install.channelName
    latestVersion = data.channels[installedChannelName].release_meta.name
  }

  let hasWindowsNativeBuild = currentInfo.is_windows_native
  let channelNameToCheck = mainReleaseChannelName
  if (
    currentInfo.install.channelName !== undefined &&
    currentInfo.channels !== undefined
  ) {
    channelNameToCheck = currentInfo.install.channelName
    const channelReleaseMeta =
      currentInfo.channels[channelNameToCheck].release_meta
    hasWindowsNativeBuild = Object.keys(channelReleaseMeta.platforms).some(
      (val) => val.startsWith('windows')
    )
  }

  return {
    ...currentInfo,
    extra: {
      ...currentInfo.extra,
      about: {
        description: data.project_meta.description
          ? data.project_meta.description
          : '',
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
    art_square: data.project_meta.image || currentInfo.art_square,
    art_cover: data.project_meta.main_capsule || currentInfo.art_cover,
    developer: data.account_meta.name || data.account_name,
    version: latestVersion,
    is_windows_native: hasWindowsNativeBuild,
    channels: channelsMap
  }
}

/**
 * This is called when adding game to library and not during refresh
 */
export function getGameInfoFromHpRelease(data: HyperPlayRelease): GameInfo {
  let is_mac_native = false
  let is_linux_native = false

  data.channels.forEach((channel) => {
    const supportedPlatforms = Object.keys(channel.release_meta.platforms)

    if (supportedPlatforms.some((val) => val.startsWith('darwin'))) {
      is_mac_native = true
    }

    if (supportedPlatforms.some((val) => val.startsWith('linux'))) {
      is_linux_native = true
    }
  })

  const gameInfo: GameInfo = refreshGameInfoFromHpRelease(
    {
      app_name: data.project_id,
      thirdPartyManagedApp: undefined,
      web3: { supported: true },
      runner: 'hyperplay',
      title: data.project_meta.name
        ? data.project_meta.name
        : data.project_name,
      is_installed: false,
      cloud_save_enabled: false,
      namespace: '',
      store_url: `https://store.hyperplay.xyz/game/${data.project_name}`,
      folder_name: data.project_name,
      save_folder: '',
      is_mac_native: is_mac_native,
      is_linux_native: is_linux_native,
      art_square: 'fallback',
      art_cover: 'fallback',
      canRunOffline: false,
      install: {}
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
