import { DEV_PORTAL_URL } from 'common/constants'
import { ipcMain } from 'electron'

ipcMain.handle('getQuests', async (e, projectId) => {
  let url = `${DEV_PORTAL_URL}api/v1/quests?questStatus=ACTIVE`
  if (projectId) {
    url += `&projectId=${projectId}`
  }
  const questMetaResults = await fetch(url)
  const questsMetaJson = await questMetaResults.json()
  return questsMetaJson
})

ipcMain.handle('getQuest', async (e, questId) => {
  const questResult = await fetch(`https://api.valist.io/v1/quests/${questId}`)
  const questResultJson = await questResult.json()
  return questResultJson
})

ipcMain.handle('getSteamGameMetadata', async (e, gameId) => {
  const result = await fetch(`${DEV_PORTAL_URL}api/v1/steam/games/${gameId}`)
  const resultJson = await result.json()
  return resultJson
})
