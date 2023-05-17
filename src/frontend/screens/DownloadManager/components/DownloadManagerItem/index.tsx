import './index.css'

import React, { useContext, useEffect, useState } from 'react'

import {
  DMQueueElement,
  DownloadManagerState,
  GameInfo,
  HyperPlayInstallInfo
} from 'common/types'
import { ReactComponent as StopIcon } from 'frontend/assets/stop-icon.svg'
import { CachedImage, SvgButton } from 'frontend/components/UI'
import { handleStopInstallation } from 'frontend/helpers/library'
import {
  getGameInfo,
  getInstallInfo,
  getStoreName,
  size as fileSize
} from 'frontend/helpers'
import { useTranslation } from 'react-i18next'
import { hasProgress } from 'frontend/hooks/hasProgress'
import ContextProvider from 'frontend/state/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlayIcon } from 'frontend/assets/play-icon.svg'
import { ReactComponent as DownIcon } from 'frontend/assets/down-icon.svg'
import { ReactComponent as PauseIcon } from 'frontend/assets/pause-icon.svg'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'

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
  | null

const DownloadManagerItem = ({ element, current, state }: Props) => {
  const { epic, gog, showDialogModal, hyperPlayLibrary } =
    useContext(ContextProvider)
  const [installInfo, setInstallInfo] = useState<InstallInfo>(null)
  const { t } = useTranslation('gamepage')
  const { t: t2 } = useTranslation('translation')

  const navigate = useNavigate()

  if (!element) {
    return (
      <h5 style={{ paddingTop: 'var(--space-xs' }}>
        {t2('queue.label.empty', 'Nothing to download')}
      </h5>
    )
  }

  const library = [...epic.library, ...gog.library, ...hyperPlayLibrary]

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

  const { art_cover, art_square } = gameInfo || {}

  const [progress] = hasProgress(appName)
  const { status } = element
  const finished = status === 'done'
  const canceled = status === 'error' || (status === 'abort' && !current)

  const stopInstallation = async () => {
    if (!gameInfo) {
      return
    }
    const folder_name = gameInfo.folder_name
    if (!folder_name) return

    return handleStopInstallation(
      appName,
      path,
      t,
      progress,
      runner,
      showDialogModal
    )
  }

  const goToGamePage = () => {
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

    current ? stopInstallation() : window.api.removeFromDMQueue(appName)
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
      return <PlayIcon />
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
  const cover = art_cover || art_square

  const translatedTypes = {
    install: t2('download-manager.install-type.install', 'Install'),
    update: t2('download-manager.install-type.update', 'Update')
  }

  const { hour, fullDate } = getTime()

  return (
    <div className="downloadManagerListItem">
      <span
        role="button"
        onClick={() => goToGamePage()}
        className="downloadManagerTitleList"
        style={{ color: getStatusColor() }}
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
  )
}

export default DownloadManagerItem
