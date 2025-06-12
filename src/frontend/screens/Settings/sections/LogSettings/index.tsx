import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  faCheck,
  faCopy,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { UpdateComponent } from 'frontend/components/UI'
import SettingsContext from '../../SettingsContext'
import styles from './index.module.scss'
import { GameInfo } from 'common/types'
import libraryState from 'frontend/state/libraryState'
import { AlertCard, Images, Button } from '@hyperplay/ui'

interface LogBoxProps {
  logFileContent: string
}

const LogBox: React.FC<LogBoxProps> = ({ logFileContent }) => {
  const { t } = useTranslation()
  const maxLines = 1000
  let sliced = false
  let lines = logFileContent.split('\n')
  if (lines.length > maxLines) {
    lines = ['...', ...lines.slice(-maxLines)]
    sliced = true
  }

  return (
    <>
      {sliced && (
        <span className={styles['long-log-hint']}>
          {t(
            'settings.log.long-log-hint',
            'Log truncated, last 1000 lines are shown!'
          )}
        </span>
      )}
      <div className={styles['log-box']}>
        {lines.map((line, key) => {
          if (line.toLowerCase().includes(' err')) {
            return (
              <p key={key} className={styles['log-error']}>
                {line}
              </p>
            )
          } else if (line.toLowerCase().includes(' warn')) {
            return (
              <p key={key} className={styles['log-warning']}>
                {line}
              </p>
            )
          } else {
            return (
              <p key={key} className={styles['log-info']}>
                {line}
              </p>
            )
          }
        })}
      </div>
    </>
  )
}

function LogSettings() {
  const { t } = useTranslation()
  const { appName } = useContext(SettingsContext)

  const hyperPlayLibrary = libraryState.hyperPlayLibrary
  const epicLibrary = libraryState.epicLibrary
  const gogLibrary = libraryState.gogLibrary
  const sideloadedLibrary = libraryState.sideloadedLibrary

  const [logFileContent, setLogFileContent] = useState<string>('')
  const [logFileExist, setLogFileExist] = useState<boolean>(false)
  const [showLogOf, setShowLogOf] = useState<string>(
    appName === 'default' ? 'hyperplay' : appName
  )
  const [refreshing, setRefreshing] = useState<boolean>(true)
  const [copiedLog, setCopiedLog] = useState<boolean>(false)

  const [installedGames, setInstalledGames] = useState<GameInfo[]>([])

  useEffect(() => {
    let games: GameInfo[] = []
    games = games.concat(hyperPlayLibrary.filter((game) => game.is_installed))
    games = games.concat(epicLibrary.filter((game) => game.is_installed))
    games = games.concat(gogLibrary.filter((game) => game.is_installed))
    games = games.concat(sideloadedLibrary.filter((game) => game.is_installed))
    games = games.sort((game1, game2) => game1.title.localeCompare(game2.title))

    setInstalledGames(games)
  }, [epicLibrary, gogLibrary, sideloadedLibrary])

  const getLogContent = () => {
    window.api.getLogContent(showLogOf).then((content: string) => {
      if (!content) {
        setLogFileContent(t('setting.log.no-file', 'No log file found.'))
        setLogFileExist(false)
        return setRefreshing(false)
      }
      setLogFileContent(content)
      setLogFileExist(true)
      setRefreshing(false)
    })
  }

  useEffect(() => {
    getLogContent()
    const interval = setInterval(() => {
      getLogContent()
    }, 1000)
    return () => clearInterval(interval)
  }, [showLogOf])

  function showLogFileInFolder() {
    window.api.showLogFileInFolder(showLogOf)
  }

  return (
    <>
      <div className="title">{t('setting.logs.title', 'Logs')}</div>
      <div className={styles['alert-card-container']}>
        <AlertCard
          variant="information"
          size="large"
          showClose={false}
          link={{
            text: t('setting.log.create-ticket-discord', 'Create a ticket'),
            onClick: () => {
              window.api.openDiscordLink()
            }
          }}
          style={{ width: '100%', maxWidth: '1048px' }}
          icon={<Images.Info />}
          title={t('setting.log.alert-title', 'Something Not Working?')}
          message={t(
            'setting.log.alert-message',
            "If you encounter any issues while using HyperPlay, please head to our #create-ticket channel on Discord to get support from the team. We'll follow up with you directly via the ticket."
          )}
        />
      </div>
      <div className={styles['logs-wrapper']}>
        <span className={styles['log-buttongroup']}>
          {[
            ['HyperPlay', 'hyperplay'],
            ['Epic/Legendary', 'legendary'],
            ['GOG', 'gogdl']
          ].map((log) => {
            const [label, value] = log
            return (
              <a
                key={value}
                className={`${styles['log-buttons']} ${
                  showLogOf === value ? styles['log-choosen'] : ''
                }`}
                onClick={() => {
                  setRefreshing(true)
                  setShowLogOf(value)
                }}
                title={label}
              >
                {label}
              </a>
            )
          })}
          {installedGames.map((game) => {
            return (
              <a
                key={game.app_name}
                className={`${styles['log-buttons']} ${
                  showLogOf === game.app_name ? styles['log-choosen'] : ''
                }`}
                onClick={() => {
                  setRefreshing(true)
                  setShowLogOf(game.app_name)
                }}
                title={game.title}
              >
                {game.title}
              </a>
            )
          })}
        </span>

        {refreshing ? (
          <span className={styles['log-box']}>
            <UpdateComponent inline />
          </span>
        ) : (
          <LogBox logFileContent={logFileContent} />
        )}
      </div>
      {logFileExist && (
        <span className={styles.footerFlex}>
          <a>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(logFileContent)
                setCopiedLog(true)
                setTimeout(() => {
                  setCopiedLog(false)
                }, 3000)
              }}
            >
              {copiedLog ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faCopy} />
              )}
              {copiedLog
                ? t('setting.log.copied-to-clipboard', 'Copied!')
                : t('setting.log.copy-log-clipboard', 'Copy Log to Clipboard')}
            </Button>
          </a>
          <a>
            <Button type="secondary" size="small" onClick={showLogFileInFolder}>
              <FontAwesomeIcon icon={faFolderOpen} />
              {t('setting.log.show-log-folder', 'Show Log File in Folder')}
            </Button>
          </a>
        </span>
      )}
    </>
  )
}

export default observer(LogSettings)
