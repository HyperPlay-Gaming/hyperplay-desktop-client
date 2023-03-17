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
  LibraryTopSection,
  MaxRecentGames,
  MaxWorkers,
  MinimizeOnGameLaunch,
  Shortcuts,
  TraySettings,
  UseDarkTrayIcon,
  WinePrefixesBasePath
} from '../../components'
import ParticipateInMetrics from '../../components/ParticipateInMetrics'

export default function GeneralSettings() {
  const { t } = useTranslation()

  return (
    <>
      <h3 className="settingSubheader">{t('settings.navbar.general')}</h3>

      <LanguageSelector />

      <DefaultInstallPath />

      <WinePrefixesBasePath />

      <DefaultSteamPath />

      <EgsSettings />

      <CheckUpdatesOnStartup />

      <ParticipateInMetrics />

      <AutoUpdateGames />

      <TraySettings />

      <MinimizeOnGameLaunch />

      <UseDarkTrayIcon />

      <Shortcuts />

      <DisableController />

      <LibraryTopSection />

      <MaxRecentGames />

      <MaxWorkers />
    </>
  )
}
