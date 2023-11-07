import React, { useContext, useEffect, useState } from 'react'
import { DownloadToast, Images, CircularButton } from '@hyperplay/ui'
import { DMQueueElement, GameStatus, InstallProgress } from 'common/types'
import { DMQueue } from 'frontend/types'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'
import DownloadToastManagerStyles from './index.module.scss'
import { launch } from 'frontend/helpers'
import StopInstallationModal from '../StopInstallationModal'
import { downloadStatus } from '@hyperplay/ui/dist/components/DownloadToast'
import { useGetDownloadStatusText } from 'frontend/hooks/useGetDownloadStatusText'
import { useGetDmState } from 'frontend/hooks/useGetDmState'

const nullProgress: InstallProgress = {
  bytes: '0',
  eta: '00:00:00'
}

export default function DownloadToastManager() {
  const [latestElement, setLatestElement] = useState<DMQueueElement>()
  const [currentElement, setCurrentElement] = useState<DMQueueElement>()
  const [progress, setProgress] = useState<InstallProgress>(nullProgress)
  const [showDownloadToast, setShowDownloadToast] = useState(true)
  const { showDialogModal } = useContext(ContextProvider)
  const { t } = useTranslation('gamepage')
  const [showPlay, setShowPlay] = useState(false)
  const [showStopInstallModal, setShowStopInstallModal] = useState(false)

  const appName = currentElement?.params?.gameInfo?.app_name ?? '';
  const gameInfo = currentElement?.params.gameInfo
  const { statusText: downloadStatusText, status } = useGetDownloadStatusText(
    appName,
    gameInfo
  )
  const isExtracting = status === 'extracting'

  let showPlayTimeout: NodeJS.Timeout | undefined = undefined

  const dmState = useGetDmState()

  useEffect(() => {
    if (latestElement === undefined && status === 'installed') {
      setShowPlay(true)
      // after 10 seconds remove and reset the toast
      showPlayTimeout = setTimeout(() => {
        setCurrentElement(undefined)
        setShowPlay(false)
      }, 10000)
      return
    }

    // handle the case where a download starts within 10s after download queue finishes
    if (showPlayTimeout) {
      clearTimeout(showPlayTimeout)
      showPlayTimeout = undefined
    }
    setShowPlay(false)

    if (currentElement?.params.appName !== latestElement?.params.appName)
      setCurrentElement(latestElement)
  }, [latestElement, progress])

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ elements }: DMQueue) => {
      if (elements.length === 0) return
      setCurrentElement(elements[0])
    })

    const removeHandleDMQueueInformation = window.api.handleDMQueueInformation(
      (e: Electron.IpcRendererEvent, elements: DMQueueElement[]) => {
        if (elements) {
          setLatestElement(elements[0])
        }
      }
    )

    return () => {
      removeHandleDMQueueInformation()
    }
  }, [])

  useEffect(() => {
    if (!currentElement) return
    setProgress(nullProgress)
    const handleProgressUpdate = async (
      _e: Electron.IpcRendererEvent,
      { appName: appWithProgress, progress: currentProgress }: GameStatus
    ) => {
      if (
        currentElement?.params.appName === appWithProgress &&
        currentProgress?.bytes &&
        currentProgress.percent
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

  useEffect(() => {
    if (isExtracting) {
      setProgress(nullProgress) // reset progress to 0
    }
  }, [isExtracting])

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
            border: '1px solid var(--color-stroke-01)',
            borderRadius: '100%',
            zIndex: 1000
          }}
          onClick={() => {
            setShowDownloadToast(!showDownloadToast)
            window.api.trackEvent({
              event: 'DownloadToastInteraction',
              properties: { buttonClicked: 'circularButton' }
            })
          }}
        >
          <Images.DownloadIcon fill="var(--color-success-400)" />
        </CircularButton>
      </div>
    )
  }

  let downloadedMB = 0

  if (typeof progress.bytes === 'string') {
    if (
      progress.bytes.includes('MB') ||
      progress.bytes.includes('Mb') ||
      progress.bytes.includes('mb')
    )
      downloadedMB = parseInt(progress.bytes)
    else if (
      progress.bytes.includes('GB') ||
      progress.bytes.includes('Gb') ||
      progress.bytes.includes('gb')
    )
      downloadedMB = parseInt(progress.bytes) / 1024
  } else {
    downloadedMB = Number(progress.bytes)
  }

  const title = currentElement?.params.gameInfo.title
    ? currentElement?.params.gameInfo.title
    : 'Game'
  const downloadSizeInMB = progress.percent
    ? (downloadedMB / progress.percent) * 100
    : 0
  const estimatedCompletionTimeInMs = progress.downSpeed
    ? (downloadSizeInMB / progress.downSpeed) * 1000
    : 0
  let imgUrl = currentElement?.params.gameInfo.art_cover
    ? currentElement?.params.gameInfo.art_cover
    : ''

  if (!imgUrl.includes('http'))
    imgUrl = currentElement.params.gameInfo.art_square

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

  function getDownloadStatus(): downloadStatus {
    if (isExtracting) return 'inExtraction'
    if (dmState === 'paused') return 'paused'
    if (showPlay) return 'done'
    return 'inProgress'
  }

  const adjustedDownloadedInBytes = downloadedMB * 1024 * 1024
  const adjustedDownloadSizeInBytes = downloadSizeInMB * 1024 * 1024

  return (
    <div className={DownloadToastManagerStyles.downloadManagerContainer}>
      {showDownloadToast ? (
        <DownloadToast
          imgUrl={imgUrl}
          gameTitle={title}
          downloadedInBytes={adjustedDownloadedInBytes}
          downloadSizeInBytes={adjustedDownloadSizeInBytes}
          estimatedCompletionTimeInMs={estimatedCompletionTimeInMs}
          onCancelClick={() => {
            setShowStopInstallModal(true)
            window.api.trackEvent({
              event: 'DownloadToastInteraction',
              properties: { buttonClicked: 'cancel' }
            })
          }}
          onPauseClick={async () => window.api.pauseCurrentDownload()}
          onStartClick={() => window.api.resumeCurrentDownload()}
          onCloseClick={() => {
            setShowDownloadToast(false)
            window.api.trackEvent({
              event: 'DownloadToastInteraction',
              properties: { buttonClicked: 'close' }
            })
          }}
          onPlayClick={async () => {
            launch({
              appName,
              t,
              runner,
              hasUpdate: false,
              showDialogModal
            })
            window.api.trackEvent({
              event: 'DownloadToastInteraction',
              properties: { buttonClicked: 'play' }
            })
          }}
          status={getDownloadStatus()}
          statusText={downloadStatusText ?? 'Downloading 2'}
        />
      ) : (
        downloadIcon()
      )}
      {showStopInstallModal ? (
        <StopInstallationModal
          installPath={installPath}
          folderName={folder_name}
          progress={progress}
          gameInfo={gameInfo}
          status={status}
          onClose={() => setShowStopInstallModal(false)}
        />
      ) : null}
    </div>
  )
}
