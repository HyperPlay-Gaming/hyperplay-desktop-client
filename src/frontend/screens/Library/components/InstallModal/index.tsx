import {
  faApple,
  faLinux,
  faWindows,
  faChrome
} from '@fortawesome/free-brands-svg-icons'

import React, { useContext, useEffect, useState } from 'react'

import ContextProvider from 'frontend/state/ContextProvider'
import {
  AppPlatforms,
  AvailablePlatforms,
  GameInfo,
  InstallPlatform,
  Runner,
  WineInstallation
} from 'common/types'
import { Dialog } from 'frontend/components/UI/Dialog'

import './index.scss'

import DownloadDialog from './DownloadDialog'
import SideloadDialog from './SideloadDialog'
import WineSelector from './WineSelector'
import { getPlatformName } from 'frontend/helpers'
import PlatformSelection from 'frontend/components/UI/PlatformSelection'
import ChannelNameSelection from 'frontend/components/UI/ChannelNameSelection'
import gameRequiresAccessCodes from 'frontend/helpers/gameRequiresAccessCodes'
import ModDialog from './ModDialog'
import { AccessCodeInput } from 'frontend/components/UI/AccessCodeInput'

type Props = {
  appName: string
  backdropClick: () => void
  runner: Runner
  gameInfo?: GameInfo | null
}

export default React.memo(function InstallModal({
  appName,
  backdropClick,
  runner,
  gameInfo = null
}: Props) {
  const { platform } = useContext(ContextProvider)

  const [winePrefix, setWinePrefix] = useState('...')
  const [wineVersion, setWineVersion] = useState<WineInstallation>()
  const [wineVersionList, setWineVersionList] = useState<WineInstallation[]>([])
  const [crossoverBottle, setCrossoverBottle] = useState('')
  const [accessCode, setAccessCode] = useState('')

  const numberOfChannels =
    (gameInfo?.channels && Object.keys(gameInfo?.channels).length) ?? 0
  const initChannelName =
    gameInfo?.channels && numberOfChannels > 0
      ? Object.keys(gameInfo?.channels)[0]
      : 'main'
  const [channelNameToInstall, setChannelNameToInstall] =
    useState(initChannelName)

  const isMac = platform === 'darwin'
  const isWin = platform === 'win32'
  const isLinux = platform === 'linux'
  const isSideload = runner === 'sideload'

  const selectedChannel = gameInfo?.channels?.[channelNameToInstall]

  const channelPlatforms = selectedChannel?.release_meta.platforms ?? []
  let listingMarketplaceUrl = ''

  /*
   * This just returns the first token's marketplace url
   * TODO: return the licensing config info from /listings endpoint,
   * so we can link to the gating token's marketplace URL
   */
  if (
    gameInfo &&
    gameInfo.networks &&
    gameInfo.networks.length > 0 &&
    gameInfo.networks[0].marketplace_urls &&
    gameInfo.networks[0].marketplace_urls[0]
  ) {
    listingMarketplaceUrl = gameInfo.networks[0].marketplace_urls[0]
  }
  const hpPlatforms = Object.keys(channelPlatforms) as AppPlatforms[]
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
      available: isLinux && (isSideload || isLinuxNative),
      value: 'linux',
      icon: faLinux
    },
    {
      name: 'macOS',
      available: isMac && (isSideload || isMacNative),
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

  useEffect(() => {
    if (availablePlatforms.length === 1)
      setPlatformToInstall(availablePlatforms[0].value as InstallPlatform)
  }, [availablePlatforms])

  const channelRequiresAccessCode = gameInfo
    ? gameRequiresAccessCodes(gameInfo, channelNameToInstall)
    : false

  const channelRequiresToken = !!selectedChannel?.license_config.tokens

  const showModDialog = gameInfo && gameInfo.account_name === 'marketwars'
  const showDownloadDialog = !showModDialog && !isSideload && gameInfo

  const disabledPlatformSelection = Boolean(runner === 'sideload' && appName)

  const [accessCodeVerified, setAccessCodeVerified] = useState(false)

  const enableCTAButton =
    !channelRequiresAccessCode ||
    (channelRequiresAccessCode && accessCodeVerified)

  const accessCodeInput = (
    <AccessCodeInput
      setAccessCodeVerified={setAccessCodeVerified}
      channelRequiresAccessCode={true}
      accessCode={accessCode}
      inputProps={{ onChange: (ev) => setAccessCode(ev.target.value) }}
      licenseConfigId={selectedChannel?.license_config.id}
    />
  )

  return (
    <div className="InstallModal">
      <Dialog
        onClose={backdropClick}
        showCloseButton
        className={'InstallModal__dialog'}
      >
        {showDownloadDialog && (
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
            channelNameToInstall={channelNameToInstall}
            channelId={selectedChannel?.channel_id}
            accessCode={accessCode}
            enableCTAButton={enableCTAButton}
            requiresToken={channelRequiresToken}
            marketplaceUrl={listingMarketplaceUrl}
          >
            <PlatformSelection
              disabled={disabledPlatformSelection}
              availablePlatforms={availablePlatforms}
              platformToInstall={platformToInstall}
              setPlatformToInstall={setPlatformToInstall}
            />
            {runner === 'hyperplay' && numberOfChannels > 1 ? (
              <ChannelNameSelection
                channelNameToInstall={channelNameToInstall}
                setChannelNameToInstall={setChannelNameToInstall}
                gameInfo={gameInfo}
              />
            ) : null}
            {runner === 'hyperplay' && channelRequiresAccessCode
              ? accessCodeInput
              : null}

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
        )}
        {isSideload === true && (
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
            <PlatformSelection
              disabled={disabledPlatformSelection}
              availablePlatforms={availablePlatforms}
              platformToInstall={platformToInstall}
              setPlatformToInstall={setPlatformToInstall}
            />
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
        {showModDialog === true && (
          <ModDialog
            backdropClick={backdropClick}
            gameInfo={gameInfo}
            accessCode={accessCode}
            requiresToken={channelRequiresToken}
            enableCTAButton={enableCTAButton}
            winePrefix={winePrefix}
            wineVersion={wineVersion}
            crossoverBottle={crossoverBottle}
          >
            <div style={{ paddingTop: 'var(--space-md)' }}>
              {runner === 'hyperplay' && numberOfChannels > 1 ? (
                <ChannelNameSelection
                  channelNameToInstall={channelNameToInstall}
                  setChannelNameToInstall={setChannelNameToInstall}
                  gameInfo={gameInfo}
                />
              ) : null}
              {runner === 'hyperplay' && channelRequiresAccessCode
                ? accessCodeInput
                : null}
            </div>
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
          </ModDialog>
        )}
      </Dialog>
    </div>
  )
})
