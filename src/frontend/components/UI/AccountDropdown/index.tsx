import { Menu } from '@mantine/core'
import React from 'react'
import walletState from 'frontend/state/WalletState'
import { observer } from 'mobx-react-lite'

import Wallet from 'frontend/components/UI/Wallet'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import onboardingStore from 'frontend/store/OnboardingStore'
import { useTranslation } from 'react-i18next'
import { PROVIDERS } from 'common/types/proxy-types'
import authState from 'frontend/state/authState'
import { useFlags } from 'launchdarkly-react-client-sdk'

function NavigationMenuItem({
  label,
  to,
  showMetaMaskExtensionLinks
}: {
  label: string
  to: string
  showMetaMaskExtensionLinks: boolean
}) {
  return (
    <Menu.Item
      className={styles.menuItem}
      id={showMetaMaskExtensionLinks ? 'topMenuItemWalletDropdown' : undefined}
    >
      <NavLink
        to={to}
        id={showMetaMaskExtensionLinks ? 'topElementWalletDropdown' : undefined}
      >
        <div className={`body ${styles.itemContents}`}>{label}</div>
      </NavLink>
    </Menu.Item>
  )
}

const WalletDropdown: React.FC = observer(() => {
  const flags = useFlags()
  const { t } = useTranslation()
  const isAuthEnabled = flags.auth
  const showWalletConnectedLinks = walletState.isConnected
  const showMetaMaskExtensionLinks =
    walletState.isConnected &&
    walletState.provider === PROVIDERS.METAMASK_EXTENSION

  return (
    <Menu position="bottom" trigger="hover" zIndex={100001}>
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
        {showMetaMaskExtensionLinks && (
          <>
            <NavigationMenuItem
              label={t('hyperplay.viewFullscreen', `View fullscreen`)}
              to={'/metamaskHome'}
              showMetaMaskExtensionLinks={showMetaMaskExtensionLinks}
            ></NavigationMenuItem>
            <NavigationMenuItem
              label={t('hyperplay.viewItem', {
                defaultValue: 'View {{item}}',
                item: 'Snaps'
              })}
              showMetaMaskExtensionLinks={showMetaMaskExtensionLinks}
              to={'/metamaskSnaps'}
            ></NavigationMenuItem>
          </>
        )}
        {showWalletConnectedLinks && (
          <Menu.Item
            className={`${styles.menuItem} `}
            id={
              !showWalletConnectedLinks
                ? 'topMenuItemWalletDropdown'
                : undefined
            }
          >
            <NavLink
              to={'/metamaskPortfolio'}
              id={
                !showWalletConnectedLinks
                  ? 'topElementWalletDropdown'
                  : undefined
              }
            >
              <div className={`body ${styles.itemContents}`}>
                {t('hyperplay.viewPortfolio', `View portfolio`)}
              </div>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item
          className={styles.menuItem}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>
            {showWalletConnectedLinks
              ? t('hyperplay.changeWallet', `Change wallet`)
              : t('hyperplay.connectWallet', `Connect wallet`)}
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
        {isAuthEnabled && (
          <>
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
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
})

export default WalletDropdown
