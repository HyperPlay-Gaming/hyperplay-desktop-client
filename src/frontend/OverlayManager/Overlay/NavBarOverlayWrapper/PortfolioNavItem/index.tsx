import React, { useState } from 'react'
import styles from '../index.module.scss'
import { NavItem, Images, SubLink } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface PortfolioNavItemProps {
  collapsed: boolean
}

export function PortfolioNavItem({ collapsed }: PortfolioNavItemProps) {
  const location = useLocation()
  const { pathname } = location
  const [mmCollapsed, mmSetCollapsed] = useState(false)
  const { t } = useTranslation()

  return (
    <NavItem
      title={t('overlay.links.portfolio', 'Portfolio')}
      icon={<Images.MetaMaskColored fill="none" width={22} height={36} />}
      key={'/portfolio'}
      collapsed={collapsed}
      selected={pathname.startsWith('/portfolio')}
      onClick={() => mmSetCollapsed(!mmCollapsed)}
      subLinksCollapsed={mmCollapsed}
      setSubLinksCollapsed={() => mmSetCollapsed(!mmCollapsed)}
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
  )
}
