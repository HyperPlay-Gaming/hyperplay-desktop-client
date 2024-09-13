import React, { useContext, useState } from 'react'
import { Tooltip, TooltipProps } from '@mantine/core'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { Alert, Button } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'
import SteamInstallDialog from './SteamInstallDialog'
import { launch } from 'frontend/helpers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { hasStatus } from 'frontend/hooks/hasStatus'

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
  const { platform, showDialogModal } = useContext(ContextProvider)
  const [showInstallDialog, setShowInstallDialog] = useState(false)
  const [showAlert, setShowAlert] = useState<'success' | 'danger' | 'none'>(
    'none'
  )
  const { status } = hasStatus('steam')
  const isLaunching = status === 'playing'

  const isMac = platform === 'darwin'
  const isSteamInstalled =
    isMac &&
    libraryState.sideloadedLibrary.find((game) => game.app_name === 'steam')

  const { t } = useTranslation()

  const wineList = useQuery({
    queryKey: ['alternativeWine'],
    queryFn: async () => {
      const response = await window.api.getAlternativeWine()
      if (!response) return []
      return response
    }
  })

  const isCompatibilityLayerAvailable =
    wineList.data && wineList.data.length > 0

  const installSteamMutation = useMutation({
    mutationKey: ['steamInstall'],
    onSuccess: () => {
      setShowAlert('success')
      setTimeout(() => setShowAlert('none'), 5000)
      setShowInstallDialog(false)
    },
    onError: () => {
      setShowAlert('danger')
      setTimeout(() => setShowAlert('none'), 5000)
    },
    mutationFn: async () => window.api.installSteamWindows()
  })

  const isInstalling = installSteamMutation.isPending

  async function handleSteamInstallation() {
    if (isSteamInstalled) {
      return launch({
        appName: 'steam',
        t,
        runner: 'sideload',
        showDialogModal,
        hasUpdate: false,
        isNotNative: true
      })
    }

    return setShowInstallDialog(true)
  }

  function renderButtonText() {
    if (isLaunching) {
      return t('Launching Steam', 'Launching Steam...')
    }
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

  const showSuccessAlert = showAlert === 'success'
  const showErrorAlert = showAlert === 'danger'
  const isButtonDisabled =
    !isCompatibilityLayerAvailable || isInstalling || isLaunching

  return (
    <>
      <Tooltip
        {...tooltipProps}
        label={
          isCompatibilityLayerAvailable
            ? toolTipText
            : comatibilityLayerNotAvailableTooltip
        }
        className={'Tooltip caption-sm'}
      >
        <Button
          type="tertiary"
          onClick={handleSteamInstallation}
          leftIcon={<FontAwesomeIcon icon={faSteam} height={14} width={14} />}
          disabled={isButtonDisabled}
        >
          {renderButtonText()}
        </Button>
      </Tooltip>
      {showInstallDialog ? (
        <SteamInstallDialog
          isInstalling={isInstalling}
          onClose={() => setShowInstallDialog(false)}
          onInstall={installSteamMutation.mutate}
        />
      ) : null}
      {showSuccessAlert && (
        <Alert
          style={{
            position: 'absolute',
            top: 50,
            left: '35%'
          }}
          type="success"
          message={t(
            'steam-install.success-message',
            'Steam has been installed. You can now launch it from the Library.'
          )}
        />
      )}
      {showErrorAlert && (
        <Alert
          style={{
            position: 'absolute',
            top: 50,
            left: '35%'
          }}
          type="danger"
          message={t(
            'steam-install.error-message',
            'An error occurred while installing Steam. Please try again.'
          )}
        />
      )}
    </>
  )
})
