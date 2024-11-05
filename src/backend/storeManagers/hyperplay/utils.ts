import {
  AppPlatforms,
  GameInfo,
  HyperPlayRelease,
  ChannelReleaseMeta,
  InstallPlatform,
  GameType
} from 'common/types'
import axios from 'axios'
import { getTitleFromEpicStoreUrl, spawnAsync } from 'backend/utils'
import {
  getValistListingApiUrl,
  isWindows,
  patchApiUrl,
  qaToken,
  valistListingsApiUrl
} from 'backend/constants'
import { getGameInfo } from './games'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'
import { join } from 'path'
import { existsSync } from 'graceful-fs'
import { ProjectMetaInterface } from '@valist/sdk/dist/typesShared'
import getPartitionCookies from 'backend/utils/get_partition_cookies'
import { DEV_PORTAL_URL } from 'common/constants'

export async function getHyperPlayStoreRelease(
  appName: string
): Promise<HyperPlayRelease> {
  const gameIdUrl = getValistListingApiUrl(appName)
  const res = await axios.get<HyperPlayRelease>(gameIdUrl)
  const data = res.data
  return data
}

export async function getIPDTManifestUrl(
  releaseId: string,
  platformName: string
): Promise<string> {
  const url = new URL(patchApiUrl)
  url.searchParams.append('release_id', releaseId)
  url.searchParams.append('platform_name', platformName)
  const cookieString = await getPartitionCookies({
    partition: 'persist:auth',
    url: DEV_PORTAL_URL
  })

  const validateResult = await fetch(url, {
    method: 'GET',
    headers: {
      Cookie: cookieString
    }
  })
  if (!validateResult.ok) {
    const errMsg = await validateResult.text()
    logError(
      `Error getting release manifest for ${releaseId}. ${errMsg}`,
      LogPrefix.HyperPlay
    )
    throw errMsg
  }
  const data = await validateResult.json()
  return data?.manifest
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

export async function getHyperPlayNameToReleaseMap() {
  const hpStoreGameReleases = (
    await axios.get<HyperPlayRelease[]>(valistListingsApiUrl)
  ).data

  const hpStoreGameMap = new Map<string, HyperPlayRelease>()

  hpStoreGameReleases
    .filter((val) => !!val.project_meta.name)
    .forEach((val) => {
      hpStoreGameMap.set(val.project_meta.name!.toLowerCase(), val)
    })

  return hpStoreGameMap
}

/**
 * @returns an object mapping project id key to listing value
 * necessary for stringifying over ipc to send to the frontend.
 * use getHyperPlayReleaseMap for backend/main process calls.
 */
export async function getHyperPlayReleaseObject() {
  const hpStoreGameReleases = (
    await axios.get<HyperPlayRelease[]>(valistListingsApiUrl)
  ).data

  const hpStoreGameMap = {}

  hpStoreGameReleases.forEach((val) => {
    hpStoreGameMap[val.project_id] = val
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
    'web',
    'webgl'
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
    latestVersion = data.channels.find(
      (val) => val.channel_name === installedChannelName
    )?.release_meta.name
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
          minimum: JSON.stringify(data.project_meta.system_requirements),
          recommended: JSON.stringify(data.project_meta.system_requirements),
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
    wineSupport: data.project_meta.wine_support,
    description: newDescription,
    v: '1',
    project_name: data.project_name,
    web3: { supported: true },
    title: data.project_meta.name ? data.project_meta.name : data.project_name,
    canRunOffline: false,
    cloud_save_enabled: false,
    is_mac_native: hasMacNativeBuild,
    is_linux_native: hasLinuxNativeBuild,
    account_name: data.account_name,
    networks: data.project_meta.networks
  }
}

/**
 * This is called when adding game to library and not during refresh
 */
export function getGameInfoFromHpRelease(data: HyperPlayRelease): GameInfo {
  // automatically "install" browser only games with 1 channel
  let isOnlyWeb = false
  const platforms = data.channels[0].release_meta.platforms
  const platformKeys = Object.keys(platforms)
  if (
    data.channels.length === 1 &&
    platformKeys.length === 1 &&
    platformKeys[0] === 'web'
  )
    isOnlyWeb = true
  // these are either values that should be set on initial add and not on every refreshed
  // or they are required to complete the gameinfo type
  // todo: refactor refreshGameInfoFromHpRelease to accept Partial<GameInfo>
  const gameInfo: GameInfo = refreshGameInfoFromHpRelease(
    {
      // only set on game add
      runner: 'hyperplay',
      app_name: data.project_id,
      thirdPartyManagedApp: undefined,
      is_installed: isOnlyWeb,
      cloud_save_enabled: false,
      namespace: '',
      folder_name: data.project_name,
      save_folder: '',
      canRunOffline: false,
      install: isOnlyWeb
        ? { platform: 'web', channelName: data.channels[0].channel_name }
        : {},
      //required to complete type
      art_square: 'fallback',
      art_cover: 'fallback',
      title: data.project_meta.name
        ? data.project_meta.name
        : data.project_name,
      browserUrl: isOnlyWeb ? platforms['web']?.external_url : undefined,
      type: data.project_meta.type as GameType
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

export function sanitizeVersion(ver: string) {
  return ver.toLowerCase().replaceAll(' ', '')
}

// hit the valist api and get the info if the game is a epic listing
export async function getEpicListingUrl(projectId: string): Promise<string> {
  const listingUrl = getValistListingApiUrl(projectId)

  try {
    const getConfig =
      qaToken !== '' ? { headers: { Authorization: `Bearer ${qaToken}` } } : {}
    const res = await axios.get<HyperPlayRelease>(listingUrl, getConfig)

    if (res.status !== 200) {
      logError(`Error when trying to get listing info ${res}`)
      return ''
    }

    const data = res.data
    const { epic_game_url, launch_epic } =
      data.project_meta as ProjectMetaInterface

    if (
      !!launch_epic &&
      !!epic_game_url &&
      epic_game_url.startsWith('https://store.epicgames.com/')
    ) {
      return epic_game_url
    }
    return ''
  } catch (error) {
    logError(`Error when trying to get listing info: ${error}`)
    return ''
  }
}

export const runModPatcher = async (appName: string) => {
  const installPath = getGameInfo(appName)?.install.install_path
  if (!installPath) {
    logError(`Cannot find install path for ${appName}`, LogPrefix.HyperPlay)
    return
  }

  const patcherBinary = isWindows ? 'client-patcher.exe' : 'client-patcher'
  const patcher = join(installPath, patcherBinary)
  const manifest = join(installPath, 'patch', 'manifest.json')

  logInfo(
    `Running patcher ${patcher} with manifest ${manifest}`,
    LogPrefix.HyperPlay
  )

  if (!existsSync(patcher)) {
    throw new Error(`Patcher not found at ${patcher}`)
  }

  try {
    const { stderr, stdout } = await spawnAsync(
      patcherBinary,
      ['patch', '-m', 'patch/manifest.json'],
      { cwd: installPath }
    )
    logInfo(['Patch Applied', stdout], LogPrefix.HyperPlay)
    if (stderr) {
      logError(stderr, LogPrefix.HyperPlay)
    }
  } catch (error) {
    throw new Error(`Error running patcher: ${error}`)
  }
}
