import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from 'frontend/components/UI/LanguageSelector'
import {
  AutoUpdateGames,
  CheckUpdatesOnStartup,
  DefaultInstallPath,
  DefaultSteamPath,
  DisableController,
  EgsSettings,
  HyperPlayAnalytics,
  LibraryTopSection,
  MaxRecentGames,
  MaxWorkers,
  MinimizeOnGameLaunch,
  Shortcuts,
  TraySettings,
  UseDarkTrayIcon,
  WinePrefixesBasePath
} from '../../components'
import AppVersion from 'frontend/components/UI/AppVersion'

export default function GeneralSettings() {
  const { t } = useTranslation()

  return (
    <>
      <AppVersion />

      <div className="settingSubheader settingsSectionHeader title">
        {t('settings.navbar.general')}
      </div>

      <LanguageSelector />

      <DefaultInstallPath />

      <WinePrefixesBasePath />

      <DefaultSteamPath />

      <EgsSettings />

      <CheckUpdatesOnStartup />

      <AutoUpdateGames />

      <TraySettings />

      <MinimizeOnGameLaunch />

      <UseDarkTrayIcon />

      <Shortcuts />

      <DisableController />

      <HyperPlayAnalytics />

      <LibraryTopSection />

      <MaxRecentGames />

      <MaxWorkers />
    </>
  )
}
