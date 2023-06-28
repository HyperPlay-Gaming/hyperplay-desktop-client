import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { HyperPlayLogoWhite } from 'frontend/assets/hyperplay'
import { Button, Images } from '@hyperplay/ui'
import SearchBar from '../SearchBar'
import AccountDropdown from '../AccountDropdown'
import extensionStore from 'frontend/store/ExtensionStore'
import { observer } from 'mobx-react-lite'
import { observable } from 'mobx'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { NavLink, useLocation } from 'react-router-dom'

const TopNavBar = observer(() => {
  const { t } = useTranslation()

  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
  const [badgeText, setBadgeText] = useState('0')
  const { pathname, search } = useLocation()
  const pagesToShowStoreNavOptions = [
    '/hyperplaystore',
    '/gogstore',
    '/epicstore',
    '/store-page/'
  ]
  const searchParams = new URLSearchParams(search)
  const queryParam = searchParams.get('store-url')
  let isEpicStore = false
  if (queryParam !== null) {
    const storeUrl = new URL(queryParam)
    isEpicStore = storeUrl.host === 'store.epicgames.com'
  }

  const showStoreNavOptions = pagesToShowStoreNavOptions.includes(pathname)

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
  function getStoreTextStyle(storePath: string, isActive?: boolean) {
    const inactiveStyle = { color: 'var(--color-neutral-400)' }
    const activeStyle = { color: '' }
    if (isActive !== undefined && isActive) {
      return activeStyle
    }
    return pathname === storePath ? activeStyle : inactiveStyle
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
        <div className={styles.alphaBadge}>
          <div className={`caption ${styles.alphaCaption}`}>
            {t(`hyperplay.publicAlpha`, `Public Alpha`)}
          </div>
        </div>
        {showStoreNavOptions && (
          <>
            <NavLink to="/hyperplaystore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle('/hyperplaystore')}
              >
                HyperPlay
              </Button>
            </NavLink>
            <NavLink to="/epicstore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle('/epicstore', isEpicStore)}
              >
                {t('Epic Games', 'Epic Games')}
              </Button>
            </NavLink>
            <NavLink to="/gogstore">
              <Button
                type="link"
                size="small"
                style={getStoreTextStyle('/gogstore')}
              >
                {t('GOG', 'GOG')}
              </Button>
            </NavLink>
          </>
        )}
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
        <div style={{ width: '200px' }}>
          <AccountDropdown />
        </div>
      </div>
    </div>
  )
})

export default React.memo(observable(TopNavBar))
