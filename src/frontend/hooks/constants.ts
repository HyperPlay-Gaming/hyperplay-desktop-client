import { Runner, Status } from 'common/types'
import libraryState from 'frontend/state/libraryState'
import { TFunction } from 'react-i18next'

type StatusArgs = {
  status: Status
  t: TFunction<'gamepage', undefined>
  runner: Runner
  percent?: number
  size?: string
}

export function getStatusLabel({
  status,
  t,
  runner,
  size,
  percent
}: StatusArgs): string {
  const statusMap: Partial<Record<Status, string>> = {
    notSupportedGame: t('gamepage:status.notSupportedGame', 'Not Supported'),
    notAvailable: t('gamepage:status.gameNotAvailable', 'Game not available'),
    playing: t('gamepage:status.playing', 'Playing'),
    queued: `${t('gamepage:status.queued', 'Queued')}`,
    uninstalling: t('gamepage:status.uninstalling', 'Uninstalling'),
    updating: `${t('gamepage:status.updating')} ${Math.ceil(percent || 0)}%`,
    installing: `${t('gamepage:status.downloading', 'Downloading')} ${Math.ceil(
      percent || 0
    )}%`,
    extracting: t('gamepage:status.extracting', 'Extracting'),
    'syncing-saves': t('gamepage:status.syncingSaves', 'Syncing Saves'),
    moving: t('gamepage:gamecard.moving', 'Moving'),
    repairing: t('gamepage:gamecard.repairing', 'Repairing'),
    installed: `${t('gamepage:status.installed')} ${
      runner === 'sideload' ? '' : size
    }`,
    notInstalled: t('gamepage:status.notinstalled'),
    paused: t('gamepage:status.paused', 'Paused'),
    preparing: t('gamepage:status.preparing', 'Preparing')
  }

  return statusMap[status] || t('gamepage:status.notinstalled')
}

const storage = window.localStorage
const nonAvailbleGames = storage.getItem('nonAvailableGames') || '[]'
const nonAvailbleGamesArray = JSON.parse(nonAvailbleGames)

export async function handleNonAvailableGames(appName: string, runner: Runner) {
  const gameAvailable = await window.api.isGameAvailable({
    appName,
    runner
  })

  if (!gameAvailable) {
    if (!nonAvailbleGamesArray.includes(appName)) {
      nonAvailbleGamesArray.push(appName)
      libraryState.nonAvailbleGames = nonAvailbleGamesArray
    }
  } else {
    if (nonAvailbleGamesArray.includes(appName)) {
      nonAvailbleGamesArray.splice(nonAvailbleGamesArray.indexOf(appName), 1)
      libraryState.nonAvailbleGames = nonAvailbleGamesArray
    }
  }
  return gameAvailable
}
