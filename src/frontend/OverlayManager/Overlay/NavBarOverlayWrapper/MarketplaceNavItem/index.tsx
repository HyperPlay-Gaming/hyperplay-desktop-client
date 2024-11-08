import React, { useState } from 'react'
import { Images, NavItem } from '@hyperplay/ui'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BrowserGameProps } from 'frontend/OverlayManager/types'
import styles from '../index.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { MarketplaceSublinks } from './MarketplaceSublinks'

export interface MarketplaceNavItemProps extends BrowserGameProps {
  collapsed: boolean
}

export function MarketplaceNavItem({
  appName,
  runner,
  collapsed,
  ...props
}: MarketplaceNavItemProps) {
  const location = useLocation()
  const { pathname } = location
  const [mktCollapsed, setMktCollapsed] = useState(false)
  const { t } = useTranslation()

  const { data: gameInfo } = useQuery({
    queryKey: ['getGameInfo', appName],
    queryFn: async () => {
      return window.api.getGameInfo(appName, runner)
    }
  })

  const gameInfoExists = !!gameInfo
  const gameInfoHasSomeMarketplaceUrls = !!gameInfo?.networks?.some(
    (val) => !!val.marketplace_urls?.length
  )
  const marketplaceEnabled = gameInfoExists && gameInfoHasSomeMarketplaceUrls
  const marketplaceClass: Record<string, boolean> = {}
  marketplaceClass[styles.disabled] = !marketplaceEnabled

  if (!marketplaceEnabled) {
    return null
  }

  return (
    <NavItem
      title={t('overlay.links.marketplace', 'Marketplace')}
      icon={<Images.Home fill="white" />}
      key={'/marketplace'}
      collapsed={collapsed}
      selected={pathname === '/marketplace'}
      classNames={{ link: classNames(marketplaceClass) }}
      subLinks={
        marketplaceEnabled ? MarketplaceSublinks(gameInfo?.networks) : undefined
      }
      subLinksCollapsed={mktCollapsed}
      setSubLinksCollapsed={() => setMktCollapsed(!mktCollapsed)}
      onClick={() => setMktCollapsed(!mktCollapsed)}
      {...props}
    />
  )
}
