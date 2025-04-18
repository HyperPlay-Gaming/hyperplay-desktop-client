import './index.scss'

import ContextProvider from 'frontend/state/ContextProvider'
import { UpdateComponent } from 'frontend/components/UI'

import React, { lazy, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TypeCheckedStoreFrontend,
  wineDownloaderInfoStore
} from 'frontend/helpers/electronStores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { WineVersionInfo, Type, WineManagerUISettings } from 'common/types'
import libraryState from 'frontend/state/libraryState'
import { Tabs } from '@hyperplay/ui'

const WineItem = lazy(
  async () => import('frontend/screens/WineManager/components/WineItem')
)

const configStore = new TypeCheckedStoreFrontend('wineManagerConfigStore', {
  cwd: 'store'
})

export default React.memo(function WineManager(): JSX.Element | null {
  const { t } = useTranslation()
  const { refreshWineVersionInfo, platform } = useContext(ContextProvider)
  const isLinux = platform === 'linux'

  const protonge: WineManagerUISettings = {
    type: 'Proton-GE',
    value: 'protonge',
    enabled: isLinux
  }

  const gamePortingToolkit: WineManagerUISettings = {
    type: 'Game-Porting-Toolkit',
    value: 'toolkit',
    enabled: !isLinux
  }

  const [repository, setRepository] = useState<WineManagerUISettings>(
    isLinux ? protonge : gamePortingToolkit
  )
  const [wineManagerSettings, setWineManagerSettings] = useState<
    WineManagerUISettings[]
  >([
    { type: 'Proton-GE', value: 'protonge', enabled: isLinux },
    { type: 'Wine-GE', value: 'winege', enabled: isLinux },
    { type: 'Game-Porting-Toolkit', value: 'toolkit', enabled: !isLinux },
    { type: 'Wine-Crossover', value: 'winecrossover', enabled: !isLinux }
  ])

  const getWineVersions = (repo: Type) => {
    const versions = wineDownloaderInfoStore.get('wine-releases', [])
    return versions.filter((version) => version.type === repo)
  }

  const [wineVersions, setWineVersions] = useState<WineVersionInfo[]>(
    getWineVersions(repository.type)
  )

  const handleChangeTab = (repo: WineManagerUISettings) => {
    setRepository(repo)
    setWineVersions(getWineVersions(repo.type))
  }

  // Track the screen view once
  useEffect(() => {
    window.api.trackScreen('Compatibility Layer ')

    if (wineVersions.length === 0) {
      refreshWineVersionInfo(true)
    }
  }, [])

  useEffect(() => {
    const oldWineManagerSettings = configStore.get_nodefault(
      'wine-manager-settings'
    )
    if (oldWineManagerSettings) {
      setWineManagerSettings(oldWineManagerSettings)
    }
  }, [])

  useEffect(() => {
    const removeListener = window.api.handleWineVersionsUpdated(() => {
      setWineVersions(getWineVersions(repository.type))
    })
    return () => {
      removeListener()
    }
  }, [repository])

  return (
    <>
      <h4 style={{ paddingTop: 'var(--space-md)' }}>
        {t('wine.manager.title', 'Compatibility Layer')}
      </h4>
      <div className="wineManager">
        <span className="tabsWrapper">
          <Tabs
            className="tabs"
            value={repository.value}
            onChange={(value) => {
              const repo = wineManagerSettings.find(
                (setting) => setting.value === value
              )
              if (repo) {
                handleChangeTab(repo)
              }
            }}
          >
            {wineManagerSettings.map(({ type, value, enabled }) => {
              if (enabled) {
                return (
                  <Tabs.Tab value={value} key={value}>
                    <div className="menu">{type}</div>
                  </Tabs.Tab>
                )
              }
              return null
            })}
          </Tabs>
          <button
            className={'FormControl__button'}
            title={t('generic.library.refresh', 'Refresh Library')}
            onClick={async () => refreshWineVersionInfo(true)}
          >
            <FontAwesomeIcon
              className={'FormControl__segmentedFaIcon'}
              icon={faSyncAlt}
            />
          </button>
        </span>
        {wineVersions.length ? (
          <div
            style={
              !wineVersions.length ? { backgroundColor: 'transparent' } : {}
            }
            className="wineList"
          >
            <div className="gameListHeader">
              <span>{t('info.version', 'Wine Version')}</span>
              <span>{t('wine.release', 'Release Date')}</span>
              <span>{t('wine.size', 'Size')}</span>
              <span>{t('wine.actions', 'Action')}</span>
            </div>
            {libraryState.refreshing && <UpdateComponent />}
            {!libraryState.refreshing &&
              !!wineVersions.length &&
              wineVersions.map((release) => {
                return <WineItem key={release.version} {...release} />
              })}
          </div>
        ) : (
          <h5 className="wineList">
            {t(
              'wine.manager.not-found',
              'No Wine versions found. Please click the refresh icon to try again.'
            )}
          </h5>
        )}
      </div>
    </>
  )
})
