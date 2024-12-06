import './index.scss'

import React, { useContext, useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import {
  AlternativeExe,
  AutoDXVK,
  AutoDXVKNVAPI,
  AutoVKD3D,
  BattlEyeRuntime,
  CrossoverBottle,
  EacRuntime,
  EnableEsync,
  EnableFSR,
  EnableFsync,
  EnvVariablesTable,
  GameMode,
  LauncherArgs,
  Mangohud,
  OfflineMode,
  PreferedLanguage,
  PreferSystemLibs,
  ShowFPS,
  SteamRuntime,
  UseDGPU,
  WinePrefix,
  WineVersionSelector,
  WrappersTable,
  IgnoreGameUpdates,
  EnableMsync
} from '../../components'
import ContextProvider from 'frontend/state/ContextProvider'
import Tools from '../../components/Tools'
import SettingsContext from '../../SettingsContext'
import useSetting from 'frontend/hooks/useSetting'
import { defaultWineVersion } from '../..'
import SyncSaves from '../SyncSaves'
import EnableDXVKFpsLimit from '../../components/EnableDXVKFpsLimit'
import { Tabs, getTabsClassNames } from '@hyperplay/ui'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function GamesSettings() {
  const { t } = useTranslation()
  const { platform } = useContext(ContextProvider)
  const { isDefault, gameInfo } = useContext(SettingsContext)
  const [wineVersion] = useSetting('wineVersion', defaultWineVersion)
  const isLinux = platform === 'linux'
  const isWin = platform === 'win32'
  const isCrossover = wineVersion?.type === 'crossover'
  const hasCloudSaves =
    gameInfo?.cloud_save_enabled && gameInfo.install.platform !== 'linux'

  const [nativeGame, setNativeGame] = useState(false)

  useEffect(() => {
    if (gameInfo) {
      const getIsNative = async () => {
        const isNative = await window.api.isNative({
          appName: gameInfo?.app_name,
          runner: gameInfo?.runner
        })
        setNativeGame(isNative)
      }
      getIsNative()
    }
  }, [])

  const isSettingsPage = !gameInfo
  // GamesSettings is shown on both the settings page and the game card's settings
  const showCrossPlatformOptions =
    (isSettingsPage && !isWin) || (!isSettingsPage && !nativeGame)

  return (
    <>
      {isDefault && (
        <p className="defaults-hint">
          <FontAwesomeIcon icon={faInfoCircle} />
          {t(
            'settings.default_hint',
            'Changes in this section only apply as default values when installing games. If you want to change the settings of an already installed game, use the Settings button in the game page.'
          )}
        </p>
      )}
      <Tabs
        defaultValue={showCrossPlatformOptions ? 'wine' : 'other'}
        classNames={getTabsClassNames(
          { list: 'settingsTabList' },
          { list: 'outline' }
        )}
      >
        <Tabs.List className="tabsList">
          {showCrossPlatformOptions && (
            <Tabs.Tab value="wine">
              {isLinux ? 'Wine' : 'Wine/Crossover'}
            </Tabs.Tab>
          )}
          <Tabs.Tab value="other">
            {showCrossPlatformOptions
              ? t('settings.navbar.other', 'Other')
              : t('settings.navbar.advanced', 'Advanced')}
          </Tabs.Tab>
          {hasCloudSaves && (
            <Tabs.Tab value="sync">
              {t('settings.navbar.sync', 'Cloud Saves Sync')}
            </Tabs.Tab>
          )}
        </Tabs.List>
        {showCrossPlatformOptions && (
          <Tabs.Panel value="wine">
            <WineVersionSelector />
            <WinePrefix />
            <CrossoverBottle />
            {!isCrossover && (
              <>
                <AutoDXVK />
                {isLinux && (
                  <>
                    <AutoDXVKNVAPI />
                    <AutoVKD3D />
                    <EacRuntime />
                    <BattlEyeRuntime />
                  </>
                )}
                <Tools />
              </>
            )}
          </Tabs.Panel>
        )}
        <Tabs.Panel value="other">
          <AlternativeExe />
          <ShowFPS />
          {showCrossPlatformOptions && <EnableDXVKFpsLimit />}
          {showCrossPlatformOptions && (
            <>
              <EnableEsync />
              <EnableMsync />
              {isLinux && (
                <>
                  <EnableFsync />
                  <PreferSystemLibs />
                  <EnableFSR />
                  <GameMode />
                </>
              )}
            </>
          )}
          <UseDGPU />
          {isLinux && <Mangohud />}
          <SteamRuntime />
          <IgnoreGameUpdates />
          <OfflineMode />
          <EnvVariablesTable />
          <WrappersTable />
          <LauncherArgs />
          <PreferedLanguage />
        </Tabs.Panel>
        {hasCloudSaves && (
          <Tabs.Panel value="sync">
            <SyncSaves />
          </Tabs.Panel>
        )}
      </Tabs>
    </>
  )
}
