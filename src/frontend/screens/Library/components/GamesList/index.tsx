import React, { useContext, useEffect, useMemo, useState } from 'react'
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
  const { favouriteGames } = useContext(ContextProvider)

  const favouriteGameMap = useMemo(() => {
    const gameMap = {}
    for (const game of favouriteGames.list) {
      gameMap[game.appName] = game
    }
    return gameMap
  }, [favouriteGames])

  useEffect(() => {
    let mounted = true

    const createGameCards = async () => {
      if (!library.length) {
        return
      }
      const resolvedLibrary = library.map(async (gameInfo) => {
        const { app_name, is_installed, runner } = gameInfo

        let is_dlc = false
        if (gameInfo.runner !== 'sideload') {
          is_dlc = gameInfo.install.is_dlc ?? false
        }

        if (is_dlc) {
          return null
        }
        if (!is_installed && onlyInstalled) {
          return null
        }

        const hasUpdate = is_installed && gameUpdates?.includes(app_name)
        return (
          <GameCard
            key={app_name}
            hasUpdate={hasUpdate}
            buttonClick={() => {
              if (gameInfo.runner !== 'sideload')
                handleGameCardClick(app_name, runner, gameInfo)
            }}
            forceCard={layout === 'grid'}
            isRecent={isRecent}
            gameInfo={gameInfo}
            favorited={favouriteGameMap[app_name]}
          />
        )
      })
      const gameCardElements = (await Promise.all(
        resolvedLibrary
      )) as JSX.Element[]

      if (mounted) {
        setGameCards(gameCardElements)
      }
    }

    createGameCards()

    return () => {
      mounted = false
    }
  }, [library, onlyInstalled, layout, gameUpdates, isRecent, showNonAvailable])

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
