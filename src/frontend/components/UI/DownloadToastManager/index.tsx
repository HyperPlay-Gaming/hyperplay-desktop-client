import React, { useContext, useEffect, useState } from 'react'
import { DownloadToast, Images, CircularButton } from '@hyperplay/ui'
import { DMQueueElement, GameStatus, InstallProgress } from 'common/types'
import { DMQueue } from 'frontend/types'
import { handleStopInstallation } from 'frontend/helpers/library'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'
import DownloadToastManagerStyles from './index.module.scss'

export default function DownloadToastManager() {
  const [currentElement, setCurrentElement] = useState<DMQueueElement>()
  const [progress, setProgress] = useState<InstallProgress>({
    bytes: '0',
    eta: '00:00:00'
  })
  const [showDownloadToast, setShowDownloadToast] = useState(true)
  const { showDialogModal } = useContext(ContextProvider)
  const { t } = useTranslation('gamepage')

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ elements }: DMQueue) => {
      setCurrentElement(elements[0])
    })

    const removeHandleDMQueueInformation = window.api.handleDMQueueInformation(
      (e: Electron.IpcRendererEvent, elements: DMQueueElement[]) => {
        if (elements) {
          setCurrentElement(elements[0])
        }
      }
    )

    return () => {
      removeHandleDMQueueInformation()
    }
  }, [])

  useEffect(() => {
    const handleProgressUpdate = async (
      _e: Electron.IpcRendererEvent,
      { appName: appWithProgress, progress: currentProgress }: GameStatus
    ) => {
      if (
        currentElement?.params.appName === appWithProgress &&
        currentProgress
      ) {
        setProgress(currentProgress)
      }
    }

    const setGameStatusRemoveListener =
      currentElement?.params.appName !== undefined
        ? window.api.onProgressUpdate(
            currentElement?.params.appName,
            handleProgressUpdate
          )
        : () => console.log('appName was undefined in download toast manager')

    return () => {
      setGameStatusRemoveListener()
    }
  }, [currentElement])

  if (currentElement === undefined) {
    console.debug('no downloads active in download toast manager')
    return <></>
  }

  function downloadIcon() {
    return (
      <div className={DownloadToastManagerStyles.downloadManagerIcon}>
        <CircularButton
          style={{
            backgroundColor: 'var(--color-neutral-700)',
            padding: 'var(--space-xl)',
            border: '1px solid var(--color-stroke-01)'
          }}
          onClick={() => setShowDownloadToast(!showDownloadToast)}
        >
          <Images.DownloadIcon fill="var(--color-success-400)" />
        </CircularButton>
      </div>
    )
  }

  const downloadedBytes = parseInt(progress.bytes)
  const title = currentElement?.params.gameInfo.title
    ? currentElement?.params.gameInfo.title
    : 'Game'
  const downloadSizeInBytes = progress.percent
    ? (downloadedBytes / progress.percent) * 100
    : 0
  const estimatedCompletionTimeInMs = progress.downSpeed
    ? (downloadSizeInBytes / 1048576 / progress.downSpeed) * 1000
    : 0
  const imgUrl = currentElement?.params.gameInfo.art_cover
    ? currentElement?.params.gameInfo.art_cover
    : ''
  const appName = currentElement?.params.gameInfo.app_name
    ? currentElement?.params.gameInfo.app_name
    : ''

  const gameInfo = currentElement?.params.gameInfo
  if (gameInfo === undefined) {
    console.error('game info was undefined in download toast manager')
    return <></>
  }
  const { folder_name, runner } = gameInfo
  if (folder_name === undefined) {
    console.error('folder name was undefined in download toast manager')
    return <></>
  }
  const installPath = currentElement?.params.path
    ? currentElement?.params.path
    : ''

  return (
    <div className={DownloadToastManagerStyles.downloadManagerContainer}>
      {showDownloadToast ? (
        <DownloadToast
          imgUrl={imgUrl}
          gameTitle={title}
          downloadedInBytes={downloadedBytes}
          downloadSizeInBytes={downloadSizeInBytes}
          estimatedCompletionTimeInMs={estimatedCompletionTimeInMs}
          onCancelClick={() => {
            handleStopInstallation(
              appName,
              [installPath, folder_name],
              t,
              progress,
              runner,
              showDialogModal
            )
          }}
          onPauseClick={() => console.log('pause clicked')}
          onStartClick={() => console.log('start clicked')}
          onCloseClick={() => setShowDownloadToast(false)}
          status="showOnlyCancel"
        />
      ) : (
        downloadIcon()
      )}
    </div>
  )
}
