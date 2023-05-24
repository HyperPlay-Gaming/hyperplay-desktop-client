import {
  AppPlatforms,
  HyperPlayRelease,
  HyperPlayReleaseMeta,
  InstallPlatform
} from 'common/types'
import axios from 'axios'

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
