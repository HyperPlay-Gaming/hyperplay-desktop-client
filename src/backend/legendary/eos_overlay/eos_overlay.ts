import { ChildProcess } from 'child_process'
import { dialog } from 'electron'
import { existsSync, readFileSync } from 'graceful-fs'
import { t } from 'i18next'
import { join } from 'path'

import { toolsPath, isLinux, legendaryConfigPath } from '../../constants'
import { logError, LogPrefix, logWarning } from '../../logger/logger'
import { runLegendaryCommand } from '../library'
import { LegendaryGame } from '../games'
import { getGame, killPattern } from '../../utils'
import { verifyWinePrefix } from '../../launcher'

const currentVersionPath = join(legendaryConfigPath, 'overlay_version.json')
const installedVersionPath = join(legendaryConfigPath, 'overlay_install.json')
const defaultInstallPath = join(toolsPath, 'eos_overlay')

function getStatus(): {
  isInstalled: boolean
  version?: string
  install_path?: string
} {
  if (!isInstalled()) {
    return { isInstalled: false }
  }

  const { version, install_path } = JSON.parse(
    readFileSync(installedVersionPath, 'utf-8')
  )

  if (install_path !== defaultInstallPath) {
    logWarning(
      'EOS Overlay is not installed in default location, permission issues might arise',
      { prefix: LogPrefix.Legendary }
    )
  }

  return { isInstalled: true, version, install_path }
}

async function getLatestVersion() {
  if (!existsSync(currentVersionPath)) {
    // HACK: `overlay_version.json` isn't created when the overlay isn't installed
    if (!isInstalled()) {
      return ''
    }
    await updateInfo()
    if (!existsSync(currentVersionPath)) {
      logError(
        'EOS Overlay information not found after manual update. User is probably not logged in anymore',
        { prefix: LogPrefix.Legendary }
      )
      return ''
    }
  }
  const { buildVersion } = JSON.parse(
    readFileSync(currentVersionPath, 'utf-8')
  ).data
  return buildVersion
}

async function updateInfo() {
  // Without the overlay being installed, this will do nothing at all.
  // So we can just skip running the command if that's the case
  if (!isInstalled()) {
    return
  }
  await runLegendaryCommand(['status'], {
    logMessagePrefix: 'Updating EOS Overlay information'
  })
}

/**
 * Installs the EOS overlay
 * @returns The error encountered when installing, if any
 */
async function install() {
  const game = LegendaryGame.get('98bc04bc842e4906993fd6d6644ffb8d')
  let downloadSize = 0
  // Run download without -y to get the install size
  await runLegendaryCommand(
    ['eos-overlay', 'install', '--path', defaultInstallPath],
    {
      logMessagePrefix: 'Getting EOS Overlay install size',
      onOutput: (output: string, child: ChildProcess) => {
        const downloadMatch = output.match(/Download size: ([\d.]+) MiB/)
        if (downloadMatch) {
          downloadSize = parseFloat(downloadMatch[1])
          // Output is in MiB, we want it in bytes
          downloadSize = downloadSize * 1024 ** 2
          child.kill('SIGINT')
        }
      }
    }
  )
  // The EOS Overlay doesn't support Ctrl-C-pausing, so it's fine to just do this
  game.currentDownloadSize = downloadSize
  // And now actually install it
  const { error } = await runLegendaryCommand(
    ['-y', 'eos-overlay', 'install', '--path', defaultInstallPath],
    {
      logMessagePrefix: 'Installing EOS Overlay',
      onOutput: (output: string) => {
        game.onInstallOrUpdateOutput('installing', downloadSize, output)
      }
    }
  )
  return error
}

/**
 * Removes the EOS overlay
 * Asks the user to confirm the removal
 * @returns True if the overlay was removed, False if it wasn't
 */
async function remove(): Promise<boolean> {
  const { response } = await dialog.showMessageBox({
    title: t(
      'setting.eosOverlay.removeConfirmTitle',
      'Confirm overlay removal'
    ),
    message: t(
      'setting.eosOverlay.removeConfirm',
      'Are you sure you want to uninstall the EOS Overlay?'
    ),
    buttons: [t('box.yes'), t('box.no')]
  })
  if (response === 1) {
    return false
  }
  await runLegendaryCommand(['-y', 'eos-overlay', 'remove'])
  return true
}

function cancelInstallOrUpdate() {
  killPattern('eos-overlay install')
}

async function enable(
  appName: string
): Promise<{ wasEnabled: boolean; installNow?: boolean }> {
  let prefix = ''
  if (isLinux) {
    const game = getGame(appName, 'legendary')
    await verifyWinePrefix(game)
    const { winePrefix, wineVersion } = await game.getSettings()
    prefix =
      wineVersion.type === 'proton' ? join(winePrefix, 'pfx') : winePrefix
  }
  if (!isInstalled()) {
    const { response } = await dialog.showMessageBox({
      title: t('setting.eosOverlay.notInstalledTitle', 'Overlay not installed'),
      message: t(
        'setting.eosOverlay.notInstalledMsg',
        'The EOS Overlay is not installed. Do you want to install it now?'
      ),
      buttons: [t('box.yes'), t('box.no')]
    })
    // Installing the overlay requires some frontend work, so we can't just do it in the backend alone
    return { wasEnabled: false, installNow: response === 0 }
  }
  await runLegendaryCommand(
    ['eos-overlay', 'enable', ...(prefix ? ['--prefix', prefix] : [])],
    { logMessagePrefix: 'Enabling EOS Overlay' }
  )
  return { wasEnabled: true }
}

async function disable(appName: string) {
  let prefix = ''
  if (isLinux) {
    const game = getGame(appName, 'legendary')
    const { winePrefix, wineVersion } = await game.getSettings()
    prefix =
      wineVersion.type === 'proton' ? join(winePrefix, 'pfx') : winePrefix
  }

  await runLegendaryCommand(
    ['eos-overlay', 'disable', ...(prefix ? ['--prefix', prefix] : [])],
    { logMessagePrefix: 'Disabling EOS Overlay' }
  )
}

function isInstalled() {
  return existsSync(installedVersionPath)
}

/**
 * Checks if the EOS Overlay is enabled (either for a specific game on Linux or globally on Windows)
 * @param appName required on Linux, does nothing on Windows
 * @returns Enabled = True; Disabled = False
 */
async function isEnabled(appName?: string) {
  let enabled = false

  let prefix = ''
  if (isLinux && appName) {
    const game = getGame(appName, 'legendary')
    const { winePrefix, wineVersion } = await game.getSettings()
    prefix =
      wineVersion.type === 'proton' ? join(winePrefix, 'pfx') : winePrefix
  }

  await runLegendaryCommand(
    ['eos-overlay', 'info', ...(prefix ? ['--prefix', prefix] : [])],
    {
      onOutput: (data: string, child: ChildProcess) => {
        if (data.includes('Overlay enabled')) {
          enabled = data.includes('Yes')
          child.kill()
        }
      },
      logMessagePrefix: 'Checking if EOS Overlay is enabled'
    }
  )
  return enabled
}

export {
  getStatus,
  getLatestVersion,
  updateInfo,
  install,
  remove,
  cancelInstallOrUpdate,
  enable,
  disable,
  isEnabled
}
