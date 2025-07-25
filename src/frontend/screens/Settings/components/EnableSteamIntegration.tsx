import React from 'react'
import { useTranslation } from 'react-i18next'
import ToggleSwitch from 'frontend/components/UI/ToggleSwitch'
import useSetting from 'frontend/hooks/useSetting'
import libraryState from 'frontend/state/libraryState'

export default function EnableSteamIntegration() {
  const { t } = useTranslation()
  const [enabled, setEnabled] = useSetting('enableSteamIntegration', false)

  const handleChange = () => {
    const newValue = !enabled
    setEnabled(newValue)
    if (newValue) {
      window.api.refreshLibrary('steam')
    } else {
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
