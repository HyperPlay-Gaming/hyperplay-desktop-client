import React from 'react'
import { useTranslation } from 'react-i18next'
import useSetting from 'frontend/hooks/useSetting'
import { configStore } from 'frontend/helpers/electronStores'
import { TextInput } from '@hyperplay/ui'

/**
 * Used only for testing.
 * TODO: replace with auth system session's steam id
 */
const SteamId = () => {
  const { t } = useTranslation()
  const [steamId, setSteamId] = useSetting('steamId', '')

  function setSteamIdWrapper(path: string) {
    setSteamId(path)
    configStore.set('settings.steamId', path)
  }

  return (
    <TextInput
      label={t('setting.steamId', 'Steam ID')}
      value={steamId}
      placeholder={steamId}
      /* eslint-disable-next-line */
      onChange={(event: any) =>
        setSteamIdWrapper(event.target.value?.replaceAll("'", ''))
      }
    />
  )
}

export default SteamId
