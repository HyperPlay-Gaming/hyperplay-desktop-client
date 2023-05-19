import './index.css'

import React, {
  useContext,
  CSSProperties,
  useMemo,
  useState,
  useEffect
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

import { ReactComponent as DownIcon } from 'frontend/assets/down-icon.svg'
import { GameInfo, HiddenGame, Runner } from 'common/types'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlayIcon } from 'frontend/assets/play-icon.svg'
import { ReactComponent as StopIcon } from 'frontend/assets/stop-icon.svg'
import { ReactComponent as StopIconAlt } from 'frontend/assets/stop-icon-alt.svg'

import {
  getGameInfo,
  getProgress,
  getStoreName,
  install,
  launch,
  sendKill
} from 'frontend/helpers'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { updateGame } from 'frontend/helpers/library'
import { CachedImage, SvgButton } from 'frontend/components/UI'
import ContextMenu, { Item } from '../ContextMenu'
import { hasProgress } from 'frontend/hooks/hasProgress'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import classNames from 'classnames'
import StoreLogos from 'frontend/components/UI/StoreLogos'
import UninstallModal from 'frontend/components/UI/UninstallModal'
import { observer } from 'mobx-react-lite'
import walletStore from 'frontend/store/WalletStore'
import onboardingStore from 'frontend/store/OnboardingStore'
import { getCardStatus, getImageFormatting } from './constants'
import { hasStatus } from 'frontend/hooks/hasStatus'
import StopInstallationModal from 'frontend/components/UI/StopInstallationModal'
import { GameCard as HpGameCard, GameCardState } from '@hyperplay/ui'

interface Card {
  buttonClick: () => void
  hasUpdate: boolean
  isRecent: boolean
  gameInfo: GameInfo
  forceCard?: boolean
  favorited: boolean
}

const storage: Storage = window.localStorage

const GameCard = ({
  hasUpdate,
  buttonClick,
  forceCard,
  isRecent = false,
  favorited,
  gameInfo: gameInfoFromProps
}: Card) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>(gameInfoFromProps)
  const [showUninstallModal, setShowUninstallModal] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [showStopInstallModal, setShowStopInstallModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const { t } = useTranslation('gamepage')

  const navigate = useNavigate()

  const {
    layout,
    hiddenGames,
    favouriteGames,
    allTilesInColor,
    showDialogModal,
    setIsSettingsModalOpen
  } = useContext(ContextProvider)

  const {
    title,
    art_square: cover,
    art_logo: logo = undefined,
    app_name: appName,
    runner,
    is_installed: isInstalled,
    install: gameInstallInfo
  } = { ...gameInfoFromProps }

  const [progress, previousProgress] = hasProgress(appName)
  const { install_size: size = '0', platform: installPlatform } = {
    ...gameInstallInfo
  }

  const { status, folder, label } = hasStatus(appName, gameInfo, size)

  useEffect(() => {
    setIsLaunching(false)
    const updateGameInfo = async () => {
      const newInfo = await getGameInfo(appName, runner)
      if (newInfo) {
        setGameInfo(newInfo)
      }
    }
    updateGameInfo()
  }, [status])

  async function handleUpdate() {
    if (gameInfo.runner !== 'sideload')
      updateGame({ appName, runner, gameInfo })
  }

  const grid = forceCard || layout === 'grid'

  const {
    isInstalling,
    notSupportedGame,
    isUninstalling,
    isQueued,
    isPlaying,
    notAvailable,
    isUpdating,
    isPaused,
    haveStatus
  } = getCardStatus(status, isInstalled, layout)

  const installingGrayscale = isInstalling
    ? `${125 - getProgress(progress)}%`
    : '100%'

  const handleRemoveFromQueue = () => {
    window.api.removeFromDMQueue(appName)
  }

  const getState = (): GameCardState => {
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
    if (isInstalling || isQueued) {
      return 'INSTALLING'
    }
    if (isInstalled) {
      return 'INSTALLED'
    } else {
      return 'NOT_INSTALLED'
    }
  }

  const renderIcon = () => {
    if (isPaused) {
      return (
        <SvgButton
          title={t('button.queue.continue', 'Continue Download')}
          className="playIcon"
          onClick={() => window.api.resumeCurrentDownload()}
        >
          <DownIcon />
        </SvgButton>
      )
    }
    if (notSupportedGame) {
      return (
        <FontAwesomeIcon
          title={t(
            'label.game.third-party-game',
            'Third-Party Game NOT Supported'
          )}
          className="downIcon"
          icon={faBan}
        />
      )
    }
    if (isUninstalling) {
      return (
        <button className="svg-button iconDisabled">
          <svg />
        </button>
      )
    }
    if (isQueued) {
      return (
        <SvgButton
          title={t('button.queue.remove', 'Remove from Queue')}
          className="queueIcon"
          onClick={() => handleRemoveFromQueue()}
        >
          <RemoveCircleIcon />
        </SvgButton>
      )
    }
    if (isPlaying) {
      return (
        <SvgButton
          className="cancelIcon"
          onClick={async () => mainAction(runner)}
          title={`${t('label.playing.stop')} (${title})`}
        >
          <StopIconAlt />
        </SvgButton>
      )
    }
    if (isInstalling) {
      return (
        <SvgButton
          className="cancelIcon"
          onClick={async () => setShowStopInstallModal(true)}
          title={`${t('button.cancel')} (${title})`}
        >
          <StopIcon />
        </SvgButton>
      )
    }
    if (isInstalled) {
      return (
        <SvgButton
          className={!notAvailable ? 'playIcon' : 'notAvailableIcon'}
          onClick={async () => mainAction(runner)}
          title={`${t('label.playing.start')} (${title})`}
          disabled={isLaunching || status === 'syncing-saves'}
        >
          <PlayIcon />
        </SvgButton>
      )
    } else {
      return (
        <SvgButton
          className="downIcon"
          onClick={() => buttonClick()}
          title={`${t('button.install')} (${title})`}
        >
          <DownIcon />
        </SvgButton>
      )
    }
  }

  const isHiddenGame = useMemo(() => {
    return !!hiddenGames.list.find(
      (hiddenGame: HiddenGame) => hiddenGame.appName === appName
    )
  }, [hiddenGames, appName])

  const isBrowserGame = installPlatform === 'Browser'

  const onUninstallClick = function () {
    setShowUninstallModal(true)
  }

  const items: Item[] = [
    {
      // remove from install queue
      label: t('button.queue.remove'),
      onClick: () => handleRemoveFromQueue(),
      show: isQueued && !isInstalling
    },
    {
      // stop if running
      label: t('label.playing.stop'),
      onClick: async () => mainAction(runner),
      show: isPlaying
    },
    {
      // launch game
      label: t('label.playing.start'),
      onClick: async () => mainAction(runner),
      show: isInstalled && !isPlaying && !isUpdating && !isQueued
    },
    {
      // update
      label: t('button.update', 'Update'),
      onClick: async () => handleUpdate(),
      show: hasUpdate && !isUpdating && !isQueued
    },
    {
      // install
      label: t('button.install'),
      onClick: () => buttonClick(),
      show: !isInstalled && !isQueued
    },
    {
      // cancel installation/update
      label: t('button.cancel'),
      onClick: async () => mainAction(runner),
      show: isInstalling || isUpdating
    },
    {
      // open the game page
      label: t('button.details', 'Details'),
      onClick: () =>
        navigate(`/gamepage/${runner}/${appName}`, { state: { gameInfo } }),
      show: true
    },
    {
      // hide
      label: t('button.hide_game', 'Hide Game'),
      onClick: () => hiddenGames.add(appName, title),
      show: !isHiddenGame
    },
    {
      // unhide
      label: t('button.unhide_game', 'Unhide Game'),
      onClick: () => hiddenGames.remove(appName),
      show: isHiddenGame
    },
    {
      label: t('button.add_to_favourites', 'Add To Favourites'),
      onClick: () => favouriteGames.add(appName, title),
      show: !favorited
    },
    {
      label: t('button.remove_from_favourites', 'Remove From Favourites'),
      onClick: () => favouriteGames.remove(appName),
      show: favorited
    },
    {
      label: t('button.remove_from_recent', 'Remove From Recent'),
      onClick: async () => window.api.removeRecentGame(appName),
      show: isRecent
    },
    {
      // settings
      label: t('submenu.settings'),
      onClick: () => setIsSettingsModalOpen(true, 'settings', gameInfo),
      show: isInstalled && !isUninstalling && !isBrowserGame
    },
    {
      // uninstall
      label: t('button.uninstall'),
      onClick: onUninstallClick,
      show: isInstalled && !isUpdating
    }
  ]

  const instClass = isInstalled ? 'installed' : ''
  const hiddenClass = isHiddenGame ? 'hidden' : ''
  const notAvailableClass = notAvailable ? 'notAvailable' : ''
  const imgClasses = `gameImg ${isInstalled ? 'installed' : ''} ${
    allTilesInColor ? 'allTilesInColor' : ''
  }`
  const logoClasses = `gameLogo ${isInstalled ? 'installed' : ''} ${
    allTilesInColor && 'allTilesInColor'
  }`

  const wrapperClasses = `${
    grid ? 'gameCard' : 'gameListItem'
  }  ${instClass} ${hiddenClass} ${notAvailableClass}`

  const { activeController } = useContext(ContextProvider)

  const showUpdateButton =
    hasUpdate && !isUpdating && !isQueued && !notAvailable

  console.log('title ', gameInfo.title, ' state ', getState())

  return (
    <>
      {showStopInstallModal ? (
        <StopInstallationModal
          onClose={() => setShowStopInstallModal(false)}
          progress={progress}
          installPath={folder || 'default'}
          appName={appName}
          runner={runner}
          folderName={gameInfo.folder_name ? gameInfo.folder_name : ''}
        />
      ) : null}
      {showUninstallModal && (
        <UninstallModal
          appName={appName}
          runner={runner}
          onClose={() => setShowUninstallModal(false)}
        />
      )}
      <HpGameCard
        key={appName}
        title={gameInfo.title}
        imageUrl={gameInfo.art_square}
        favorited={favorited}
        onFavoriteClick={() => {
          if (!favorited) favouriteGames.add(gameInfo.app_name, gameInfo.title)
          else favouriteGames.remove(gameInfo.app_name)
        }}
        onDownloadClick={buttonClick}
        onRemoveFromQueueClick={() => handleRemoveFromQueue()}
        onStopPlayingClick={async () => handlePlay(runner)}
        onPauseClick={() => console.log('pause clicked')}
        onPlayClick={async () => handlePlay(runner)}
        onStopDownloadClick={async () => handlePlay(runner)}
        state={getState()}
        settingsItems={items.filter((val) => val.show).slice(0, 6)}
        showSettings={showSettings}
        onSettingsClick={() => setShowSettings(!showSettings)}
        onContextMenu={(e) => {
          e.preventDefault()
          setShowSettings(!showSettings)
        }}
        onUpdateClick={async () => handleUpdate()}
      />
    </>
  )

  async function mainAction(runner: Runner) {
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
      return sendKill(appName, runner)
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
