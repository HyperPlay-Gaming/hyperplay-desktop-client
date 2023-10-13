import React from 'react'
import { useTranslation } from 'react-i18next'
import SteamId from '../../components/SteamId'

export default function AccountSettings() {
  const { t } = useTranslation()

  return (
    <>
      <div className="settingSubheader settingsSectionHeader title">
        {t('settings.navbar.accounts')}
      </div>

      <SteamId />
    </>
  )
}
