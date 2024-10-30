import React, { useState } from 'react'
import styles from './index.module.scss'
import { t } from 'i18next'
import { NavBarOverlay, NavItem, Images, SubLink } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'

export function NavBarOverlayWrapper() {
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)
  const comingSoonText = t('overlay.comingSoon', 'Coming Soon')
  const [mmCollapsed, mmSetCollapsed] = useState(false)

  return (
    <NavBarOverlay
      linkItems={[
        <NavItem
          title={'Quests'}
          icon={<Images.QuestIcon fill="white" />}
          key={'/quests'}
          collapsed={collapsed}
          selected={pathname === '/' || pathname === '/quests'}
          component={Link}
          to={'/quests'}
        />,
        <NavItem
          title={'Portfolio'}
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
              Portfolio
            </SubLink>,
            <SubLink
              key={'Swap'}
              component={Link}
              to={'/portfolio/swap'}
              selected={pathname === '/portfolio/swap'}
              className={styles.sublink}
            >
              Swap
            </SubLink>,
            <SubLink
              key={'Bridge'}
              component={Link}
              to={'/portfolio/bridge'}
              selected={pathname === '/portfolio/bridge'}
              className={styles.sublink}
            >
              Bridge
            </SubLink>,
            <SubLink
              key={'Buy'}
              component={Link}
              to={'/portfolio/buy'}
              selected={pathname === '/portfolio/buy'}
              className={styles.sublink}
            >
              Buy
            </SubLink>,
            <SubLink
              key={'Sell'}
              component={Link}
              to={'/portfolio/sell'}
              selected={pathname === '/portfolio/sell'}
              className={styles.sublink}
            >
              Sell
            </SubLink>
          ]}
        />,
        <NavItem
          title={'Marketplace'}
          icon={<Images.Home fill="white" />}
          key={'/marketplace'}
          collapsed={collapsed}
          selected={pathname === '/marketplace'}
          classNames={{ link: styles.disabled }}
          secondaryTag={comingSoonText}
        />,
        <NavItem
          title={'Achievements'}
          icon={<Images.TrophyOutline fill="white" />}
          key={'/achievements'}
          collapsed={collapsed}
          selected={pathname === '/achievements'}
          classNames={{ link: styles.disabled }}
          secondaryTag={comingSoonText}
        />
      ]}
      setCollapsed={setCollapsed}
      collapsed={collapsed}
    />
  )
}
