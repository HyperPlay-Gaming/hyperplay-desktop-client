import './index.scss'
import short from 'short-uuid'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  InstallPlatform,
  WineInstallation,
  Web3Features,
  GameInfo
} from 'common/types'
import {
  CachedImage,
  TextInputField,
  TextInputWithIconField,
  ToggleSwitch
} from 'frontend/components/UI'
import { DialogContent, DialogFooter } from 'frontend/components/UI/Dialog'
import {
  getGameInfo,
  getGameSettings,
  removeSpecialcharacters,
  writeConfig
} from 'frontend/helpers'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AvailablePlatforms } from '..'
import fallbackImage from 'frontend/assets/fallback_card.jpg'
import ContextProvider from 'frontend/state/ContextProvider'
import { ReactComponent as BrowserIcon } from 'frontend/assets/browser-icon.svg'
import classNames from 'classnames'
import Warning from './Warning'
import axios from 'axios'

type Props = {
  availablePlatforms: AvailablePlatforms
  winePrefix: string
  crossoverBottle: string
  wineVersion: WineInstallation | undefined
  setWinePrefix: React.Dispatch<React.SetStateAction<string>>
  children: React.ReactNode
  platformToInstall: InstallPlatform
  backdropClick: () => void
  appName?: string
}

export default function SideloadDialog({
  availablePlatforms,
  backdropClick,
  winePrefix,
  crossoverBottle,
  wineVersion,
  platformToInstall,
  setWinePrefix,
  children,
  appName
}: Props) {
  const { t } = useTranslation('gamepage')
  const [title, setTitle] = useState<string | never>(
    t('sideload.field.title', 'Title')
  )
  const [selectedExe, setSelectedExe] = useState('')
  const [gameUrl, setGameUrl] = useState('')
  const [imageUrl, setImageUrl] = useState(fallbackImage)
  const [searching, setSearching] = useState(false)
  const [app_name, setApp_name] = useState(appName ?? '')
  const [runningSetup, setRunningSetup] = useState(false)
  const [gameInfo, setGameInfo] = useState<Partial<GameInfo>>({})
  const [web3, setWeb3] = useState<Web3Features>({ supported: false })
  const editMode = Boolean(appName)

  const { refreshLibrary, platform } = useContext(ContextProvider)

  function handleTitle(value: string) {
    value = removeSpecialcharacters(value)
    setTitle(value)
  }

  const appPlatform = gameInfo.install?.platform || platformToInstall

  useEffect(() => {
    if (appName) {
      getGameInfo(appName, 'sideload').then((info) => {
        if (!info || info.runner !== 'sideload') {
          return
        }
        setGameInfo(info)
        const {
          art_cover,
          art_square,
          install: { executable, platform },
          title,
          browserUrl
        } = info

        if (executable && platform) {
          setSelectedExe(executable)
        }

        if (browserUrl) {
          setGameUrl(browserUrl)
        }

        setTitle(title)
        setWeb3(info.web3 ?? web3)
        setImageUrl(art_cover ? art_cover : art_square)
      })
    } else {
      setApp_name(short.generate().toString())
    }
  }, [])

  useEffect(() => {
    const setWine = async () => {
      if (editMode && appName) {
        const appSettings = await window.api.getGameSettings(
          appName,
          'sideload'
        )
        if (appSettings?.winePrefix) {
          setWinePrefix(appSettings.winePrefix)
        }
        return
      } else {
        const { defaultWinePrefix } = await window.api.requestAppSettings()
        const sugestedWinePrefix = `${defaultWinePrefix}/${title}`
        setWinePrefix(sugestedWinePrefix)
      }
    }
    setWine()
  }, [title])

  async function searchImage() {
    setSearching(true)

    try {
      const response = await axios.get(
        `https://steamgrid.usebottles.com/api/search/${title}`,
        { timeout: 3500 }
      )

      if (response.status === 200) {
        const steamGridImage = response.data as string

        if (steamGridImage && steamGridImage.startsWith('http')) {
          setImageUrl(steamGridImage)
        }
      } else {
        throw new Error('Fetch failed')
      }
    } catch (error) {
      window.api.logError(`${error}`)
    } finally {
      setSearching(false)
    }
  }

  async function handleInstall(): Promise<void> {
    window.api.addNewApp({
      runner: 'sideload',
      app_name,
      title,
      install: {
        executable: selectedExe,
        platform: gameInfo.install?.platform ?? platformToInstall
      },
      art_cover: imageUrl,
      is_installed: true,
      art_square: imageUrl,
      canRunOffline: true,
      web3,
      browserUrl: gameUrl
    })
    const gameSettings = await getGameSettings(app_name, 'sideload')
    if (!gameSettings) {
      return
    }
    await writeConfig({
      appName: app_name,
      config: {
        ...gameSettings,
        winePrefix,
        wineVersion,
        wineCrossoverBottle: crossoverBottle
      }
    })

    await refreshLibrary({
      runInBackground: true,
      checkForUpdates: true
    })
    return backdropClick()
  }

  const fileFilters = {
    Windows: [
      { name: 'Executables', extensions: ['exe', 'msi'] },
      { name: 'Scripts', extensions: ['bat'] },
      { name: 'All', extensions: ['*'] }
    ],
    linux: [
      { name: 'AppImages', extensions: ['AppImage'] },
      { name: 'Other Binaries', extensions: ['sh', 'py', 'bin'] },
      { name: 'All', extensions: ['*'] }
    ],
    Mac: [
      { name: 'Apps', extensions: ['App'] },
      { name: 'Other Binaries', extensions: ['sh', 'py', 'bin'] },
      { name: 'All', extensions: ['*'] }
    ]
  }

  const handleRunExe = async () => {
    let exeToRun = ''
    const path = await window.api.openDialog({
      buttonLabel: t('box.select.button', 'Select'),
      properties: ['openFile'],
      title: t('box.runexe.title', 'Select EXE to Run'),
      filters: fileFilters[platformToInstall]
    })
    if (path) {
      exeToRun = path
      try {
        setRunningSetup(true)
        const gameSettings = await getGameSettings(app_name, 'sideload')
        if (!gameSettings) {
          return
        }
        await writeConfig({
          appName: app_name,
          config: { ...gameSettings, winePrefix, wineVersion }
        })
        await window.api.runWineCommand({
          commandParts: [exeToRun],
          wait: true,
          protonVerb: 'runinprefix',
          gameSettings: {
            ...gameSettings,
            winePrefix,
            wineVersion: wineVersion || gameSettings.wineVersion
          }
        })
        setRunningSetup(false)
      } catch (error) {
        console.log('finished with error', error)
        setRunningSetup(false)
      }
    }
    return
  }

  function platformIcon() {
    if (appPlatform !== 'Browser') {
      const platformIcon = availablePlatforms.filter(
        (p) => p.name === platformToInstall
      )[0]?.icon

      return (
        <FontAwesomeIcon
          className="InstallModal__platformIcon"
          icon={platformIcon}
        />
      )
    }

    return <BrowserIcon width={14} height={14} />
  }

  function handleGameUrl(url: string) {
    if (!url.startsWith('https://')) {
      return setGameUrl(`https://${url}`)
    }

    setGameUrl(url)
  }

  const showSideloadExe = appPlatform !== 'Browser'

  const shouldShowRunExe =
    platform !== 'win32' &&
    platformToInstall !== 'Mac' &&
    platformToInstall !== 'linux'

  return (
    <>
      <DialogContent>
        <div className="sideloadGrid">
          <div className="imageIcons">
            <CachedImage
              className={classNames('appImage', { blackWhiteImage: searching })}
              src={imageUrl ? imageUrl : fallbackImage}
            />
            <span className="titleIcon">
              {title}
              {platformIcon()}
            </span>
          </div>
          <div className="sideloadForm">
            <Warning />
            <TextInputField
              label={t('sideload.info.title', 'Game/App Title')}
              placeholder={t(
                'sideload.placeholder.title',
                'Add a title to your Game/App'
              )}
              onChange={(e) => handleTitle(e.target.value)}
              onBlur={async () => searchImage()}
              htmlId="sideload-title"
              value={title}
              maxLength={40}
            />
            <TextInputField
              label={t('sideload.info.image', 'App Image')}
              placeholder={t(
                'sideload.placeholder.image',
                'Paste an Image URL here'
              )}
              onChange={(e) => setImageUrl(e.target.value)}
              htmlId="sideload-image"
              value={imageUrl}
            />
            {!editMode && children}
            {showSideloadExe && (
              <TextInputWithIconField
                htmlId="sideload-exe"
                label={t('sideload.info.exe', 'Select Executable')}
                onChange={(e) => setSelectedExe(e.target.value)}
                icon={<FontAwesomeIcon icon={faFolderOpen} />}
                value={selectedExe}
                placeholder={t('sideload.info.exe', 'Select Executable')}
                onIconClick={async () =>
                  window.api
                    .openDialog({
                      buttonLabel: t('box.select.button', 'Select'),
                      properties: ['openFile'],
                      title: t('box.sideload.exe', 'Select Executable'),
                      filters: fileFilters[platformToInstall],
                      defaultPath: winePrefix
                    })
                    .then((path) => setSelectedExe(path ? path : ''))
                }
              />
            )}
            {!showSideloadExe && (
              <TextInputField
                label={t('sideload.info.broser', 'BrowserURL')}
                placeholder={t(
                  'sideload.placeholder.url',
                  'Paste the Game URL here'
                )}
                onChange={(e) => handleGameUrl(e.target.value)}
                htmlId="sideload-game-url"
                value={gameUrl}
              />
            )}
            <ToggleSwitch
              htmlId="web3features"
              value={web3.supported}
              handleChange={() =>
                setWeb3({ ...web3, supported: !web3.supported })
              }
              title={t(
                'sideload.info.supports-web3',
                'This Game has Web3 Features'
              )}
            />
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        {shouldShowRunExe && platformToInstall !== 'Browser' && (
          <button
            onClick={async () => handleRunExe()}
            className={`button is-secondary`}
            disabled={runningSetup || !title.length}
          >
            {runningSetup
              ? t('button.running-setup', 'Running Setup')
              : t('button.run-exe-first', 'Run Installer First')}
          </button>
        )}
        <button
          onClick={async () => handleInstall()}
          className={`button is-primary`}
          disabled={!selectedExe.length && !gameUrl}
        >
          {t('button.finish', 'Finish')}
        </button>
      </DialogFooter>
    </>
  )
}
