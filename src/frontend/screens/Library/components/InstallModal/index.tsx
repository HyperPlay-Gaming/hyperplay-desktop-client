import {
  faApple,
  faLinux,
  faWindows,
  faChrome
} from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import React, { useContext, useEffect, useState } from 'react'

import ContextProvider from 'frontend/state/ContextProvider'
import {
  AppPlatforms,
  GameInfo,
  InstallPlatform,
  Runner,
  WineInstallation
} from 'common/types'
import { Dialog } from 'frontend/components/UI/Dialog'

import './index.css'

import DownloadDialog from './DownloadDialog'
import SideloadDialog from './SideloadDialog'
import WineSelector from './WineSelector'
import { SelectField } from 'frontend/components/UI'
import { useTranslation } from 'react-i18next'
import { getPlatformName } from 'frontend/helpers'

type Props = {
  appName: string
  backdropClick: () => void
  runner: Runner
  gameInfo?: GameInfo | null
}

export type AvailablePlatforms = {
  name: string
  available: boolean
  value: string
  icon: IconDefinition
}[]

export default React.memo(function InstallModal({
  appName,
  backdropClick,
  runner,
  gameInfo = null
}: Props) {
  const { platform } = useContext(ContextProvider)
  const { t } = useTranslation('gamepage')

  const [winePrefix, setWinePrefix] = useState('...')
  const [wineVersion, setWineVersion] = useState<WineInstallation>()
  const [wineVersionList, setWineVersionList] = useState<WineInstallation[]>([])
  const [crossoverBottle, setCrossoverBottle] = useState('')

  const isMac = platform === 'darwin'
  const isWin = platform === 'win32'
  const isLinux = platform === 'linux'
  const isSideload = runner === 'sideload'

  const { releaseMeta = { platforms: {} } } = { ...gameInfo }
  const hpPlatforms = Object.keys(releaseMeta.platforms) as AppPlatforms[]
  const isHpGame = runner === 'hyperplay'

  const isLinuxNative = isHpGame
    ? hpPlatforms.some((p) => getPlatformName(p) === 'Linux')
    : Boolean(gameInfo?.is_linux_native)
  const isMacNative = isHpGame
    ? hpPlatforms.some((p) => getPlatformName(p) === 'Mac')
    : Boolean(gameInfo?.is_mac_native)

  const platforms: AvailablePlatforms = [
    {
      name: 'Linux',
      available: (isLinux && isLinuxNative) || isSideload,
      value: 'linux',
      icon: faLinux
    },
    {
      name: 'macOS',
      available: (isMac && isMacNative) || isSideload,
      value: 'Mac',
      icon: faApple
    },
    {
      name: 'Windows',
      available: isHpGame
        ? hpPlatforms.some((p) => getPlatformName(p) === 'Windows')
        : true,
      value: 'Windows',
      icon: faWindows
    },
    {
      name: 'Browser',
      available:
        isSideload || hpPlatforms.some((p) => getPlatformName(p) === 'Browser'),
      value: 'Browser',
      icon: faChrome
    }
  ]

  const availablePlatforms: AvailablePlatforms = platforms.filter(
    (p) => p.available
  )

  const getDefaultplatform = () => {
    if (isLinux && (isSideload || isLinuxNative)) {
      return 'linux'
    }

    if (isMac && (isSideload || isMacNative)) {
      return 'Mac'
    }

    return 'Windows'
  }

  const [platformToInstall, setPlatformToInstall] = useState<InstallPlatform>(
    getDefaultplatform()
  )

  const hasWine = platformToInstall === 'Windows' && !isWin

  useEffect(() => {
    if (hasWine) {
      const getWine = async () => {
        const newWineList: WineInstallation[] =
          await window.api.getAlternativeWine()
        setWineVersionList(newWineList)
        if (wineVersion?.bin) {
          if (
            !newWineList.some(
              (newWine) => wineVersion && newWine.bin === wineVersion.bin
            )
          ) {
            setWineVersion(undefined)
          }
        }
      }
      getWine()
    }
  }, [hasWine])

  function platformSelection() {
    const showPlatformSelection =
      availablePlatforms.length > 1 || hpPlatforms.length > 1

    if (!showPlatformSelection) {
      return null
    }
    const disabledPlatformSelection = Boolean(runner === 'sideload' && appName)
    return (
      <SelectField
        label={`${t('game.platform', 'Select Platform')}:`}
        htmlId="platformPick"
        value={platformToInstall}
        disabled={disabledPlatformSelection}
        onChange={(e) =>
          setPlatformToInstall(e.target.value as InstallPlatform)
        }
      >
        {availablePlatforms.map((p, i) => (
          <option value={p.value} key={i}>
            {p.name}
          </option>
        ))}
      </SelectField>
    )
  }

  const showDownloadDialog = !isSideload && gameInfo

  return (
    <div className="InstallModal">
      <Dialog
        onClose={backdropClick}
        showCloseButton
        className={'InstallModal__dialog'}
      >
        {showDownloadDialog ? (
          <DownloadDialog
            appName={appName}
            runner={runner}
            winePrefix={winePrefix}
            wineVersion={wineVersion}
            availablePlatforms={availablePlatforms}
            backdropClick={backdropClick}
            platformToInstall={platformToInstall}
            gameInfo={gameInfo}
            crossoverBottle={crossoverBottle}
          >
            {platformSelection()}
            {hasWine ? (
              <WineSelector
                winePrefix={winePrefix}
                wineVersion={wineVersion}
                wineVersionList={wineVersionList}
                title={gameInfo?.title}
                setWinePrefix={setWinePrefix}
                setWineVersion={setWineVersion}
                crossoverBottle={crossoverBottle}
                setCrossoverBottle={setCrossoverBottle}
              />
            ) : null}
          </DownloadDialog>
        ) : (
          <SideloadDialog
            setWinePrefix={setWinePrefix}
            winePrefix={winePrefix}
            wineVersion={wineVersion}
            availablePlatforms={availablePlatforms}
            backdropClick={backdropClick}
            platformToInstall={platformToInstall}
            appName={appName}
            crossoverBottle={crossoverBottle}
          >
            {platformSelection()}
            {hasWine ? (
              <WineSelector
                winePrefix={winePrefix}
                wineVersion={wineVersion}
                wineVersionList={wineVersionList}
                setWinePrefix={setWinePrefix}
                setWineVersion={setWineVersion}
                crossoverBottle={crossoverBottle}
                setCrossoverBottle={setCrossoverBottle}
              />
            ) : null}
          </SideloadDialog>
        )}
      </Dialog>
    </div>
  )
})
