import { GameInfo, RecentGame } from 'common/types'
import { BrowserWindow } from 'electron'
import { backendEvents } from '../backend_events'
import { GlobalConfig } from '../config'
import { configStore } from '../constants'

const getRecentGames = async (options?: { limited: boolean }) => {
  const games = configStore.get('games.recent', []) as Array<RecentGame>
  if (options?.limited) {
    const { maxRecentGames: MAX_RECENT_GAMES = 5 } =
      await GlobalConfig.get().getSettings()
    return games.slice(0, MAX_RECENT_GAMES)
  } else {
    return games
  }
}

const setRecentGames = (recentGames: RecentGame[]) => {
  // store
  configStore.set('games.recent', recentGames)

  // emit
  const window = BrowserWindow.getAllWindows()[0]
  window.webContents.send('recentGamesChanged', recentGames)
  backendEvents.emit('recentGamesChanged', recentGames)
}

const addRecentGame = async (game: GameInfo) => {
  const games = await getRecentGames()

  // update list
  const updatedList = games.filter(
    (a) => a.appName && a.appName !== game.app_name
  )
  updatedList.unshift({ appName: game.app_name, title: game.title })
  setRecentGames(updatedList)
}

const removeRecentGame = async (appName: string) => {
  const games = await getRecentGames()

  if (games.length) {
    const updatedList = games.filter((a) => a.appName && a.appName !== appName)
    setRecentGames(updatedList)
  }
}

export { getRecentGames, addRecentGame, removeRecentGame, setRecentGames }
