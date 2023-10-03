import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GameInfo } from '../../../../common/types'
import { Images } from '@hyperplay/ui'
import TopNavBarStyles from '../TopNavBar/index.module.scss'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'

function fixFilter(text: string) {
  const regex = new RegExp(/([?\\|*|+|(|)|[|]|])+/, 'g')
  return text.replaceAll(regex, '')
}

export default observer(function SearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const input = useRef<HTMLInputElement>(null)

  const list = useMemo(() => {
    const library = new Set(
      [
        ...libraryState.epicLibrary,
        ...libraryState.gogLibrary,
        ...libraryState.sideloadedLibrary,
        ...libraryState.hyperPlayLibrary
      ]
        .filter(Boolean)
        .map((g) => g.title)
        .sort()
    )
    return [...library].filter((i) =>
      new RegExp(fixFilter(libraryState.filterText), 'i').test(i)
    )
  }, [
    libraryState.epicLibrary,
    libraryState.gogLibrary,
    libraryState.filterText
  ])

  // we have to use an event listener instead of the react
  // onChange callback so it works with the virtual keyboard
  useEffect(() => {
    if (input.current) {
      const element = input.current
      element.value = libraryState.filterText
      const handler = () => {
        libraryState.filterText = element.value
      }
      element.addEventListener('input', handler)
      return () => {
        element.removeEventListener('input', handler)
      }
    }
    return
  }, [input])

  const onClear = useCallback(() => {
    libraryState.filterText = ''
    if (input.current) {
      input.current.value = ''
      input.current.focus()
    }
  }, [input])

  const handleClick = (title: string) => {
    libraryState.filterText = ''
    if (input.current) {
      input.current.value = ''

      const game: GameInfo | undefined = getGameInfoByAppTitle(title)

      if (game !== undefined) {
        navigate(`/gamepage/${game.runner}/${game.app_name}`, {
          state: { gameInfo: game }
        })
      }
    }
  }

  const getGameInfoByAppTitle = (title: string) => {
    return (
      getGameInfoByAppTitleAndLibrary(libraryState.epicLibrary, title) ||
      getGameInfoByAppTitleAndLibrary(libraryState.gogLibrary, title) ||
      getGameInfoByAppTitleAndLibrary(libraryState.sideloadedLibrary, title)
    )
  }

  const getGameInfoByAppTitleAndLibrary = (
    library: GameInfo[],
    title: string
  ) => {
    return library.filter((g: GameInfo) => g.title === title).at(0)
  }

  return (
    <div className="SearchBar" data-testid="searchBar">
      <button
        className={TopNavBarStyles.iconButton}
        onClick={() => input.current?.focus()}
      >
        <Images.MagnifyingGlass fill="white" />
      </button>
      <input
        ref={input}
        data-testid="searchInput"
        placeholder={t('search')}
        // this id is used for the virtualkeyboard, don't change it,
        // if this must be changed, reflect the change in src/helpers/virtualKeyboard.ts#searchInput
        // and in src/helpers/gamepad.ts#isSearchInput
        id="search"
        className="searchBarInput"
      />
      {libraryState.filterText.length > 0 && (
        <>
          <ul className="autoComplete body-sm">
            {list.length > 0 &&
              list.map((title, i) => (
                <li
                  onClick={(e) => handleClick(e.currentTarget.innerText)}
                  key={i}
                >
                  {title}
                </li>
              ))}
          </ul>

          <button className="clearSearchButton" onClick={onClear} tabIndex={-1}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      )}
    </div>
  )
})
