import {
  InstallPlatform,
  AppSettings,
  GameInfo,
  InstallProgress,
  Runner,
  SiweValues
} from 'common/types'

import { TFunction } from 'i18next'
import { getGameInfo, getPlatformName } from './index'
import { DialogModalOptions } from 'frontend/types'
import { SiweMessage } from 'siwe'
import { ethers } from 'ethers'
import axios from 'axios'
import authState from 'frontend/state/authState'
import gameUpdateState from 'frontend/state/GameUpdateState'
import { DEV_PORTAL_URL } from 'common/constants'

const storage: Storage = window.localStorage

type InstallArgs = {
  gameInfo: GameInfo
  installPath: string
  isInstalling: boolean
  previousProgress: InstallProgress | null
  progress: InstallProgress
  installDlcs?: Array<string> | boolean
  t: TFunction<'gamepage'>
  showDialogModal: (options: DialogModalOptions) => void
  setInstallPath?: (path: string) => void
  platformToInstall?: InstallPlatform
  sdlList?: Array<string>
  installLanguage?: string
  channelName?: string
  accessCode?: string
  siweValues?: SiweValues
}

async function install({
  gameInfo,
  installPath,
  t,
  isInstalling,
  previousProgress,
  sdlList = [],
  installDlcs = false,
  installLanguage = 'en-US',
  platformToInstall = 'Windows',
  channelName,
  accessCode,
  siweValues
}: InstallArgs) {
  if (!installPath) {
    console.error('installPath is undefined')
    window.api.logError('installPath is undefined')
    return
  }

  const { folder_name, is_installed, app_name: appName, runner } = gameInfo

  if (isInstalling) {
    // NOTE: This can't really happen, since `folder_name` can only be undefined if we got a
    //       SideloadGame from getGameInfo, but we can't "install" sideloaded games
    if (!folder_name) return
    return
  }

  if (is_installed) {
    return
  }

  if (installPath === 'import') {
    const { defaultInstallPath }: AppSettings =
      await window.api.requestAppSettings()
    const args: Electron.OpenDialogOptions = {
      buttonLabel: t('gamepage:box.choose'),
      properties: ['openDirectory'],
      title: t('gamepage:box.importpath'),
      defaultPath: defaultInstallPath
      //TODO: add file filters
    }
    const path = await window.api.openDialog(args)

    if (!path) {
      return
    }

    return window.api.importGame({
      appName,
      path,
      runner,
      platform: platformToInstall
    })
  }

  // If the user changed the previous folder, the percentage should start from zero again.
  if (previousProgress && previousProgress.folder !== installPath) {
    storage.removeItem(appName)
  }

  return window.api.install({
    appName,
    path: installPath,
    installDlcs,
    sdlList,
    installLanguage,
    runner,
    platformToInstall,
    gameInfo: JSON.parse(JSON.stringify(gameInfo)),
    channelName,
    accessCode,
    siweValues
  })
}

const repair = async (appName: string, runner: Runner): Promise<void> =>
  window.api.repair(appName, runner)

type LaunchOptions = {
  appName: string
  t: TFunction<'gamepage'>
  launchArguments?: string
  runner: Runner
  hasUpdate: boolean
  showDialogModal: (options: DialogModalOptions) => void
  isNotNative: boolean
}

export const SHOW_COMPATIBILITY_LAYER_WARNING =
  'show-compatibility-layer-warning'

export const isNotNative = (
  platform: NodeJS.Platform | 'unknown',
  installedPlatform: InstallPlatform
) => {
  const isWindows = platform === 'win32'
  return !isWindows && getPlatformName(installedPlatform) === 'Windows'
}

const launch = async ({
  appName,
  t,
  launchArguments = '',
  runner,
  hasUpdate,
  showDialogModal,
  isNotNative
}: LaunchOptions): Promise<{ status: 'done' | 'error' | 'abort' }> => {
  const showCompatibilityWarningDialog: boolean =
    isNotNative &&
    JSON.parse(
      localStorage.getItem(`${SHOW_COMPATIBILITY_LAYER_WARNING}-${appName}`) ??
        'true'
    )

  const showWarningDialog = new Promise<void>((res) => {
    if (!showCompatibilityWarningDialog) {
      return res()
    }
    showDialogModal({
      message: t(
        'gamepage:box.compability.message',
        'This Windows game will run using a compatibility layer. You might encounter some issues or the game might not work at all.'
      ),
      title: t('infobox.warning', 'Warning'),
      buttons: [
        {
          text: t('gamepage:box.dont-show-again', "Don't show again"),
          onClick: () => {
            localStorage.setItem(
              `${SHOW_COMPATIBILITY_LAYER_WARNING}-${appName}`,
              JSON.stringify(false)
            )
            res()
          }
        },
        {
          text: t('gamepage:box.aware', 'I am aware'),
          onClick: () => {
            res()
          }
        }
      ],
      onClose: () => {
        res()
      }
    })
  })

  if (hasUpdate && !authState.isQaModeActive) {
    const { ignoreGameUpdates } = await window.api.requestGameSettings(appName)

    if (ignoreGameUpdates && runner !== 'hyperplay') {
      return window.api.launch({
        appName,
        runner,
        launchArguments: runner === 'legendary' ? '--skip-version-check' : ''
      })
    }

    // focus the window if minimized or hidden
    window.api.focusMainWindow()

    // promisifies the showDialogModal button click callbacks
    const launchFinished = new Promise<{ status: 'done' | 'error' | 'abort' }>(
      (res) => {
        showDialogModal({
          message: t('gamepage:box.update.message'),
          title: t('gamepage:box.update.title'),
          buttons: [
            {
              text: t('gamepage:box.yes'),
              onClick: async () => {
                const gameInfo = await getGameInfo(appName, runner)
                if (gameInfo && gameInfo.runner !== 'sideload') {
                  updateGame(gameInfo)
                  res({ status: 'done' })
                }
                res({ status: 'error' })
              }
            },
            {
              text: t('box.no'),
              onClick: async () => {
                if (runner === 'hyperplay') {
                  return showDialogModal({
                    message: t(
                      'gamepage:box.update.message-cancel',
                      'It is not possible to play this game without updating'
                    ),
                    title: t('gamepage:box.update.title'),
                    buttons: [
                      {
                        text: t('gamepage:box.ok', 'OK'),
                        onClick: async () => {
                          res({ status: 'abort' })
                        }
                      }
                    ]
                  })
                }

                res(
                  window.api.launch({
                    appName,
                    runner,
                    launchArguments:
                      launchArguments +
                      ' ' +
                      (runner === 'legendary' ? '--skip-version-check' : '')
                  })
                )
              }
            }
          ]
        })
      }
    )

    return launchFinished
  }

  await showWarningDialog

  return window.api.launch({ appName, launchArguments, runner })
}

const updateGame = async (gameInfo: GameInfo) => {
  const channelRequiresTokens =
    gameInfo?.channels?.[gameInfo.install.channelName ?? ''].license_config
      .tokens
  let siweValues = undefined
  if (channelRequiresTokens) {
    siweValues = await signSiweMessage()
  }
  return gameUpdateState.updateGame({ ...gameInfo, siweValues })
}

export const epicCategories = ['all', 'legendary', 'epic']
export const gogCategories = ['all', 'gog']
export const sideloadedCategories = ['all', 'sideload']
export const hyperPlayCategories = ['all', 'hyperplay']

export { install, launch, repair, updateGame }

export async function signSiweMessage(): Promise<SiweValues> {
  const signer = await getSigner()
  const address = await signer.getAddress()

  const siweMessage = await createSiweMessage(address)
  const message = siweMessage.prepareMessage()
  const signature = await signer.signMessage(message)

  return {
    message,
    signature,
    address
  }
}

export async function getSigner(): Promise<ethers.Signer> {
  if (!window.ethereum) throw new Error('Ethereum provider not found')
  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider.getSigner()
}

export async function createSiweMessage(
  signerAddress: string
): Promise<SiweMessage> {
  const domain = window.location.host ? window.location.host : 'hyperplay'
  const origin = window.location.origin.startsWith('file://')
    ? 'file://hyperplay'
    : window.location.origin

  const statementRes = await axios.get(
    DEV_PORTAL_URL + 'api/v1/license_contracts/validate/get-nonce'
  )
  const statement = String(statementRes?.data)

  return new SiweMessage({
    domain,
    address: signerAddress,
    statement,
    uri: origin,
    version: '1',
    chainId: 1
  })
}
