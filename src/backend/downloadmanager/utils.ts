import { logError, LogPrefix, logWarning } from '../logger/logger'
import { isEpicServiceOffline } from '../utils'
import { DMStatus, InstallParams, InstallPlatform } from 'common/types'
import i18next from 'i18next'
import { notify, showDialogBoxModalAuto } from '../dialog/dialog'
import { isOnline } from '../online_monitor'
import { sendFrontendMessage } from '../main_window'
import { trackEvent } from 'backend/metrics/metrics'
import { gameManagerMap } from 'backend/storeManagers'

async function installQueueElement(params: InstallParams): Promise<{
  status: DMStatus
  error?: string | undefined
}> {
  const {
    appName,
    path,
    installDlcs,
    sdlList = [],
    runner,
    installLanguage,
    platformToInstall,
    channelName,
    accessCode
  } = params
  const { title } = gameManagerMap[runner].getGameInfo(appName)

  if (!isOnline()) {
    logWarning(
      `App offline, skipping install for game '${title}'.`,
      LogPrefix.Backend
    )
    return { status: 'error' }
  }

  if (runner === 'legendary') {
    const epicOffline = await isEpicServiceOffline()
    if (epicOffline) {
      showDialogBoxModalAuto({
        title: i18next.t('box.warning.title', 'Warning'),
        message: i18next.t(
          'box.warning.epic.install',
          'Epic Servers are having major outage right now, the game cannot be installed!'
        ),
        type: 'ERROR'
      })
      return { status: 'error' }
    }
  }

  trackEvent({
    event: 'Game Install Started',
    properties: {
      game_name: appName,
      store_name: runner,
      game_title: title,
      platform: platformToInstall
    }
  })

  const startingStatus = runner === 'hyperplay' ? 'preparing' : 'installing'

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner,
    status: startingStatus,
    folder: path
  })

  notify({
    title,
    body: i18next.t('notify.install.startInstall', 'Installation Started')
  })

  const errorMessage = (error: string) => {
    logError(
      ['Installation of', params.appName, 'failed with:', error],
      LogPrefix.DownloadManager
    )
  }

  try {
    const installPlatform = platformToInstall as InstallPlatform
    const installInstance = async () =>
      gameManagerMap[runner].install(appName, {
        path: path.replaceAll("'", ''),
        installDlcs,
        sdlList,
        platformToInstall: installPlatform,
        installLanguage,
        channelName,
        accessCode
      })

    const { status, error } = await installInstance()

    if (status === 'error') {
      errorMessage(error ?? '')
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done',
      folder: path
    })

    if (status === 'done')
      trackEvent({
        event: 'Game Install Success',
        properties: {
          game_name: appName,
          store_name: runner,
          game_title: title,
          platform: platformToInstall
        }
      })
    else trackFailedInstall(`${error}`)

    return { status }
  } catch (error) {
    trackFailedInstall(`${error}`)
    errorMessage(`${error}`)
    return { status: 'error' }
  } finally {
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done',
      folder: path
    })
  }

  function trackFailedInstall(error: unknown) {
    trackEvent({
      event: 'Game Install Failed',
      properties: {
        game_name: appName,
        store_name: runner,
        error: `${error}`,
        game_title: title,
        platform: platformToInstall
      }
    })
  }
}

async function updateQueueElement(params: InstallParams): Promise<{
  status: DMStatus
  error?: string | undefined
}> {
  const { appName, runner } = params
  const { title } = gameManagerMap[runner].getGameInfo(appName)

  if (!isOnline()) {
    logWarning(
      `App offline, skipping update for game '${title}'.`,
      LogPrefix.Backend
    )
    return { status: 'error' }
  }

  if (runner === 'legendary') {
    const epicOffline = await isEpicServiceOffline()
    if (epicOffline) {
      showDialogBoxModalAuto({
        title: i18next.t('box.warning.title', 'Warning'),
        message: i18next.t(
          'box.warning.epic.update',
          'Epic Servers are having major outage right now, the game cannot be updated!'
        ),
        type: 'ERROR'
      })
      return { status: 'error' }
    }
  }

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    runner,
    status: 'updating'
  })

  notify({
    title,
    body: i18next.t('notify.update.started', 'Update Started')
  })

  trackEvent({
    event: 'Game Update Started',
    properties: {
      game_name: appName,
      store_name: runner,
      game_title: title,
      platform: params.platformToInstall
    }
  })
  const errorMessage = (error: string) => {
    logError(
      ['Update of', params.appName, 'failed with:', error],
      LogPrefix.DownloadManager
    )
  }

  try {
    const { status } = await gameManagerMap[runner].update(appName)

    if (status === 'error') {
      errorMessage('')
    } else {
      trackEvent({
        event: 'Game Update Success',
        properties: {
          game_name: appName,
          store_name: runner,
          game_title: title,
          platform: params.platformToInstall
        }
      })
    }

    return { status }
  } catch (error) {
    errorMessage(`${error}`)
    trackEvent({
      event: 'Game Update Failed',
      properties: {
        game_name: appName,
        store_name: runner,
        error: 'update aborted',
        game_title: title,
        platform: params.platformToInstall
      }
    })
    notify({ title, body: i18next.t('notify.update.canceled') })
    return { status: 'error' }
  } finally {
    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner,
      status: 'done'
    })
  }
}

export { installQueueElement, updateQueueElement }
