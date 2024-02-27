import React from 'react'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import { useTranslation } from 'react-i18next'

const AutoLaunchHyperPlay = () => {
  const { t } = useTranslation()
  const [autoLaunchHyperPlay, setAutoLaunchHyperPlay] = useSetting(
    'autoLaunchHyperPlay',
    true
  )

  return (
    <ToggleSwitch
      htmlId="AutoLaunchHyperPlay"
      value={autoLaunchHyperPlay}
      handleChange={() => {
        setAutoLaunchHyperPlay(!autoLaunchHyperPlay)
        window.api.updateAutoLaunch()
      }
      }
      title={t(
        'setting.autoLaunchHyperPlay',
        'Auto Launch HyperPlay'
      )}
    />
  )
}

export default AutoLaunchHyperPlay
