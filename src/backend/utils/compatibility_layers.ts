import { GlobalConfig } from 'backend/config'
import {
  configPath,
  getSteamLibraries,
  icon,
  isLinux,
  isMac,
  isWindows,
  toolsPath,
  userHome
} from 'backend/constants'
import {
  logError,
  LogPrefix,
  logInfo,
  logsDisabled
} from 'backend/logger/logger'
import {
  checkRosettaInstall,
  execAsync,
  isMacSonomaOrHigher
} from 'backend/utils'
import { execSync } from 'child_process'
import {
  ExecResult,
  GameSettings,
  ProgressInfo,
  Runner,
  State,
  WineCommandArgs,
  WineInstallation
} from 'common/types'
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync
} from 'graceful-fs'
import { homedir } from 'os'
import { dirname, join } from 'path'
import { PlistObject, parse as plistParse } from 'plist'
import LaunchCommand from '../storeManagers/legendary/commands/launch'
import { NonEmptyString, Path } from '../storeManagers/legendary/commands/base'
import { GameConfig } from 'backend/game_config'
import { runWineCommand, validWine } from 'backend/launcher'
import { sendFrontendMessage } from 'backend/main_window'
import { DXVK, Winetricks } from 'backend/tools'
import {
  installWineVersion,
  updateWineVersionInfos,
  wineDownloaderInfoStore
} from 'backend/wine/manager/utils'
import { dialog } from 'electron'
import i18next from 'i18next'
import {
  createAbortController,
  deleteAbortController
} from './aborthandler/aborthandler'
import { notify } from 'backend/dialog/dialog'
import { gameManagerMap } from 'backend/storeManagers'

/**
 * Loads the default wine installation path and version.
 *
 * @returns Promise<WineInstallation>
 */
export function getDefaultWine(): WineInstallation {
  const defaultWine: WineInstallation = {
    bin: '',
    name: 'Default Wine - Not Found',
    type: 'wine'
  }

  try {
    let stdout = execSync(`which wine`).toString()
    const wineBin = stdout.split('\n')[0]
    defaultWine.bin = wineBin

    stdout = execSync(`wine --version`).toString()
    const version = stdout.split('\n')[0]
    defaultWine.name = `Wine Default - ${version}`

    return {
      ...defaultWine,
      ...getWineExecs(wineBin)
    }
  } catch {
    return defaultWine
  }
}

function getCustomWinePaths(): Set<WineInstallation> {
  const customPaths = new Set<WineInstallation>()
  // skips this on new installations to avoid infinite loops
  if (existsSync(configPath)) {
    const { customWinePaths = [] } = GlobalConfig.get().getSettings()
    customWinePaths.forEach((path: string) => {
      if (path.endsWith('proton')) {
        return customPaths.add({
          bin: path,
          name: `Custom Proton - ${path}`,
          type: 'proton'
        })
      }
      return customPaths.add({
        bin: path,
        name: `Custom Wine - ${path}`,
        type: 'wine',
        ...getWineExecs(path)
      })
    })
  }
  return customPaths
}

/**
 * Checks if a Wine version has the Wineserver executable and returns the path to it if it's present
 * @param wineBin The unquoted path to the Wine binary ('wine')
 * @returns The quoted path to wineserver, if present
 */
export function getWineExecs(wineBin: string): { wineserver: string } {
  const wineDir = dirname(wineBin)
  const ret = { wineserver: '' }
  const potWineserverPath = join(wineDir, 'wineserver')
  if (existsSync(potWineserverPath)) {
    ret.wineserver = potWineserverPath
  }
  return ret
}

/**
 * Checks if a Wine version has lib/lib32 folders and returns the path to those if they're present
 * @param wineBin The unquoted path to the Wine binary ('wine')
 * @returns The paths to lib and lib32, if present
 */
export function getWineLibs(wineBin: string): {
  lib: string
  lib32: string
} {
  const wineDir = dirname(wineBin)
  const ret = { lib: '', lib32: '' }
  const potLib32Path = join(wineDir, '../lib')
  if (existsSync(potLib32Path)) {
    ret.lib32 = potLib32Path
  }
  const potLibPath = join(wineDir, '../lib64')
  if (existsSync(potLibPath)) {
    ret.lib = potLibPath
  }
  return ret
}

export async function getLinuxWineSet(
  scanCustom?: boolean
): Promise<Set<WineInstallation>> {
  if (!existsSync(`${toolsPath}/wine`)) {
    mkdirSync(`${toolsPath}/wine`, { recursive: true })
  }

  if (!existsSync(`${toolsPath}/proton`)) {
    mkdirSync(`${toolsPath}/proton`, { recursive: true })
  }

  const altWine = new Set<WineInstallation>()

  readdirSync(`${toolsPath}/wine/`).forEach((version) => {
    const wineBin = join(toolsPath, 'wine', version, 'bin', 'wine')
    altWine.add({
      bin: wineBin,
      name: `Wine - ${version}`,
      type: 'wine',
      ...getWineLibs(wineBin),
      ...getWineExecs(wineBin)
    })
  })

  const lutrisPath = `${homedir()}/.local/share/lutris`
  const lutrisCompatPath = `${lutrisPath}/runners/wine/`

  if (existsSync(lutrisCompatPath)) {
    readdirSync(lutrisCompatPath).forEach((version) => {
      const wineBin = join(lutrisCompatPath, version, 'bin', 'wine')
      altWine.add({
        bin: wineBin,
        name: `Wine - ${version}`,
        type: 'wine',
        ...getWineLibs(wineBin),
        ...getWineExecs(wineBin)
      })
    })
  }

  const protonPaths = [`${toolsPath}/proton/`]

  await getSteamLibraries().then((libs) => {
    libs.forEach((path) => {
      protonPaths.push(`${path}/steam/steamapps/common`)
      protonPaths.push(`${path}/steamapps/common`)
      protonPaths.push(`${path}/root/compatibilitytools.d`)
      protonPaths.push(`${path}/compatibilitytools.d`)
      return
    })
  })

  const proton = new Set<WineInstallation>()

  protonPaths.forEach((path) => {
    if (existsSync(path)) {
      readdirSync(path).forEach((version) => {
        const protonBin = join(path, version, 'proton')
        // check if bin exists to avoid false positives
        if (existsSync(protonBin)) {
          proton.add({
            bin: protonBin,
            name: `Proton - ${version}`,
            type: 'proton'
            // No need to run this.getWineExecs here since Proton ships neither Wineboot nor Wineserver
          })
        }
      })
    }
  })

  const defaultWineSet = new Set<WineInstallation>()
  const defaultWine = await getDefaultWine()
  if (!defaultWine.name.includes('Not Found')) {
    defaultWineSet.add(defaultWine)
  }

  let customWineSet = new Set<WineInstallation>()
  if (scanCustom) {
    customWineSet = getCustomWinePaths()
  }

  return new Set([...defaultWineSet, ...altWine, ...proton, ...customWineSet])
}

/// --------------- MACOS ------------------

/**
 * Detects Wine installed on home application folder on Mac
 *
 * @returns Promise<Set<WineInstallation>>
 */
export async function getWineOnMac(
  searchSystem = false
): Promise<Set<WineInstallation>> {
  const wineSet = new Set<WineInstallation>()
  if (!isMac) {
    return wineSet
  }

  const winePaths = new Set<string>()

  // search for wine installed on $HOME/Library/Application Support/hyperplay/tools/wine
  const wineToolsPath = `${toolsPath}/wine/`
  if (existsSync(wineToolsPath)) {
    readdirSync(wineToolsPath).forEach((path) => {
      winePaths.add(join(wineToolsPath, path))
    })
  }

  // search for wine installed around the system
  if (searchSystem) {
    await execAsync('mdfind kMDItemCFBundleIdentifier = "*.wine"').then(
      async ({ stdout }) => {
        stdout.split('\n').forEach((winePath) => {
          // avoid duplicating toolkit wine
          if (!winePath.includes('game-porting-toolkit')) {
            winePaths.add(winePath)
          }
        })
      }
    )
  }

  winePaths.forEach((winePath) => {
    const infoFilePath = join(winePath, 'Contents/Info.plist')
    if (winePath && existsSync(infoFilePath)) {
      const info = plistParse(
        readFileSync(infoFilePath, 'utf-8')
      ) as PlistObject
      const version = info['CFBundleShortVersionString'] || ''
      const name = info['CFBundleName'] || ''
      const wineBin = join(winePath, '/Contents/Resources/wine/bin/wine64')
      if (existsSync(wineBin)) {
        wineSet.add({
          ...getWineExecs(wineBin),
          lib: `${winePath}/Contents/Resources/wine/lib`,
          lib32: `${winePath}/Contents/Resources/wine/lib`,
          bin: wineBin,
          name: `${name} - ${version}`,
          type: 'wine',
          ...getWineExecs(wineBin)
        })
      }
    }
  })

  return wineSet
}

export async function getWineskinWine(): Promise<Set<WineInstallation>> {
  const wineSet = new Set<WineInstallation>()
  if (!isMac) {
    return wineSet
  }
  const wineSkinPath = `${userHome}/Applications/Wineskin`
  if (existsSync(wineSkinPath)) {
    const apps = readdirSync(wineSkinPath)
    for (const app of apps) {
      if (app.includes('.app')) {
        const wineBin = `${userHome}/Applications/Wineskin/${app}/Contents/SharedSupport/wine/bin/wine64`
        if (existsSync(wineBin)) {
          try {
            const { stdout: out } = await execAsync(`'${wineBin}' --version`)
            const version = out.split('\n')[0]
            wineSet.add({
              ...getWineExecs(wineBin),
              lib: `${userHome}/Applications/Wineskin/${app}/Contents/SharedSupport/wine/lib`,
              lib32: `${userHome}/Applications/Wineskin/${app}/Contents/SharedSupport/wine/lib`,
              name: `Wineskin - ${version}`,
              type: 'wine',
              bin: wineBin
            })
          } catch (error) {
            logError(
              `Error getting wine version for ${wineBin}`,
              LogPrefix.GlobalConfig
            )
          }
        }
      }
    }
  }
  return wineSet
}

/**
 * Detects CrossOver installs on Mac
 *
 * @returns Promise<Set<WineInstallation>>
 */
export async function getCrossover(): Promise<Set<WineInstallation>> {
  const crossover = new Set<WineInstallation>()

  if (!isMac) {
    return crossover
  }

  await execAsync(
    'mdfind kMDItemCFBundleIdentifier = "com.codeweavers.CrossOver"'
  )
    .then(async ({ stdout }) => {
      stdout.split('\n').forEach((crossoverMacPath) => {
        const infoFilePath = join(crossoverMacPath, 'Contents/Info.plist')
        if (crossoverMacPath && existsSync(infoFilePath)) {
          const info = plistParse(
            readFileSync(infoFilePath, 'utf-8')
          ) as PlistObject
          const version = info['CFBundleShortVersionString'] || ''
          const crossoverWineBin = join(
            crossoverMacPath,
            'Contents/SharedSupport/CrossOver/bin/wine'
          )
          crossover.add({
            bin: crossoverWineBin,
            name: `CrossOver - ${version}`,
            type: 'crossover',
            ...getWineExecs(crossoverWineBin)
          })
        }
      })
    })
    .catch(() => {
      logInfo('CrossOver not found', LogPrefix.GlobalConfig)
    })
  return crossover
}

/**
 * Detects Gaming Porting Toolkit Wine installs on Mac
 * @returns Promise<Set<WineInstallation>>
 **/
export async function getGamingPortingToolkitWine(): Promise<
  Set<WineInstallation>
> {
  const gamingPortingToolkitWine = new Set<WineInstallation>()
  if (!isMac) {
    return gamingPortingToolkitWine
  }

  const GPTK_ToolPath = join(toolsPath, 'game-porting-toolkit')
  const wineGPTKPaths = new Set<string>()

  if (existsSync(GPTK_ToolPath)) {
    readdirSync(GPTK_ToolPath).forEach((path) => {
      wineGPTKPaths.add(join(GPTK_ToolPath, path))
    })
  }

  wineGPTKPaths.forEach((winePath) => {
    const infoFilePath = join(winePath, 'Contents/Info.plist')
    if (winePath && existsSync(infoFilePath)) {
      const wineBin = join(winePath, '/Contents/Resources/wine/bin/wine64')
      try {
        const name = winePath.split('/').pop() || ''
        if (existsSync(wineBin)) {
          gamingPortingToolkitWine.add({
            ...getWineExecs(wineBin),
            lib: `${winePath}/Contents/Resources/wine/lib`,
            lib32: `${winePath}/Contents/Resources/wine/lib`,
            bin: wineBin,
            name,
            type: 'toolkit',
            ...getWineExecs(wineBin)
          })
        }
      } catch (error) {
        logError(
          `Error getting wine version for GPTK ${wineBin}`,
          LogPrefix.GlobalConfig
        )
      }
    }
  })

  return gamingPortingToolkitWine
}

/**
 * Detects Gaming Porting Toolkit Wine installs on Mac
 * @returns Promise<Set<WineInstallation>>
 **/
export async function getSystemGamingPortingToolkitWine(): Promise<
  Set<WineInstallation>
> {
  const systemGPTK = new Set<WineInstallation>()
  if (!isMac) {
    return systemGPTK
  }

  logInfo('Searching for Gaming Porting Toolkit Wine', LogPrefix.GlobalConfig)
  const { stdout } = await execAsync('mdfind wine64')
  const wineBin = stdout.split('\n').filter((p) => {
    return p.match(/game-porting-toolkit.*\/wine64$/)
  })[0]

  if (existsSync(wineBin)) {
    logInfo(
      `Found Gaming Porting Toolkit Wine at ${dirname(wineBin)}`,
      LogPrefix.GlobalConfig
    )
    try {
      const { stdout: out } = await execAsync(`'${wineBin}' --version`)
      const version = out.split('\n')[0]
      const GPTKDIR = join(dirname(wineBin), '..')
      systemGPTK.add({
        ...getWineExecs(wineBin),
        name: `GPTK System (DX11/DX12 Only) - ${version}`,
        type: 'toolkit',
        lib: join(GPTKDIR, 'lib'),
        lib32: join(GPTKDIR, 'lib'),
        bin: wineBin
      })
    } catch (error) {
      logError(
        `Error getting wine version for ${wineBin}`,
        LogPrefix.GlobalConfig
      )
    }
  }

  return systemGPTK
}

/**
 * Detects Whisky installs on Mac
 *
 * @returns Promise<Set<WineInstallation>>
 */
export async function getWhisky(): Promise<Set<WineInstallation>> {
  const whisky = new Set<WineInstallation>()

  if (!isMac) {
    return whisky
  }

  await execAsync(
    'mdfind kMDItemCFBundleIdentifier = "com.isaacmarovitz.Whisky"'
  ).then(async ({ stdout }) => {
    stdout.split('\n').forEach((whiskyMacPath) => {
      const infoFilePath = join(whiskyMacPath, 'Contents/Info.plist')
      if (whiskyMacPath && existsSync(infoFilePath)) {
        const info = plistParse(
          readFileSync(infoFilePath, 'utf-8')
        ) as PlistObject
        const version = info['CFBundleShortVersionString'] || ''
        const whiskeyWineDir = `${userHome}/Library/Application Support/com.isaacmarovitz.Whisky/Libraries/Wine`
        const whiskyWineBin = `${whiskeyWineDir}/bin/wine64`

        whisky.add({
          bin: whiskyWineBin,
          name: `Whisky - ${version}`,
          type: `toolkit`,
          lib: join(whiskeyWineDir, 'lib'),
          lib32: join(whiskeyWineDir, 'lib'),
          ...getWineExecs(whiskyWineBin)
        })
      }
    })
  })

  return whisky
}

export type AllowedWineFlags = Pick<
  LaunchCommand,
  '--wine' | '--wrapper' | '--no-wine'
>

/**
 * Returns a LegendaryCommand with the required flags to use a specified Wine version
 * @param wineBin The full path to the Wine binary (`wine`/`wine64`/`proton`)
 * @param wineType The type of the Wine version
 * @param wrapper Any wrappers to be used, may be `''`
 */
export function getWineFlags(
  wineBin: string,
  wineType: WineInstallation['type'],
  wrapper: string
): AllowedWineFlags {
  let partialCommand: AllowedWineFlags = {}
  switch (wineType) {
    case 'wine':
    case 'toolkit':
      partialCommand = { '--wine': Path.parse(wineBin) }
      if (wrapper) partialCommand['--wrapper'] = NonEmptyString.parse(wrapper)
      break
    case 'proton':
      partialCommand = {
        '--no-wine': true,
        '--wrapper': NonEmptyString.parse(`${wrapper} '${wineBin}' run`)
      }
      break
    case 'crossover':
      partialCommand = {
        '--wine': Path.parse(wineBin)
      }
      if (wrapper) partialCommand['--wrapper'] = NonEmptyString.parse(wrapper)
      break
    default:
      break
  }
  return partialCommand
}

/**
 * Like {@link getWineFlags}, but returns a `string[]` with the flags instead
 */
export function getWineFlagsArray(
  wineBin: string,
  wineType: WineInstallation['type'],
  wrapper: string
): string[] {
  const partialCommand = getWineFlags(wineBin, wineType, wrapper)

  const commandArray: string[] = []
  for (const [key, value] of Object.entries(partialCommand)) {
    if (value === true) commandArray.push(key)
    else commandArray.push(key, value)
  }
  return commandArray
}

export async function initializeCompatibilityLayer() {
  // Fetch available Wine versions on the system
  const availableWine = (await GlobalConfig.get().getAlternativeWine()) || []

  // Determine if the toolkit has been downloaded on macOS
  const toolkitDownloaded = availableWine.some(
    (wine) => wine.type === 'toolkit'
  )

  // Determine if we need to download a new Wine version
  const shouldDownloadWine =
    !availableWine.length || (isMac && !toolkitDownloaded)

  // Build an array of promises for initialization tasks
  const initializationTasks: Array<Promise<WineInstallation | void | null>> = [
    DXVK.getLatest(),
    Winetricks.download()
  ]

  if (shouldDownloadWine) {
    initializationTasks.push(downloadDefaultWine())
  }

  if (isMac) {
    initializationTasks.push(checkRosettaInstall())
    initializationTasks.push(setGPTKDefaultOnMacOS())
  }

  try {
    await Promise.all(initializationTasks)
  } catch (error) {
    logError(
      ['Error during compatibility layer initialization', error],
      LogPrefix.Backend
    )
  }
}

export async function downloadDefaultWine() {
  if (isWindows) return null

  try {
    // Refresh wine list
    await updateWineVersionInfos(true)

    // Get list of available wine versions
    const availableWine = wineDownloaderInfoStore.get('wine-releases', [])

    // use Wine-GE type if on Linux and GPTK or Wine-Crossover if on Mac
    const isGPTKCompatible = isMac ? await isMacSonomaOrHigher() : false
    const results = await Promise.all(
      availableWine.map(async (version) => {
        if (isLinux) {
          return (
            version.type === 'Wine-GE' &&
            version.version.includes('Wine-GE-Proton')
          )
        }

        if (isMac) {
          return isGPTKCompatible
            ? version.type === 'Game-Porting-Toolkit'
            : version.type === 'Wine-Crossover'
        }
        return false
      })
    )

    const release = availableWine.filter((_, index) => results[index])[0]

    if (!release) {
      logError('Could not find any wine from list', LogPrefix.Backend)
      return null
    }

    // Notify user and start download
    notify({
      title: i18next.t(
        'notification.wine-download.title',
        'Compatibility Layer'
      ),
      body: i18next.t(
        'notification.wine-download.message',
        'Setting up the default compatibility layer'
      )
    })

    const onProgress = (state: State, progress?: ProgressInfo) => {
      sendFrontendMessage(`progressOfWineManager${release.version}`, {
        state,
        progress
      })
    }

    const abortController = createAbortController(release.version)
    const result = await installWineVersion(
      release,
      onProgress,
      abortController.signal
    )

    deleteAbortController(release.version)

    if (result !== 'success') {
      return null
    }

    // Update the game config to use the downloaded wine
    const wineList = await GlobalConfig.get().getAlternativeWine()
    const downloadedWine = wineList[0]

    if (downloadedWine) {
      logInfo(`Changing wine version to ${downloadedWine.name}`)
      GlobalConfig.get().setSetting('wineVersion', downloadedWine)
    }

    return downloadedWine
  } catch (error) {
    logError(['Error during wine download process', error], LogPrefix.Backend)
    notify({
      title: i18next.t('notification.wine-download-failed.title', 'Error'),
      body: i18next.t(
        'notification.wine-download-failed.message',
        'Failed to setup the default compatibility layer'
      )
    })

    return null
  }
}

export async function setGPTKDefaultOnMacOS() {
  const isGPTKCompatible = await isMacSonomaOrHigher()
  if (!isGPTKCompatible) {
    return
  }

  const { wineVersion: defaultWine } = GlobalConfig.get().getSettings()

  const ignoreList = ['crossover', 'toolkit']

  if (
    ignoreList.includes(defaultWine.type.toLowerCase()) ||
    defaultWine.name.includes('Toolkit')
  ) {
    return
  }

  const wineList = await GlobalConfig.get().getAlternativeWine()
  const gptk = wineList.find((wine) => wine.type === 'toolkit')

  if (gptk && existsSync(gptk.bin)) {
    logInfo(`Changing wine version to ${gptk.name}`)
    GlobalConfig.get().setSetting('wineVersion', gptk)
    // update prefix to use the new one as well
    const installPath = GlobalConfig.get().getSettings().defaultInstallPath
    const newPrefix = join(installPath, 'Prefixes', 'GPTK')
    GlobalConfig.get().setSetting('winePrefix', newPrefix)
  }
  return
}

export async function checkWineBeforeLaunch(
  appName: string,
  gameSettings: GameSettings,
  logFileLocation: string
): Promise<boolean> {
  const wineIsValid = await validWine(gameSettings.wineVersion)

  const isToolkit = gameSettings.wineVersion.type === 'toolkit'
  const isGPTKCompatible = await isMacSonomaOrHigher()

  const isValidOnLinux = isLinux && wineIsValid
  const isValidtoolkitOnMac =
    isMac && isToolkit && isGPTKCompatible && wineIsValid
  const isValidWineOnMac = isMac && !isToolkit && wineIsValid
  const isValidOnMac = isValidtoolkitOnMac || isValidWineOnMac

  if (isValidOnMac || isValidOnLinux) {
    return true
  } else {
    if (!logsDisabled) {
      logError(
        `Wine version ${gameSettings.wineVersion.name} is not valid, trying another one.`,
        LogPrefix.Backend
      )

      appendFileSync(
        logFileLocation,
        `Wine version ${gameSettings.wineVersion.name} is not valid, trying another one.`
      )
    }

    // check if the default wine is valid now
    const { wineVersion: defaultwine } = GlobalConfig.get().getSettings()
    const defaultWineIsValid = await validWine(defaultwine)
    if (defaultWineIsValid) {
      const { response } = await ContinueWithFoundWine(
        gameSettings.wineVersion.name,
        defaultwine.name
      )

      if (response === 0) {
        logInfo(`Changing wine version to ${defaultwine.name}`)
        gameSettings.wineVersion = defaultwine
        GameConfig.get(appName).setSetting('wineVersion', defaultwine)
        return true
      } else {
        logInfo('User canceled the launch', LogPrefix.Backend)
        return false
      }
    } else {
      const wineList = await GlobalConfig.get().getAlternativeWine()

      // if Linux get the first element, if macOS and isGPTKCompatible is true get one with type 'toolkit', otherwise get the one with type 'wine'
      const firstFoundWine = wineList.find((wine) => {
        if (isLinux) {
          return wine.type === 'wine'
        } else if (isMac) {
          return isGPTKCompatible
            ? wine.type === 'toolkit'
            : wine.type === 'wine'
        }
        return undefined
      })

      const isValidWine = await validWine(firstFoundWine)

      if (!wineList.length || !firstFoundWine || !isValidWine) {
        const firstFoundWine = await downloadDefaultWine()
        if (firstFoundWine) {
          logInfo(`Changing wine version to ${firstFoundWine.name}`)
          gameSettings.wineVersion = firstFoundWine
          GameConfig.get(appName).setSetting('wineVersion', firstFoundWine)
          return true
        }
      }

      if (firstFoundWine && isValidWine) {
        const { response } = await ContinueWithFoundWine(
          gameSettings.wineVersion.name,
          firstFoundWine.name
        )

        if (response === 0) {
          logInfo(`Changing wine version to ${firstFoundWine.name}`)
          gameSettings.wineVersion = firstFoundWine
          GameConfig.get(appName).setSetting('wineVersion', firstFoundWine)
          return true
        } else {
          logInfo('User canceled the launch', LogPrefix.Backend)
          return false
        }
      }
    }
  }
  return false
}

async function ContinueWithFoundWine(
  selectedWine: string,
  foundWine: string
): Promise<{ response: number }> {
  const isGPTK = selectedWine.toLowerCase().includes('toolkit')
  const isGPTKCompatible = await isMacSonomaOrHigher()

  if (isMac && isGPTK && !isGPTKCompatible) {
    const { response } = await dialog.showMessageBox({
      title: i18next.t(
        'box.warning.wine-change.title-gptk',
        'Game Porting Toolkit Not Compatible '
      ),
      message: i18next.t('box.warning.wine-change.message-gptk', {
        defaultValue:
          'To be able to run games using the Apple Gaming porting toolkit you need to upgrade your macOS to 14 (Sonoma) or higher. {{newline}} We found Wine on your system, do you want to continue launching using {{foundWine}} ?',
        newline: '\n',
        foundWine: foundWine
      }),
      buttons: [i18next.t('box.yes'), i18next.t('box.no')],
      icon: icon
    })
    return { response }
  }

  const { response } = await dialog.showMessageBox({
    title: i18next.t('box.warning.wine-change.title', 'Wine not found!'),
    message: i18next.t('box.warning.wine-change.message', {
      defaultValue:
        'We could not find the selected wine version to launch this title ({{selectedWine}}). {{newline}} We found another one, do you want to continue launching using {{foundWine}} ?',
      newline: '\n',
      selectedWine: selectedWine,
      foundWine: foundWine
    }),
    buttons: [i18next.t('box.yes'), i18next.t('box.no')],
    icon: icon
  })

  return { response }
}

export async function runWineCommandOnGame(
  runner: Runner,
  appName: string,
  { commandParts, wait = false, protonVerb, startFolder }: WineCommandArgs
): Promise<ExecResult> {
  if (gameManagerMap[runner].isNative(appName)) {
    logError(
      `runWineCommand called on native game: ${appName}`,
      LogPrefix.Backend
    )
    return { stdout: '', stderr: '' }
  }
  const { folder_name, install } = gameManagerMap[runner].getGameInfo(appName)
  const gameSettings = await gameManagerMap[runner].getSettings(appName)

  return runWineCommand({
    gameSettings,
    installFolderName: folder_name,
    gameInstallPath: install.install_path,
    commandParts,
    wait,
    protonVerb,
    startFolder
  })
}
