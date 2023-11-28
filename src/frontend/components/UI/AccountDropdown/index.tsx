import { Menu } from '@mantine/core'
import React, { useContext } from 'react'
import Wallet from 'frontend/components/UI/Wallet'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import onboardingStore from 'frontend/store/OnboardingStore'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import authState from 'frontend/state/authState'
import { observer } from 'mobx-react-lite'

function NavigationMenuItem({ label, to }: { label: string; to: string }) {
  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
  return (
    <Menu.Item
      className={styles.menuItem}
      id={
        showMetaMaskBrowserSidebarLinks
          ? 'topMenuItemWalletDropdown'
          : undefined
      }
    >
      <NavLink
        to={to}
        id={
          showMetaMaskBrowserSidebarLinks
            ? 'topElementWalletDropdown'
            : undefined
        }
      >
        <div className={`body ${styles.itemContents}`}>{label}</div>
      </NavLink>
    </Menu.Item>
  )
}

function AccountDropdown() {
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
        {showMetaMaskBrowserSidebarLinks && (
          <>
            <NavigationMenuItem
              label={t('hyperplay.viewFullscreen', `View fullscreen`)}
              to={'/metamaskHome'}
            ></NavigationMenuItem>
            <NavigationMenuItem
              label={t('hyperplay.viewItem', {
                defaultValue: 'View {{item}}',
                item: 'Snaps'
              })}
              to={'/metamaskSnaps'}
            ></NavigationMenuItem>
          </>
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
          className={styles.menuItem}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>
            {t('hyperplay.changeWallet', `Change wallet`)}
          </div>
        </Menu.Item>
        <Menu.Label className={styles.menuLabel}>
          Epic/GoG {t('accounts', `accounts`)}
        </Menu.Label>
        <Menu.Item className={styles.menuItem}>
          <NavLink to={'/login'}>
            <div className={`body ${styles.itemContents}`}>
              {t('userselector.manageStore', `Manage stores`)}
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Label className={styles.menuLabel}>
          HyperPlay {t('accounts', `accounts`)}
        </Menu.Label>
        <Menu.Item
          onClick={() => authState.openSignInModal()}
          className={styles.menuItem}
        >
          <div className={`body ${styles.itemContents}`}>
            {t('userselector.manageaccounts', `Manage accounts`)}
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default observer(AccountDropdown)
