import {
  faBookOpen,
  faSlidersH,
  faStore,
  faUser,
  faUniversalAccess,
  faWineGlass,
  faBarsProgress,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { openDiscordLink } from 'frontend/helpers'

import ContextProvider from 'frontend/state/ContextProvider'
import { Runner } from 'common/types'
import './index.css'
import QuitButton from '../QuitButton'
import { LocationState } from 'frontend/types'
import { SHOW_EXTERNAL_LINK_DIALOG_STORAGE_KEY } from 'frontend/components/UI/ExternalLinkDialog'
import { Images } from '@hyperplay/ui'

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
      return refreshLibrary({ runInBackground: true })
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
      <NavLink
        className={({ isActive }) =>
          classNames('Sidebar__item', {
            active: isActive || location.pathname.includes('store')
          })
        }
        to="/hyperplaystore"
      >
        <Images.Home stroke="#FFFFFF" />
      </NavLink>
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
        <Images.Controller stroke="#FFFFFF" />
      </NavLink>

      {!loggedIn && (
        <NavLink
          className={({ isActive }) =>
            classNames('Sidebar__item', { active: isActive })
          }
          to={'/login'}
        >
          <FontAwesomeIcon icon={faUser} title={t('button.login', 'Login')} />
        </NavLink>
      )}
      {loggedIn && (
        <NavLink className="Sidebar__item" to={'/login'}>
          <FontAwesomeIcon
            icon={faUserAlt}
            title={t('userselector.manageaccounts', 'Manage Accounts')}
          />
        </NavLink>
      )}
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
        <Images.Settings fill="#FFFFFF" />
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={{ pathname: '/download-manager' }}
      >
        <Images.DownloadIcon fill="#FFFFFF" />
      </NavLink>
      {!isWin && (
        <NavLink
          className={({ isActive }) =>
            classNames('Sidebar__item', { active: isActive })
          }
          to={{ pathname: '/wine-manager' }}
        >
          <FontAwesomeIcon
            icon={faWineGlass}
            title={t('wine.manager.link', 'Wine Manager')}
          />
        </NavLink>
      )}
      <NavLink
        data-testid="wiki"
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={{ pathname: '/wiki' }}
      >
        <FontAwesomeIcon icon={faBookOpen} title={t('docs', 'Documentation')} />
      </NavLink>
      <button
        className="Sidebar__item"
        onClick={() => handleExternalLink(openDiscordLink)}
      >
        <Images.Discord stroke="white" />
      </button>
      {(isFullscreen || activeController) && <QuitButton />}
    </div>
  )
}
