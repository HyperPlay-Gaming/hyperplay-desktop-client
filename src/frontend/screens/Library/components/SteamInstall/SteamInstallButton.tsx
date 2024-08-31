import React, { useContext, useEffect, useState } from 'react'
import { Tooltip, TooltipProps } from '@mantine/core'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'
import { WineInstallation } from 'common/types'
import SteamInstallDialog from './SteamInstallDialog'

const tooltipProps: Partial<TooltipProps> = {
  offset: 16,
  position: 'bottom',
  withArrow: true,
  className: 'Tooltip menu',
  arrowSize: 10,
  multiline: true,
  w: 320,
  transitionProps: { transition: 'fade-down', duration: 150 }
}

export default observer(function SteamInstallButton() {
  const navigate = useNavigate()
  const { platform } = useContext(ContextProvider)
  const [isInstalling, setIsInstalling] = useState(false)
  const [showInstallDialog, setShowInstallDialog] = useState(false)
  const [isCompatibilityLayerAvailable, setIsCompatibilityLayerAvailable] =
    useState(false)

  const isMac = platform === 'darwin'
  const isSteamInstalled =
    isMac &&
    libraryState.sideloadedLibrary.find((game) => game.app_name === 'steam')

  const { t } = useTranslation()
  useEffect(() => {
    const checkWine = async () => {
      const winelist: WineInstallation[] = await window.api.getAlternativeWine()
      if (winelist.length > 0) {
        setIsCompatibilityLayerAvailable(true)
      }
    }
    checkWine()
  }, [])

  async function handleSteamInstallation() {
    if (isSteamInstalled) {
      return navigate('/gamepage/sideload/steam', {
        state: {
          gameInfo: JSON.parse(JSON.stringify(isSteamInstalled))
        }
      })
    }

    return setShowInstallDialog(true)
  }

  function renderButtonText() {
    if (isInstalling) {
      return t('Installing Steam', 'Installing Steam...')
    }
    if (isSteamInstalled) {
      return t('Launch Steam', 'Launch Steam')
    }
    return t('Install Steam', 'Install Steam')
  }

  const toolTipText = isSteamInstalled
    ? t(
        'steam-install.launch-tooltip',
        'Launch Steam using the HyperPlay Compatibility Layer'
      )
    : t(
        'steam-install.tooltip',
        `This will install the Windows version of Steam and it will run using a HyperPlay Compatibility Layer. \n
    Some games especially older titles, newer 3D games, or those with anti-cheat software may not work properly. \n
    The Recommended specs are a Mac with Apple Silicon CPU (M1 or above) and at least 16GB of RAM.`
      )

  const comatibilityLayerNotAvailableTooltip = t(
    'steam-install.compatibility-layer-not-available',
    `Compatibility layer not available. Please install one from "Settings > Wine Manager" first.`
  )

  return (
    <>
      <Tooltip
        {...tooltipProps}
        label={
          isCompatibilityLayerAvailable
            ? toolTipText
            : comatibilityLayerNotAvailableTooltip
        }
      >
        <Button
          type="tertiary"
          onClick={handleSteamInstallation}
          leftIcon={<FontAwesomeIcon icon={faSteam} height={14} width={14} />}
          disabled={!isCompatibilityLayerAvailable || isInstalling}
        >
          {renderButtonText()}
        </Button>
      </Tooltip>
      {showInstallDialog ? (
        <SteamInstallDialog
          isInstalling={isInstalling}
          setIsInstalling={setIsInstalling}
          onClose={() => setShowInstallDialog(false)}
        />
      ) : null}
    </>
  )
})
