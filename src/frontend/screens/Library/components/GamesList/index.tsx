import React, { useContext, useEffect, useState } from 'react'
import { GameInfo, Runner } from 'common/types'
import cx from 'classnames'
import GameCard from '../GameCard'
import ContextProvider from 'frontend/state/ContextProvider'
import { useTranslation } from 'react-i18next'

interface Props {
  library: GameInfo[]
  layout?: string
  isFirstLane?: boolean
  handleGameCardClick: (
    app_name: string,
    runner: Runner,
    gameInfo: GameInfo
  ) => void
  onlyInstalled?: boolean
  isRecent?: boolean
}

const storage = window.localStorage
const nonAvailbleGames = storage.getItem('nonAvailableGames') || '[]'
const nonAvailbleGamesArray = JSON.parse(nonAvailbleGames)

async function handleNonAvailableGames(appName: string, runner: Runner) {
  const gameAvailable = await window.api.isGameAvailable({
    appName,
    runner
  })

  if (!gameAvailable) {
    if (!nonAvailbleGamesArray.includes(appName)) {
      nonAvailbleGamesArray.push(appName)
      storage.setItem(
        'nonAvailableGames',
        JSON.stringify(nonAvailbleGamesArray)
      )
    }
  } else {
    if (nonAvailbleGamesArray.includes(appName)) {
      nonAvailbleGamesArray.splice(nonAvailbleGamesArray.indexOf(appName), 1)
      storage.setItem(
        'nonAvailableGames',
        JSON.stringify(nonAvailbleGamesArray)
      )
    }
  }
  return gameAvailable
}

const GamesList = ({
  library = [],
  layout = 'grid',
  handleGameCardClick,
  isFirstLane = false,
  onlyInstalled = false,
  isRecent = false
}: Props): JSX.Element => {
  const { gameUpdates, showNonAvailable } = useContext(ContextProvider)
  const { t } = useTranslation()
  const [gameCards, setGameCards] = useState<JSX.Element[]>([])

  useEffect(() => {
    const createGameCards = async () => {
      if (!library.length) {
        return
      }
      const resolvedLibrary = library.map(async (gameInfo) => {
        const {
          app_name,
          is_installed,
          runner,
          install: { is_dlc }
        } = gameInfo
        if (is_dlc) {
          return null
        }
        if (!is_installed && onlyInstalled) {
          return null
        }

        let isAvailable = is_installed

        if (is_installed) {
          isAvailable = await handleNonAvailableGames(app_name, runner)
        }

        const hasUpdate = is_installed && gameUpdates?.includes(app_name)
        return (
          <GameCard
            key={app_name}
            hasUpdate={hasUpdate}
            buttonClick={() => handleGameCardClick(app_name, runner, gameInfo)}
            isAvailable={isAvailable}
            forceCard={layout === 'grid'}
            isRecent={isRecent}
            gameInfo={gameInfo}
          />
        )
      })
      const gameCardElements = (await Promise.all(
        resolvedLibrary
      )) as JSX.Element[]

      setGameCards(gameCardElements)
    }

    createGameCards()
  }, [
    library,
    onlyInstalled,
    layout,
    gameUpdates,
    isRecent,
    nonAvailbleGamesArray,
    showNonAvailable
  ])

  return (
    <div
      style={!library.length ? { backgroundColor: 'transparent' } : {}}
      className={cx({
        gameList: layout === 'grid',
        gameListLayout: layout === 'list',
        firstLane: isFirstLane
      })}
    >
      {layout === 'list' && (
        <div className="gameListHeader">
          <span>{t('game.title', 'Game Title')}</span>
          <span>{t('game.status', 'Status')}</span>
          <span>{t('game.store', 'Store')}</span>
          <span>{t('wine.actions', 'Action')}</span>
        </div>
      )}
      {!!library.length && gameCards}
    </div>
  )
}

export default React.memo(GamesList)
