import './index.css'

import React, { useEffect, useState } from 'react'

import {
  DMQueueElement,
  DownloadManagerState,
  GameInfo,
  HyperPlayInstallInfo,
  GamePageActions
} from 'common/types'
import { CachedImage, SvgButton } from 'frontend/components/UI'
import {
  getGameInfo,
  getInstallInfo,
  getStoreName,
  size as fileSize
} from 'frontend/helpers'
import { useTranslation } from 'react-i18next'
import { hasProgress } from 'frontend/hooks/hasProgress'
import { useNavigate } from 'react-router-dom'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import StopInstallationModal from 'frontend/components/UI/StopInstallationModal'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'
import { hasStatus } from 'frontend/hooks/hasStatus'
import { Images } from '@hyperplay/ui'
import styles from './index.module.scss'
const { PauseIcon, PlayIcon, XCircle, DownloadIcon } = Images

type Props = {
  element?: DMQueueElement
  current: boolean
  state?: DownloadManagerState
}

function convertToTime(time: number) {
  const date = time ? new Date(time) : new Date()
  const fullDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
  return { fullDate }
}

type InstallInfo =
  | GogInstallInfo
  | LegendaryInstallInfo
  | HyperPlayInstallInfo
  | null

const DownloadManagerItem = observer(({ element, current, state }: Props) => {
  const [installInfo, setInstallInfo] = useState<InstallInfo>(null)
  const { t } = useTranslation('gamepage')
  const { t: t2 } = useTranslation('translation')
  const [showStopInstallModal, setShowStopInstallModal] = useState(false)

  const navigate = useNavigate()

  if (!element) {
    return (
      <h6
        style={{
          paddingTop: 'var(--space-xs)',
          paddingLeft: 'var(--space-xs)'
        }}
      >
        {t2('queue.label.empty', 'Nothing to download')}
      </h6>
    )
  }

  const library = [
    ...libraryState.epicLibrary,
    ...libraryState.gogLibrary,
    ...libraryState.hyperPlayLibrary
  ]

  const { params, addToQueueTime, endTime, type, startTime } = element
  const {
    appName,
    runner,
    path,
    gameInfo: DmGameInfo,
    size,
    platformToInstall,
    channelName
  } = params

  const [gameInfo, setGameInfo] = useState(DmGameInfo)
  const { status: gameProgressStatus = '' } = hasStatus(
    appName,
    DmGameInfo,
    size || '0'
  )

  useEffect(() => {
    const getNewInfo = async () => {
      const newInfo = (await getGameInfo(appName, runner)) as GameInfo

      if (!installInfo) {
        const installInfo = await getInstallInfo(
          appName,
          runner,
          platformToInstall,
          channelName
        )
        setInstallInfo(installInfo)
      }

      if (newInfo) {
        setGameInfo(newInfo)
      }
    }
    getNewInfo()
  }, [element, current, state])

  const {
    art_cover,
    art_square,
    install: { is_dlc }
  } = gameInfo || {}

  const [progress] = hasProgress(appName)
  const { status } = element
  const finished = status === 'done'
  const canceled = status === 'error' || (status === 'abort' && !current)
  const isExtracting = gameProgressStatus === 'extracting'

  const goToGamePage = (action?: GamePageActions) => {
    if (is_dlc) {
      return
    }
    return navigate(`/gamepage/${runner}/${appName}`, {
      state: { fromDM: true, gameInfo: gameInfo, action }
    })
  }

  // using one element for the different states so it doesn't
  // lose focus from the button when using a game controller
  const handleMainActionClick = async () => {
    const action = finished ? 'launch' : 'install'
    if (finished || canceled) {
      return goToGamePage(action)
    }

    // gameInfo must be defined in order to get folder name for stop installation modal
    current && gameInfo
      ? setShowStopInstallModal(true)
      : window.api.removeFromDMQueue(appName)
  }

  // using one element for the different states so it doesn't
  // lose focus from the button when using a game controller
  const handleSecondaryActionClick = () => {
    if (state === 'paused') {
      window.api.resumeCurrentDownload()
    } else if (state === 'running') {
      window.api.pauseCurrentDownload()
    }
  }

  const mainActionIcon = () => {
    if (finished) {
      if (is_dlc) {
        return <>-</>
      }
      return <PlayIcon className={styles.playIcon} />
    }

    if (canceled) {
      return <DownloadIcon className={styles.downloadIcon} />
    }

    return <XCircle />
  }

  const secondaryActionIcon = () => {
    if (state === 'paused') {
      return <PlayIcon className={styles.playIcon} />
    } else if (state === 'running') {
      return <PauseIcon className={styles.pauseIcon} />
    }

    return <></>
  }

  const getTime = () => {
    if (finished) {
      return convertToTime(endTime)
    }
    if (current) {
      return convertToTime(startTime)
    }
    return convertToTime(addToQueueTime)
  }

  const mainIconTitle = () => {
    const { status } = element
    if (status === 'done' || status === 'error') {
      return t('Open')
    }

    return current
      ? t('button.cancel', 'Cancel')
      : t('queue.label.remove', 'Remove from Downloads')
  }

  const secondaryIconTitle = () => {
    if (state === 'paused') {
      return t('queue.label.resume', 'Resume download')
    } else if (state === 'running') {
      return t('queue.label.pause', 'Pause download')
    } else {
      return ''
    }
  }

  const getStatusColor = () => {
    if (element.status === 'done') {
      return 'var(--success)'
    }

    if (canceled) {
      return 'var(--danger)'
    }

    return current ? 'var(--text-default)' : 'var(--accent)'
  }

  const currentApp = library.find((val) => val.app_name === appName)

  if (!currentApp) {
    return null
  }

  const { title } = currentApp
  let cover = art_cover || art_square
  if (!cover.includes('http')) cover = art_square

  const translatedTypes = {
    install: t2('download-manager.install-type.install', 'Install'),
    update: t2('download-manager.install-type.update', 'Update')
  }

  const { fullDate } = getTime()

  return (
    <>
      {showStopInstallModal ? (
        <StopInstallationModal
          onClose={() => setShowStopInstallModal(false)}
          installPath={path}
          folderName={gameInfo.folder_name ? gameInfo.folder_name : ''}
          gameInfo={gameInfo}
          status={status || ''}
          progress={progress}
        />
      ) : null}
      <tr>
        <td
          role="button"
          onClick={() => goToGamePage()}
          className="downloadManagerTitleList"
          style={{
            color: getStatusColor(),
            cursor: is_dlc ? 'default' : 'pointer'
          }}
        >
          {cover && <CachedImage src={cover} alt={title} />}
          <span className="titleSize">
            {title}
            <span title={path}>
              {size?.includes('?')
                ? fileSize(Number(installInfo?.manifest.download_size) || 0)
                : size}
              {canceled ? ` (${t('queue.label.canceled', 'Canceled')})` : ''}
            </span>
          </span>
        </td>
        <td title={fullDate}>{fullDate}</td>
        <td>{translatedTypes[type]}</td>
        <td>{getStoreName(runner, t2('Other'))}</td>
        <td>
          <div className={styles.iconContainer}>
            <SvgButton onClick={handleMainActionClick} title={mainIconTitle()}>
              {mainActionIcon()}
            </SvgButton>
            {current && !isExtracting && (
              <SvgButton
                onClick={handleSecondaryActionClick}
                title={secondaryIconTitle()}
              >
                {secondaryActionIcon()}
              </SvgButton>
            )}
          </div>
        </td>
      </tr>
    </>
  )
})

export default DownloadManagerItem
