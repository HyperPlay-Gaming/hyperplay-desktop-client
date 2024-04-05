import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import ContextProvider from 'frontend/state/ContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import SettingsContext from '../SettingsContext'

const EnableMsync = () => {
  const { t } = useTranslation()
  const { platform } = useContext(ContextProvider)
  const { isMacNative } = useContext(SettingsContext)
  const isMac = platform === 'darwin'
  const [enableMsync, setEnableMsync] = useSetting('enableMsync', false)

  if (!isMac || isMacNative) {
    return <></>
  }

  return (
    <div className="toggleRow">
      <ToggleSwitch
        htmlId="fsyncToggle"
        value={enableMsync || false}
        handleChange={() => setEnableMsync(!enableMsync)}
        title={t('setting.msync', 'Enable Msync')}
      />

      <FontAwesomeIcon
        className="helpIcon"
        icon={faCircleInfo}
        title={t(
          'help.msync',
          'Msync aims to reduce wineserver overhead in CPU-intensive games. Enabling may improve performance on several games.'
        )}
      />
    </div>
  )
}

export default EnableMsync
