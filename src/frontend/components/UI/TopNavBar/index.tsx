import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { HyperPlayLogoWhite } from 'frontend/assets/hyperplay'
import { Button, Images } from '@hyperplay/ui'
import SearchBar from '../SearchBar'
import AccountDropdown from '../AccountDropdown'
import extensionStore from 'frontend/state/ExtensionState'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { NavLink, useLocation } from 'react-router-dom'
import {
  EPIC_STORE_URL,
  GOG_STORE_URL,
  HYPERPLAY_STORE_URL
} from 'frontend/constants'
import webviewNavigationStore from 'frontend/store/WebviewNavigationStore'
import { extractMainDomain } from '../../../helpers/extract-main-domain'
import AppVersion from '../AppVersion'

const TopNavBar = observer(() => {
  const { t } = useTranslation()

  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
  const [badgeText, setBadgeText] = useState('0')
  const { pathname } = useLocation()

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

  useEffect(() => {
    const nav = document.getElementById('topNavBar')
    if (!nav) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const isHyperPlayFocused = !!(
          document.activeElement as HTMLElement | null
        )?.closest('#topbarHyperplayLink')
        if (isHyperPlayFocused) {
          const storeLink = document.querySelector<HTMLElement>(
            '[data-testid="sidebar-store-link"]'
          )
          if (storeLink) {
            storeLink.focus()
            e.preventDefault()
            e.stopPropagation()
          }
        }
      }
    }
    nav.addEventListener('keydown', onKeyDown)
    return () => nav.removeEventListener('keydown', onKeyDown)
  }, [])

  function getStoreTextStyle(viewURL: string) {
    const { currentUrl } = webviewNavigationStore
    const inactiveStyle = { color: 'var(--color-neutral-400)' }
    const activeStyle = { color: '' }
    // initial value of currentUrl is ''
    if (!currentUrl) return inactiveStyle
    const viewURLMainDomain = extractMainDomain(viewURL)
    const currentURLMainDomain = extractMainDomain(currentUrl)
    const isActive = viewURLMainDomain === currentURLMainDomain
    return isActive ? activeStyle : inactiveStyle
  }

  return (
    <div className={styles.navBar} id="topNavBar">
      <div>
        <HyperPlayLogoWhite
          height="27px"
          width="27px"
          className={styles.hpLogo}
        />
        <Images.HyperPlayTextLogo
          fill="var(--color-neutral-100)"
          className={styles.hpTextLogo}
        />
        <div className={styles.alphaBadge}>
          <div className={`menu-item ${styles.alphaCaption}`}>
            <AppVersion />
          </div>
        </div>
        <div className={styles.storeLinks}>
          <NavLink to="/hyperplaystore">
            <Button
              id="topbarHyperplayLink"
              type="menuItem"
              size="small"
              style={getStoreTextStyle(HYPERPLAY_STORE_URL)}
              className={styles.hpStoreLink}
            >
              HyperPlay
            </Button>
          </NavLink>
          <NavLink to="/epicstore">
            <Button
              type="menuItem"
              size="small"
              style={getStoreTextStyle(EPIC_STORE_URL)}
              className={styles.epicStoreLink}
            >
              {t('Epic Games', 'Epic Games')}
            </Button>
          </NavLink>
          <NavLink to="/gogstore">
            <Button
              type="menuItem"
              size="small"
              style={getStoreTextStyle(GOG_STORE_URL)}
              className={styles.gogStoreLink}
            >
              {t('GOG', 'GOG')}
            </Button>
          </NavLink>
        </div>
      </div>
      <div>
        {pathname === '/library' ? <SearchBar /> : null}
        {showMetaMaskBrowserSidebarLinks && (
          <button
            id="topbarMetaMaskButton"
            className={styles.iconButton}
            onClick={() => {
              extensionStore.lockPopup()
              extensionStore.toggleIsPopupOpen()
            }}
            onMouseEnter={() => extensionStore.lockPopup()}
            onMouseLeave={() => extensionStore.unlockPopup()}
            onFocus={() => extensionStore.lockPopup()}
            onBlur={() => extensionStore.unlockPopup()}
          >
            <Images.MetaMask className={styles.metaMaskIcon} />
            {badgeText !== '' && badgeText !== '0' ? (
              <div className={styles.badge}>{badgeText}</div>
            ) : null}
          </button>
        )}
        <AccountDropdown />
      </div>
    </div>
  )
})

export default TopNavBar
