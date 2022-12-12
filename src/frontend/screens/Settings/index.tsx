import './index.css'

import React, { useContext, useEffect, useState } from 'react'

import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

import ContextMenu from '../Library/components/ContextMenu'
import SettingsContext from './SettingsContext'
import LogSettings from './sections/LogSettings'
import FooterInfo from './sections/FooterInfo'
import {
  GeneralSettings,
  GamesSettings,
  SyncSaves,
  AdvancedSettings
} from './sections'
import { AppSettings, WineInstallation } from 'common/types'
import { writeConfig } from 'frontend/helpers'
import { UpdateComponent } from 'frontend/components/UI'
import { LocationState, SettingsContextType } from 'frontend/types'
import ContextProvider from 'frontend/state/ContextProvider'

export const defaultWineVersion: WineInstallation = {
  bin: '/usr/bin/wine',
  name: 'Wine Default',
  type: 'wine'
}

function Settings() {
  const { t, i18n } = useTranslation()
  const { platform } = useContext(ContextProvider)
  const {
    state: { fromGameCard, runner, gameInfo }
  } = useLocation() as { state: LocationState }
  const [title, setTitle] = useState('')

  const [currentConfig, setCurrentConfig] = useState<Partial<AppSettings>>({})

  const { appName = '', type = '' } = useParams()
  const isDefault = appName === 'default'
  const isGeneralSettings = type === 'general'
  const isSyncSettings = type === 'sync'
  const isGamesSettings = type === 'games_settings'
  const isLogSettings = type === 'log'
  const isAdvancedSetting = type === 'advanced' && isDefault
  const isLinux = platform === 'linux'
  const isMac = platform === 'darwin'
  const isMacNative = isMac && (gameInfo?.is_mac_native || false)
  const isLinuxNative = isLinux && (gameInfo?.is_linux_native || false)

  // Load App or game's config, only if not loaded already
  useEffect(() => {
    const getSettings = async () => {
      const config = isDefault
        ? await window.api.requestAppSettings()
        : await window.api.requestGameSettings(appName)
      setCurrentConfig(config)

      if (!isDefault) {
        setTitle(gameInfo?.title ?? appName)
      } else {
        setTitle(t('globalSettings', 'Global Settings'))
      }
    }
    getSettings()
  }, [appName, isDefault, i18n.language])

  // render `loading` while we fetch the settings
  if (!title) {
    return <UpdateComponent />
  }

  // generate return path
  let returnPath = '/'
  if (!fromGameCard) {
    returnPath = `/gamepage/${runner}/${appName}`
    if (returnPath.includes('default')) {
      returnPath = '/library'
    }
  }

  // create setting context functions
  const contextValues: SettingsContextType = {
    getSetting: (key, fallback) => currentConfig[key] ?? fallback,
    setSetting: (key, value) => {
      const currentValue = currentConfig[key]
      if (currentValue !== undefined || currentValue !== null) {
        // NOTE: This is the best way I've found to compare `unknown` values
        //       If you ever modify this, know that `value` might be an array
        //       of anything, so even something like looping over the array
        //       and comparing every member might still give false negatives
        //       This might *also* give false results, but only in cases where
        //       you're already passing the wrong type for `value`
        const noChange = JSON.stringify(value) === JSON.stringify(currentValue)
        if (noChange) return
      }
      setCurrentConfig({ ...currentConfig, [key]: value })
      writeConfig({ appName, config: { ...currentConfig, [key]: value } })
    },
    config: currentConfig,
    isDefault,
    appName,
    runner,
    gameInfo,
    isLinuxNative,
    isMacNative
  }

  return (
    <ContextMenu
      items={[
        {
          label: t(
            'settings.copyToClipboard',
            'Copy All Settings to Clipboard'
          ),
          onclick: async () =>
            window.api.clipboardWriteText(
              JSON.stringify({ appName, title, ...currentConfig })
            ),
          show: !isLogSettings
        },
        {
          label: t('settings.open-config-file', 'Open Config File'),
          onclick: () => window.api.showConfigFileInFolder(appName),
          show: !isLogSettings
        }
      ]}
    >
      <SettingsContext.Provider value={contextValues}>
        <div className="Settings">
          <div role="list" className="settingsWrapper">
            <NavLink
              to={returnPath}
              role="link"
              className="backButton"
              state={{ gameInfo: gameInfo }}
            >
              <ArrowCircleLeftIcon />
            </NavLink>
            <h1 className="headerTitle" data-testid="headerTitle">
              {title}
            </h1>

            {isGeneralSettings && <GeneralSettings />}
            {isGamesSettings && <GamesSettings />}
            {isSyncSettings && <SyncSaves />}
            {isAdvancedSetting && <AdvancedSettings />}
            {isLogSettings && <LogSettings />}
            <FooterInfo />
          </div>
        </div>
      </SettingsContext.Provider>
    </ContextMenu>
  )
}

export default React.memo(Settings)
