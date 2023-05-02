import React, { useContext } from 'react'
import styles from './index.module.scss'
import { HyperPlayLogoWhite } from 'frontend/assets/hyperplay'
import { Images } from '@hyperplay/ui'
import SearchBar from '../SearchBar'
import AccountDropdown from '../AccountDropdown'
import extensionStore from 'frontend/store/ExtensionStore'
import { observer } from 'mobx-react-lite'
import { observable } from 'mobx'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'

const TopNavBar = observer(() => {
  const { t } = useTranslation()

  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
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
      </div>
      <div>
        <SearchBar />
        <button className={styles.iconButton}>
          <Images.MagnifyingGlass fill="white" />
        </button>
        {showMetaMaskBrowserSidebarLinks && (
          <button
            className={styles.iconButton}
            onClick={() => extensionStore.toggleIsPopupOpen()}
          >
            <Images.MetaMask fill="white" />
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
