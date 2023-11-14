import { Menu } from '@mantine/core'
import React from 'react'
import walletStore from 'frontend/state/WalletState'
import { observer } from 'mobx-react-lite'

import Wallet from 'frontend/components/UI/Wallet'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import onboardingStore from 'frontend/store/OnboardingStore'
import { useTranslation } from 'react-i18next'

function NavigationMenuItem({
  label,
  to,
  showWalletLinks
}: {
  label: string
  to: string
  showWalletLinks: boolean
}) {
  return (
    <Menu.Item
      className={styles.menuItem}
      id={showWalletLinks ? 'topMenuItemWalletDropdown' : undefined}
    >
      <NavLink
        to={to}
        id={showWalletLinks ? 'topElementWalletDropdown' : undefined}
      >
        <div className={`body ${styles.itemContents}`}>{label}</div>
      </NavLink>
    </Menu.Item>
  )
}

const WalletDropdown: React.FC = observer(() => {
  const { t } = useTranslation()
  const showWalletLinks = walletStore.isConnected

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
        {showWalletLinks && (
          <>
            <NavigationMenuItem
              label={t('hyperplay.viewFullscreen', `View fullscreen`)}
              to={'/metamaskHome'}
              showWalletLinks={showWalletLinks}
            ></NavigationMenuItem>
            <NavigationMenuItem
              label={t('hyperplay.viewItem', {
                defaultValue: 'View {{item}}',
                item: 'Snaps'
              })}
              showWalletLinks={showWalletLinks}
              to={'/metamaskSnaps'}
            ></NavigationMenuItem>
          </>
        )}
        {showWalletLinks && (
          <Menu.Item
            className={`${styles.menuItem} `}
            id={!showWalletLinks ? 'topMenuItemWalletDropdown' : undefined}
          >
            <NavLink
              to={'/metamaskPortfolio'}
              id={!showWalletLinks ? 'topElementWalletDropdown' : undefined}
            >
              <div className={`body ${styles.itemContents}`}>
                {t('hyperplay.viewPortfolio', `View portfolio`)}
              </div>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item
          className={`${styles.menuItem} `}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>
            {showWalletLinks
              ? t('hyperplay.changeWallet', `Change wallet`)
              : t('hyperplay.connectWallet', `Connect wallet`)}
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
})

export default WalletDropdown
