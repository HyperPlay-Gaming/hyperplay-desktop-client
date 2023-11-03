import React, { useContext } from 'react'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import { useTranslation } from 'react-i18next'
import SettingsContext from '../SettingsContext'

const IgnoreGameUpdates = () => {
  const { t } = useTranslation()
  const { isDefault, gameInfo } = useContext(SettingsContext)

  const [ignoreGameUpdates, setIgnoreGameUpdates] = useSetting(
    'ignoreGameUpdates',
    false
  )

  if (isDefault || gameInfo?.runner === 'hyperplay') {
    return <></>
  }

  return (
    <ToggleSwitch
      htmlId="ignoreGameUpdates"
      value={ignoreGameUpdates}
      handleChange={() => setIgnoreGameUpdates(!ignoreGameUpdates)}
      title={t('setting.ignoreGameUpdates', 'Ignore game updates')}
    />
  )
}

export default IgnoreGameUpdates
