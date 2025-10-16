import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './index.module.scss'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Images } from '@hyperplay/ui'
import TopNavBarStyles from '../TopNavBar/index.module.scss'

type ListingApi = {
  project_meta?: { name?: string }
  project_name?: string
  id?: string
  project_id?: string
  account_name?: string
  account_meta?: { name?: string }
}

type GameResult = {
  title: string
  appId: string
  storeUrl: string
  accountName: string
  projectName: string
}

export default function SearchBarDiscover() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const input = useRef<HTMLInputElement>(null)
  const [filterText, setFilterText] = useState('')
  const [searchResults, setSearchResults] = useState<GameResult[]>([])

  const searchGames = async (searchText: string) => {
    if (!searchText.trim()) {
      setSearchResults([])
      return
    }

    try {
      const res = await fetch(
        `https://developers.hyperplay.xyz/api/v2/listings?search=${encodeURIComponent(
          searchText
        )}&pageSize=20`
      )
      const data = await res.json()

      const listings = Array.isArray(data) ? data : []
      const mapped: GameResult[] = listings
        .map((listing: ListingApi) => ({
          title:
            (listing.project_meta?.name ??
              listing.project_name ??
              listing.id) ||
            '',
          appId:
            (listing.project_id ?? listing.id ?? listing.project_name) || '',
          storeUrl:
            listing.account_name && listing.project_name
              ? `/store/game/${listing.account_name}/${listing.project_name}`
              : '',
          accountName: listing.account_name || listing.account_meta?.name || '',
          projectName: listing.project_name || ''
        }))
        .filter(
          (game) =>
            game.title &&
            game.title.trim() !== '' &&
            game.accountName &&
            game.projectName
        )

      setSearchResults(mapped)
    } catch (e) {
      console.error('Search error:', e)
      setSearchResults([])
    }
  }

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filterText.trim()) {
        searchGames(filterText)
      } else {
        setSearchResults([])
      }
    }, 300) // 300ms

    return () => clearTimeout(timeoutId)
  }, [filterText])

  const showAutoComplete = searchResults.length > 0 && filterText.length > 0

  const onClear = useCallback(() => {
    setFilterText('')
    if (input.current) {
      input.current.value = ''
      input.current.focus()
    }
  }, [input])

  function handleGameClick(game: GameResult) {
    navigate(
      `/store-page?store-url=https://store.hyperplay.xyz/game/${game.accountName}/${game.projectName}`,
      {
        state: {
          fromHyperPlayStore: true
        }
      }
    )
  }

  return (
    <div className="SearchBar" data-testid="searchBar">
      <button
        className={TopNavBarStyles.iconButton}
        onClick={() => input.current?.focus()}
      >
        <Images.MagnifyingGlass fill="var(--icon-neutral)" />
      </button>
      <input
        ref={input}
        data-testid="searchInput"
        placeholder={t('search')}
        id="search"
        className="searchBarInput"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      {showAutoComplete ? (
        <>
          <ul className="autoComplete body-sm">
            {searchResults.map((game) => (
              <li
                key={game.appId}
                className="search-result-item"
                onClick={() => handleGameClick(game)}
              >
                {game.title}
              </li>
            ))}
          </ul>
          <button className="clearSearchButton" onClick={onClear} tabIndex={-1}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      ) : null}
    </div>
  )
}
