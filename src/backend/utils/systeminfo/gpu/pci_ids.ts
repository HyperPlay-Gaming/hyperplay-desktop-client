/**
 * Contains helper functions to work with the `pci.ids` file
 * ({@link https://pci-ids.ucw.cz})
 */
import { join } from 'path'

import { toolsPath } from 'backend/constants'

import type { PartialGpuInfo } from './index'
import type { GPUInfo } from '../index'
import { LogPrefix, logError } from 'backend/logger/logger'
import { downloadFile } from 'backend/utils'
import { createAbortController } from 'backend/utils/aborthandler/aborthandler'
import { existsSync, readFileSync } from 'graceful-fs'

const pciIdsMap: Record<
  string,
  {
    vendorName: string
    devices: Record<
      string,
      {
        deviceName: string
        subsystems: Record<`${string} ${string}`, string>
      }
    >
  }
> = {}

async function getPciIds(): Promise<typeof pciIdsMap | null> {
  if (Object.keys(pciIdsMap).length !== 0) return pciIdsMap

  await downloadFile(
    'https://pci-ids.ucw.cz/v2.2/pci.ids',
    toolsPath,
    'pci.ids',
    createAbortController('pci.ids')
  )

  let currentVendor: string | null = null
  let currentDevice: string | null = null

  const pciIdsFile = join(toolsPath, 'pci.ids')

  if (!existsSync(pciIdsFile)) return null

  const pciIdsFileContent = readFileSync(pciIdsFile, 'utf-8')

  for (const line of pciIdsFileContent.split('\n')) {
    // Skip comments and empty lines
    if (line.startsWith('#')) continue
    if (line === '') continue

    // Case 1: Line describes a new vendor
    const vendorMatch = line.match(/^(.{4}) {2}(.*)$/)
    const vendorId = vendorMatch?.[1]
    const vendorName = vendorMatch?.[2]
    if (vendorId && vendorName) {
      pciIdsMap[vendorId] = { vendorName, devices: {} }
      currentVendor = vendorId
      continue
    }

    // Case 2: Line describes a new device
    const deviceMatch = line.match(/^\t(.{4}) {2}(.*)$/)
    const deviceId = deviceMatch?.[1]
    const deviceName = deviceMatch?.[2]
    if (deviceId && deviceName && currentVendor) {
      const vendorObj = pciIdsMap[currentVendor]
      if (!vendorObj) continue
      vendorObj.devices[deviceId] = { deviceName, subsystems: {} }
      currentDevice = deviceId
      continue
    }

    // Case 3: Line describes a new subsystem
    const subsystemMatch = line.match(/\t\t(.{4}) (.{4}) {2}(.*)$/)
    if (!subsystemMatch) continue
    const [, subvendor, subdevice, subsystemName] = subsystemMatch
    if (
      subvendor &&
      subdevice &&
      subsystemName &&
      currentVendor &&
      currentDevice
    ) {
      const deviceObj = pciIdsMap[currentVendor]?.devices[currentDevice]
      if (!deviceObj) continue
      deviceObj.subsystems[`${subvendor} ${subdevice}`] = subsystemName
    }
  }

  return pciIdsMap
}

async function populateDeviceAndVendorName(
  partialGpus: PartialGpuInfo[]
): Promise<GPUInfo[]> {
  try {
    const pciIds = await getPciIds()
    if (pciIds === null) return partialGpus

    const fullGpuInfo: GPUInfo[] = []
    for (const gpu of partialGpus) {
      const vendorId = gpu.vendorId.toLowerCase()
      const deviceId = gpu.deviceId.toLowerCase()
      const subvendorId = gpu.subvendorId?.toLowerCase()
      const subdeviceId = gpu.subdeviceId?.toLowerCase()
      const vendor = pciIds[vendorId]
      const device = pciIds[vendorId]?.devices[deviceId]
      const subsystem =
        pciIds[vendorId]?.devices[deviceId]?.subsystems[
          `${subvendorId} ${subdeviceId}`
        ]
      fullGpuInfo.push({
        ...gpu,
        deviceString: subsystem ?? device?.deviceName,
        vendorString: vendor?.vendorName
      })
    }
    return fullGpuInfo
  } catch (error) {
    logError(
      `Failed to populate device and vendor name: ${error}`,
      LogPrefix.Backend
    )
    return partialGpus
  }
}

export { populateDeviceAndVendorName }
