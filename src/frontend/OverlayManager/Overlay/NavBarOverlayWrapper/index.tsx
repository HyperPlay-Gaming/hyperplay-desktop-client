import React, { useState } from 'react'
import styles from './index.module.scss'
import { t } from 'i18next'
import { NavBarOverlay, NavItem, Images } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'

export function NavBarOverlayWrapper() {
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)
  const comingSoonText = t('overlay.comingSoon', 'Coming Soon')

  return (
    <NavBarOverlay
      linkItems={[
        <NavItem
          title={'Quests'}
          route={'/quests'}
          icon={<Images.QuestIcon fill="white" />}
          key={'/quests'}
          collapsed={collapsed}
          currentRoute={pathname === '/' ? '/quests' : pathname}
          component={Link}
          to={'/quests'}
        />,
        <NavItem
          title={'Portfolio'}
          route={'/portfolio'}
          icon={
            <Images.MetaMaskColored
              fill="none"
              width={22}
              height={36}
              opacity={pathname === '/portfolio' ? '100%' : '60%'}
            />
          }
          key={'/portfolio'}
          collapsed={collapsed}
          currentRoute={pathname}
          component={Link}
          to={'/portfolio'}
        />,
        <NavItem
          title={'Marketplace'}
          route={'/marketplace'}
          icon={<Images.Home fill="white" />}
          key={'/marketplace'}
          collapsed={collapsed}
          currentRoute={pathname}
          classNames={{ link: styles.disabled }}
          secondaryTag={comingSoonText}
        />,
        <NavItem
          title={'Achievements'}
          route={'/achievements'}
          icon={<Images.TrophyOutline fill="white" />}
          key={'/achievements'}
          collapsed={collapsed}
          currentRoute={pathname}
          classNames={{ link: styles.disabled }}
          secondaryTag={comingSoonText}
        />
      ]}
      setCollapsed={setCollapsed}
      collapsed={collapsed}
    />
  )
}
