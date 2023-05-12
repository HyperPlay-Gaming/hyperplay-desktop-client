import './index.scss'

import React, { useContext, useEffect, useState } from 'react'

import {
  BackArrowOutlinedCircled,
  CyberDividerVertical,
  SettingsIcon
} from 'frontend/assets/hyperplay/index'

import {
  getGameInfo,
  getInstallInfo,
  getProgress,
  launch,
  sendKill,
  size,
  updateGame
} from 'frontend/helpers'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { UpdateComponent, SelectField } from 'frontend/components/UI'

import {
  AppPlatforms,
  ExtraInfo,
  GameInfo,
  HyperPlayInstallInfo,
  Runner,
  WineInstallation
} from 'common/types'
import { LegendaryInstallInfo } from 'common/types/legendary'
import { GogInstallInfo } from 'common/types/gog'

import GamePicture from '../GamePicture'
import TimeContainer from '../TimeContainer'

import GameRequirements from '../GameRequirements'
import { GameSubMenu } from '..'
import { InstallModal } from 'frontend/screens/Library/components'
import { install } from 'frontend/helpers/library'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTriangleExclamation,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { hasProgress } from 'frontend/hooks/hasProgress'
import ErrorComponent from 'frontend/components/UI/ErrorComponent'
import Anticheat from 'frontend/components/UI/Anticheat'
import {
  Dialog,
  DialogContent,
  DialogHeader
} from 'frontend/components/UI/Dialog'

import StoreLogos from 'frontend/components/UI/StoreLogos'
import { WikiGameInfo } from 'frontend/components/UI/WikiGameInfo'
import { hasStatus } from 'frontend/hooks/hasStatus'

export default React.memo(function GamePage(): JSX.Element | null {
  const { appName, runner } = useParams() as { appName: string; runner: Runner }
  const location = useLocation() as {
    state: { fromDM: boolean; gameInfo: GameInfo }
  }
  const { t } = useTranslation('gamepage')
  const { t: t2 } = useTranslation()

  const { gameInfo: locationGameInfo } = location.state

  const [showModal, setShowModal] = useState({ game: '', show: false })

  const {
    epic,
    gog,
    gameUpdates,
    platform,
    showDialogModal,
    setIsSettingsModalOpen,
    isSettingsModalOpen
  } = useContext(ContextProvider)

  const [gameInfo, setGameInfo] = useState(locationGameInfo)

  const { status, folder } = hasStatus(appName, gameInfo)
  const gameAvailable = gameInfo.is_installed && status !== 'notAvailable'

  const [progress, previousProgress] = hasProgress(appName)

  const [extraInfo, setExtraInfo] = useState<ExtraInfo | null>(null)
  const [autoSyncSaves, setAutoSyncSaves] = useState(false)
  const [gameInstallInfo, setGameInstallInfo] = useState<
    LegendaryInstallInfo | GogInstallInfo | HyperPlayInstallInfo | null
  >(null)
  const [launchArguments, setLaunchArguments] = useState('')
  const [hasError, setHasError] = useState<{
    error: boolean
    message: string | unknown
  }>({ error: false, message: '' })
  const [winePrefix, setWinePrefix] = useState('')
  const [wineVersion, setWineVersion] = useState<WineInstallation>()
  const [showRequirements, setShowRequirements] = useState(false)
  const [showExtraInfo, setShowExtraInfo] = useState(false)

  const isWin = platform === 'win32'
  const isLinux = platform === 'linux'
  const isMac = platform === 'darwin'
  const isSideloaded = runner === 'sideload'

  const isInstalling = status === 'installing'
  const isPlaying = status === 'playing'
  const isUpdating = status === 'updating'
  const isQueued = status === 'queued'
  const isReparing = status === 'repairing'
  const isMoving = status === 'moving'
  const isUninstalling = status === 'uninstalling'
  const isSyncing = status === 'syncing-saves'
  const isPaused = status === 'paused'
  const notAvailable = !gameAvailable && gameInfo.is_installed
  const notSupportedGame =
    gameInfo.runner !== 'sideload' && gameInfo.thirdPartyManagedApp === 'Origin'

  const backRoute = location.state?.fromDM ? '/download-manager' : '/library'

  const storage: Storage = window.localStorage

  // Track the screen view once each time the appName, gameInfo or runner changes
  useEffect(() => {
    window.api.trackScreen('Game Page', {
      appName,
      runner,
      game_title: gameInfo?.title
    })
  }, [appName, runner, gameInfo])

  useEffect(() => {
    const updateGameInfo = async () => {
      const newInfo = await getGameInfo(appName, runner)
      if (newInfo) {
        setGameInfo(newInfo)
      }
      setExtraInfo(await window.api.getExtraInfo(appName, runner))
    }
    updateGameInfo()
  }, [status, gog.library, epic.library, isMoving])

  useEffect(() => {
    const updateConfig = async () => {
      if (gameInfo) {
        const {
          install,
          is_linux_native = undefined,
          is_mac_native = undefined,
          releaseMeta = undefined
        } = { ...gameInfo }

        const hpPlatforms = releaseMeta
          ? (Object.keys(releaseMeta.platforms)[0] as AppPlatforms)
          : 'Windows'

        const othersPlatforms =
          install.platform ||
          (is_linux_native && isLinux
            ? 'linux'
            : is_mac_native && isMac
            ? 'Mac'
            : 'Windows')

        const installPlatform =
          runner === 'hyperplay' ? hpPlatforms : othersPlatforms

        if (runner !== 'sideload' && !notSupportedGame) {
          getInstallInfo(appName, runner, installPlatform)
            .then((info) => {
              if (!info) {
                throw 'Cannot get game info'
              }
              setGameInstallInfo(info)
            })
            .catch((error) => {
              console.error(error)
              window.api.logError(`${`${error}`}`)
              setHasError({ error: true, message: `${error}` })
            })
        }

        try {
          const {
            autoSyncSaves,
            wineVersion,
            winePrefix,
            wineCrossoverBottle
          } = await window.api.requestGameSettings(appName)

          if (!isWin) {
            let wine = wineVersion.name
              .replace('Wine - ', '')
              .replace('Proton - ', '')
            if (wine.includes('Default')) {
              wine = wine.split('-')[0]
            }
            setWineVersion({ ...wineVersion, name: wine })
            setWinePrefix(
              wineVersion.type === 'crossover'
                ? wineCrossoverBottle
                : winePrefix
            )
          }

          if ('cloud_save_enabled' in gameInfo && gameInfo.cloud_save_enabled) {
            setAutoSyncSaves(autoSyncSaves)
            return
          }
        } catch (error) {
          setHasError({ error: true, message: error })
          window.api.logError(`${error}`)
        }
      }
    }
    updateConfig()
  }, [status, epic.library, gog.library, gameInfo, isSettingsModalOpen])

  function handleUpdate() {
    if (gameInfo.runner !== 'sideload')
      updateGame({ appName, runner, gameInfo })
  }

  function handleModal() {
    setShowModal({ game: appName, show: true })
  }

  let hasUpdate = false
  let hasRequirements = false

  if (gameInfo && gameInfo.install) {
    const {
      runner,
      title,
      art_square,
      install: { platform: installPlatform },
      is_installed,
      canRunOffline,
      folder_name
    } = gameInfo

    // TODO: Do this in a *somewhat* prettier way
    let install_path: string | undefined
    let install_size: string | undefined
    let version: string | undefined
    let developer: string | undefined
    let cloud_save_enabled = false

    if (gameInfo.runner !== 'sideload') {
      install_path = gameInfo.install.install_path
      install_size = gameInfo.install.install_size
      version = gameInfo.install.version
      developer = gameInfo.developer
      cloud_save_enabled =
        gameInfo.cloud_save_enabled !== undefined
          ? gameInfo.cloud_save_enabled
          : false
    }

    hasRequirements = extraInfo?.reqs ? extraInfo.reqs.length > 0 : false
    hasUpdate = is_installed && gameUpdates?.includes(appName)
    const appLocation = gameInfo.browserUrl
      ? false
      : install_path || folder_name

    const downloadSize =
      gameInstallInfo?.manifest?.download_size &&
      size(Number(gameInstallInfo?.manifest?.download_size))
    const installSize =
      gameInstallInfo?.manifest?.disk_size &&
      size(Number(gameInstallInfo?.manifest?.disk_size))
    const launchOptions = gameInstallInfo?.game?.launch_options || []

    const isMac = ['osx', 'Mac', 'darwin_amd64', 'darwin_arm64']
    const isLinux = ['linux', 'linux_amd64', 'linux_arm64']
    const isMacNative = isMac.includes(installPlatform ?? '')
    const isLinuxNative = isLinux.includes(installPlatform ?? '')
    const isBrowserGame = gameInfo.browserUrl
    const isNative = isWin || isMacNative || isLinuxNative || isBrowserGame

    const showCloudSaveInfo = cloud_save_enabled && !isLinuxNative
    const supportsWeb3 = gameInfo.web3?.supported

    /*
    Other Keys:
    t('box.stopInstall.title')
    t('box.stopInstall.message')
    t('box.stopInstall.keepInstalling')
    */

    if (hasError.error) {
      if (
        hasError.message !== undefined &&
        typeof hasError.message === 'string'
      )
        window.api.logError(hasError.message)
      const message =
        typeof hasError.message === 'string'
          ? hasError.message
          : t('generic.error', 'Unknown error')
      return <ErrorComponent message={message} />
    }

    const description =
      extraInfo?.about?.shortDescription ||
      extraInfo?.about?.description ||
      gameInfo.extra?.about?.shortDescription ||
      gameInfo.extra?.about?.description ||
      t('generic.noDescription', 'No description available')

    return (
      <div className="gameConfigContainer">
        {gameInfo.runner !== 'sideload' && showModal.show && (
          <InstallModal
            appName={showModal.game}
            runner={runner}
            backdropClick={() => setShowModal({ game: '', show: false })}
            gameInfo={gameInfo}
          />
        )}
        {title ? (
          <>
            <GamePicture art_square={art_square} store={runner} />
            <CyberDividerVertical
              className="cyberDivider"
              preserveAspectRatio="none"
            />
            <NavLink
              className="backButton"
              to={backRoute}
              title={t2('webview.controls.back', 'Go Back')}
            >
              <BackArrowOutlinedCircled />
            </NavLink>
            <div className="store-icon">
              <StoreLogos runner={runner} />
            </div>
            <div className="gameInfo">
              <div className="titleWrapper">
                <h2 className="title">{title}</h2>
                {is_installed && !isBrowserGame && (
                  <a
                    role={'button'}
                    onClick={() =>
                      setIsSettingsModalOpen(true, 'settings', gameInfo)
                    }
                    className={`settings-icon`}
                  >
                    <SettingsIcon />
                  </a>
                )}
                <div className="game-actions">
                  <button className="toggle">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>

                  <GameSubMenu
                    appName={appName}
                    isInstalled={is_installed}
                    title={title}
                    storeUrl={
                      extraInfo?.storeUrl ||
                      ('store_url' in gameInfo &&
                      gameInfo.store_url !== undefined
                        ? gameInfo.store_url
                        : '')
                    }
                    runner={gameInfo.runner}
                    handleUpdate={handleUpdate}
                    disableUpdate={isInstalling || isUpdating}
                    setShowExtraInfo={setShowExtraInfo}
                    onShowRequirements={
                      hasRequirements
                        ? () => setShowRequirements(true)
                        : undefined
                    }
                  />
                </div>
              </div>
              <div className="infoWrapper">
                <h6 className="developer">{developer}</h6>
                <div className="summary">{description}</div>
                <div className="grid-container">
                  {!is_installed && !isSideloaded && (
                    <>
                      <div className="hp-subtitle">
                        {t('game.downloadSize', 'Download Size')}
                      </div>
                      <div className="col2-item italic">
                        {downloadSize ?? '...'}
                      </div>
                      <div className="hp-subtitle">
                        {t('game.installSize', 'Install Size')}
                      </div>
                      <div className="col2-item italic">
                        {installSize ?? '...'}
                      </div>
                    </>
                  )}
                  <div className="hp-subtitle">
                    {t('info.web3-supported', 'Has Web3 features')}
                  </div>
                  <div className="col2-item italic">
                    {supportsWeb3 ? t('box.yes') : t('box.no')}
                  </div>
                  {is_installed && !isBrowserGame && (
                    <>
                      {showCloudSaveInfo ? (
                        <>
                          <div className="hp-subtitle">
                            {t('info.syncsaves')}
                          </div>
                          <div
                            style={{
                              color: autoSyncSaves ? '#07C5EF' : ''
                            }}
                            className="col2-item italic"
                          >
                            {autoSyncSaves ? t('enabled') : t('disabled')}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="hp-subtitle">
                            {t('info.syncsaves')}:
                          </div>
                          <div
                            style={{
                              color: '#F45460'
                            }}
                            className="col2-item italic"
                          >
                            {t('cloud_save_unsupported', 'Unsupported')}
                          </div>
                        </>
                      )}
                      {!isSideloaded && (
                        <>
                          <div className="hp-subtitle">{t('info.size')}</div>
                          <div className="col2-item italic">{install_size}</div>
                        </>
                      )}
                      <div className="hp-subtitle">
                        {t('info.installedPlatform', 'Installed Platform')}:
                      </div>
                      <div
                        style={{ textTransform: 'capitalize' }}
                        className="col2-item"
                      >
                        {installPlatform === 'osx' ? 'MacOS' : installPlatform}
                      </div>
                      {!isSideloaded && (
                        <>
                          <div className="hp-subtitle">{t('info.version')}</div>
                          <div className="col2-item italic">{version}</div>
                        </>
                      )}
                      <div className="hp-subtitle">
                        {t('info.canRunOffline', 'Online Required')}:
                      </div>
                      <div className="col2-item italic">
                        {t(canRunOffline ? 'box.no' : 'box.yes')}
                      </div>
                      <div className="hp-subtitle">
                        {t('info.path', 'Install Path')}
                      </div>
                      {is_installed && appLocation && (
                        <div className="col2-item italic">
                          <div
                            className="col2-item italic"
                            onClick={() => window.api.openFolder(appLocation)}
                          >
                            {appLocation}
                          </div>
                        </div>
                      )}
                      {!isWin && !isNative && !isBrowserGame && (
                        <>
                          <div className="hp-subtitle">Wine</div>
                          <div className="col2-item italic">
                            {wineVersion?.name}
                          </div>
                          <div className="hp-subtitle">Prefix:</div>
                          <div
                            className="col2-item italic"
                            onClick={() => window.api.openFolder(winePrefix)}
                          >
                            {winePrefix}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <TimeContainer game={appName} />
                </div>
              </div>
              <div className="gameStatus">
                {isInstalling ||
                  (isUpdating && (
                    <progress
                      className="installProgress"
                      max={100}
                      value={getProgress(progress)}
                    />
                  ))}
                <p
                  style={{
                    color:
                      is_installed || isInstalling
                        ? 'var(--success)'
                        : 'var(--danger)',
                    fontStyle: 'italic',
                    marginBottom: '0.5rem'
                  }}
                >
                  {getInstallLabel(is_installed, notAvailable, isPaused)}
                </p>
              </div>
              {is_installed && Boolean(launchOptions.length) && (
                <SelectField
                  htmlId="launch_options"
                  onChange={(event) => setLaunchArguments(event.target.value)}
                  value={launchArguments}
                  prompt={t('launch.options', 'Launch Options...')}
                >
                  {launchOptions.map(({ name, parameters }) => (
                    <option key={parameters} value={parameters}>
                      {name}
                    </option>
                  ))}
                </SelectField>
              )}
              <Anticheat gameInfo={gameInfo} />
              <div className="buttonsWrapper">
                {is_installed && !isQueued && (
                  <button
                    disabled={
                      isReparing || isMoving || isUpdating || isUninstalling
                    }
                    autoFocus={true}
                    onClick={handlePlay()}
                    className={`button ${getPlayBtnClass()}`}
                  >
                    {getPlayLabel()}
                  </button>
                )}
                {(!is_installed || isQueued) && (
                  <button
                    onClick={async () => mainAction(is_installed)}
                    disabled={
                      isPlaying ||
                      isUpdating ||
                      isReparing ||
                      isMoving ||
                      isUninstalling ||
                      notSupportedGame
                    }
                    autoFocus={true}
                    className={`button ${getButtonClass(is_installed)}`}
                  >
                    {`${getButtonLabel(is_installed)}`}
                  </button>
                )}
              </div>
              {showExtraInfo && (
                <WikiGameInfo
                  setShouldShow={setShowExtraInfo}
                  title={title}
                  id={runner === 'gog' ? appName : undefined}
                />
              )}
              {is_installed && (
                <span
                  onClick={() => setIsSettingsModalOpen(true, 'log', gameInfo)}
                  className="clickable reportProblem"
                  role={'button'}
                >
                  <>
                    {<FontAwesomeIcon icon={faTriangleExclamation} />}
                    {t('report_problem', 'Report a problem running this game')}
                  </>
                </span>
              )}
            </div>

            {hasRequirements && showRequirements && (
              <Dialog
                showCloseButton
                onClose={() => setShowRequirements(false)}
              >
                <DialogHeader onClose={() => setShowRequirements(false)}>
                  <div>{t('game.requirements', 'Requirements')}</div>
                </DialogHeader>
                <DialogContent>
                  <GameRequirements reqs={extraInfo?.reqs} />
                </DialogContent>
              </Dialog>
            )}
            <div id="game-settings"></div>
          </>
        ) : (
          <UpdateComponent />
        )}
      </div>
    )
  }
  return <UpdateComponent />

  function getPlayBtnClass() {
    if (notAvailable) {
      return 'is-tertiary'
    }
    if (isQueued) {
      return 'is-secondary'
    }
    if (isUpdating) {
      return 'is-danger'
    }
    if (isSyncing) {
      return 'is-primary'
    }
    return isPlaying ? 'is-tertiary' : 'is-cta'
  }

  function getPlayLabel(): React.ReactNode {
    if (isSyncing) {
      return t('label.saves.syncing')
    }

    return isPlaying ? t('label.playing.stop') : t('label.playing.start')
  }

  function getInstallLabel(
    is_installed: boolean,
    notAvailable?: boolean,
    isPaused?: boolean
  ): React.ReactNode {
    const { eta, bytes, percent, file } = progress

    if (isPaused && !is_installed) {
      return t('status.paused', 'Paused')
    }

    if (notSupportedGame) {
      return t(
        'status.this-game-uses-third-party',
        'This game uses third party launcher and it is not supported yet'
      )
    }

    if (notAvailable) {
      return t('status.gameNotAvailable', 'Game not available')
    }

    if (isUninstalling) {
      return t('status.uninstalling', 'Uninstalling')
    }

    if (isReparing) {
      return `${t('status.reparing')} ${percent ? `${percent}%` : '...'}`
    }

    if (isMoving) {
      if (file && percent) {
        return `${t(
          'status.moving-files',
          `Moving file '{{file}}': {{percent}} `,
          { file, percent }
        )}  
        `
      }

      return `${t('status.moving', 'Moving Installation, please wait')} ...`
    }

    const currentProgress =
      getProgress(progress) >= 99
        ? ''
        : `${
            percent && bytes
              ? `${percent.toFixed(2)}% [${(Number(bytes) / 1000000).toFixed(
                  0
                )} MB]  ${eta ? `ETA: ${eta}` : ''}`
              : '...'
          }`

    if (isUpdating && is_installed) {
      if (!currentProgress) {
        return `${t('status.processing', 'Processing files, please wait')}...`
      }
      if (eta && eta.includes('verifying')) {
        return `${t('status.reparing')}: ${percent} [${bytes}]`
      }
      return `${t('status.updating')} ${currentProgress}`
    }

    if (!isUpdating && isInstalling) {
      if (!currentProgress) {
        return `${t('status.processing', 'Processing files, please wait')}...`
      }
      return `${t('status.installing')} ${currentProgress}`
    }

    if (isQueued) {
      return `${t('status.queued', 'Queued')}`
    }

    if (hasUpdate) {
      return (
        <span onClick={async () => handleUpdate()} className="updateText">
          {`${t('status.installed')} - ${t(
            'status.hasUpdates',
            'New Version Available!'
          )} (${t('status.clickToUpdate', 'Click to Update')})`}
        </span>
      )
    }

    if (is_installed) {
      return t('status.installed')
    }

    return t('status.notinstalled')
  }

  function getButtonClass(is_installed: boolean) {
    if (isInstalling || isQueued) {
      return 'is-danger'
    }

    if (is_installed) {
      return 'is-primary'
    }

    return 'is-cta'
  }

  function getButtonLabel(is_installed: boolean) {
    if (isPaused) {
      return t('button.queue.continue', 'Continue Download')
    }
    if (notSupportedGame) {
      return t('status.notSupported', 'Not supported')
    }
    if (isQueued) {
      return t('button.queue.remove', 'Remove from Queue')
    }
    if (is_installed) {
      return t('submenu.settings')
    }
    if (isInstalling) {
      return t('button.queue.cancel', 'Cancel Download')
    }
    return t('button.install')
  }

  function handlePlay() {
    // kill game if running
    return async () => {
      if (isPlaying || isUpdating) {
        return sendKill(appName, gameInfo.runner)
      }

      // open game
      await launch({
        appName,
        t,
        launchArguments,
        runner: gameInfo.runner,
        hasUpdate,
        showDialogModal
      })
    }
  }

  async function mainAction(is_installed: boolean) {
    // resume download
    if (isPaused) {
      return window.api.resumeCurrentDownload()
    }

    // remove from queue
    if (isQueued) {
      storage.removeItem(appName)
      return window.api.removeFromDMQueue(appName)
    }

    // open install dialog
    if (!is_installed && !isInstalling) {
      return handleModal()
    }

    // ignore sideloaded games
    if (gameInfo.runner === 'sideload' || gameInfo.is_installed) return

    // cancel download
    return install({
      gameInfo,
      installPath: folder!,
      isInstalling,
      previousProgress,
      progress,
      t,
      showDialogModal: showDialogModal
    })
  }
})
