import { logDebug, logError, logInfo, LogPrefix } from 'backend/logger/logger'
import { importGame } from 'backend/storeManagers/hyperplay/games'
import { addGameToLibrary } from 'backend/storeManagers/hyperplay/library'
import { ipcMain } from 'electron'
import { readdirSync, readFileSync, statSync } from 'graceful-fs'
import { join } from 'path'

ipcMain.handle('importGameFolder', async (ev, gameFolder) => {
  logInfo(`Importing all games in folder ${gameFolder}`, LogPrefix.HyperPlay)

  let atLeastOneGameImported = false
  const accountFolders = readdirSync(gameFolder)
  for (const account_i of accountFolders) {
    const accountFolder_i = join(gameFolder, account_i)
    logDebug(
      `Importing all games in account folder ${accountFolder_i}`,
      LogPrefix.HyperPlay
    )
    if (!statSync(accountFolder_i).isDirectory()) {
      logDebug(
        `This path is not a folder. Skipping import. Path: ${accountFolder_i}`,
        LogPrefix.HyperPlay
      )
      continue
    }
    const projectFolders = readdirSync(accountFolder_i)
    for (const project_i of projectFolders) {
      const projectFolder_i = join(accountFolder_i, project_i)
      logDebug(
        `Importing all games in project folder ${accountFolder_i}`,
        LogPrefix.HyperPlay
      )
      if (!statSync(projectFolder_i).isDirectory()) {
        logDebug(
          `This path is not a folder. Skipping import. Path: ${projectFolder_i}`,
          LogPrefix.HyperPlay
        )
        continue
      }
      const gameTopLevelFiles = readdirSync(projectFolder_i)
      for (const file_i of gameTopLevelFiles) {
        try {
          const filePath_i = join(projectFolder_i, file_i)
          if (file_i.startsWith('0x') && file_i.endsWith('.json')) {
            logDebug(`Found manifest file ${filePath_i}`, LogPrefix.HyperPlay)
            const manifest = JSON.parse(readFileSync(filePath_i).toString())
            const appName =
              manifest?.manifest?.appName || file_i.replace('.json', '')
            logDebug(`app name to import ${appName}`, LogPrefix.HyperPlay)
            await addGameToLibrary(appName)
            await importGame(appName, projectFolder_i)
            atLeastOneGameImported = true
          }
        } catch (err) {
          logError(`There was an error importing ${file_i}. Error ${err}`)
        }
      }
    }
  }
  if (!atLeastOneGameImported) {
    throw 'No games were imported'
  }
  return `Successfully imported games from ${gameFolder}`
})
