import React, { useState } from 'react'
import styles from '../index.module.scss'
import { NavItem, Images, SubLink } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import walletState from 'frontend/state/WalletState'
import { PROVIDERS } from '@hyperplay/utils'
import classNames from 'classnames'
import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export interface PortfolioNavItemProps {
  collapsed: boolean
}

export const PortfolioNavItem = observer(
  ({ collapsed }: PortfolioNavItemProps) => {
    const location = useLocation()
    const { pathname } = location
    const [mmCollapsed, mmSetCollapsed] = useState(false)
    const { t } = useTranslation()
    const [opened, { close, open }] = useDisclosure(false)

    const enablePortfolioNavItem =
      walletState.isConnected &&
      (walletState.provider === PROVIDERS.METAMASK_EXTENSION ||
        walletState.provider === PROVIDERS.METAMASK_MOBILE)

    const navItemClasses: Record<string, boolean> = {}
    navItemClasses[styles.disabled] = !enablePortfolioNavItem

    return (
      <Popover
        opened={opened && !enablePortfolioNavItem}
        unstyled
        classNames={{ dropdown: styles.popoverDropdown, arrow: styles.arrow }}
        position="bottom-start"
        offset={0}
        withArrow
        arrowPosition="side"
        arrowOffset={16}
      >
        <Popover.Target>
          <div>
            <NavItem
              onMouseEnter={open}
              onMouseLeave={close}
              title={t('overlay.links.portfolio', 'Portfolio')}
              icon={
                <Images.MetaMaskColored fill="none" width={22} height={36} />
              }
              key={'/portfolio'}
              collapsed={collapsed}
              selected={pathname.startsWith('/portfolio')}
              onClick={() => mmSetCollapsed(!mmCollapsed)}
              subLinksCollapsed={mmCollapsed || !enablePortfolioNavItem}
              setSubLinksCollapsed={() => mmSetCollapsed(!mmCollapsed)}
              classNames={{ link: classNames(navItemClasses) }}
              subLinks={[
                <SubLink
                  key={'Portfolio'}
                  component={Link}
                  to={'/portfolio'}
                  selected={pathname === '/portfolio'}
                  className={styles.sublink}
                >
                  {t('overlay.links.portfolio', 'Portfolio')}
                </SubLink>,
                <SubLink
                  key={'Swap'}
                  component={Link}
                  to={'/portfolio/swap'}
                  selected={pathname === '/portfolio/swap'}
                  className={styles.sublink}
                >
                  {t('overlay.links.swap', 'Swap')}
                </SubLink>,
                <SubLink
                  key={'Bridge'}
                  component={Link}
                  to={'/portfolio/bridge'}
                  selected={pathname === '/portfolio/bridge'}
                  className={styles.sublink}
                >
                  {t('overlay.links.bridge', 'Bridge')}
                </SubLink>,
                <SubLink
                  key={'Buy'}
                  component={Link}
                  to={'/portfolio/buy'}
                  selected={pathname === '/portfolio/buy'}
                  className={styles.sublink}
                >
                  {t('overlay.links.buy', 'Buy')}
                </SubLink>,
                <SubLink
                  key={'Sell'}
                  component={Link}
                  to={'/portfolio/sell'}
                  selected={pathname === '/portfolio/sell'}
                  className={styles.sublink}
                >
                  {t('overlay.links.sell', 'Sell')}
                </SubLink>
              ]}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <div className={classNames('caption', styles.unsupportedModalTitle)}>
            {t('wallet.unsupported', 'Unsupported Wallet Connection')}
          </div>
          <div className="caption-sm color-neutral-400">
            {t(
              'wallet.portfolio.onlyExtension',
              'MetaMask Portfolio is only available when connected with MetaMask.'
            )}
          </div>
        </Popover.Dropdown>
      </Popover>
    )
  }
)
