import { anticheatDataPath, isLinux } from '../constants'
import * as axios from 'axios'
import { logInfo, LogPrefix, logWarning } from '../logger/logger'
import { existsSync, readFileSync, writeFileSync } from 'graceful-fs'
import { AntiCheatInfo } from 'common/types'
import { runOnceWhenOnline } from '../online_monitor'

interface namespaceToAcInfoMapType {
  [key: string]: AntiCheatInfo
}
const namespaceToAcInfoMap: namespaceToAcInfoMapType = {}

function initAcMap(data: AntiCheatInfo[]) {
  if (typeof data !== 'object') return
  for (const info of data) {
    const ns = info.storeIds.epic?.namespace
    if (ns) namespaceToAcInfoMap[ns] = info
  }
}

function getAnticheatDataFromLocal(): AntiCheatInfo[] | undefined {
  if (!existsSync(anticheatDataPath)) return undefined
  const data = readFileSync(anticheatDataPath)
  return JSON.parse(data.toString()) as AntiCheatInfo[]
}

async function downloadAntiCheatData() {
  if (!isLinux) return

  const jsonData = getAnticheatDataFromLocal()
  if (jsonData) initAcMap(jsonData)

  runOnceWhenOnline(async () => {
    try {
      console.log
      const getResult = await axios.default.get(
        'https://raw.githubusercontent.com/Starz0r/AreWeAntiCheatYet/HEAD/games.json'
      )
      const data = getResult.data as unknown as AntiCheatInfo[]
      writeFileSync(anticheatDataPath, JSON.stringify(data, null, 2))
      initAcMap(data)

      logInfo(`AreWeAntiCheatYet data downloaded`, LogPrefix.Backend)
    } catch (error) {
      logWarning(
        `Failed download of AreWeAntiCheatYet data: ${error}`,
        LogPrefix.Backend
      )
    }
  })
}

function getGameAnticheatInfoFromLocal(
  appNamespace: string
): AntiCheatInfo | undefined {
  const jsonData = getAnticheatDataFromLocal()
  return jsonData?.find((info: AntiCheatInfo) => {
    const namespace = info.storeIds.epic?.namespace
    if (namespace) {
      return namespace.toLowerCase() === appNamespace
    } else {
      return false
    }
  })
}

function gameAnticheatInfo(appNamespace: string): AntiCheatInfo | undefined {
  if (!isLinux) return undefined

  if (Object.keys(namespaceToAcInfoMap).length > 0) {
    if (Object.hasOwn(namespaceToAcInfoMap, appNamespace)) {
      return namespaceToAcInfoMap[appNamespace]
    }
    return undefined
  } else {
    return getGameAnticheatInfoFromLocal(appNamespace)
  }
}

export { downloadAntiCheatData, gameAnticheatInfo }
