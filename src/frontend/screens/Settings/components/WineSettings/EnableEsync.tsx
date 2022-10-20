import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import ContextProvider from 'frontend/state/ContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const EnableEsync = () => {
  const { t } = useTranslation()
  const { platform } = useContext(ContextProvider)
  const isLinux = platform === 'linux'
  const [enableEsync, setEnableEsync] = useSetting<boolean>(
    'enableEsync',
    false
  )

  if (!isLinux) {
    return <></>
  }

  return (
    <div className="toggleRow">
      <ToggleSwitch
        htmlId="esyncToggle"
        value={enableEsync || false}
        handleChange={() => setEnableEsync(!enableEsync)}
        title={t('setting.esync', 'Enable Esync')}
      />

      <FontAwesomeIcon
        className="helpIcon"
        icon={faCircleInfo}
        title={t(
          'help.esync',
          'Esync aims to reduce wineserver overhead in CPU-intensive games. Enabling may improve performance.'
        )}
      />
    </div>
  )
}

export default EnableEsync
