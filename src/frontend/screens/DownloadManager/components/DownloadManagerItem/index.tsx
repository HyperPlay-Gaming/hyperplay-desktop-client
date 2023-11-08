import './index.css'

import React, { useEffect, useState } from 'react'

import {
  DMQueueElement,
  DownloadManagerState,
  GameInfo,
  HyperPlayInstallInfo
} from 'common/types'
import { ReactComponent as StopIcon } from 'frontend/assets/stop-icon.svg'
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
import { ReactComponent as PlayIcon } from 'frontend/assets/play-icon.svg'
import { ReactComponent as DownIcon } from 'frontend/assets/down-icon.svg'
import { ReactComponent as PauseIcon } from 'frontend/assets/pause-icon.svg'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import StopInstallationModal from 'frontend/components/UI/StopInstallationModal'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'
import { NileInstallInfo } from 'common/types/nile'
import { trackDownloadStatusChange } from '../../helpers'

type Props = {
  element?: DMQueueElement
  current: boolean
  state?: DownloadManagerState
}

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric'
}

function convertToTime(time: number) {
  const date = time ? new Date(time) : new Date()
  const hour = new Intl.DateTimeFormat(undefined, options).format(date)
  return { hour, fullDate: date.toLocaleString() }
}

type InstallInfo =
  | GogInstallInfo
  | LegendaryInstallInfo
  | HyperPlayInstallInfo
  | NileInstallInfo
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
    ...libraryState.hyperPlayLibrary,
    ...libraryState.amazonLibrary
  ]

  const { params, addToQueueTime, endTime, type, startTime } = element
  const {
    appName,
    runner,
    path,
    gameInfo: DmGameInfo,
    size,
    platformToInstall
  } = params

  const [gameInfo, setGameInfo] = useState(DmGameInfo)

  useEffect(() => {
    const getNewInfo = async () => {
      const newInfo = (await getGameInfo(appName, runner)) as GameInfo

      if (size?.includes('?') && !installInfo) {
        const installInfo = await getInstallInfo(
          appName,
          runner,
          platformToInstall
        )
        setInstallInfo(installInfo)
      }

      if (newInfo) {
        setGameInfo(newInfo)
      }
    }
    getNewInfo()
  }, [element])

  const {
    art_cover,
    art_square,
    install: { is_dlc }
  } = gameInfo || {}

  const [progress] = hasProgress(appName)
  const { status } = element
  const finished = status === 'done'
  const canceled = status === 'error' || (status === 'abort' && !current)

  const goToGamePage = () => {
    if (is_dlc) {
      return
    }
    return navigate(`/gamepage/${runner}/${appName}`, {
      state: { fromDM: true, gameInfo: gameInfo }
    })
  }

  // using one element for the different states so it doesn't
  // lose focus from the button when using a game controller
  const handleMainActionClick = () => {
    if (finished || canceled) {
      return goToGamePage()
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
      trackDownloadStatusChange({
        event: 'Game Install Resumed',
        properties: {
          store_name: runner,
          game_title: gameInfo.title,
          game_name: gameInfo.app_name
        }
      })
    } else if (state === 'running') {
      window.api.pauseCurrentDownload()
      trackDownloadStatusChange({
        event: 'Game Install Paused',
        properties: {
          store_name: runner,
          game_title: gameInfo.title,
          game_name: gameInfo.app_name
        }
      })
    }
  }

  const mainActionIcon = () => {
    if (finished) {
      if (is_dlc) {
        return <>-</>
      }
      return <PlayIcon className="playIcon" />
    }

    if (canceled) {
      return <DownIcon />
    }

    return <StopIcon />
  }

  const secondaryActionIcon = () => {
    if (state === 'paused') {
      return <PlayIcon className="playIcon" />
    } else if (state === 'running') {
      return <PauseIcon className="pauseIcon" />
    } else {
      return <></>
    }
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

  const { hour, fullDate } = getTime()

  return (
    <>
      {showStopInstallModal ? (
        <StopInstallationModal
          onClose={() => setShowStopInstallModal(false)}
          installPath={path}
          folderName={gameInfo.folder_name ? gameInfo.folder_name : ''}
          gameInfo={gameInfo}
          progress={progress}
        />
      ) : null}
      <div className="downloadManagerListItem">
        <span
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
        </span>
        <span title={fullDate}>{hour}</span>
        <span>{translatedTypes[type]}</span>
        <span>{getStoreName(runner, t2('Other'))}</span>
        <span className="icons">
          <SvgButton onClick={handleMainActionClick} title={mainIconTitle()}>
            {mainActionIcon()}
          </SvgButton>
          {current && (
            <SvgButton
              onClick={handleSecondaryActionClick}
              title={secondaryIconTitle()}
            >
              {secondaryActionIcon()}
            </SvgButton>
          )}
        </span>
      </div>
    </>
  )
})

export default DownloadManagerItem
