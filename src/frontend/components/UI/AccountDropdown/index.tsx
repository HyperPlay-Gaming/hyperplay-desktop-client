import { Divider, Menu } from '@mantine/core'
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
import classNames from 'classnames'
import useAuthSession from '../../../hooks/useAuthSession'

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
  const { isSignedIn, invalidateQuery } = useAuthSession()
  const { t } = useTranslation()
  const showWalletConnectedLinks = walletState.isConnected
  const showMetaMaskExtensionLinks =
    walletState.isConnected &&
    walletState.provider === PROVIDERS.METAMASK_EXTENSION

  return (
    <Menu
      position="bottom-end"
      trigger="hover"
      zIndex={100001}
      classNames={{
        dropdown: styles.menuDropdown,
        item: styles.menuItem,
        label: classNames('eyebrow', styles.menuLabel)
      }}
    >
      <Menu.Target>
        <div>
          <Wallet
            onClick={() => {
              console.log('wallet clicked')
            }}
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label className={styles.menuLabel}>
          {t('hyperplay.currentWallet', `Current wallet`)}
        </Menu.Label>
        <Menu.Item
          className={styles.menuItem}
          onClick={() => onboardingStore.openOnboarding()}
        >
          <div className={`body ${styles.itemContents}`}>
            {showWalletConnectedLinks
              ? t('hyperplay.changeWallet', `Swap wallet account`)
              : t('hyperplay.connectWallet', `Connect wallet`)}
          </div>
        </Menu.Item>
        {showMetaMaskExtensionLinks && (
          <>
            <NavigationMenuItem
              label={t('hyperplay.viewMyAccount', `View my account`)}
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
        {showMetaMaskExtensionLinks && (
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
        <Menu.Label>Epic/GoG {t('accounts', `accounts`)}</Menu.Label>
        <Menu.Item>
          <NavLink to={'/login'}>
            <div className={`body ${styles.itemContents}`}>
              {t('userselector.manageStore', `Manage stores`)}
            </div>
          </NavLink>
        </Menu.Item>
        <Divider className={styles.divider} />
        <Menu.Label>HyperPlay {t('profile', `Profile`)}</Menu.Label>
        {isSignedIn ? (
          <>
            <Menu.Item onClick={() => authState.openSignInModal()}>
              <div className={`body ${styles.itemContents}`}>
                {t('userselector.manageaccounts', `Manage accounts`)}
              </div>
            </Menu.Item>
            <Menu.Item
              onClick={async () => {
                await window.api.logOut()
                await invalidateQuery()
              }}
            >
              <div className={`body ${styles.itemContents} ${styles.logOut}`}>
                {t('hyperplay.logOut', `Log out`)}
              </div>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item onClick={() => authState.openSignInModal()}>
            <div className={`body ${styles.itemContents}`}>
              {t('userselector.logIn', `Log in`)}
            </div>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
})

export default WalletDropdown
