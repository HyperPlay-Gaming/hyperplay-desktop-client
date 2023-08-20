import { readFileSync } from 'graceful-fs'
import * as child_process from 'child_process'

async function main() {
  const metaMaskReleases = child_process.spawnSync('gh', [
    'release',
    'list',
    '-R',
    'MetaMask/metamask-extension'
  ])
  const metaMaskReleasesStdOut = metaMaskReleases.stdout?.toString()
  const latestVersion = metaMaskReleasesStdOut.match(
    /Version (0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/
  )

  if (!latestVersion || !latestVersion[0])
    throw 'Could not get latest MetaMask Extension version from Github releases!'

  const latestSemver = latestVersion[0].replace('Version ', '')

  console.log('Latest MetaMask Extension Version ', latestSemver)

  const mmManifest = readFileSync(
    'public/extensions/MetaMask_v10.22.2/manifest.json'
  )
  const mmManifestJson = JSON.parse(mmManifest.toString())
  const currentMetaMaskVersion = mmManifestJson.version
  console.log(
    'Current HyperPlay MetaMask Extension Version ',
    currentMetaMaskVersion
  )

  if (latestSemver !== currentMetaMaskVersion)
    throw `MetaMask is not up to date! Our version is ${currentMetaMaskVersion}. The latest version is ${latestSemver}.`
}

main()
