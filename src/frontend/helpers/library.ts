import {
  InstallPlatform,
  AppSettings,
  GameInfo,
  InstallProgress,
  Runner,
  UpdateParams
} from 'common/types'

import { TFunction } from 'i18next'
import { getGameInfo } from './index'
import { DialogModalOptions } from 'frontend/types'

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
  accessCode
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
    gameInfo,
    channelName,
    accessCode
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
}

const launch = async ({
  appName,
  t,
  launchArguments = '',
  runner,
  hasUpdate,
  showDialogModal
}: LaunchOptions): Promise<{ status: 'done' | 'error' | 'abort' }> => {
  if (hasUpdate) {
    const { ignoreGameUpdates } = await window.api.requestGameSettings(appName)

    if (ignoreGameUpdates) {
      return window.api.launch({
        appName,
        runner,
        launchArguments: runner === 'legendary' ? '--skip-version-check' : ''
      })
    }

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
                  updateGame({ appName, runner, gameInfo })
                  res({ status: 'done' })
                }
                res({ status: 'error' })
              }
            },
            {
              text: t('box.no'),
              onClick: async () => {
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

  return window.api.launch({ appName, launchArguments, runner })
}

const updateGame = async (args: UpdateParams) => {
  return window.api.updateGame(args)
}

export const epicCategories = ['all', 'legendary', 'epic']
export const gogCategories = ['all', 'gog']
export const sideloadedCategories = ['all', 'sideload']
export const hyperPlayCategories = ['all', 'hyperplay']

export { install, launch, repair, updateGame }
