import React, { useEffect } from 'react'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import { useTranslation } from 'react-i18next'

const AutoLaunchHyperPlay = () => {
  const { t } = useTranslation()

  const [autoLaunchHyperPlay, setAutoLaunchHyperPlay] = useSetting(
    'autoLaunchHyperPlay',
    true
  )

  useEffect(() => {
    async function init() {
      const platform = await window.api.getPlatform()
      // currently set as opt in on mac
      if (platform === 'darwin') {
        setAutoLaunchHyperPlay(false)
      }
    }
    init()
  })

  return (
    <ToggleSwitch
      htmlId="AutoLaunchHyperPlay"
      value={autoLaunchHyperPlay}
      handleChange={() => {
        setAutoLaunchHyperPlay(!autoLaunchHyperPlay)
        window.api.updateAutoLaunch()
      }}
      title={t('setting.autoLaunchHyperPlay', 'Auto Launch HyperPlay')}
    />
  )
}

export default AutoLaunchHyperPlay
