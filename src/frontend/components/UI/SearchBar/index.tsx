import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ContextProvider from 'frontend/state/ContextProvider'
import './index.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GameInfo } from '../../../../common/types'
import { Images } from '@hyperplay/ui'
import TopNavBarStyles from '../TopNavBar/index.module.scss'

function fixFilter(text: string) {
  const regex = new RegExp(/([?\\|*|+|(|)|[|]|])+/, 'g')
  return text.replaceAll(regex, '')
}

export default React.memo(function SearchBar() {
  const { handleSearch, filterText, epic, gog, sideloadedLibrary } =
    useContext(ContextProvider)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const input = useRef<HTMLInputElement>(null)

  const list = useMemo(() => {
    const library = new Set(
      [...epic.library, ...gog.library, ...sideloadedLibrary]
        .filter(Boolean)
        .map((g) => g.title)
        .sort()
    )
    return [...library].filter((i) =>
      new RegExp(fixFilter(filterText), 'i').test(i)
    )
  }, [epic.library, gog.library, filterText])

  // we have to use an event listener instead of the react
  // onChange callback so it works with the virtual keyboard
  useEffect(() => {
    if (input.current) {
      const element = input.current
      element.value = filterText
      const handler = () => {
        handleSearch(element.value)
      }
      element.addEventListener('input', handler)
      return () => {
        element.removeEventListener('input', handler)
      }
    }
    return
  }, [input])

  const onClear = useCallback(() => {
    handleSearch('')
    if (input.current) {
      input.current.value = ''
      input.current.focus()
    }
  }, [input])

  const handleClick = (title: string) => {
    handleSearch('')
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
      getGameInfoByAppTitleAndLibrary(epic.library, title) ||
      getGameInfoByAppTitleAndLibrary(gog.library, title) ||
      getGameInfoByAppTitleAndLibrary(sideloadedLibrary, title)
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
      {filterText.length > 0 && (
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
