import './index.css'

import React, { useContext, useState, useEffect } from 'react'

import { GameInfo, Runner } from 'common/types'
import { Link, useNavigate } from 'react-router-dom'

import { getGameInfo, install, launch } from 'frontend/helpers'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { updateGame } from 'frontend/helpers/library'
import { hasProgress } from 'frontend/hooks/hasProgress'
import UninstallModal from 'frontend/components/UI/UninstallModal'
import { observer } from 'mobx-react-lite'
import walletStore from 'frontend/state/WalletState'
import onboardingStore from 'frontend/store/OnboardingStore'
import { getCardStatus } from './constants'
import { hasStatus } from 'frontend/hooks/hasStatus'
import StopInstallationModal from 'frontend/components/UI/StopInstallationModal'
import {
  GameCard as HpGameCard,
  GameCardState,
  SettingsButtons
} from '@hyperplay/ui'
import classNames from 'classnames'
import libraryState from 'frontend/state/libraryState'
import DMQueueState from 'frontend/state/DMQueueState'

interface Card {
  buttonClick: () => void
  hasUpdate: boolean
  isRecent: boolean
  gameInfo: GameInfo
  favorited: boolean
}

const storage: Storage = window.localStorage

const GameCard = ({
  hasUpdate,
  buttonClick,
  isRecent = false,
  favorited,
  gameInfo: gameInfoFromProps
}: Card) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>(
    JSON.parse(JSON.stringify(gameInfoFromProps))
  )
  const [showUninstallModal, setShowUninstallModal] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [showStopInstallModal, setShowStopInstallModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const { t } = useTranslation('gamepage')

  const navigate = useNavigate()

  const { layout, allTilesInColor, showDialogModal, setIsSettingsModalOpen } =
    useContext(ContextProvider)

  const {
    title,
    app_name: appName,
    runner,
    is_installed: isInstalled,
    install: gameInstallInfo
  } = { ...gameInfoFromProps }

  const isInstallable =
    gameInfo.installable === undefined || gameInfo.installable // If it's undefined we assume it's installable

  const [progress, previousProgress] = hasProgress(appName)
  const { install_size: size = '0', platform: installPlatform } = {
    ...gameInstallInfo
  }

  const { status, folder } = hasStatus(appName, gameInfo, size)

  useEffect(() => {
    setIsLaunching(false)
    const updateGameInfo = async () => {
      if (!gameInfoFromProps) {
        const newInfo = await getGameInfo(appName, runner)
        if (newInfo) {
          setGameInfo(newInfo)
        }
      }
    }
    updateGameInfo()
  }, [status])

  const {
    isInstalling,
    notSupportedGame,
    isUninstalling,
    isQueued,
    isPlaying,
    notAvailable,
    isUpdating,
    isPaused
  } = getCardStatus(status, isInstalled, layout)

  const handleRemoveFromQueue = () => {
    window.api.removeFromDMQueue(appName)
  }

  const getState = (): GameCardState => {
    const showUpdateButton =
      hasUpdate && !isUpdating && !isQueued && !notAvailable
    if (notSupportedGame) {
      return 'NOT_SUPPORTED'
    }
    if (isUninstalling) {
      return 'UNINSTALLING'
    }
    if (isQueued) {
      return 'QUEUED'
    }
    if (isPlaying) {
      return 'PLAYING'
    }
    if (isQueued || DMQueueState.isInstalling(appName)) {
      return 'INSTALLING'
    }
    if (showUpdateButton) {
      return 'NEEDS_UPDATE'
    }
    if (isInstalled) {
      return 'INSTALLED'
    }
    if (DMQueueState.isPaused(appName)) {
      return 'PAUSED'
    }
    if (status === 'extracting') {
      return 'SHOW_MESSAGE'
    }
    return 'NOT_INSTALLED'
  }

  const getMessage = (): string | undefined => {
    if (status === 'extracting') {
      return t('hyperplay.gamecard.extracting', 'Extracting...')
    }
    if (isPaused) {
      return t('hyperplay.gamecard.paused', 'Paused')
    }
    if (isInstalling) {
      return t('hyperplay.gamecard.installing', 'Downloading...')
    }
    return undefined
  }

  const isHiddenGame = libraryState.isGameHidden(appName)

  const isBrowserGame = installPlatform === 'Browser'

  const onUninstallClick = function () {
    setShowUninstallModal(true)
  }

  const onRemoveFromLibraryClick = function () {
    window.api.removeFromLibrary(gameInfo.app_name)
  }

  const handleClickStopBubbling =
    (callback: () => void, isRightClick = false) =>
    (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault()
      callback()
      if (!isRightClick) {
        setShowSettings(false)
      }
    }

  interface Show {
    show: boolean
  }
  type SettingsItem = SettingsButtons & Show

  const items: SettingsItem[] = [
    {
      // remove from install queue
      label: t('button.queue.remove'),
      onClick: handleClickStopBubbling(() => handleRemoveFromQueue()),
      show: isQueued && !isInstalling
    },
    {
      // stop if running
      label: t('label.playing.stop'),
      onClick: handleClickStopBubbling(async () => mainAction(runner)),
      show: isPlaying
    },
    {
      // launch game
      label: t('label.playing.start'),
      onClick: handleClickStopBubbling(async () => mainAction(runner)),
      show: isInstalled && !isPlaying && !isUpdating && !isQueued
    },
    {
      // update
      label: t('button.update', 'Update'),
      onClick: handleClickStopBubbling(async () => updateGame(gameInfo)),
      show: hasUpdate && !isUpdating && !isQueued
    },
    {
      // install
      label: t('button.install'),
      onClick: handleClickStopBubbling(() => buttonClick()),
      show: !isInstalled && !isQueued && isInstallable
    },
    {
      // cancel installation/update
      label: t('button.cancel'),
      onClick: handleClickStopBubbling(async () => mainAction(runner)),
      show: isInstalling || isUpdating
    },
    {
      // open the game page
      label: t('button.details', 'Details'),
      onClick: handleClickStopBubbling(() => {
        navigate(`/gamepage/${runner}/${appName}`, {
          state: { gameInfo }
        })
      }),
      show: true
    },
    {
      // hide
      label: t('button.hide_game', 'Hide Game'),
      onClick: handleClickStopBubbling(() =>
        libraryState.hiddenGames?.add(appName, title)
      ),
      show: !isHiddenGame
    },
    {
      // unhide
      label: t('button.unhide_game', 'Unhide Game'),
      onClick: handleClickStopBubbling(() =>
        libraryState.hiddenGames?.remove(appName)
      ),
      show: isHiddenGame
    },
    {
      label: t('button.favorites', 'Favorite'),
      onClick: handleClickStopBubbling(() =>
        libraryState.favouriteGames?.add(appName, title)
      ),
      show: !favorited
    },
    {
      label: t('button.unfavorites', 'Unfavorite'),
      onClick: handleClickStopBubbling(() =>
        libraryState.favouriteGames?.remove(appName)
      ),
      show: favorited
    },
    {
      label: t('button.remove_from_recent', 'Remove From Recent'),
      onClick: handleClickStopBubbling(async () =>
        window.api.removeRecentGame(appName)
      ),
      show: isRecent
    },
    {
      // settings
      label: t('submenu.settings'),
      onClick: handleClickStopBubbling(() =>
        setIsSettingsModalOpen(true, 'settings', gameInfo)
      ),
      show: isInstalled && !isUninstalling && !isBrowserGame
    },
    {
      // uninstall
      label: t('button.uninstall'),
      onClick: handleClickStopBubbling(onUninstallClick),
      show: isInstalled && !isUpdating
    },
    {
      // remove from library
      label: t('button.remove_from_library', 'Remove'),
      onClick: handleClickStopBubbling(onRemoveFromLibraryClick),
      show:
        !isInstalled && !isUpdating && !isInstalling && runner === 'hyperplay'
    }
  ]

  const { activeController } = useContext(ContextProvider)

  return (
    <>
      {showStopInstallModal ? (
        <StopInstallationModal
          onClose={() => setShowStopInstallModal(false)}
          progress={progress}
          installPath={folder}
          appName={appName}
          runner={runner}
          folderName={gameInfo.folder_name ? gameInfo.folder_name : ''}
        />
      ) : null}
      {showUninstallModal && (
        <UninstallModal
          appName={appName}
          runner={runner}
          isDlc={Boolean(gameInfo.install.is_dlc)}
          onClose={() => setShowUninstallModal(false)}
        />
      )}
      <Link
        to={`/gamepage/${runner}/${appName}`}
        state={{ gameInfo }}
        className={classNames({
          gamepad: activeController
        })}
      >
        <HpGameCard
          key={appName}
          title={gameInfo.title}
          imageUrl={gameInfo.art_square}
          favorited={favorited}
          onFavoriteClick={handleClickStopBubbling(() => {
            if (!favorited)
              libraryState.favouriteGames?.add(
                gameInfo.app_name,
                gameInfo.title
              )
            else libraryState.favouriteGames?.remove(gameInfo.app_name)
          })}
          onDownloadClick={handleClickStopBubbling(buttonClick)}
          onRemoveFromQueueClick={handleClickStopBubbling(
            handleRemoveFromQueue
          )}
          onStopPlayingClick={handleClickStopBubbling(async () =>
            mainAction(runner)
          )}
          onPauseClick={handleClickStopBubbling(async () =>
            window.api.pauseCurrentDownload()
          )}
          onResumeClick={handleClickStopBubbling(() =>
            window.api.resumeCurrentDownload()
          )}
          onPlayClick={handleClickStopBubbling(async () => mainAction(runner))}
          onStopDownloadClick={handleClickStopBubbling(async () =>
            setShowStopInstallModal(true)
          )}
          state={getState()}
          settingsItems={items.filter((val) => val.show).slice(0, 6)}
          showSettings={showSettings}
          onSettingsClick={handleClickStopBubbling(
            () => setShowSettings(!showSettings),
            true
          )}
          onContextMenu={handleClickStopBubbling(
            () => setShowSettings(!showSettings),
            true
          )}
          onUpdateClick={handleClickStopBubbling(async () =>
            updateGame(gameInfo)
          )}
          progress={progress}
          message={getMessage()}
          actionDisabled={isLaunching}
          alwaysShowInColor={allTilesInColor}
          store={runner}
        />
      </Link>
    </>
  )

  async function mainAction(runner: Runner) {
    if (isInstalling || isPaused) {
      return setShowStopInstallModal(true)
    }

    // ask to install if the game is not installed
    if (!isInstalled && !isQueued && gameInfo.runner !== 'sideload') {
      return install({
        gameInfo,
        installPath: folder!,
        isInstalling,
        previousProgress,
        progress,
        t,
        showDialogModal
      })
    }

    // kill the game if it's running
    if (isPlaying || isUpdating) {
      return window.api.kill(appName, runner)
    }

    // remove the game from the queue
    if (isQueued) {
      storage.removeItem(appName)
      return window.api.removeFromDMQueue(appName)
    }

    // ask to connect the wallet if its a web3 game
    if (gameInfo.web3?.supported && !walletStore.isConnected) {
      try {
        await onboardingStore.startOnboarding()
      } catch (e) {
        console.error('User denied onboarding')
      }
    }

    // launch the game
    if (isInstalled) {
      setIsLaunching(true)
      return launch({
        appName,
        t,
        runner,
        hasUpdate,
        showDialogModal
      })
    }
    return
  }
}

export default observer(GameCard)
