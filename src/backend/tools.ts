import { GameSettings, WineInstallation } from 'common/types'
import axios from 'axios'
import {
  existsSync,
  readFileSync,
  writeFile,
  writeFileSync,
  readdirSync,
  copyFile,
  rm
} from 'graceful-fs'
import { exec, spawn } from 'child_process'
import { execAsync, getWineFromProton } from './utils'
import {
  execOptions,
  toolsPath,
  isLinux,
  isMac,
  isWindows,
  userHome
} from './constants'
import { logError, logInfo, LogPrefix, logWarning } from './logger/logger'
import i18next from 'i18next'
import { dirname, join } from 'path'
import { isOnline } from './online_monitor'
import { showDialogBoxModalAuto } from './dialog/dialog'
import { runWineCommand, validWine } from './launcher'
import { chmod } from 'fs/promises'
import {
  any_gpu_supports_version,
  get_nvngx_path,
  get_vulkan_instance_version
} from './utils/graphics/vulkan'
import { lt as semverLt } from 'semver'

export const DXVK = {
  getLatest: async () => {
    if (isWindows) {
      return
    }
    if (!isOnline()) {
      logWarning(
        'App offline, skipping possible DXVK update.',
        LogPrefix.DXVKInstaller
      )
      return
    }

    const tools = [
      {
        name: 'vkd3d',
        url: 'https://api.github.com/repos/Heroic-Games-Launcher/vkd3d-proton/releases/latest',
        extractCommand: 'tar -xf',
        os: 'linux'
      },
      {
        name: 'dxvk',
        url: getDxvkUrl(),
        extractCommand: 'tar -xf',
        os: 'linux'
      },
      {
        name: 'dxvk-nvapi',
        url: 'https://api.github.com/repos/jp7677/dxvk-nvapi/releases/latest',
        extractCommand: 'tar --one-top-level -xf',
        os: 'linux'
      },
      {
        name: 'dxvk-macOS',
        url: 'https://api.github.com/repos/Gcenx/DXVK-macOS/releases/latest',
        extractCommand: 'tar -xf',
        os: 'darwin'
      }
    ]

    tools.forEach(async (tool) => {
      if (tool.os !== process.platform) {
        return
      }

      const {
        data: { assets }
      } = await axios.get(tool.url)

      const { name, browser_download_url: downloadUrl } = assets[0]
      const pkg = name.replace('.tar.gz', '').replace('.tar.xz', '')

      const latestVersion = `${toolsPath}/${tool.name}/${name}`
      const pastVersionCheck = `${toolsPath}/${tool.name}/latest_${tool.name}`
      let pastVersion = ''
      if (existsSync(pastVersionCheck)) {
        pastVersion = readFileSync(pastVersionCheck).toString().split('\n')[0]
      }

      if (
        pastVersion === pkg &&
        existsSync(`${toolsPath}/${tool.name}/${pkg}`)
      ) {
        return
      }

      const downloadCommand = `curl -L ${downloadUrl} -o '${latestVersion}' --create-dirs`
      const extractCommand = `${tool.extractCommand} '${latestVersion}' -C '${toolsPath}/${tool.name}'`
      const echoCommand = `echo ${pkg} > '${toolsPath}/${tool.name}/latest_${tool.name}'`
      const cleanCommand = `rm '${latestVersion}'`

      logInfo([`Updating ${tool.name} to:`, pkg], LogPrefix.DXVKInstaller)

      return execAsync(downloadCommand)
        .then(async () => {
          logInfo(`downloaded ${tool.name}`, LogPrefix.DXVKInstaller)
          logInfo(`extracting ${tool.name}`, LogPrefix.DXVKInstaller)
          exec(echoCommand)
          await execAsync(extractCommand)
            .then(() =>
              logInfo(`${tool.name} updated!`, LogPrefix.DXVKInstaller)
            )
            .catch((error) => {
              logError(
                [`Extraction of ${tool.name} failed with:`, error],
                LogPrefix.DXVKInstaller
              )
            })

          exec(cleanCommand)
        })
        .catch((error) => {
          logWarning(
            [`Error when downloading ${tool.name}`, error],
            LogPrefix.DXVKInstaller
          )
          showDialogBoxModalAuto({
            title: i18next.t('box.error.dxvk.title', 'DXVK/VKD3D error'),
            message: i18next.t(
              'box.error.dxvk.message',
              'Error installing DXVK/VKD3D! Check your connection!'
            ),
            type: 'ERROR'
          })
        })
    })
  },

  installRemove: async (
    gameSettings: GameSettings,
    tool: 'dxvk' | 'dxvk-nvapi' | 'vkd3d' | 'dxvk-macOS',
    action: 'backup' | 'restore'
  ): Promise<boolean> => {
    if (gameSettings.wineVersion.type === 'toolkit') {
      // we don't want to install dxvk on the toolkit prefix since it breaks Apple's implementation
      logWarning(
        'Skipping DXVK install on Game Porting Toolkit prefix!',
        LogPrefix.DXVKInstaller
      )
      return true
    }

    if (isMac && tool !== 'dxvk') {
      return true
    }

    const prefix = gameSettings.winePrefix
    const winePrefix = prefix.replace('~', userHome)
    const isValidPrefix = existsSync(`${winePrefix}/.update-timestamp`)

    if (!isValidPrefix) {
      logWarning(
        'DXVK cannot be installed on a Proton or a invalid prefix!',
        LogPrefix.DXVKInstaller
      )
      // will return true anyway because otherwise the toggle will be stuck and the prefix might just not be crated yet.
      return true
    }

    tool = isMac ? 'dxvk-macOS' : tool

    // remove the last part of the path since we need the folder only
    const wineBin = gameSettings.wineVersion.bin

    if (!existsSync(`${toolsPath}/${tool}/latest_${tool}`)) {
      logWarning('dxvk not found!', LogPrefix.DXVKInstaller)
      await DXVK.getLatest()
    }

    const globalVersion = readFileSync(`${toolsPath}/${tool}/latest_${tool}`)
      .toString()
      .split('\n')[0]

    const toolPathx32 = `${toolsPath}/${tool}/${globalVersion}/${
      tool === 'vkd3d' ? 'x86' : 'x32'
    }`
    const dlls32 = readdirSync(toolPathx32)
    const toolPathx64 = `${toolsPath}/${tool}/${globalVersion}/x64`
    const dlls64 = readdirSync(toolPathx64)
    const currentVersionCheck = `${winePrefix}/current_${tool}`
    let currentVersion = ''

    if (existsSync(currentVersionCheck)) {
      currentVersion = readFileSync(currentVersionCheck)
        .toString()
        .split('\n')[0]
    }

    if (action === 'restore') {
      logInfo(`Removing ${tool} version information`, LogPrefix.DXVKInstaller)
      if (existsSync(currentVersionCheck)) {
        rm(currentVersionCheck, { force: true }, (err) => {
          if (err) {
            logError(
              [`Error removing ${tool} version information`, err],
              LogPrefix.DXVKInstaller
            )
          }
        })
      }

      logInfo('Removing DLL overrides', LogPrefix.DXVKInstaller)

      // unregister the dlls on the wine prefix
      dlls64.forEach(async (dll) => {
        dll = dll.replace('.dll', '')
        const unregisterDll = [
          'reg',
          'delete',
          'HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides',
          '/v',
          dll,
          '/f'
        ]
        await runWineCommand({
          gameSettings,
          commandParts: unregisterDll,
          wait: true,
          protonVerb: 'waitforexitandrun'
        })
      })
      dlls32.forEach(async (dll) => {
        dll = dll.replace('.dll', '')
        const unregisterDll = [
          'reg',
          'delete',
          'HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides',
          '/v',
          dll,
          '/f'
        ]
        await runWineCommand({
          gameSettings,
          commandParts: unregisterDll,
          wait: true,
          protonVerb: 'waitforexitandrun'
        })
      })
      return true
    }

    logInfo([`installing ${tool} on...`, prefix], LogPrefix.DXVKInstaller)

    if (currentVersion === globalVersion) {
      logInfo(`${tool} already installed!`, LogPrefix.DXVKInstaller)
      return true
    }

    // copy the new dlls to the prefix
    dlls32.forEach((dll) => {
      if (!isMac) {
        copyFile(
          `${toolPathx32}/${dll}`,
          `${winePrefix}/drive_c/windows/syswow64/${dll}`,
          (err) => {
            if (err) {
              logError(
                [`Error when copying ${dll}`, err],
                LogPrefix.DXVKInstaller
              )
            }
          }
        )
      }
    })
    dlls64.forEach((dll) => {
      copyFile(
        `${toolPathx64}/${dll}`,
        `${winePrefix}/drive_c/windows/system32/${dll}`,
        (err) => {
          if (err) {
            logError(
              [`Error when copying ${dll}`, err],
              LogPrefix.DXVKInstaller
            )
          }
        }
      )
    })

    // register dlls on the wine prefix
    dlls64.forEach(async (dll) => {
      // remove the .dll extension otherwise will fail
      dll = dll.replace('.dll', '')
      exec(
        `WINEPREFIX='${winePrefix}' '${wineBin}' reg add 'HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides' /v ${dll} /d native,builtin /f `,
        execOptions,
        (err) => {
          if (err) {
            logError(
              [`Error when registering ${dll}`, err],
              LogPrefix.DXVKInstaller
            )
          }
        }
      )
    })
    dlls32.forEach(async (dll) => {
      // remove the .dll extension otherwise will fail
      dll = dll.replace('.dll', '')
      const registerDll = [
        'reg',
        'add',
        'HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides',
        '/v',
        dll,
        '/d',
        'native,builtin',
        '/f'
      ]
      await runWineCommand({
        gameSettings,
        commandParts: registerDll,
        wait: true,
        protonVerb: 'waitforexitandrun'
      })
    })

    //locate and copy nvngx.dll to support DLSS on Nvidia GPUs
    if (tool === 'dxvk-nvapi' && action === 'backup') {
      try {
        let nvngx_path = get_nvngx_path()
        if (nvngx_path.length !== 0) {
          nvngx_path += '/nvidia/wine'
          const copyDlls = ['nvngx.dll', '_nvngx.dll']
          copyDlls.forEach((dll) => {
            copyFile(
              `${nvngx_path}/${dll}`,
              `${winePrefix}/drive_c/windows/system32/${dll}`,
              (err) => {
                if (err) {
                  logError(
                    [`Error when copying ${dll}`, err],
                    LogPrefix.DXVKInstaller
                  )
                }
              }
            )
          })
          const regModNvngx = [
            'reg',
            'add',
            'HKEY_LOCAL_MACHINE\\SOFTWARE\\NVIDIA Corporation\\Global\\NGXCore',
            '/v',
            'FullPath',
            '/d',
            'C:\\windows\\system32',
            '/f'
          ]
          await runWineCommand({
            gameSettings,
            commandParts: regModNvngx,
            wait: true,
            protonVerb: 'waitforexitandrun'
          })
        } else {
          logWarning(
            'Could not find nvngx.dll for DLSS!',
            LogPrefix.DXVKInstaller
          )
        }
      } catch (err) {
        logError([`Error when finding nvngx.dll`, err], LogPrefix.DXVKInstaller)
      }
    }

    writeFile(currentVersionCheck, globalVersion, (err) => {
      if (err) {
        logError(
          [`Error when writing ${tool} version`, err],
          LogPrefix.DXVKInstaller
        )
      }
    })
    return true
  }
}

export const Winetricks = {
  download: async () => {
    if (!isLinux) {
      return
    }

    const linuxUrl =
      'https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks'
    const macUrl =
      'https://raw.githubusercontent.com/The-Wineskin-Project/winetricks/macOS/src/winetricks'
    const url = isMac ? macUrl : linuxUrl
    const path = `${toolsPath}/winetricks`

    if (!isOnline()) {
      return
    }

    try {
      logInfo('Downloading Winetricks', LogPrefix.WineTricks)
      const res = await axios.get(url, { timeout: 1000 })
      const file = res.data
      writeFileSync(path, file)
      await chmod(path, 0o755)
      return
    } catch (error) {
      return logWarning(
        ['Error Downloading Winetricks', error],
        LogPrefix.WineTricks
      )
    }
  },
  run: async (
    wineVersion: WineInstallation,
    baseWinePrefix: string,
    event: Electron.IpcMainInvokeEvent
  ) => {
    if (!(await validWine(wineVersion))) {
      return
    }

    return new Promise<void>((resolve) => {
      const winetricks = `${toolsPath}/winetricks`

      const { winePrefix, wineBin } = getWineFromProton(
        wineVersion,
        baseWinePrefix
      )

      const winepath = dirname(wineBin)

      const linuxEnvs = {
        ...process.env,
        WINEPREFIX: winePrefix,
        PATH: `${winepath}:${process.env.PATH}`
      }

      const wineServer = join(winepath, 'wineserver')

      const macEnvs = {
        ...process.env,
        WINEPREFIX: winePrefix,
        WINESERVER: wineServer,
        WINE: wineBin,
        WINE64: wineBin,
        PATH: `/opt/homebrew/bin:${process.env.PATH}`
      }

      const envs = isMac ? macEnvs : linuxEnvs

      const executeMessages: string[] = []
      let progressUpdated = false
      const appendMessage = (message: string) => {
        // Don't store more than 100 messages, to not
        // fill the storage and make render still fast
        if (executeMessages.length > 100) {
          executeMessages.shift()
        }
        executeMessages.push(message)
        progressUpdated = true
      }
      const sendProgress = setInterval(() => {
        if (progressUpdated) {
          event.sender.send('progressOfWinetricks', executeMessages)
          progressUpdated = false
        }
      }, 1000)

      // check if winetricks dependencies are installed
      const dependencies = ['7z', 'cabextract', 'zenity', 'unzip', 'curl']
      dependencies.forEach(async (dependency) => {
        try {
          await execAsync(`which ${dependency}`, { ...execOptions, env: envs })
        } catch (error) {
          appendMessage(
            `${dependency} not installed! Winetricks might fail to install some packages or even open`
          )
          logWarning(
            [
              `${dependency} not installed! Winetricks might fail to install some packages or even open`
            ],
            LogPrefix.WineTricks
          )
        }
      })

      logInfo(
        `Running WINEPREFIX='${winePrefix}' PATH='${winepath}':$PATH ${winetricks} --force -q`,
        LogPrefix.WineTricks
      )

      const child = spawn(winetricks, ['--force', '-q'], { env: envs })

      child.stdout.setEncoding('utf8')
      child.stdout.on('data', (data: string) => {
        logInfo(data, LogPrefix.WineTricks)
        appendMessage(data)
      })

      child.stderr.setEncoding('utf8')
      child.stderr.on('data', (data: string) => {
        logError(data, LogPrefix.WineTricks)
        appendMessage(data)
      })

      child.on('error', (error) => {
        logError(['Winetricks threw Error:', error], LogPrefix.WineTricks)
        showDialogBoxModalAuto({
          event,
          title: i18next.t('box.error.winetricks.title', 'Winetricks error'),
          message: i18next.t('box.error.winetricks.message', {
            defaultValue:
              'Winetricks returned the following error during execution:{{newLine}}{{error}}',
            newLine: '\n',
            error: `${error}`
          }),
          type: 'ERROR'
        })
        clearInterval(sendProgress)
        resolve()
      })

      child.on('exit', () => {
        clearInterval(sendProgress)
        resolve()
      })

      child.on('close', () => {
        clearInterval(sendProgress)
        resolve()
      })
    })
  }
}

/**
 * Figures out the right DXVK version to use, taking the user's hardware
 * (specifically their Vulkan support) into account
 */
function getDxvkUrl(): string {
  if (!isLinux) {
    return ''
  }

  if (any_gpu_supports_version([1, 3, 0])) {
    const instance_version = get_vulkan_instance_version()
    if (instance_version && semverLt(instance_version.join('.'), '1.3.0')) {
      // FIXME: How does the instance version matter? Even with 1.2, newer DXVK seems to work fine
      logWarning(
        'Vulkan 1.3 is supported by GPUs in this system, but instance version is outdated',
        LogPrefix.DXVKInstaller
      )
    }
    return 'https://api.github.com/repos/doitsujin/dxvk/releases/latest'
  }
  if (any_gpu_supports_version([1, 1, 0])) {
    logInfo(
      'The GPU(s) in this system only support Vulkan 1.1/1.2, falling back to DXVK 1.10.3',
      LogPrefix.DXVKInstaller
    )
    return 'https://api.github.com/repos/doitsujin/dxvk/releases/tags/v1.10.3'
  }
  logWarning(
    'No GPU with Vulkan 1.1 support found, DXVK will not work',
    LogPrefix.DXVKInstaller
  )
  // FIXME: We currently lack a "Don't download at all" option here, but
  //        that would also need bigger changes in the frontend
  return 'https://api.github.com/repos/doitsujin/dxvk/releases/latest'
}
