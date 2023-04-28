import React from 'react'
import styles from './index.module.scss'
import { HyperPlayLogoWhite } from 'frontend/assets/hyperplay'
import { Images } from '@hyperplay/ui'
import Wallet from '../Sidebar/components/wallet'
import onboardingStore from 'frontend/store/OnboardingStore'
import SearchBar from '../SearchBar'

export default function TopNavBar() {
  return (
    <div className={styles.navBar}>
      <div>
        <HyperPlayLogoWhite
          height="27px"
          width="27px"
          className={styles.hpLogo}
        />
        <Images.HyperPlayTextLogo fill="white" />
        <div className={styles.alphaBadge}>
          <div className="caption">Public Alpha</div>
        </div>
      </div>
      <div>
        <SearchBar />
        <button className={styles.iconButton}>
          <Images.MagnifyingGlass fill="white" />
        </button>
        <button className={styles.iconButton}>
          <Images.MetaMask fill="white" />
        </button>
        <div style={{ width: '200px' }}>
          <Wallet onClick={() => onboardingStore.openOnboarding()} />
        </div>
      </div>
    </div>
  )
}
