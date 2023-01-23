import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareCaretLeft,
  faSquareCaretRight
} from '@fortawesome/free-solid-svg-icons'
import ContextProvider from 'frontend/state/ContextProvider'
import onboardingStore from 'frontend/store/OnboardingStore'
import SidebarLinks from './components/SidebarLinks'
import './index.css'
import Wallet from './components/wallet'
import { observer } from 'mobx-react-lite'

const Sidebar = observer(() => {
  const { t } = useTranslation()
  const { sidebarCollapsed, setSideBarCollapsed } = useContext(ContextProvider)
  const [badgeText, setBadgeText] = useState('0')

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  function setBadgeString(err: any, text: string) {
    setBadgeText(text)
  }

  useEffect(() => {
    const removeHandleSetBadgeText =
      window.api.handleSetBadgeTextInRenderer(setBadgeString)

    return () => {
      removeHandleSetBadgeText()
    }
  }, [])

  return (
    <aside className={classNames('Sidebar', { collapsed: sidebarCollapsed })}>
      <SidebarLinks />
      <div className="currentDownloads"></div>

      <button
        className="Sidebar__item"
        onClick={async () => window.api.showPopup()}
      >
        <span>Open MetaMask {badgeText}</span>
      </button>

      <Wallet onClick={() => onboardingStore.openOnboarding()} />
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
})

export default React.memo(Sidebar)
