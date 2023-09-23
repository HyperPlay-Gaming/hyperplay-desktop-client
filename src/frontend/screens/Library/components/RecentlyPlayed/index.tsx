import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GameInfo, Runner } from 'common/types'
import GamesList from '../GamesList'
import { configStore } from 'frontend/helpers/electronStores'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'

interface Props {
  handleModal: (appName: string, runner: Runner, gameInfo: GameInfo) => void
  onlyInstalled: boolean
}

function getRecentGames(libraries: GameInfo[], limit: number): GameInfo[] {
  const recentGames = configStore.get('games.recent', [])

  const games: GameInfo[] = []

  for (const recent of recentGames) {
    const found = libraries.find((game) => game.app_name === recent.appName)
    if (found) {
      games.push(found)
      if (games.length === limit) break
    }
  }

  return games
}

export default React.memo(
  observer(function RecentlyPlayed({ handleModal, onlyInstalled }: Props) {
    const { t } = useTranslation()
    const [recentGames, setRecentGames] = useState<GameInfo[]>([])

    const loadRecentGames = async () => {
      const { maxRecentGames } = await window.api.requestAppSettings()
      const newRecentGames = getRecentGames(
        [
          ...libraryState.epicLibrary,
          ...libraryState.gogLibrary,
          ...libraryState.sideloadedLibrary
        ],
        maxRecentGames
      )

      setRecentGames(newRecentGames)
    }

    useEffect(() => {
      loadRecentGames()

      const onRecentGamesUpdated = () => {
        loadRecentGames()
      }

      const recentGamesChangedRemoveListener =
        window.api.handleRecentGamesChanged(onRecentGamesUpdated)

      return () => {
        recentGamesChangedRemoveListener()
      }
    }, [libraryState.epicLibrary, libraryState.gogLibrary, libraryState.sideloadedLibrary])

    if (!recentGames.length) {
      return null
    }

    return (
      <>
        <h5 className="libraryHeader">{t('Recent', 'Played Recently')}</h5>
        <GamesList
          library={recentGames}
          isFirstLane
          handleGameCardClick={handleModal}
          onlyInstalled={onlyInstalled}
          isRecent={true}
        />
      </>
    )
  })
)
