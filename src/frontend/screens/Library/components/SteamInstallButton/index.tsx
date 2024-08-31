import React, { useContext } from 'react'
import { Tooltip, TooltipProps } from '@mantine/core'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'

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
  const { showDialogModal, platform } = useContext(ContextProvider)

  const isMac = platform === 'darwin'
  const steamInstalled =
    isMac &&
    libraryState.sideloadedLibrary.find((game) => game.app_name === 'steam')

  const { t } = useTranslation()

  async function handleSteamInstallation() {
    if (steamInstalled) {
      console.log('steamInstalled', { steamInstalled })
      return navigate('/gamepage/sideload/steam', {
        state: {
          gameInfo: JSON.parse(JSON.stringify(steamInstalled))
        }
      })
    }

    return showDialogModal({
      title: t('steam-install.title', 'Install Steam'),
      message: t('steam-install.message', {
        defaultValue:
          'This will install Steam for Windows using HyperPlay Compatibility Layers. Some games, especially older titles, new 3D games, or those with anti-cheat software, may not work properly. Recommended specs are a Mac with Apple Silicon CPU (M1 or above) and at least 16GB of RAM.'
      }),
      buttons: [
        {
          text: t('steam-install.cancel', 'Cancel'),
          onClick: () => {}
        },
        {
          text: t('steam-install.confirm', 'Install Steam'),
          onClick: async () => {
            return window.api.installSteamWindows()
          }
        }
      ]
    })
  }

  return (
    <Tooltip
      {...tooltipProps}
      label={t('steam-install.tooltip', {
        defaultValue:
          'This Steam installation is from a Windows version and will run using HyperPlay Compatibility Layers. Some games, especially older titles, new 3D games, or those with anti-cheat software, may not work properly. Recommended specs are a Mac with Apple Silicon CPU (M1 or above) and at least 16GB of RAM.'
      })}
    >
      <Button
        type="tertiary"
        onClick={handleSteamInstallation}
        leftIcon={<FontAwesomeIcon icon={faSteam} height={14} width={14} />}
      >
        {steamInstalled
          ? t('run_steam', 'Launch Steam')
          : t('add_steam', 'Install Steam')}
      </Button>
    </Tooltip>
  )
})
