import React from 'react'
import { ContractMetadata } from '@valist/sdk/dist/typesApi'
import { SubLink } from '@hyperplay/ui'
import { Link, useLocation } from 'react-router-dom'
import styles from '../../index.module.scss'

export function MarketplaceSublinks(contractMetadata?: ContractMetadata[]) {
  const location = useLocation()
  const { pathname, search } = location
  const searchParams = new URLSearchParams(search)
  const urlQueryParam = searchParams.get('url')

  const marketplaceSublinks = contractMetadata
    ?.filter((val) => !!val.marketplace_urls)
    .flatMap((val) =>
      (val.marketplace_urls ?? [])
        .filter((val) => !!val)
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
  return marketplaceSublinks
}
