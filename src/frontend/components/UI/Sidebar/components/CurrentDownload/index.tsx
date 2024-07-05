import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { getGameInfo } from 'frontend/helpers'
import { hasProgress } from 'frontend/hooks/hasProgress'
import { Runner } from 'common/types'
import './index.css'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { Indicator, Progress } from '@mantine/core'
import styles from './index.module.scss'

type Props = {
  appName: string
  runner: Runner
}

export default React.memo(function CurrentDownload({ appName, runner }: Props) {
  const [progress] = hasProgress(appName)
  const [gameTitle, setGameTitle] = useState('')
  const { sidebarCollapsed, libraryStatus } = useContext(ContextProvider)
  const { t } = useTranslation()

  useEffect(() => {
    const getGameTitle = async () => {
      // Hack for EOS Overlay. Not sure if this can be done better
      let title
      if (
        appName === '98bc04bc842e4906993fd6d6644ffb8d' &&
        runner === 'legendary'
      ) {
        title = 'EOS Overlay'
      } else {
        title = (await getGameInfo(appName, runner))!.title
      }
      setGameTitle(title)
    }
    getGameTitle()
  }, [appName])

  function getStatus() {
    return progress.percent && progress.percent > 98
      ? t('status.processing', 'Processing files, please wait')
      : t('status.installing', 'Installing')
  }

  if (!libraryStatus.length) {
    return null
  }

  return (
    <>
      <Link to={`/download-manager`} className="currentDownload">
        {sidebarCollapsed && (
          <span className="statusIcon" title={`${getStatus()} - ${gameTitle}`}>
            <Indicator label={`${Math.round(progress.percent ?? 0)}%`}>
              <FontAwesomeIcon icon={faDownload} />
            </Indicator>
          </span>
        )}
        {!sidebarCollapsed && (
          <>
            <span className="gameTitle">{gameTitle ?? 'GameName'}</span>
            <br />
            <span className="downloadStatus">{getStatus()}</span>
            <br />
            <div className={styles.progressContainer}>
              <div className={styles.progressBarContainer}>
                <Progress value={progress.percent || 0} />
              </div>
              <div className={styles.progressValueContainer}>
                <div className="body-sm">{`${Math.round(
                  progress.percent || 0
                )}%`}</div>
              </div>
            </div>
          </>
        )}
      </Link>
    </>
  )
})
