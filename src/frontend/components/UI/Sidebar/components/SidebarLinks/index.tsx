import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import ContextProvider from 'frontend/state/ContextProvider'
import './index.css'
import QuitButton from '../QuitButton'
import { SHOW_EXTERNAL_LINK_DIALOG_STORAGE_KEY } from 'frontend/components/UI/ExternalLinkDialog'
import { Images } from '@hyperplay/ui'
import libraryState from 'frontend/state/libraryState'
import { observer } from 'mobx-react-lite'
import storeAuthState from 'frontend/state/storeAuthState'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipProps } from '@mantine/core'
import { useFlags } from 'launchdarkly-react-client-sdk'

const tooltipProps: Partial<TooltipProps> = {
  offset: 16,
  position: 'right',
  withArrow: true,
  className: 'Tooltip menu',
  arrowSize: 10
}

export default observer(function SidebarLinks() {
  const location = useLocation() as { pathname: string }
  const { t } = useTranslation()

  const { activeController, handleExternalLinkDialog, connectivity } =
    useContext(ContextProvider)

  const settingsPath = '/settings/app/default/general'

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    window.api.isFullscreen().then((res) => setIsFullscreen(res))
  }, [])

  const flags = useFlags()
  const SHOW_ACHIEVEMENTS = flags.achievements

  async function handleRefresh() {
    localStorage.setItem('scrollPosition', '0')

    const shouldRefresh =
      (storeAuthState.epic.username && !libraryState.epicLibrary.length) ||
      (storeAuthState.gog.username && !libraryState.gogLibrary.length) ||
      (storeAuthState.amazon.user_id && !libraryState.amazonLibrary.length)
    if (shouldRefresh) {
      return libraryState.refreshLibrary({
        runInBackground: true,
        checkForUpdates: false
      })
    }
    return
  }

  function handleExternalLink(linkCallback: () => void) {
    const showExternalLinkDialog: boolean = JSON.parse(
      localStorage.getItem(SHOW_EXTERNAL_LINK_DIALOG_STORAGE_KEY) ?? 'true'
    )
    if (showExternalLinkDialog) {
      handleExternalLinkDialog({ showDialog: true, linkCallback })
    } else {
      linkCallback()
    }
  }

  const sidebarSvgUnselectedFill = 'var(--color-neutral-400)'
  const isOffline = connectivity.status !== 'online'

  return (
    <>
      <div className="SidebarLinks Sidebar__section">
        <div className="sidebarLinkGradientWrapper">
          <Tooltip {...tooltipProps} label={t('sidebar.store', 'Store')}>
            <NavLink
              className={({ isActive }) =>
                classNames('Sidebar__item', {
                  active:
                    (isActive && !isOffline) ||
                    location.pathname.includes('store'),
                  disabled: isOffline
                })
              }
              to={isOffline ? '/library' : '/hyperplaystore'}
              title={
                isOffline
                  ? t('Please connect to the internet to access the stores')
                  : ''
              }
            >
              <Images.Home fill={sidebarSvgUnselectedFill} />
            </NavLink>
          </Tooltip>
        </div>
        <div className="sidebarLinkGradientWrapper">
          <Tooltip {...tooltipProps} label={t('sidebar.library', 'Library')}>
            <NavLink
              className={({ isActive }) =>
                classNames('Sidebar__item', {
                  active:
                    isActive ||
                    location.pathname.includes('gamepage') ||
                    location.pathname.includes('library')
                })
              }
              end
              to={'/library'}
              onClick={handleRefresh}
            >
              <Images.Controller fill={sidebarSvgUnselectedFill} />
            </NavLink>
          </Tooltip>
        </div>
        {SHOW_ACHIEVEMENTS && (
          <div className="sidebarLinkGradientWrapper">
            <Tooltip
              {...tooltipProps}
              label={t('sidebar.achievements', 'Achievements')}
            >
              <NavLink
                className={({ isActive }) =>
                  classNames('Sidebar__item', {
                    active:
                      isActive || location.pathname.includes('achievements')
                  })
                }
                end
                to={'/achievements'}
                onClick={handleRefresh}
              >
                <Images.TrophyOutline fill={sidebarSvgUnselectedFill} />
              </NavLink>
            </Tooltip>
          </div>
        )}
        <div className="sidebarLinkGradientWrapper">
          <Tooltip
            {...tooltipProps}
            label={t('sidebar.downloadManager', 'Download Manager')}
          >
            <NavLink
              className={({ isActive }) =>
                classNames('Sidebar__item', { active: isActive })
              }
              to={{ pathname: '/download-manager' }}
            >
              <Images.DownloadIcon fill={sidebarSvgUnselectedFill} />
            </NavLink>
          </Tooltip>
        </div>
        <div className="sidebarLinkGradientWrapper">
          <Tooltip {...tooltipProps} label="Settings">
            <NavLink
              data-testid="settings"
              className={({ isActive }) =>
                classNames('Sidebar__item', {
                  active: isActive || location.pathname.includes('settings')
                })
              }
              to={{ pathname: settingsPath }}
              state={{
                fromGameCard: false
              }}
            >
              <Images.Settings fill={sidebarSvgUnselectedFill} />
            </NavLink>
          </Tooltip>
        </div>
      </div>

      <div className=" SidebarLinks Sidebar__section">
        <div
          className="sidebarLinkGradientWrapper"
          onClick={() => handleExternalLink(window.api.openDiscordLink)}
        >
          <Tooltip {...tooltipProps} label="Discord">
            <div className="Sidebar__item">
              <button>
                <Images.Discord stroke={sidebarSvgUnselectedFill} />
              </button>
            </div>
          </Tooltip>
        </div>
        <div
          className="sidebarLinkGradientWrapper "
          onClick={() => handleExternalLink(window.api.openTwitterLink)}
        >
          <Tooltip {...tooltipProps} label="Twitter">
            <div className="Sidebar__item">
              <button>
                <Images.Twitter fill={sidebarSvgUnselectedFill} />
              </button>
            </div>
          </Tooltip>
        </div>
        <div className="sidebarLinkGradientWrapper">
          <Tooltip {...tooltipProps} label="Wiki">
            <NavLink
              data-testid="wiki"
              className={({ isActive }) =>
                classNames('Sidebar__item', { active: isActive })
              }
              to={{ pathname: '/wiki' }}
            >
              <Images.Page fill={sidebarSvgUnselectedFill} />
            </NavLink>
          </Tooltip>
        </div>
        <div className="sidebarLinkGradientWrapper">
          {(isFullscreen || activeController) && <QuitButton />}
        </div>
      </div>
    </>
  )
})
