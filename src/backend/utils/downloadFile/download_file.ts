'use strict'

import {
  BrowserWindow,
  DownloadItem,
  Event,
  Session,
  WebContents,
  app,
  shell
} from 'electron'
import path from 'path'
import * as unusedFilename from 'unused-filename'
import pupa from 'pupa'
import mime from 'mime'
import { Options } from './types'

class CancelError extends Error {}

const getFilenameFromMime = (name: string, mimeType: string) => {
  const extension = mime.getExtension(mimeType)

  if (extension === null) {
    return name
  }

  return `${name}.${extension}`
}

const majorElectronVersion = () => {
  const version = process.versions.electron.split('.')
  return Number.parseInt(version[0], 10)
}

const getWindowFromBrowserView = (webContents: WebContents) => {
  for (const currentWindow of BrowserWindow.getAllWindows()) {
    for (const currentBrowserView of currentWindow.getBrowserViews()) {
      if (currentBrowserView.webContents.id === webContents.id) {
        return currentWindow
      }
    }
  }
}

const getWindowFromWebContents = (webContents: WebContents) => {
  let window_
  const webContentsType = webContents.getType()
  switch (webContentsType) {
    case 'webview':
      window_ = BrowserWindow.fromWebContents(webContents.hostWebContents)
      break
    case 'browserView':
      window_ = getWindowFromBrowserView(webContents)
      break
    default:
      window_ = BrowserWindow.fromWebContents(webContents)
      break
  }

  return window_
}

function registerListener(
  session: Session,
  options: Options,
  callback: (error: Error | null, item?: DownloadItem) => void
) {
  const downloadItems = new Set<DownloadItem>()
  let receivedBytes = 0
  let completedBytes = 0
  let totalBytes = 0
  const activeDownloadItems = () => downloadItems.size
  const progressDownloadItems = () => receivedBytes / totalBytes

  options = {
    showBadge: true,
    showProgressBar: true,
    ...options
  }

  const listener = (
    event: Event,
    item: DownloadItem,
    webContents: WebContents
  ) => {
    downloadItems.add(item)
    totalBytes += item.getTotalBytes()

    const window_ =
      majorElectronVersion() >= 12
        ? BrowserWindow.fromWebContents(webContents)
        : getWindowFromWebContents(webContents)

    if (window_ === undefined || window_ === null) {
      throw new Error('Could not find browser window')
    }

    if (options.directory && !path.isAbsolute(options.directory)) {
      throw new Error('The `directory` option must be an absolute path')
    }

    const directory = options.directory || app.getPath('downloads')

    let filePath: string
    if (options.filename) {
      filePath = path.join(directory, options.filename)
    } else {
      const filename = item.getFilename()
      const name = path.extname(filename)
        ? filename
        : getFilenameFromMime(filename, item.getMimeType())

      filePath = options.overwrite
        ? path.join(directory, name)
        : unusedFilename.unusedFilenameSync(path.join(directory, name))
    }

    const errorMessage =
      options.errorMessage || 'The download of {filename} was interrupted'

    if (options.saveAs) {
      item.setSaveDialogOptions({
        defaultPath: filePath,
        ...options.dialogOptions
      })
    } else {
      item.setSavePath(filePath)
    }

    item.on('updated', () => {
      receivedBytes = completedBytes
      for (const item of downloadItems) {
        receivedBytes += item.getReceivedBytes()
      }

      if (options.showBadge && ['darwin', 'linux'].includes(process.platform)) {
        app.badgeCount = activeDownloadItems()
      }

      if (!window_.isDestroyed() && options.showProgressBar) {
        window_.setProgressBar(progressDownloadItems())
      }

      if (typeof options.onProgress === 'function') {
        const itemTransferredBytes = item.getReceivedBytes()
        const itemTotalBytes = item.getTotalBytes()

        options.onProgress({
          percent: itemTotalBytes ? itemTransferredBytes / itemTotalBytes : 0,
          transferredBytes: itemTransferredBytes,
          totalBytes: itemTotalBytes
        })
      }

      if (typeof options.onTotalProgress === 'function') {
        options.onTotalProgress({
          percent: progressDownloadItems(),
          transferredBytes: receivedBytes,
          totalBytes
        })
      }
    })

    item.on('done', (event, state) => {
      completedBytes += item.getTotalBytes()
      downloadItems.delete(item)

      if (options.showBadge && ['darwin', 'linux'].includes(process.platform)) {
        app.badgeCount = activeDownloadItems()
      }

      if (!window_.isDestroyed() && !activeDownloadItems()) {
        window_.setProgressBar(-1)
        receivedBytes = 0
        completedBytes = 0
        totalBytes = 0
      }

      if (options.unregisterWhenDone) {
        session.removeListener('will-download', listener)
      }

      if (state === 'cancelled') {
        if (typeof options.onCancel === 'function') {
          options.onCancel(item)
        }
        callback(new CancelError())
      } else if (state === 'interrupted') {
        const message = pupa(errorMessage, {
          filename: path.basename(filePath)
        })
        callback(new Error(message))
      } else if (state === 'completed') {
        const savePath = item.getSavePath()

        if (process.platform === 'darwin') {
          app.dock.downloadFinished(savePath)
        }

        if (options.openFolderWhenDone) {
          shell.showItemInFolder(savePath)
        }

        if (typeof options.onCompleted === 'function') {
          options.onCompleted({
            filename: item.getFilename(),
            path: savePath,
            fileSize: item.getReceivedBytes(),
            mimeType: item.getMimeType(),
            url: item.getURL()
          })
        }
      }
    })

    if (typeof options.onStarted === 'function') {
      options.onStarted(item)
    }
    callback(null, item)
  }

  session.on('will-download', listener)
}

export async function waitForItemToDownload(
  item: DownloadItem
): Promise<boolean> {
  return new Promise((res, rej) => {
    item.on('done', (event, state) => {
      if (state === 'cancelled') {
        rej(new CancelError())
      } else if (state === 'interrupted') {
        // const message = pupa(errorMessage, {
        //   filename: path.basename(filePath)
        // })
        rej(new Error('interrupted'))
      } else if (state === 'completed') {
        const savePath = item.getSavePath()

        if (process.platform === 'darwin') {
          app.dock.downloadFinished(savePath)
        }

        res(true)
      }
    })
  })
}

/*
 * Returns DownloadItem that can be used to pause, cancel, etc. while the download is in progress
 * Handle the onCompleted callback to determine when the download finishes
 */
export default async function download(
  window_: BrowserWindow,
  url: string,
  options: Options
): Promise<DownloadItem> {
  return new Promise((resolve, reject) => {
    options = {
      ...options,
      unregisterWhenDone: true
    }

    registerListener(window_.webContents.session, options, (error, item) => {
      if (error || item === undefined) {
        reject(error)
      } else {
        resolve(item)
      }
    })

    window_.webContents.downloadURL(url)
  })
}
