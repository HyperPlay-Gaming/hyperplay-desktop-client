import React, { useState } from 'react'
import styles from './index.module.scss'
import { NavBarOverlay, NavItem, Images } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'
import { BrowserGameProps } from 'frontend/OverlayManager/types'
import { MarketplaceNavItem } from './MarketplaceNavItem'
import { useTranslation } from 'react-i18next'
import { PortfolioNavItem } from './PortfolioNavItem'

export function NavBarOverlayWrapper({ appName, runner }: BrowserGameProps) {
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()
  const comingSoonText = t('overlay.comingSoon', 'Coming Soon')

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
        <PortfolioNavItem key={'/portfolioNavItem'} collapsed={collapsed} />,
        <MarketplaceNavItem
          key={'/marketplaceNavItem'}
          appName={appName}
          runner={runner}
          collapsed={collapsed}
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
