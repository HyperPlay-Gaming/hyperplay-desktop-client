import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import ToggleSwitch from 'frontend/components/UI/ToggleSwitch'
import useSetting from 'frontend/hooks/useSetting'
import libraryState from 'frontend/state/libraryState'
import ContextProvider from 'frontend/state/ContextProvider'

export default function EnableSteamIntegration() {
  const { t } = useTranslation()
  const [enabled, setEnabled] = useSetting('enableSteamIntegration', false)
  const { showDialogModal } = useContext(ContextProvider)

  const handleChange = () => {
    const newValue = !enabled
    if (newValue) {
      showDialogModal({
        title: t(
          'steam.integration.requirements.title',
          'Steam Integration Requirements'
        ),
        message: (
          <span>
            {t(
              'steam.integration.requirements.part1',
              'To ensure this integration works properly and HyperPlay can access your games, you must have'
            )}{' '}
            <b>
              {t('steam.integration.requirements.part2', 'Steam installed')}
            </b>{' '}
            {t('steam.integration.requirements.part3', 'and be')}{' '}
            <b>{t('steam.integration.requirements.part4', 'Logged into')}</b>{' '}
            {t('steam.integration.requirements.part5', 'your account.')}{' '}
            {t(
              'steam.integration.requirements.part6',
              'Additionally, your profile and game details should be set to '
            )}
            <b>{t('steam.integration.requirements.part7', 'Public')}</b> (
            <b>
              {t(
                'steam.integration.requirements.part8',
                'Steam > Profile > Edit Profile > Privacy Settings'
              )}
            </b>
            )
          </span>
        ),
        buttons: [
          {
            text: t('box.ok', 'OK'),
            onClick: () => {
              setEnabled(true)
              window.api.refreshLibrary('steam')
            }
          }
        ],
        type: 'MESSAGE'
      })
    } else {
      setEnabled(false)
      if (libraryState.category === 'steam') {
        libraryState.category = 'all'
      }
      window.api.clearCache(false)
    }
  }

  return (
    <ToggleSwitch
      htmlId="enable_steam_integration"
      value={enabled}
      handleChange={handleChange}
      title={t(
        'setting.enable-steam-integration',
        'Enable Steam Integration (experimental)'
      )}
    />
  )
}
