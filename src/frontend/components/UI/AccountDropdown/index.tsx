import { Menu } from '@mantine/core'
import React from 'react'
import Wallet from 'frontend/components/UI/Wallet'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import onboardingStore from 'frontend/store/OnboardingStore'

export default function AccountDropdown() {
  return (
    <Menu position="bottom" trigger="hover">
      <Menu.Target>
        <div>
          <Wallet
            onClick={() => {
              console.log('wallet clicked')
            }}
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown className={styles.menuDropdown}>
        <Menu.Label className={styles.menuLabel}>Current wallet</Menu.Label>
        <Menu.Item className={`${styles.menuItem} `}>
          <div className={`body ${styles.itemContents}`}>
            Swap wallet account
          </div>
        </Menu.Item>
        <Menu.Item className={`${styles.menuItem} `}>
          <div className={`body ${styles.itemContents}`}>View my account</div>
        </Menu.Item>
        <Menu.Item className={`${styles.menuItem} `}>
          <NavLink to={'/metamaskPortfolio'}>
            <div className={`body ${styles.itemContents}`}>View portfolio</div>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          className={`${styles.menuItem} `}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>Change wallet</div>
        </Menu.Item>
        <Menu.Label className={styles.menuLabel}>Epic/GoG accounts</Menu.Label>
        <Menu.Item className={`${styles.menuItem} `}>
          <NavLink to={'/login'}>
            <div className={`body ${styles.itemContents}`}>Manage accounts</div>
          </NavLink>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
