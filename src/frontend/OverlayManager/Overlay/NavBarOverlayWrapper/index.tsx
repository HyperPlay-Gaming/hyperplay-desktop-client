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
          icon={<Images.QuestIcon fill="white" />}
          key={'/quests'}
          collapsed={collapsed}
          selected={pathname === '/quests'}
          component={Link}
          to={'/quests'}
        />,
        <NavItem
          title={'Portfolio'}
          icon={<Images.MetaMaskColored fill="none" width={22} height={36} />}
          key={'/portfolio'}
          collapsed={collapsed}
          selected={pathname === '/portfolio'}
          component={Link}
          to={'/portfolio'}
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
