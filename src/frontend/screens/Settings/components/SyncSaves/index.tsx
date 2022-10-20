import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { WineInstallation } from 'common/types'
import { GOGCloudSavesLocation } from 'common/types/gog'
import { configStore } from 'frontend/helpers/electronStores'
import useSetting from 'frontend/hooks/useSetting'
import ContextProvider from 'frontend/state/ContextProvider'
import SettingsContext from '../../SettingsContext'
import { defaultWineVersion } from '../WineSettings'
import GOGSyncSaves from './gog'
import LegendarySyncSaves from './legendary'

const SyncSaves = () => {
  const { t } = useTranslation()
  const { runner } = useContext(SettingsContext)
  const { platform } = useContext(ContextProvider)
  const isWin = platform === 'win32'

  const [autoSyncSaves, setAutoSyncSaves] = useSetting<boolean>(
    'autoSyncSaves',
    false
  )
  const [savesPath, setSavesPath] = useSetting<string>('savesPath', '')
  const [gogSavesLocations, setGogSavesLocations] = useSetting<
    GOGCloudSavesLocation[]
  >('gogSavesLocations', [])

  const home = configStore.get('userHome')
  const [winePrefix] = useSetting<string>('winePrefix', `${home}/.wine`)

  const [wineVersion] = useSetting<WineInstallation>(
    'wineVersion',
    defaultWineVersion
  )

  const syncCommands = [
    { name: t('setting.manualsync.download'), value: '--skip-upload' },
    { name: t('setting.manualsync.upload'), value: '--skip-download' },
    { name: t('setting.manualsync.forcedownload'), value: '--force-download' },
    { name: t('setting.manualsync.forceupload'), value: '--force-upload' }
  ]

  if (runner === 'legendary') {
    return (
      <LegendarySyncSaves
        savesPath={savesPath}
        setSavesPath={setSavesPath}
        autoSyncSaves={autoSyncSaves}
        setAutoSyncSaves={setAutoSyncSaves}
        isProton={!isWin && wineVersion.type === 'proton'}
        winePrefix={winePrefix}
        syncCommands={syncCommands}
      />
    )
  }

  if (runner === 'gog') {
    return (
      <GOGSyncSaves
        gogSaves={gogSavesLocations}
        setGogSaves={setGogSavesLocations}
        autoSyncSaves={autoSyncSaves}
        setAutoSyncSaves={setAutoSyncSaves}
        syncCommands={syncCommands}
      />
    )
  }

  return <></>
}

export default SyncSaves
