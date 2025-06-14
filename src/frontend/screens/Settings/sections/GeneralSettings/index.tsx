import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from 'frontend/components/UI/LanguageSelector'
import {
  AutoUpdateGames,
  DefaultInstallPath,
  DefaultSteamPath,
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
import AutoLaunchHyperPlay from '../../components/AutoLaunchHyperPlay'
import styles from './index.module.scss'

export default function GeneralSettings() {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.generalSettingsTitle}>
        {t('settings.navbar.general')}
      </div>
      <div className="general-section">
        <HyperPlayAnalytics />
        <LanguageSelector />
        <DefaultInstallPath />
        <WinePrefixesBasePath />
        <DefaultSteamPath />
        <EgsSettings />
        <AutoLaunchHyperPlay />
        <AutoUpdateGames />
        <TraySettings />
        <MinimizeOnGameLaunch />
        <UseDarkTrayIcon />
        <Shortcuts />
        {/* 
      disabled until we fix the controller navigation in hyperplay
      <DisableController /> */}
        <LibraryTopSection />
        <MaxRecentGames />
        <MaxWorkers />
      </div>
    </>
  )
}
