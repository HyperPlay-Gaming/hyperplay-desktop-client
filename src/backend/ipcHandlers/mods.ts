import { captureException } from '@sentry/electron'
import { notify, showDialogBoxModalAuto } from 'backend/dialog/dialog'
import { cancelQueueExtraction } from 'backend/downloadmanager/downloadqueue'
import { LogPrefix, logDebug, logError, logInfo } from 'backend/logger/logger'
import { getMainWindow, sendFrontendMessage } from 'backend/main_window'
import {
  ExtractZipProgressResponse,
  ExtractZipService
} from 'backend/services/ExtractZipService'
import { libraryManagerMap } from 'backend/storeManagers'
import {
  getDestinationPath,
  inProgressExtractionsMap
} from 'backend/storeManagers/hyperplay/games'
import { copyRecursiveAsync, calculateProgress } from 'backend/utils'
import { callAbortController } from 'backend/utils/aborthandler/aborthandler'
import { readdirSync, rm } from 'graceful-fs'

import i18next from 'i18next'
import path from 'path'

export async function prepareBaseGameForModding({
  appName,
  zipFile,
  installPath
}: {
  appName: string
  zipFile: string
  installPath: string
}) {
  const window = getMainWindow()
  if (!window) {
    return
  }

  notify({
    title: i18next.t('mod.baseGame.installing.title', 'Installing Base Game'),
    body: i18next.t(
      'mod.baseGame.installing.body',
      'Extracting base game files'
    )
  })

  const gameInfo = libraryManagerMap['hyperplay'].getGameInfo(appName)

  if (!gameInfo) {
    logError('Game info not found', LogPrefix.HyperPlay)
    return
  }

  const dirPath = getDestinationPath(gameInfo, installPath)

  sendFrontendMessage('gameStatusUpdate', {
    appName,
    status: 'extracting',
    runner: 'hyperplay',
    folder: dirPath
  })

  window.webContents.send(`progressUpdate-${appName}`, {
    appName,
    runner: 'hyperplay',
    folder: dirPath,
    status: 'extracting',
    progress: {
      folder: dirPath,
      totalSize: 0,
      percent: 0,
      diskSpeed: 0,
      downSpeed: 0,
      bytes: 0,
      eta: null
    }
  })

  logInfo(
    `Extracting ${zipFile} to ${dirPath} -----------------`,
    LogPrefix.HyperPlay
  )
  const extractService = new ExtractZipService(zipFile, dirPath, {
    deleteOnEnd: false
  })

  inProgressExtractionsMap.set(appName, extractService)
  const extractedFolder = path
    .basename(extractService.source)
    .replace('.zip', '')
  const extractedFolderFullPath = path.join(dirPath, extractedFolder)

  await new Promise((resolve) => {
    extractService.on(
      'progress',
      ({
        processedSizeInBytes,
        totalSizeInBytes,
        speedInBytesPerSec,
        progressPercentage
      }: ExtractZipProgressResponse) => {
        logInfo(
          `Extracting Progress: ${progressPercentage}% Speed: ${speedInBytesPerSec} B/s | Total size ${totalSizeInBytes} and ${processedSizeInBytes}`,
          LogPrefix.HyperPlay
        )
        const currentProgress = calculateProgress(
          processedSizeInBytes,
          totalSizeInBytes,
          speedInBytesPerSec,
          speedInBytesPerSec,
          progressPercentage
        )

        window.webContents.send(`progressUpdate-${appName}`, {
          appName,
          runner: 'hyperplay',
          folder: dirPath,
          status: 'extracting',
          progress: {
            folder: dirPath,
            totalSize: totalSizeInBytes,
            ...currentProgress
          }
        })
      }
    )

    extractService.on('canceled', () => {
      logInfo(`Canceled Extracting of base game file`, LogPrefix.HyperPlay)

      process.noAsar = false

      cancelQueueExtraction()
      callAbortController(appName)

      sendFrontendMessage('gameStatusUpdate', {
        appName,
        status: 'done',
        runner: 'hyperplay',
        folder: dirPath
      })

      window.webContents.send(`progressUpdate-${appName}`, {
        appName,
        runner: 'hyperplay',
        folder: dirPath,
        status: 'done',
        progress: {
          folder: dirPath,
          totalSize: 0,
          percent: 0,
          diskSpeed: 0,
          downSpeed: 0,
          bytes: 0,
          eta: null
        }
      })

      notify({
        title: i18next.t('mod.baseGame.cancel.title', 'Canceled Extraction'),
        body: i18next.t(
          'mod.baseGame.cancel.body',
          'Base game extraction canceled'
        )
      })

      sendFrontendMessage('refreshLibrary', 'hyperplay')
      try {
        rm(
          extractedFolderFullPath,
          { recursive: true, force: true },
          (error) => {
            if (error) {
              logDebug(
                `Error removing extracted folder ${extractedFolderFullPath} ${error}`,
                LogPrefix.HyperPlay
              )
              showDialogBoxModalAuto({
                title: i18next.t(
                  'box.error.delete-files.title',
                  'Error removing extracted folder'
                ),
                message: i18next.t(
                  'box.error.delete-files.body',
                  `Error removing extracted folder {{path}}. Please remove it manually. 
                {{paragraph}} 
                {{error}}`,
                  {
                    path: extractedFolderFullPath,
                    error: error,
                    paragraph: '\n\n'
                  }
                ),
                buttons: [{ text: i18next.t('box.ok', 'OK') }],
                type: 'ERROR'
              })
            }
          }
        )
      } catch (error) {
        logDebug(
          `Error removing extracted folder ${extractedFolderFullPath} ${error}`,
          LogPrefix.HyperPlay
        )
      }

      throw new Error('Canceled')
    })

    extractService.once(
      'finished',
      async ({
        progressPercentage,
        totalSizeInBytes,
        speedInBytesPerSec,
        processedSizeInBytes
      }: ExtractZipProgressResponse) => {
        logInfo(
          `Extracting End: ${progressPercentage}% Speed: ${speedInBytesPerSec} B/s | Total size ${totalSizeInBytes} and ${processedSizeInBytes}`,
          LogPrefix.HyperPlay
        )

        const currentProgress = calculateProgress(
          processedSizeInBytes,
          totalSizeInBytes,
          speedInBytesPerSec,
          speedInBytesPerSec,
          progressPercentage
        )

        logInfo(
          `Moving contents of ${extractedFolder} to ${dirPath}`,
          LogPrefix.HyperPlay
        )

        // move contents of the extracted folder to the destination path
        readdirSync(extractedFolderFullPath).forEach(async (file) => {
          const srcPath = path.join(extractedFolderFullPath, file)
          const destPath = path.join(dirPath, file)
          try {
            await copyRecursiveAsync(srcPath, destPath)
          } catch (error) {
            const errorMessage = `Error copying ${srcPath} to ${destPath} ${error}`
            logError(errorMessage, LogPrefix.HyperPlay)
            extractService.emit('error', new Error(errorMessage))
            captureException(error)
            throw new Error(errorMessage)
          }
        })

        // remove the extracted folder
        try {
          rm(
            extractedFolderFullPath,
            { recursive: true, force: true },
            (error) => {
              if (error) {
                logDebug(
                  `Error removing extracted folder ${extractedFolderFullPath} ${error}`,
                  LogPrefix.HyperPlay
                )
              }
            }
          )
        } catch (error) {
          logDebug(
            `Error removing extracted folder ${extractedFolderFullPath} ${error}`,
            LogPrefix.HyperPlay
          )
        }

        notify({
          title: i18next.t(
            'mod.baseGame.installed.title',
            'Base Game Installed'
          ),
          body: i18next.t(
            'mod.baseGame.installed.body',
            'Mod will be applied to base game'
          )
        })

        inProgressExtractionsMap.delete(appName)
        callAbortController(appName)

        window.webContents.send(`progressUpdate-${appName}`, {
          appName,
          runner: 'hyperplay',
          folder: dirPath,
          status: 'done',
          progress: {
            folder: dirPath,
            ...currentProgress
          }
        })

        window.webContents.send('gameStatusUpdate', {
          appName,
          runner: 'hyperplay',
          folder: dirPath,
          status: 'done'
        })

        resolve({
          status: 'done'
        })
      }
    )
    extractService.once('error', (error: Error) => {
      logError(`Extracting Error ${error.message}`, LogPrefix.HyperPlay)

      sendFrontendMessage('refreshLibrary', 'hyperplay')
      callAbortController(appName)

      resolve({
        status: 'error'
      })
    })

    extractService.extract().then()
  })
}
