import './index.scss'

import React, { useContext, useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ContextMenu from '../Library/components/ContextMenu'
import SettingsContext from './SettingsContext'
import LogSettings from './sections/LogSettings'
import FooterInfo from './sections/FooterInfo'
import { GeneralSettings, GamesSettings, AdvancedSettings } from './sections'
import { AppSettings, WineInstallation } from 'common/types'
import { UpdateComponent } from 'frontend/components/UI'
import { LocationState, SettingsContextType } from 'frontend/types'
import useSettingsContext from 'frontend/hooks/useSettingsContext'
import { Tabs } from '@hyperplay/ui'
import Accessibility from '../Accessibility'
import WineManager from '../WineManager'
import ContextProvider from 'frontend/state/ContextProvider'
import AccountSettings from './sections/AccountSettings'

export const defaultWineVersion: WineInstallation = {
  bin: '/usr/bin/wine',
  name: 'Wine Default',
  type: 'wine'
}

function Settings() {
  const { t, i18n } = useTranslation()
  const {
    state: { fromGameCard, runner, gameInfo }
  } = useLocation() as { state: LocationState }
  const { platform } = useContext(ContextProvider)
  const isWin = platform === 'win32'
  const [title, setTitle] = useState('')

  const [currentConfig, setCurrentConfig] = useState<Partial<AppSettings>>({})

  const { appName = '', type = '' } = useParams()
  const isDefault = appName === 'default'
  const isLogSettings = type === 'log'

  // Track the screen view once each time appName or type changes
  useEffect(() => {
    window.api.trackScreen('Settings', { appName, type })
  }, [appName, type])

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

  // generate return path
  let returnPath = '/'
  if (!fromGameCard) {
    returnPath = `/gamepage/${runner}/${appName}`
    if (returnPath.includes('default')) {
      returnPath = '/library'
    }
  }
  console.log({ gameInfo }, { runner }, { appName })
  // create setting context functions
  const contextValues: SettingsContextType | null = useSettingsContext({
    appName,
    gameInfo,
    runner
  })

  // render `loading` while we fetch the settings
  if (!title || !contextValues) {
    return <UpdateComponent />
  }

  return (
    <ContextMenu
      items={[
        {
          label: t(
            'settings.copyToClipboard',
            'Copy All Settings to Clipboard'
          ),
          onClick: async () =>
            window.api.clipboardWriteText(
              JSON.stringify({ appName, title, ...currentConfig })
            ),
          show: !isLogSettings
        },
        {
          label: t('settings.open-config-file', 'Open Config File'),
          onClick: () => window.api.showConfigFileInFolder(appName),
          show: !isLogSettings
        }
      ]}
    >
      <SettingsContext.Provider value={contextValues}>
        <div className="Settings contentContainer">
          <div role="list" className="settingsWrapper">
            <h3 className="headerTitle" data-testid="headerTitle">
              Settings
            </h3>
            <Tabs defaultValue="general">
              <Tabs.List
                style={{ marginBottom: 'var(--space-md)' }}
                type="outline"
              >
                <Tabs.Tab value="general">
                  <div className="menu">{t('settings.navbar.general')}</div>
                </Tabs.Tab>
                <Tabs.Tab value="gamesSettings">
                  <div className="menu">
                    {t('settings.gamesSettings', 'Games Settings')}
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="advSettings">
                  <div className="menu">{t('settings.navbar.advanced')}</div>
                </Tabs.Tab>
                <Tabs.Tab value="logSettings">
                  <div className="menu">{t('settings.navbar.log')}</div>
                </Tabs.Tab>
                <Tabs.Tab value="accessibility">
                  <div className="menu">{t('accessibility.title')}</div>
                </Tabs.Tab>
                <Tabs.Tab value="accounts">
                  <div className="menu capitalize">{t('accounts')}</div>
                </Tabs.Tab>
                {!isWin ? (
                  <Tabs.Tab value="wineManager">
                    <div className="menu">
                      {t('settings.wine.manager.title', 'Wine Manager')}
                    </div>
                  </Tabs.Tab>
                ) : null}
              </Tabs.List>
              <Tabs.Panel value="general">
                <GeneralSettings />
              </Tabs.Panel>
              <Tabs.Panel value="gamesSettings">
                <GamesSettings useDetails={false} />
              </Tabs.Panel>
              <Tabs.Panel value="advSettings">
                <AdvancedSettings />
              </Tabs.Panel>
              <Tabs.Panel value="logSettings">
                <LogSettings />
              </Tabs.Panel>
              <Tabs.Panel value="accessibility">
                <Accessibility />
              </Tabs.Panel>
              <Tabs.Panel value="accounts">
                <AccountSettings />
              </Tabs.Panel>
              {!isWin ? (
                <Tabs.Panel value="wineManager">
                  <WineManager />
                </Tabs.Panel>
              ) : null}
            </Tabs>
            <FooterInfo />
          </div>
        </div>
      </SettingsContext.Provider>
    </ContextMenu>
  )
}

export default React.memo(Settings)
