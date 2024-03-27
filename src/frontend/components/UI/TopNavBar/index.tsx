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
  AMAZON_STORE,
  HYPERPLAY_STORE_URL
} from 'frontend/constants'
import webviewNavigationStore from 'frontend/store/WebviewNavigationStore'
import { extractMainDomain } from '../../../helpers/extract-main-domain'
import { useFlags } from 'launchdarkly-react-client-sdk'

const TopNavBar = observer(() => {
  const { t } = useTranslation()
  const flags = useFlags()
  const ENABLE_AMAZON_STORE = flags.amazonStore

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
    <div className={styles.navBar}>
      <div>
        <HyperPlayLogoWhite
          height="27px"
          width="27px"
          className={styles.hpLogo}
        />
        <Images.HyperPlayTextLogo fill="var(--color-neutral-100)" />
        <div className={styles.versionBadge}>
          <div className={`caption ${styles.alphaCaption}`}>
            {t(`hyperplay.publicBeta`, `Public Beta`)}
          </div>
        </div>
      </div>
      <div className={styles.storeLinks}>
          <>
            <NavLink to="/hyperplaystore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle(HYPERPLAY_STORE_URL)}
              >
                HyperPlay
              </Button>
            </NavLink>
            <NavLink to="/epicstore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle(EPIC_STORE_URL)}
              >
                {t('Epic Games', 'Epic Games')}
              </Button>
            </NavLink>
            <NavLink to="/gogstore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle(GOG_STORE_URL)}
              >
                {t('GOG', 'GOG')}
              </Button>
            </NavLink>
            {ENABLE_AMAZON_STORE ? (
              <NavLink to="/amazonstore">
                <Button
                  type="link"
                  size="small"
                  style={getStoreTextStyle(AMAZON_STORE)}
                >
                  {t('Amazon', 'Amazon')}
                </Button>
              </NavLink>
            ) : null}
          </>
      </div>
      <div>
        {pathname === '/library' ? <SearchBar /> : null}
        {showMetaMaskBrowserSidebarLinks && (
          <button
            className={styles.iconButton}
            onClick={() => extensionStore.toggleIsPopupOpen()}
            onMouseEnter={() => extensionStore.lockPopup()}
            onMouseLeave={() => extensionStore.unlockPopup()}
          >
            <Images.MetaMask fill="white" />
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
