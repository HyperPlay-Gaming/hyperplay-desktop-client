import './index.css'

import React, { useContext, useState, useEffect } from 'react'

import { GameInfo, Runner } from 'common/types'
import { Link, useNavigate } from 'react-router-dom'

import { getGameInfo, install, launch } from 'frontend/helpers'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { isNotNative, updateGame } from 'frontend/helpers/library'
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
import { useGetDownloadStatusText } from 'frontend/hooks/useGetDownloadStatusText'
import libraryState from 'frontend/state/libraryState'
import DMQueueState from 'frontend/state/DMQueueState'
import authState from 'frontend/state/authState'
import { getImageFormattingForArtSquare } from 'frontend/screens/Game/GamePicture'

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

  const {
    layout,
    allTilesInColor,
    showDialogModal,
    setIsSettingsModalOpen,
    platform
  } = useContext(ContextProvider)

  const {
    app_name: appName,
    runner,
    is_installed: isInstalled,
    install: gameInstallInfo
  } = { ...gameInfoFromProps }

  const isInstallable =
    gameInfo.installable === undefined || gameInfo.installable // If it's undefined we assume it's installable

  const { progress, previousProgress } = hasProgress(appName)
  const { install_size: size = '0', platform: installPlatform } = {
    ...gameInstallInfo
  }

  const { status = '', folder } = hasStatus(appName, gameInfo, size)
  const { statusText: downloadStatusText } = useGetDownloadStatusText(
    appName,
    gameInfo
  )

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
    isPaused,
    isExtracting,
    isPreparing,
    isInstallingDistributables,
    isPatching
  } = getCardStatus(status, isInstalled, layout)

  const handleRemoveFromQueue = () => {
    window.api.removeFromDMQueue(appName)
  }

  const getState = (): GameCardState => {
    const showUpdateButton =
      hasUpdate &&
      !isUpdating &&
      !isQueued &&
      !notAvailable &&
      !authState.isQaModeActive
    if (notSupportedGame) {
      return 'NOT_SUPPORTED'
    }
    if (isInstallingDistributables) {
      return 'DOWNLOADING_DISTRIBUTABLES'
    }
    if (isPreparing) {
      return 'PREPARING'
    }
    if (isPatching) {
      return 'PATCHING'
    }
    if (isUninstalling) {
      return 'UNINSTALLING'
    }
    if (isExtracting) {
      return 'EXTRACTING'
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

  const isHiddenGame = libraryState.isGameHidden(appName)
  const isBrowserGame =
    installPlatform === 'Browser' || installPlatform === 'web'

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
      show:
        hasUpdate &&
        !isUpdating &&
        !isQueued &&
        !notAvailable &&
        !authState.isQaModeActive
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
      onClick: handleClickStopBubbling(() => libraryState.hideGame(appName)),
      show: !isHiddenGame
    },
    {
      // unhide
      label: t('button.unhide_game', 'Unhide Game'),
      onClick: handleClickStopBubbling(() => libraryState.unhideGame(appName)),
      show: isHiddenGame
    },
    {
      label: t('button.favorites', 'Favorite'),
      onClick: handleClickStopBubbling(() =>
        libraryState.favouriteGame(appName)
      ),
      show: !favorited
    },
    {
      label: t('button.unfavorites', 'Unfavorite'),
      onClick: handleClickStopBubbling(() =>
        libraryState.unfavouriteGame(appName)
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
          gameInfo={gameInfo}
          folderName={gameInfo.folder_name ? gameInfo.folder_name : ''}
          status={status}
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
          imageUrl={
            getImageFormattingForArtSquare({
              art_square: gameInfo.art_square,
              store: gameInfo.runner
            }).src
          }
          favorited={favorited}
          onFavoriteClick={handleClickStopBubbling(() => {
            if (!favorited) {
              libraryState.favouriteGame(gameInfo.app_name)
            } else {
              libraryState.unfavouriteGame(gameInfo.app_name)
            }
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
          message={downloadStatusText}
          actionDisabled={isLaunching}
          alwaysShowInColor={allTilesInColor}
          store={runner}
          i18n={{
            addedToLibrary: t(
              'button.remove_from_library',
              'Remove from library'
            ),
            notAddedToLibrary: t('button.add_to_library', 'Add to library'),
            logoTextTooltip: {
              hyperplay: {
                installed: t(
                  'tooltip.installed_from_hyperplay',
                  'Installed from HyperPlay Store'
                ),
                notInstalled: t(
                  'tooltip.will_install_from_hyperplay',
                  'Will install from HyperPlay Store'
                )
              },
              epic: {
                installed: t(
                  'tooltip.installed_from_epic',
                  'Installed from Epic Store'
                ),
                notInstalled: t(
                  'tooltip.will_install_from_epic',
                  'Will install from Epic Store'
                )
              },
              gog: {
                installed: t(
                  'tooltip.installed_from_gog',
                  'Installed from GOG Store'
                ),
                notInstalled: t(
                  'tooltip.will_install_from_gog',
                  'Will install from GOG Store'
                )
              }
            }
          }}
        />
      </Link>
    </>
  )

  async function mainAction(runner: Runner) {
    if (isInstalling || isExtracting || isPaused) {
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
        showDialogModal,
        isNotNative: isNotNative(platform, gameInfo.install.platform!)
      })
    }
    return
  }
}

export default observer(GameCard)
