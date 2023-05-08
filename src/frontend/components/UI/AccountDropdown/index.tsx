import { Menu } from '@mantine/core'
import React, { useContext } from 'react'
import Wallet from 'frontend/components/UI/Wallet'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import onboardingStore from 'frontend/store/OnboardingStore'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'

export default function AccountDropdown() {
  const { t } = useTranslation()
  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
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
        <Menu.Label className={styles.menuLabel}>
          {t('hyperplay.currentWallet', `Current wallet`)}
        </Menu.Label>
        {/* <Menu.Item className={`${styles.menuItem} `}>
          <div className={`body ${styles.itemContents}`}>
            {t('hyperplay.switchAccount', `Switch account`)}
          </div>
        </Menu.Item> */}
        {showMetaMaskBrowserSidebarLinks && (
          <Menu.Item
            className={`${styles.menuItem} `}
            id={
              showMetaMaskBrowserSidebarLinks
                ? 'topMenuItemWalletDropdown'
                : undefined
            }
          >
            <NavLink
              to={'/metamaskHome'}
              id={
                showMetaMaskBrowserSidebarLinks
                  ? 'topElementWalletDropdown'
                  : undefined
              }
            >
              <div className={`body ${styles.itemContents}`}>
                {t('hyperplay.viewFullscreen', `View fullscreen`)}
              </div>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item
          className={`${styles.menuItem} `}
          id={
            !showMetaMaskBrowserSidebarLinks
              ? 'topMenuItemWalletDropdown'
              : undefined
          }
        >
          <NavLink
            to={'/metamaskPortfolio'}
            id={
              !showMetaMaskBrowserSidebarLinks
                ? 'topElementWalletDropdown'
                : undefined
            }
          >
            <div className={`body ${styles.itemContents}`}>
              {t('hyperplay.viewPortfolio', `View portfolio`)}
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          className={`${styles.menuItem} `}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>
            {t('hyperplay.changeWallet', `Change wallet`)}
          </div>
        </Menu.Item>
        <Menu.Label className={styles.menuLabel}>
          Epic/GoG {t('accounts', `accounts`)}
        </Menu.Label>
        <Menu.Item className={`${styles.menuItem} `}>
          <NavLink to={'/login'}>
            <div className={`body ${styles.itemContents}`}>
              {t('userselector.manageaccounts', `Manage accounts`)}
            </div>
          </NavLink>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
