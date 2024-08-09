import { notify } from 'backend/dialog/dialog'
import { LogPrefix, logError, logInfo } from 'backend/logger/logger'
import { getMainWindow, sendFrontendMessage } from 'backend/main_window'
import {
  ExtractZipProgressResponse,
  ExtractZipService
} from 'backend/services/ExtractZipService'
import { calculateProgress } from 'backend/storeManagers/hyperplay/games'
import { callAbortController } from 'backend/utils/aborthandler/aborthandler'
import { ipcMain } from 'electron'

import i18next from 'i18next'

const inProgressExtractionsMap: Map<string, ExtractZipService> = new Map()

ipcMain.handle(
  'prepareBaseGameForModding',
  async (event, { appName, zipFile, installPath }) => {
    const window = getMainWindow()
    if (!window) return

    notify({
      title: i18next.t('mod.baseGame.installing.title', 'Installing Base Game'),
      body: i18next.t(
        'mod.baseGame.installing.body',
        'Extracting base game files'
      )
    })

    sendFrontendMessage('gameStatusUpdate', {
      appName,
      status: 'extracting',
      runner: 'hyperplay',
      folder: installPath
    })

    window.webContents.send(`progressUpdate-${appName}`, {
      appName,
      runner: 'hyperplay',
      folder: installPath,
      status: 'extracting',
      progress: {
        folder: installPath,
        percent: 0,
        diskSpeed: 0,
        downSpeed: 0,
        bytes: 0,
        eta: null
      }
    })

    const extractService = new ExtractZipService(zipFile, installPath)

    inProgressExtractionsMap.set('baseGameForModding', extractService)
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
            folder: installPath,
            status: 'extracting',
            progress: {
              folder: installPath,
              ...currentProgress
            }
          })
        }
      )
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

          window.webContents.send(`progressUpdate-${appName}`, {
            appName,
            runner: 'hyperplay',
            folder: installPath,
            status: 'done',
            progress: {
              folder: installPath,
              ...currentProgress
            }
          })

          window.webContents.send('gameStatusUpdate', {
            appName,
            runner: 'hyperplay',
            folder: installPath,
            status: 'done'
          })

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

          inProgressExtractionsMap.delete('baseGameForModding')
          callAbortController(appName)

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
)
