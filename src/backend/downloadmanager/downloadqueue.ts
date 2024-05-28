import { gameManagerMap, libraryManagerMap } from 'backend/storeManagers'
import { TypeCheckedStoreBackend } from './../electron_store'
import { logError, logInfo, LogPrefix, logWarning } from '../logger/logger'
import { getFileSize } from '../utils'
import { DMQueueElement, DMStatus, DownloadManagerState } from 'common/types'
import { installQueueElement, updateQueueElement } from './utils'
import { sendFrontendMessage } from '../main_window'
import { callAbortController } from 'backend/utils/aborthandler/aborthandler'
import { notify } from '../dialog/dialog'
import i18next from 'i18next'
import { configFolder } from 'backend/constants'
import { join } from 'path'
import { trackEvent } from 'backend/metrics/metrics'

const downloadManager = new TypeCheckedStoreBackend('downloadManager', {
  cwd: 'store',
  name: 'download-manager'
})

/*
#### Private ####
*/

let queueState: DownloadManagerState = 'idle'
let currentElement: DMQueueElement | null = null

function isPaused(): boolean {
  return queueState === 'paused'
}

function isIdle(): boolean {
  return queueState === 'idle' || !currentElement
}

function isRunning(): boolean {
  return queueState === 'running'
}

function addToFinished(element: DMQueueElement, status: DMStatus) {
  const elements = downloadManager.get('finished', [])

  const elementIndex = elements.findIndex(
    (el) => el.params.appName === element.params.appName
  )

  if (elementIndex >= 0) {
    elements[elementIndex] = { ...element, status: status ?? 'abort' }
  } else {
    elements.push({ ...element, status })
  }

  downloadManager.set('finished', elements)
  logInfo(
    [element.params.appName, 'added to download manager finished.'],
    LogPrefix.DownloadManager
  )
}

/*
#### Public ####
*/

function getFirstQueueElement() {
  const elements = downloadManager.get('queue', [])

  // local db type checking would eliminate this check
  const newElements = elements.filter((game) => game.params.appName !== null)
  downloadManager.set('queue', newElements)

  return newElements.at(0) ?? null
}

async function initQueue() {
  if (!isIdle() && !isPaused()) return

  let element = getFirstQueueElement()

  while (element) {
    const queuedElements = downloadManager.get('queue', [])
    element.startTime = Date.now()
    queuedElements[0] = element
    downloadManager.set('queue', queuedElements)

    currentElement = element

    queueState = 'running'
    sendFrontendMessage('changedDMQueueInformation', queuedElements, queueState)

    const { status } =
      element.type === 'install'
        ? await installQueueElement(element.params)
        : await updateQueueElement(element.params)
    element.endTime = Date.now()

    processNotification(element, status)

    if (!isPaused()) {
      addToFinished(element, status)
      removeFromQueue(element.params.appName)
      element = getFirstQueueElement()
      queueState = 'idle'
    } else {
      queueState = 'paused'
      element = null
    }
  }
}

async function addToQueue(element: DMQueueElement) {
  if (!element) {
    logError(
      'Can not add undefined element to queue!',
      LogPrefix.DownloadManager
    )
    return
  }

  sendFrontendMessage('gameStatusUpdate', {
    appName: element.params.appName,
    runner: element.params.runner,
    folder: element.params.path,
    status: 'queued'
  })

  const elements = downloadManager.get('queue', [])

  const elementIndex = elements.findIndex(
    (el) => el.params.appName === element.params.appName
  )

  if (elementIndex >= 0) {
    elements[elementIndex] = element
  } else {
    const installInfo = await libraryManagerMap[
      element.params.runner
    ].getInstallInfo(element.params.appName, element.params.platformToInstall)

    element.params.size = installInfo?.manifest?.download_size
      ? getFileSize(installInfo?.manifest?.download_size)
      : '?? MB'
    elements.push(element)
  }

  downloadManager.set('queue', elements)
  logInfo(
    [element.params.gameInfo.title, ' was added to the download queue.'],
    LogPrefix.DownloadManager
  )

  sendFrontendMessage('changedDMQueueInformation', elements, queueState)

  if (isIdle()) {
    initQueue()
  }
}

function removeFromQueue(appName: string) {
  if (appName && downloadManager.has('queue')) {
    const elements = downloadManager.get('queue', [])
    const index = elements.findIndex(
      (queueElement) => queueElement?.params.appName === appName
    )
    if (index !== -1) {
      elements.splice(index, 1)
      downloadManager.delete('queue')
      downloadManager.set('queue', elements)
    }

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      runner: elements[index]?.params.runner,
      folder: elements[index]?.params.path,
      status: 'done'
    })

    logInfo(
      [appName, 'removed from download manager.'],
      LogPrefix.DownloadManager
    )

    sendFrontendMessage('changedDMQueueInformation', elements, queueState)
  }
}

function getQueueInformation() {
  const elements = downloadManager.get('queue', [])
  const finished = downloadManager.get('finished', [])

  return { elements, finished, state: queueState }
}

function cancelQueueExtraction() {
  if (currentElement) {
    if (Array.isArray(currentElement.params.installDlcs)) {
      const dlcsToRemove = currentElement.params.installDlcs
      for (const dlc of dlcsToRemove) {
        removeFromQueue(dlc)
      }
    }
    if (isRunning()) {
      stopCurrentDownload()
    }
    removeFromQueue(currentElement.params.appName)

    currentElement = null
  }
}

function cancelCurrentDownload({ removeDownloaded = false }) {
  if (currentElement) {
    if (Array.isArray(currentElement.params.installDlcs)) {
      const dlcsToRemove = currentElement.params.installDlcs
      for (const dlc of dlcsToRemove) {
        removeFromQueue(dlc)
      }
    }
    if (isRunning()) {
      stopCurrentDownload()
    }
    removeFromQueue(currentElement.params.appName)

    const { runner } = currentElement!.params
    if (runner === 'hyperplay' && removeDownloaded) {
      const { appName } = currentElement!.params
      const tempfolder = join(configFolder, 'hyperplay', '.temp', appName)
      logInfo(`Removing ${tempfolder}...`, LogPrefix.DownloadManager)
      callAbortController(appName)
    }
    currentElement = null
  }
}

async function pauseCurrentDownload() {
  if (currentElement) {
    const { appName, runner } = currentElement.params
    await gameManagerMap[runner].pause(appName)
  }
  queueState = 'paused'
  sendFrontendMessage(
    'changedDMQueueInformation',
    downloadManager.get('queue', []),
    queueState
  )

  const {
    appName,
    runner,
    gameInfo: { title }
  } = currentElement!.params
  trackEvent({
    event: 'Game Install Paused',
    properties: { store_name: runner, game_title: title, game_name: appName }
  })
}

function resumeCurrentDownload() {
  const {
    appName,
    runner,
    gameInfo: { title }
  } = currentElement!.params
  trackEvent({
    event: 'Game Install Resumed',
    properties: { store_name: runner, game_title: title, game_name: appName }
  })
  initQueue()
}

function stopCurrentDownload() {
  const { appName, runner } = currentElement!.params
  callAbortController(appName)
  gameManagerMap[runner].stop(appName)
}

// notify the user based on the status of the element and the status of the queue
function processNotification(element: DMQueueElement, status: DMStatus) {
  const action = element.type === 'install' ? 'Installation' : 'Update'
  const { title } = gameManagerMap[element.params.runner].getGameInfo(
    element.params.appName
  )

  if (status === 'abort') {
    if (isPaused()) {
      logWarning(
        [action, 'of', element.params.appName, 'paused!'],
        LogPrefix.DownloadManager
      )
      // i18next.t('notify.update.paused', 'Update Paused')
      // i18next.t('notify.install.paused', 'Installation Paused')
      return notify({ title, body: i18next.t(`notify.${element.type}.paused`) })
    } else {
      logWarning(
        [action, 'of', element.params.appName, 'aborted!'],
        LogPrefix.DownloadManager
      )
      // i18next.t('notify.update.canceled', 'Update Canceled')
      // i18next.t('notify.install.canceled', 'Installation Canceled')
      return notify({
        title,
        body: i18next.t(`notify.${element.type}.canceled`)
      })
    }
  } else if (status === 'error') {
    if (isPaused()) {
      logWarning(
        [action, 'of', element.params.appName, 'paused!'],
        LogPrefix.DownloadManager
      )
      // i18next.t('notify.update.paused', 'Update Paused')
      // i18next.t('notify.install.paused', 'Installation Paused')
      return notify({ title, body: i18next.t(`notify.${element.type}.paused`) })
    } else if (isRunning()) {
      logWarning(
        [action, 'of', element.params.appName, 'failed!'],
        LogPrefix.DownloadManager
      )
      // i18next.t('notify.update.stopped', 'Update stopped')
      // i18next.t('notify.install.stopped', 'Installation stopped')
      return notify({
        title,
        body: i18next.t(`notify.${element.type}.stopped`)
      })
    }

    // i18next.t('notify.update.finished', 'Update Finished')
    // i18next.t('notify.install.finished', 'Installation Finished')
    notify({
      title,
      body: i18next.t(`notify.${element.type}.finished`)
    })

    logInfo(
      ['Finished', action, 'of', element.params.appName],
      LogPrefix.DownloadManager
    )
  }
}

export {
  initQueue,
  addToQueue,
  removeFromQueue,
  getQueueInformation,
  cancelCurrentDownload,
  cancelQueueExtraction,
  pauseCurrentDownload,
  resumeCurrentDownload,
  getFirstQueueElement
}
