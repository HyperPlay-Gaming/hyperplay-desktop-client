import {
  faBookOpen,
  faSlidersH,
  faStore,
  faUser,
  faUniversalAccess,
  faWineGlass,
  faGamepad,
  faBarsProgress
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { openDiscordLink } from 'frontend/helpers'

import ContextProvider from 'frontend/state/ContextProvider'
import { Runner } from 'common/types'
import './index.css'
import QuitButton from '../QuitButton'
import { LocationState } from 'frontend/types'
import { HyperPlayLogoWhite } from 'frontend/assets/hyperplay'
import { SHOW_EXTERNAL_LINK_DIALOG_STORAGE_KEY } from 'frontend/components/UI/ExternalLinkDialog'

type PathSplit = [
  a: undefined,
  b: undefined,
  runner: Runner | 'app',
  appName: string,
  type: string
]

export default function SidebarLinks() {
  const { t } = useTranslation()
  const { state } = useLocation() as { state: LocationState }
  const location = useLocation() as { pathname: string }
  const [, , runner, appName, type] = location.pathname.split('/') as PathSplit

  const {
    epic,
    gog,
    activeController,
    refreshLibrary,
    platform,
    handleExternalLinkDialog
  } = useContext(ContextProvider)

  const isStore = location.pathname.includes('store')
  const isSettings = location.pathname.includes('settings')
  const isWin = platform === 'win32'

  const settingsPath = '/settings/app/default/general'

  const [isFullscreen, setIsFullscreen] = useState(false)

  const loggedIn = epic.username || gog.username

  useEffect(() => {
    window.api.isFullscreen().then((res) => setIsFullscreen(res))
  }, [])

  async function handleRefresh() {
    localStorage.setItem('scrollPosition', '0')

    const shouldRefresh =
      (epic.username && !epic.library.length) ||
      (gog.username && !gog.library.length)
    if (shouldRefresh) {
      return refreshLibrary({ runInBackground: true, fullRefresh: true })
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

  return (
    <div className="SidebarLinks Sidebar__section">
      <NavLink to={'/'}>
        <div className="hyperplaySidebarLogoContainer">
          <HyperPlayLogoWhite
            height={64}
            width={64}
            className="hyperplaySidebarLogo"
          />
        </div>
      </NavLink>
      <h6 className="Sidebar__categoryTitle">GAMES</h6>
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
        to={'/'}
        onClick={async () => handleRefresh()}
      >
        <div className="Sidebar__itemIcon">
          <FontAwesomeIcon
            icon={faGamepad}
            title={t('library.label', 'Library')}
          />
        </div>
        <span>{t('library.label', 'Library')}</span>
      </NavLink>

      <h6 className="Sidebar__categoryTitle">ACCOUNTS</h6>
      {!loggedIn && (
        <NavLink
          className={({ isActive }) =>
            classNames('Sidebar__item', { active: isActive })
          }
          to={'/login'}
        >
          <>
            <div className="Sidebar__itemIcon">
              <FontAwesomeIcon
                icon={faUser}
                title={t('button.login', 'Login')}
              />
            </div>
            <span>{t('button.login', 'Login')}</span>
          </>
        </NavLink>
      )}
      <div className="SidebarItemWithSubmenu">
        <NavLink
          className={({ isActive }) =>
            classNames('Sidebar__item', {
              active: isActive || location.pathname.includes('store')
            })
          }
          to="/epicstore"
        >
          <>
            <div className="Sidebar__itemIcon">
              <FontAwesomeIcon icon={faStore} title={t('stores', 'Stores')} />
            </div>
            <span>{t('stores', 'Stores')}</span>
          </>
        </NavLink>
        {isStore && (
          <div className="SidebarSubmenu">
            <NavLink
              data-testid="store"
              className={({ isActive }) =>
                classNames('Sidebar__item', 'SidebarLinks__subItem', {
                  active: isActive
                })
              }
              to="/epicstore"
            >
              <span>{t('store', 'Epic Store')}</span>
            </NavLink>
            <NavLink
              data-testid="store"
              className={({ isActive }) =>
                classNames('Sidebar__item', 'SidebarLinks__subItem', {
                  active: isActive
                })
              }
              to="/gogstore"
            >
              <span>{t('gog-store', 'GOG Store')}</span>
            </NavLink>
          </div>
        )}
      </div>
      <h6 className="Sidebar__categoryTitle">OTHER</h6>
      <div className="SidebarItemWithSubmenu">
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
          <>
            <div className="Sidebar__itemIcon">
              <FontAwesomeIcon icon={faSlidersH} title={t('Settings')} />
            </div>
            <span>{t('Settings', 'Settings')}</span>
          </>
        </NavLink>
        {isSettings && (
          <div className="SidebarSubmenu settings">
            <NavLink
              role="link"
              to={{ pathname: '/settings/app/default/general' }}
              state={{ fromGameCard: false }}
              className={classNames('Sidebar__item SidebarLinks__subItem', {
                ['active']: type === 'general'
              })}
            >
              <span>{t('settings.navbar.general')}</span>
            </NavLink>
            <NavLink
              role="link"
              to={`/settings/${runner}/${appName}/games_settings`}
              state={{ ...state, runner: state?.runner }}
              className={classNames('Sidebar__item SidebarLinks__subItem', {
                ['active']: type === 'games_settings'
              })}
            >
              <span>
                {t('settings.navbar.games_settings_defaults', 'Game Defaults')}
              </span>
            </NavLink>
            <NavLink
              role="link"
              to={`/settings/${runner}/${appName}/advanced`}
              state={{ ...state, runner: state?.runner }}
              className={classNames('Sidebar__item SidebarLinks__subItem', {
                ['active']: type === 'advanced'
              })}
            >
              <span>{t('settings.navbar.advanced', 'Advanced')}</span>
            </NavLink>
            <NavLink
              role="link"
              to={`/settings/${runner}/${appName}/log`}
              state={{ ...state, runner: state?.runner }}
              className={classNames('Sidebar__item SidebarLinks__subItem', {
                ['active']: type === 'log'
              })}
            >
              <span>{t('settings.navbar.log', 'Log')}</span>
            </NavLink>
          </div>
        )}
      </div>
      <NavLink
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={{ pathname: '/download-manager' }}
      >
        <>
          <div className="Sidebar__itemIcon">
            <FontAwesomeIcon
              icon={faBarsProgress}
              title={t('download-manager.link', 'Downloads')}
            />
          </div>
          <span>{t('download-manager.link', 'Downloads')}</span>
        </>
      </NavLink>
      {!isWin && (
        <NavLink
          className={({ isActive }) =>
            classNames('Sidebar__item', { active: isActive })
          }
          to={{ pathname: '/wine-manager' }}
        >
          <>
            <div className="Sidebar__itemIcon">
              <FontAwesomeIcon
                icon={faWineGlass}
                title={t('wine.manager.link', 'Wine Manager')}
              />
            </div>
            <span>{t('wine.manager.link', 'Wine Manager')}</span>
          </>
        </NavLink>
      )}
      <NavLink
        data-testid="accessibility"
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={{ pathname: '/accessibility' }}
      >
        <>
          <div className="Sidebar__itemIcon">
            <FontAwesomeIcon
              icon={faUniversalAccess}
              title={t('accessibility.title', 'Accessibility')}
            />
          </div>
          <span>{t('accessibility.title', 'Accessibility')}</span>
        </>
      </NavLink>
      <h6 className="Sidebar__categoryTitle">COMMUNITY</h6>
      <NavLink
        data-testid="wiki"
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={{ pathname: '/wiki' }}
      >
        <>
          <div className="Sidebar__itemIcon">
            <FontAwesomeIcon
              icon={faBookOpen}
              title={t('docs', 'Documentation')}
            />
          </div>
          <span>{t('docs', 'Documentation')}</span>
        </>
      </NavLink>
      <button
        className="Sidebar__item"
        onClick={() => handleExternalLink(openDiscordLink)}
      >
        <div className="Sidebar__itemIcon">
          <FontAwesomeIcon
            icon={faDiscord}
            title={t('userselector.discord', 'Discord')}
          />
        </div>
        <span>{t('userselector.discord', 'Discord')}</span>
      </button>
      {(isFullscreen || activeController) && <QuitButton />}
    </div>
  )
}
