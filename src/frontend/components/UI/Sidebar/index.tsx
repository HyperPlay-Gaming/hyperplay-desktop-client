import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGamepad,
  faSquareCaretLeft,
  faSquareCaretRight
} from '@fortawesome/free-solid-svg-icons'
import ContextProvider from 'frontend/state/ContextProvider'
import CurrentDownload from './components/CurrentDownload'
import SidebarLinks from './components/SidebarLinks'
import './index.css'
import Wallet from './components/wallet'
import { DMQueueElement } from 'common/types'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  openOnboarding: () => void
}

const Sidebar: React.FC<SidebarProps> = function (props) {
  const { t } = useTranslation()
  const { sidebarCollapsed, setSideBarCollapsed } = useContext(ContextProvider)
  const [currentDMElement, setCurrentDMElement] = useState<DMQueueElement>()
  const [badgeText, setBadgeText] = useState('0')

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  function setBadgeString(err: any, text: string) {
    setBadgeText(text)
  }

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ elements }) => {
      setCurrentDMElement(elements[0])
    })

    const removeHandleDMQueueInformation = window.api.handleDMQueueInformation(
      (e, elements) => {
        setCurrentDMElement(elements[0])
      }
    )

    const removeHandleSetBadgeText =
      window.api.handleSetBadgeTextInRenderer(setBadgeString)

    return () => {
      removeHandleDMQueueInformation()
      removeHandleSetBadgeText()
    }
  }, [])

  return (
    <aside className={classNames('Sidebar', { collapsed: sidebarCollapsed })}>
      <SidebarLinks />
      <div className="currentDownloads">
        {currentDMElement && (
          <CurrentDownload
            key={currentDMElement.params.appName}
            appName={currentDMElement.params.appName}
            runner={currentDMElement.params.runner}
          />
        )}
      </div>

      <button
        className="Sidebar__item"
        onClick={async () => window.api.showPopup()}
      >
        <span>MetaMask Popup {badgeText}</span>
      </button>
      <NavLink
        className={({ isActive }) =>
          classNames('Sidebar__item', { active: isActive })
        }
        to={'metamaskHome'}
      >
        <>
          <div className="Sidebar__itemIcon">
            <FontAwesomeIcon icon={faGamepad} title={'MetaMask Home'} />
          </div>
          <span>{'MetaMask Home'}</span>
        </>
      </NavLink>

      <Wallet onClick={props.openOnboarding} />
      <button
        className="collapseIcon"
        onClick={() => setSideBarCollapsed(!sidebarCollapsed)}
      >
        <FontAwesomeIcon
          icon={sidebarCollapsed ? faSquareCaretRight : faSquareCaretLeft}
          title={
            sidebarCollapsed
              ? t('sidebar.uncollapse', 'Uncollapse sidebar')
              : t('sidebar.collapse', 'Collapse sidebar')
          }
        />
      </button>
    </aside>
  )
}

export default React.memo(Sidebar)
