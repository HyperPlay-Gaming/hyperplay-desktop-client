import React from 'react'
import { GameInfo, Runner } from 'common/types'
import cx from 'classnames'
import GameCard from '../GameCard'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'

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

const GamesList = observer(
  ({
    library = [],
    layout = 'grid',
    handleGameCardClick,
    isFirstLane = false,
    onlyInstalled = false,
    isRecent = false
  }: Props): JSX.Element => {
    const { t } = useTranslation()

    const favouriteGameMap = {}
    for (const game of libraryState.favouriteGames.list) {
      favouriteGameMap[game.appName] = game
    }

    if (!library.length) {
      return <></>
    }
    const gameCards = library
      .filter((gameInfo) => {
        const { is_installed } = gameInfo
        let is_dlc = false
        if (gameInfo.runner !== 'sideload') {
          is_dlc = gameInfo.install.is_dlc ?? false
        }

        if (is_dlc) {
          return false
        }
        if (!is_installed && onlyInstalled) {
          return false
        }

        return true
      })
      .map((gameInfo) => {
        const { app_name, is_installed, runner } = gameInfo

        const hasUpdate =
          is_installed && libraryState.gameUpdates?.includes(app_name)
        return (
          <GameCard
            key={app_name}
            hasUpdate={hasUpdate}
            buttonClick={() => {
              if (gameInfo.runner !== 'sideload')
                handleGameCardClick(app_name, runner, gameInfo)
            }}
            isRecent={isRecent}
            gameInfo={gameInfo}
            favorited={favouriteGameMap[app_name]}
          />
        )
      })

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
)

export default React.memo(GamesList)
