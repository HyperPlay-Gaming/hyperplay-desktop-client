import {
  faDownload,
  faHardDrive,
  faSpinner,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogContent } from '@mui/material'

import classNames from 'classnames'
import {
  AvailablePlatforms,
  GameInfo,
  GameStatus,
  HyperPlayInstallInfo,
  InstallPlatform,
  Runner,
  WineInstallation
} from 'common/types'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import {
  SelectField,
  TextInputWithIconField,
  ToggleSwitch
} from 'frontend/components/UI'
import Anticheat from 'frontend/components/UI/Anticheat'
import { DialogHeader, DialogFooter } from 'frontend/components/UI/Dialog'
import {
  getProgress,
  size,
  getInstallInfo,
  writeConfig,
  install
} from 'frontend/helpers'
import ContextProvider from 'frontend/state/ContextProvider'
import { InstallProgress } from 'frontend/types'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { SDL_GAMES, SelectiveDownload } from '../selective_dl'
import { configStore } from 'frontend/helpers/electronStores'
import { Button } from '@hyperplay/ui'
import DLCDownloadListing from './DLCDownloadListing'

interface Props {
  backdropClick: () => void
  appName: string
  runner: Runner
  platformToInstall: InstallPlatform
  availablePlatforms: AvailablePlatforms
  winePrefix: string
  crossoverBottle: string
  wineVersion: WineInstallation | undefined
  children: React.ReactNode
  gameInfo: GameInfo
  channelNameToInstall: string
  accessCode: string
  showCTAButton: boolean
}

type DiskSpaceInfo = {
  notEnoughDiskSpace: boolean
  message: string | `ERROR`
  validPath: boolean
  spaceLeftAfter: string
}

const storage: Storage = window.localStorage

function getInstallLanguage(
  availableLanguages: string[],
  preferredLanguages: readonly string[]
) {
  const foundPreffered = preferredLanguages.find((plang) =>
    availableLanguages.some((alang) => alang.startsWith(plang))
  )
  if (foundPreffered) {
    const foundAvailable = availableLanguages.find((alang) =>
      alang.startsWith(foundPreffered)
    )
    if (foundAvailable) {
      return foundAvailable
    }
  }
  return availableLanguages[0]
}

function getUniqueKey(sdl: SelectiveDownload) {
  return sdl.tags.join(',')
}

const userHome = configStore.get('userHome', '')

function getDefaultInstallPath() {
  const { defaultInstallPath = `${userHome}/Games/HyperPlay` } = {
    ...configStore.get_nodefault('settings')
  }
  return defaultInstallPath
}

export default function DownloadDialog({
  backdropClick,
  appName,
  runner,
  platformToInstall,
  availablePlatforms,
  winePrefix,
  wineVersion,
  children,
  gameInfo,
  crossoverBottle,
  channelNameToInstall,
  accessCode,
  showCTAButton
}: Props) {
  const previousProgress = JSON.parse(
    storage.getItem(appName) || '{}'
  ) as InstallProgress
  const { libraryStatus, platform, showDialogModal } =
    useContext(ContextProvider)

  const isWin = platform === 'win32'

  const [gameInstallInfo, setGameInstallInfo] = useState<
    LegendaryInstallInfo | GogInstallInfo | HyperPlayInstallInfo | null
  >(null)
  const [installLanguages, setInstallLanguages] = useState(Array<string>())
  const [installLanguage, setInstallLanguage] = useState('')
  const [installPath, setInstallPath] = useState(
    previousProgress.folder || getDefaultInstallPath()
  )
  const gameStatus: GameStatus = libraryStatus.filter(
    (game: GameStatus) => game.appName === appName
  )[0]

  const [dlcsToInstall, setDlcsToInstall] = useState<string[]>([])
  const [installAllDlcs, setInstallAllDlcs] = useState(false)
  const [selectedSdls, setSelectedSdls] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [gettingInstallInfo, setGettingInstallInfo] = useState(false)

  const installFolder = gameStatus?.folder || installPath

  const [spaceLeft, setSpaceLeft] = useState<DiskSpaceInfo>({
    message: '',
    notEnoughDiskSpace: false,
    validPath: true,
    spaceLeftAfter: ''
  })

  const { i18n, t } = useTranslation('gamepage')
  const { t: tr } = useTranslation()

  const sdls: SelectiveDownload[] | undefined = SDL_GAMES[appName]
  const haveSDL = Array.isArray(sdls) && sdls.length !== 0

  const sdlList = useMemo(() => {
    const list = []
    if (sdls) {
      for (const sdl of sdls) {
        if (sdl.mandatory || selectedSdls[getUniqueKey(sdl)]) {
          if (Array.isArray(sdl.tags)) {
            list.push(...sdl.tags)
          }
        }
      }
    }
    return list
  }, [selectedSdls, sdls])

  const handleSdl = useCallback(
    (sdl: SelectiveDownload, value: boolean) => {
      setSelectedSdls({
        ...selectedSdls,
        [getUniqueKey(sdl)]: value
      })
    },
    [selectedSdls]
  )

  function handleDlcs() {
    setInstallAllDlcs(!installAllDlcs)
  }

  async function handleInstall(path?: string) {
    backdropClick()

    // Write Default game config with prefix on linux
    if (!isWin) {
      const gameSettings = await window.api.requestGameSettings(appName)

      if (wineVersion) {
        writeConfig({
          appName,
          config: {
            ...gameSettings,
            winePrefix,
            wineVersion,
            wineCrossoverBottle: crossoverBottle
          }
        })
      }
    }

    return install({
      gameInfo,
      installPath: path || installFolder,
      isInstalling: false,
      previousProgress,
      progress: previousProgress,
      t,
      sdlList,
      installDlcs: runner === 'gog' ? installAllDlcs : dlcsToInstall,
      installLanguage,
      platformToInstall,
      showDialogModal: () => backdropClick(),
      channelName: channelNameToInstall,
      accessCode
    })
  }

  useEffect(() => {
    const getIinstInfo = async () => {
      try {
        setGettingInstallInfo(true)
        console.log(
          'getting game install info for channel name = ',
          channelNameToInstall
        )
        const gameInstallInfo = await getInstallInfo(
          appName,
          runner,
          platformToInstall,
          channelNameToInstall
        )
        setGameInstallInfo(gameInstallInfo)
        setGettingInstallInfo(false)

        if (
          gameInstallInfo &&
          gameInstallInfo.manifest &&
          'languages' in gameInstallInfo.manifest
        ) {
          setInstallLanguages(gameInstallInfo.manifest.languages)
          setInstallLanguage(
            getInstallLanguage(
              gameInstallInfo.manifest.languages,
              i18n.languages
            )
          )
        }

        if (platformToInstall === 'linux' && runner === 'gog') {
          setGettingInstallInfo(true)
          const installer_languages =
            await window.api.getGOGLinuxInstallersLangs(appName)
          setInstallLanguages(installer_languages)
          setInstallLanguage(
            getInstallLanguage(installer_languages, i18n.languages)
          )
          setGettingInstallInfo(false)
        }
      } catch (error) {
        showDialogModal({
          type: 'ERROR',
          title: tr('box.error.generic.title', 'Error!'),
          message: `${tr('box.error.generic.message', 'Something Went Wrong!')}
          ${error}`
        })
        backdropClick()
        return
      }
    }
    getIinstInfo()
  }, [appName, i18n.languages, platformToInstall])

  useEffect(() => {
    const getSpace = async () => {
      const { message, free, validPath } = await window.api.checkDiskSpace(
        installPath
      )
      if (gameInstallInfo?.manifest?.disk_size) {
        let notEnoughDiskSpace = free < gameInstallInfo.manifest.disk_size
        let spaceLeftAfter = size(
          free - Number(gameInstallInfo.manifest.disk_size)
        )
        if (previousProgress.folder === installPath) {
          const progress = 100 - getProgress(previousProgress)
          notEnoughDiskSpace =
            free < (progress / 100) * Number(gameInstallInfo.manifest.disk_size)

          spaceLeftAfter = size(
            free - (progress / 100) * Number(gameInstallInfo.manifest.disk_size)
          )
        }

        setSpaceLeft({
          message,
          notEnoughDiskSpace,
          validPath,
          spaceLeftAfter
        })
      }
    }
    getSpace()
  }, [installPath, gameInstallInfo?.manifest?.disk_size])

  const haveDLCs: boolean =
    gameInstallInfo?.game?.owned_dlc !== undefined &&
    gameInstallInfo.game.owned_dlc.length > 0

  const DLCList = gameInstallInfo?.game?.owned_dlc
  const gameDownloadSize = gameInstallInfo?.manifest?.download_size
  const downloadSize = () => {
    if (gameDownloadSize !== undefined && gameInstallInfo !== null) {
      if (previousProgress.folder === installPath) {
        const progress = 100 - getProgress(previousProgress)
        return size(
          (progress / 100) * Number(gameInstallInfo.manifest.disk_size)
        )
      }

      return size(Number(gameDownloadSize))
    }
    return ''
  }

  const installSize =
    gameInstallInfo?.manifest?.disk_size !== undefined &&
    size(Number(gameInstallInfo?.manifest?.disk_size))

  const getLanguageName = useMemo(() => {
    return (language: string) => {
      try {
        const locale = language.replace('_', '-')
        const displayNames = new Intl.DisplayNames(
          [locale, ...i18n.languages, 'en'],
          {
            type: 'language',
            style: 'long'
          }
        )
        return displayNames.of(locale)
      } catch (e) {
        return language
      }
    }
  }, [i18n.languages, platformToInstall])

  const { validPath, notEnoughDiskSpace, message, spaceLeftAfter } = spaceLeft
  const title = gameInfo?.title

  function getInstallLabel() {
    if (installPath) {
      if (notEnoughDiskSpace) {
        return t('button.force-innstall', 'Force Install')
      } else {
        return previousProgress.folder === installPath
          ? t('button.continue', 'Continue Download')
          : t('button.install')
      }
    }
    return t('button.no-path-selected', 'No path selected')
  }

  const isWebGame = gameInstallInfo?.game['name'] === 'web'
  const nativeGameIsReadyToInstall =
    installPath && gameDownloadSize && !gettingInstallInfo

  const readyToInstall = isWebGame || nativeGameIsReadyToInstall

  const showRemainingProgress =
    (runner === 'hyperplay' && previousProgress.percent) ||
    previousProgress.folder === installPath
  const showDlcSelector =
    runner === 'legendary' && DLCList && DLCList?.length > 0

  const doneFetchingGameInfo = isWebGame || downloadSize()

  const showInstallandDownloadSizes = !isWebGame

  return (
    <>
      <DialogHeader onClose={backdropClick}>
        {title ? title : '...'}
        {availablePlatforms.map((p) => (
          <FontAwesomeIcon
            className="InstallModal__platformIcon"
            icon={p.icon}
            key={p.value}
          />
        ))}
      </DialogHeader>
      {gameInfo && <Anticheat gameInfo={gameInfo} />}
      <DialogContent>
        {showInstallandDownloadSizes ? (
          <div className="InstallModal__sizes">
            <div className="InstallModal__size">
              <FontAwesomeIcon
                className={classNames('InstallModal__sizeIcon', {
                  'fa-spin-pulse': !doneFetchingGameInfo
                })}
                icon={doneFetchingGameInfo ? faDownload : faSpinner}
              />
              {doneFetchingGameInfo ? (
                <>
                  <div className="InstallModal__sizeLabel">
                    {t('game.downloadSize', 'Download Size')}:
                  </div>
                  <div className="InstallModal__sizeValue">
                    {downloadSize()}
                  </div>
                </>
              ) : (
                `${t('game.getting-download-size', 'Getting download size')}...`
              )}
            </div>
            <div className="InstallModal__size">
              <FontAwesomeIcon
                className={classNames('InstallModal__sizeIcon', {
                  'fa-spin-pulse': !doneFetchingGameInfo
                })}
                icon={doneFetchingGameInfo ? faHardDrive : faSpinner}
              />
              {doneFetchingGameInfo ? (
                <>
                  <div className="InstallModal__sizeLabel">
                    {t('game.installSize', 'Install Size')}:
                  </div>
                  <div className="InstallModal__sizeValue">{installSize}</div>
                </>
              ) : (
                `${t('game.getting-install-size', 'Getting install size')}...`
              )}
            </div>
            {showRemainingProgress && (
              <div className="InstallModal__size">
                <FontAwesomeIcon
                  className="InstallModal__sizeIcon"
                  icon={faSpinner}
                />
                <div className="InstallModal__sizeLabel">
                  {t('status.totalDownloaded', 'Total Downloaded')}:
                </div>
                <div className="InstallModal__sizeValue">
                  {getProgress(previousProgress).toFixed(2)}%
                </div>
              </div>
            )}
          </div>
        ) : null}
        {installLanguages && installLanguages?.length > 1 && (
          <SelectField
            label={`${t('game.language', 'Language')}:`}
            htmlId="languagePick"
            value={installLanguage}
            onChange={(e) => setInstallLanguage(e.target.value)}
          >
            {installLanguages &&
              installLanguages.map((value) => (
                <option value={value} key={value}>
                  {getLanguageName(value)}
                </option>
              ))}
          </SelectField>
        )}

        <TextInputWithIconField
          htmlId="setinstallpath"
          label={t('install.path', 'Select Install Path')}
          placeholder={getDefaultInstallPath()}
          value={installPath.replaceAll("'", '')}
          onChange={(event) => setInstallPath(event.target.value)}
          icon={<FontAwesomeIcon icon={faFolderOpen} />}
          onIconClick={async () =>
            window.api
              .openDialog({
                buttonLabel: t('box.choose'),
                properties: ['openDirectory'],
                title: t('install.path'),
                defaultPath: getDefaultInstallPath()
              })
              .then((path) => setInstallPath(path || getDefaultInstallPath()))
          }
          afterInput={
            gameDownloadSize ? (
              <span className="smallInputInfo">
                {validPath && (
                  <>
                    <span>
                      {`${t('install.disk-space-left', 'Space Available')}: `}
                    </span>
                    <span>
                      <strong>{`${message}`}</strong>
                    </span>
                    {!notEnoughDiskSpace && (
                      <>
                        <span>
                          {` - ${t(
                            'install.space-after-install',
                            'After Install'
                          )}: `}
                        </span>
                        <span>
                          <strong>{`${spaceLeftAfter}`}</strong>
                        </span>
                      </>
                    )}
                  </>
                )}
                {!validPath && (
                  <span className="warning">
                    {`${t(
                      'install.path-not-writtable',
                      'Warning: path might not be writable.'
                    )}`}
                  </span>
                )}
                {validPath && notEnoughDiskSpace && (
                  <span className="warning">
                    {` (${t(
                      'install.not-enough-disk-space',
                      'Not enough disk space'
                    )})`}
                  </span>
                )}
              </span>
            ) : null
          }
        />
        {children}
        {haveSDL ? (
          <div className="InstallModal__sdls">
            {sdls.map((sdl: SelectiveDownload, idx: number) => (
              <label
                key={sdl.name}
                className="InstallModal__toggle toggleWrapper"
              >
                <ToggleSwitch
                  htmlId={`sdls-${idx}`}
                  title={sdl.name}
                  value={!!sdl.mandatory || !!selectedSdls[getUniqueKey(sdl)]}
                  disabled={sdl.mandatory}
                  handleChange={(e) => handleSdl(sdl, e.target.checked)}
                />
                <span>{sdl.name}</span>
              </label>
            ))}
          </div>
        ) : null}
        {showDlcSelector && (
          <DLCDownloadListing
            DLCList={DLCList}
            dlcsToInstall={dlcsToInstall}
            setDlcsToInstall={setDlcsToInstall}
          />
        )}
        {haveDLCs && runner === 'gog' && (
          <div className="InstallModal__dlcs">
            <label className={classNames('InstallModal__toggle toggleWrapper')}>
              <ToggleSwitch
                htmlId="dlcs"
                value={installAllDlcs}
                handleChange={() => handleDlcs()}
                title={t('dlc.installDlcs', 'Install all DLCs')}
              />
            </label>
            <div className="InstallModal__dlcsList">
              {DLCList?.map(({ title }) => title).join(', ')}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogFooter>
        <Button
          type="tertiary"
          size="medium"
          onClick={async () => handleInstall('import')}
        >
          {t('button.import')}
        </Button>
        {showCTAButton && (
          <Button
            type="secondary"
            size="medium"
            onClick={async () => handleInstall()}
            disabled={!readyToInstall}
          >
            {!readyToInstall && (
              <FontAwesomeIcon className="fa-spin-pulse" icon={faSpinner} />
            )}
            {readyToInstall && getInstallLabel()}
          </Button>
        )}
      </DialogFooter>
    </>
  )
}
