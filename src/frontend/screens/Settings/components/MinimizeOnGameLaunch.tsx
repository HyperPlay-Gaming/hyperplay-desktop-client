import React from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'

const MinimizeOnGameLaunch = () => {
  const { t } = useTranslation()
  const [minimizeOnGameLaunch, setMinimizeOnGameLaunch] = useSetting(
    'minimizeOnGameLaunch',
    false
  )

  return (
    <ToggleSwitch
      htmlId="minimizeOnGameLaunchSwitch"
      value={minimizeOnGameLaunch}
      handleChange={() => setMinimizeOnGameLaunch(!minimizeOnGameLaunch)}
      title={t(
        'setting.minimize-on-launch',
        'Minimize HyperPlay After Game Launch'
      )}
    />
  )
}

export default MinimizeOnGameLaunch
