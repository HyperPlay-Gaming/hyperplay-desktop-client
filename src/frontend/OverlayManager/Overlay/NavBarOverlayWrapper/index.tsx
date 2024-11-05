import React, { useState } from 'react'
import styles from './index.module.scss'
import { NavBarOverlay, NavItem, Images, SubLink } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BrowserGameProps } from 'frontend/OverlayManager/types'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

export function NavBarOverlayWrapper({ appName, runner }: BrowserGameProps) {
  const location = useLocation()
  const { pathname, search } = location
  const searchParams = new URLSearchParams(search)
  const urlQueryParam = searchParams.get('url')
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()
  const comingSoonText = t('overlay.comingSoon', 'Coming Soon')
  const [mmCollapsed, mmSetCollapsed] = useState(false)
  const [mktCollapsed, setMktCollapsed] = useState(false)

  const { data } = useQuery({
    queryKey: ['getGameInfo', appName],
    queryFn: async () => {
      return window.api.getGameInfo(appName, runner)
    }
  })

  const marketplaceEnabled =
    !!data && !!data.networks?.some((val) => !!val.marketplace_urls?.length)
  const marketplaceClass: Record<string, boolean> = {}
  marketplaceClass[styles.disabled] = !marketplaceEnabled

  const mktplaceSublinks = data?.networks
    ?.filter((val) => !!val.marketplace_urls)
    .flatMap((val) =>
      val
        .marketplace_urls!.filter((val) => !!val)
        .map((mktUrl) => {
          return (
            <SubLink
              key={val.name}
              component={Link}
              to={`/marketplace?url=${encodeURIComponent(mktUrl)}`}
              selected={pathname === '/marketplace' && urlQueryParam === mktUrl}
              className={styles.sublink}
            >
              {val.name}
            </SubLink>
          )
        })
    )

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
        />,
        <NavItem
          title={'Marketplace'}
          icon={<Images.Home fill="white" />}
          key={'/marketplace'}
          collapsed={collapsed}
          selected={pathname === '/marketplace'}
          classNames={{ link: classNames(marketplaceClass) }}
          secondaryTag={marketplaceEnabled ? undefined : comingSoonText}
          subLinks={marketplaceEnabled ? mktplaceSublinks : undefined}
          subLinksCollapsed={mktCollapsed}
          setSubLinksCollapsed={() => setMktCollapsed(!mktCollapsed)}
          onClick={() => setMktCollapsed(!mktCollapsed)}
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
