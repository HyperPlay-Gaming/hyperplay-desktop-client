import { dialog } from 'electron'
import { logError, logInfo, LogPrefix } from './logger/logger'
import i18next from 'i18next'
import { getInfo } from './utils'
import { GameInfo, Runner, SideloadGame } from 'common/types'
import { getMainWindow, sendFrontendMessage } from './main_window'
import { icon } from './constants'
import { addGameToLibrary, getHyperPlayGameInfo } from './hyperplay/library'

type Command = 'ping' | 'launch'

const RUNNERS = ['hyperplay', 'legendary', 'gog', 'sideload']

/**
 * Handles a protocol request
 * @param args The args to search
 * @example
 * handleProtocol(['hyperplay://ping'])
 * // => 'Received ping! Arg: undefined'
 * handleProtocol(['hyperplay://launch/hyperplay/123'])
 * // => 'Received launch! Runner: hyperplay, Arg: 123'
 **/
export async function handleProtocol(args: string[]) {
  const mainWindow = getMainWindow()

  const url = getUrl(args)
  if (!url) {
    return
  }

  const [command, runner, arg = ''] = parseUrl(url)

  logInfo(`received '${url}'`, LogPrefix.ProtocolHandler)

  switch (command) {
    case 'ping':
      return handlePing(arg)
    case 'launch':
      await handleLaunch(runner, arg, mainWindow)
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
function parseUrl(url: string): [Command, Runner?, string?] {
  const [, fullCommand] = url.split('://')

  //check if the second param is a runner or not and adjust parts accordingly
  const hasRunner = RUNNERS.includes(fullCommand.split('/')[1] as Runner)
  if (hasRunner) {
    const [command, runner, arg] = fullCommand.split('/')
    return [command as Command, runner as Runner, arg]
  } else {
    const [command, arg] = fullCommand.split('/')
    return [command as Command, undefined, arg]
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

async function findGame(
  runner: Runner | undefined,
  arg: string | undefined = ''
): Promise<GameInfo | SideloadGame | null> {
  // If the runner is specified, only search for that runner
  const runnersToSearch = runner ? [runner, 'hyperplay'] : RUNNERS

  // Search for the game in the runners specified in runnersToSearch and return the first one found (if any)
  for (const currentRunner of runnersToSearch) {
    const run = (currentRunner as Runner) || 'hyperplay'
    // handle hp games that are not on the library

    if (run === 'hyperplay') {
      try {
        getHyperPlayGameInfo(arg)
      } catch (error) {
        logInfo(
          `Game ${arg} not found in library. Adding it...`,
          LogPrefix.HyperPlay
        )
        await addGameToLibrary(arg)
        return getHyperPlayGameInfo(arg)
      }
    }

    const gameInfoOrSideload = getInfo(arg, run)
    if (gameInfoOrSideload.app_name) {
      return gameInfoOrSideload
    }
  }
  return null
}
