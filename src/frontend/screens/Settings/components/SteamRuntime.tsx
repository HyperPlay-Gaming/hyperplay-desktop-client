import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import ContextProvider from 'frontend/state/ContextProvider'
import useSetting from 'frontend/hooks/useSetting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { defaultWineVersion } from '..'
import SettingsContext from '../SettingsContext'

const SteamRuntime = () => {
  const { t } = useTranslation()
  const { isLinuxNative } = useContext(SettingsContext)
  const { platform } = useContext(ContextProvider)
  const isLinux = platform === 'linux'
  const isWin = platform === 'win32'
  const [wineVersion] = useSetting('wineVersion', defaultWineVersion)

  const isProton = !isWin && wineVersion?.type === 'proton'

  const [useSteamRuntime, setUseSteamRuntime] = useSetting(
    'useSteamRuntime',
    isProton
  )

  const showSteamRuntime = isLinuxNative || isProton

  if (!isLinux || !showSteamRuntime) {
    return <></>
  }

  return (
    <div className="toggleRow">
      <ToggleSwitch
        htmlId="steamruntime"
        value={useSteamRuntime}
        handleChange={() => setUseSteamRuntime(!useSteamRuntime)}
        title={t('setting.steamruntime', 'Use Steam Runtime')}
      />

      <FontAwesomeIcon
        className="helpIcon"
        icon={faCircleInfo}
        title={t(
          'help.steamruntime',
          'Custom libraries provided by Steam to help run Linux and Windows (Proton) games. Enabling might improve compatibility.'
        )}
      />
    </div>
  )
}

export default SteamRuntime
