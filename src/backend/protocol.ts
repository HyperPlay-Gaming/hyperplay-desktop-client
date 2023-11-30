import { dialog } from 'electron'
import { logError, logInfo, LogPrefix } from './logger/logger'
import i18next from 'i18next'
import { getInfo } from './utils'
import { GameInfo, Runner } from 'common/types'
import { getMainWindow, sendFrontendMessage } from './main_window'
import { icon } from './constants'
import { getGameInfo } from 'backend/storeManagers/hyperplay/games'
import { addGameToLibrary } from 'backend/storeManagers/hyperplay/library'

type Command =
  | 'ping'
  | 'launch'
  | 'oauth-completed'
  | 'email-verified'
  | 'email-confirmation'

const RUNNERS = ['hyperplay', 'legendary', 'gog', 'nile', 'sideload']

/**
 * Handles a protocol request
 * @param args The args to search
 * @example
 * handleProtocol(['hyperplay://ping'])
 * // => 'Received ping! Arg: undefined'
 * handleProtocol(['hyperplay://launch/hyperplay/<account_id>/<project_id>'])
 * // => 'Received launch! Runner: hyperplay, Arg: 123'
 **/
export async function handleProtocol(args: string[]) {
  logInfo(`handling ${JSON.stringify(args)}`, LogPrefix.HyperPlay)
  const mainWindow = getMainWindow()

  const url = getUrl(args)
  if (!url) {
    return
  }

  const [command, runner, arg = ''] = parseUrl(url)

  logInfo(`received '${url}'`, LogPrefix.ProtocolHandler)

  const emailConfirmationUrl = decodeURIComponent(arg)
  logInfo(`emailConfirmationUrl ${emailConfirmationUrl}`, LogPrefix.HyperPlay)

  switch (command) {
    case 'ping':
      return handlePing(arg)
    case 'launch':
      await handleLaunch(runner, arg, mainWindow)
      break
    case 'oauth-completed':
      sendFrontendMessage('oauthCompleted')
      break
    case 'email-verified':
      sendFrontendMessage('emailVerified')
      break
    case 'email-confirmation':
      sendFrontendMessage('emailConfirmation', emailConfirmationUrl)
      break
    default:
      return
  }
}

/**
 * Gets the url from the args
 * @param args The args to search
 * @returns The url if found, undefined otherwise
 * @example
 * getUrl(['hyperplay://ping'])
 * // => 'hyperplay://ping'
 * getUrl(['hyperplay://launch/hyperplay/123'])
 * // => 'hyperplay://launch/hyperplay/123'
 * getUrl(['hyperplay://launch/legendary/123'])
 * // => 'hyperplay://launch/legendary/123'
 **/
function getUrl(args: string[]): string | undefined {
  return args.find((arg) => arg.startsWith('hyperplay://'))
}

/**
 * Parses a url into a tuple of [Command, Runner?, string?]
 * @param url The url to parse
 * @returns A tuple of [Command, Runner?, string?]
 * @example
 * parseUrl('hyperplay://ping')
 * // => ['ping', undefined, undefined]
 * parseUrl('hyperplay://launch/hyperplay/123')
 * // => ['launch', 'hyperplay', '123']
 * parseUrl('hyperplay://launch/legendary/123')
 * // => ['launch', 'legendary', '123']
 **/
export function parseUrl(url: string): [Command, Runner?, string?, string?] {
  const [, fullCommand] = url.split('://')

  const urlObject = new URL(url)

  //check if the second param is a runner or not and adjust parts accordingly
  const splitCommand = fullCommand.split('/')
  const hasRunner = RUNNERS.includes(splitCommand[1] as Runner)
  if (hasRunner) {
    if (splitCommand.length === 3) {
      const [command, runner, appId] = splitCommand
      return [command as Command, runner as Runner, appId]
    } else {
      // account id and project id must have been passed
      const [command, runner, accountId, appId] = splitCommand
      return [command as Command, runner as Runner, accountId, appId]
    }
  } else if (splitCommand[0].startsWith('email-confirmation')) {
    const emailConfirmUrl = urlObject.searchParams.get('url')
    return [splitCommand[0] as Command, undefined, emailConfirmUrl ?? undefined]
  } else {
    const [command, appId] = splitCommand
    return [command as Command, undefined, appId]
  }
}

async function handlePing(arg: string) {
  return logInfo(['Received ping! Arg:', arg], LogPrefix.ProtocolHandler)
}

/**
 * Handles a launch command
 * @param runner The runner to launch the game with
 * @param arg The game to launch
 * @param mainWindow The main window
 * @example
 * handleLaunch('hyperplay', '123')
 * // => 'Received launch! Runner: hyperplay, Arg: 123'
 * handleLaunch('legendary', '123')
 * // => 'Received launch! Runner: legendary, Arg: 123'
 * handleLaunch('nile', '123')
 * // => 'Received launch! Runner: nile, Arg: 123'
 **/
async function handleLaunch(
  runner: Runner | undefined,
  arg: string | undefined,
  mainWindow?: Electron.BrowserWindow | null
) {
  const game = await findGame(runner, arg)

  if (!game) {
    return logError(
      `Could not receive game data for ${arg}!`,
      LogPrefix.ProtocolHandler
    )
  }

  const { is_installed, title, app_name, runner: gameRunner } = game

  if (!is_installed) {
    logInfo(`"${title}" not installed.`, LogPrefix.ProtocolHandler)

    if (!mainWindow) {
      return
    }

    const { response } = await dialog.showMessageBox(mainWindow, {
      buttons: [i18next.t('box.yes'), i18next.t('box.no')],
      cancelId: 1,
      message: `${title} ${i18next.t(
        'box.protocol.install.not_installed',
        'Is Not Installed, do you wish to Install it?'
      )}`,
      title: title,
      icon: icon
    })
    if (response === 0) {
      return sendFrontendMessage('installGame', {
        appName: app_name,
        runner: gameRunner
      })
    }
    if (response === 1) {
      return logInfo('Not installing game', LogPrefix.ProtocolHandler)
    }
  }

  mainWindow?.hide()
  sendFrontendMessage('launchGame', arg, gameRunner)
}

/**
 * Finds a game in the runners specified in runnersToSearch
 * @param runner The runner to search for the game
 * @param arg The game to search
 * @returns The game info if found, null otherwise
 * @example
 * findGame('gog', '123')
 * // => { app_name: '123', title: '123', is_installed: true, runner: 'gog' ...}
 * findGame('legendary', '123')
 * // => { app_name: '123', title: '123', is_installed: true, runner: 'legendary' ...}
 * findGame('nile', '123')
 * // => { app_name: '123', title: '123', is_installed: true, runner: 'nile' ...}
 **/
async function findGame(
  runner: Runner | undefined,
  projectId = ''
): Promise<GameInfo | null> {
  // If the runner is specified, only search for that runner
  const runnersToSearch = runner ? [runner, 'hyperplay'] : RUNNERS

  // Search for the game in the runners specified in runnersToSearch and return the first one found (if any)
  for (const currentRunner of runnersToSearch) {
    const run = (currentRunner as Runner) || 'hyperplay'
    // handle hp games that are not on the library

    if (run === 'hyperplay') {
      try {
        getGameInfo(projectId)
      } catch (error) {
        logInfo(
          `Game ${projectId} not found in library. Adding it...`,
          LogPrefix.HyperPlay
        )
        await addGameToLibrary(projectId)
        return getGameInfo(projectId)
      }
    }

    const gameInfoOrSideload = getInfo(projectId, run)
    if (gameInfoOrSideload.app_name) {
      return gameInfoOrSideload
    }
  }
  return null
}
