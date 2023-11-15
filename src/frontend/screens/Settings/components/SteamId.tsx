import React from 'react'
import { useTranslation } from 'react-i18next'
import useSetting from 'frontend/hooks/useSetting'
import { configStore } from 'frontend/helpers/electronStores'
import { TextInput } from '@hyperplay/ui'

const SteamId = () => {
  const { t } = useTranslation()
  const [steamId, setSteamId] = useSetting('steamId', '')

  function setInstallPath(path: string) {
    setSteamId(path)
    configStore.set('settings.steamId', path)
  }

  return (
    <TextInput
      label={t('setting.steamId', 'Steam ID')}
      value={steamId?.replaceAll("'", '')}
      placeholder={steamId}
      onChange={(event) => setInstallPath(event.target.value)}
    />
  )
}

export default SteamId
