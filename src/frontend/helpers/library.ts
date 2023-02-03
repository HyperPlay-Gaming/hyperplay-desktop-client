import {
  InstallPlatform,
  AppSettings,
  GameInfo,
  InstallProgress,
  Runner,
  UpdateParams
} from 'common/types'

import { TFunction } from 'react-i18next'
import { getGameInfo, sendKill } from './index'
import { DialogModalOptions } from 'frontend/types'

const storage: Storage = window.localStorage

type InstallArgs = {
  gameInfo: GameInfo
  installPath: string
  isInstalling: boolean
  previousProgress: InstallProgress | null
  progress: InstallProgress
  setInstallPath?: (path: string) => void
  platformToInstall?: InstallPlatform
  t: TFunction<'gamepage'>
  installDlcs?: boolean
  sdlList?: Array<string>
  installLanguage?: string
  showDialogModal: (options: DialogModalOptions) => void
}

async function install({
  gameInfo,
  installPath,
  t,
  progress,
  isInstalling,
  previousProgress,
  setInstallPath,
  sdlList = [],
  installDlcs = false,
  installLanguage = 'en-US',
  platformToInstall = 'Windows',
  showDialogModal
}: InstallArgs) {
  if (!installPath) {
    return
  }

  const { folder_name, is_installed, app_name: appName, runner } = gameInfo
  if (isInstalling) {
    // NOTE: This can't really happen, since `folder_name` can only be undefined if we got a
    //       SideloadGame from getGameInfo, but we can't "install" sideloaded games
    if (!folder_name) return
    return handleStopInstallation(
      appName,
      [installPath, folder_name],
      t,
      progress,
      runner,
      showDialogModal
    )
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
    }
    const path = await window.api.openDialog(args)

    if (!path) {
      return
    }

    return importGame({ appName, path, runner, platform: platformToInstall })
  }

  if (installPath !== 'default') {
    setInstallPath && setInstallPath(installPath)
  }

  if (installPath === 'default') {
    const { defaultInstallPath }: AppSettings =
      await window.api.requestAppSettings()
    installPath = defaultInstallPath
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
    gameInfo
  })
}

const importGame = window.api.importGame

async function handleStopInstallation(
  appName: string,
  [path, folderName]: string[],
  t: TFunction<'gamepage'>,
  progress: InstallProgress,
  runner: Runner,
  showDialogModal: (options: DialogModalOptions) => void
) {
  showDialogModal({
    title: t('gamepage:box.stopInstall.title'),
    message: t('gamepage:box.stopInstall.message'),
    buttons: [
      { text: t('gamepage:box.stopInstall.keepInstalling') },
      {
        text: t('box.yes'),
        onClick: () => {
          storage.setItem(
            appName,
            JSON.stringify({ ...progress, folder: path })
          )
          sendKill(appName, runner)
        }
      },
      {
        text: t('box.no'),
        onClick: async () => {
          await sendKill(appName, runner)
          storage.removeItem(appName)
          window.api.removeFolder([path, folderName])
        }
      }
    ]
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
}: LaunchOptions): Promise<{ status: 'done' | 'error' }> => {
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
    const launchFinished = new Promise<{ status: 'done' | 'error' }>((res) => {
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
                  launchArguments: '--skip-version-check'
                })
              )
            }
          }
        ]
      })
    })

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

export {
  handleStopInstallation,
  install,
  launch,
  repair,
  //updateAllGames,
  updateGame
}
