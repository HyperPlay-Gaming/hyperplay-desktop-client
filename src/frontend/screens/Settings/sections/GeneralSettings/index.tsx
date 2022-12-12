import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from 'frontend/components/UI/LanguageSelector'
import {
  CheckUpdatesOnStartup,
  CustomWineProton,
  DefaultInstallPath,
  DefaultSteamPath,
  DisableController,
  DiscordRPC,
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

export default function GeneralSettings() {
  const { t } = useTranslation()

  return (
    <>
      <h3 className="settingSubheader">{t('settings.navbar.general')}</h3>

      <LanguageSelector />

      <DefaultInstallPath />

      <WinePrefixesBasePath />

      <CustomWineProton />

      <DefaultSteamPath />

      <EgsSettings />

      <CheckUpdatesOnStartup />

      <TraySettings />

      <MinimizeOnGameLaunch />

      <UseDarkTrayIcon />

      <Shortcuts />

      <DiscordRPC />

      <DisableController />

      <LibraryTopSection />

      <MaxRecentGames />

      <MaxWorkers />
    </>
  )
}
