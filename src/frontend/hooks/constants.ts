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
const nonAvailableGames = storage.getItem('nonAvailableGames') || '[]'
const nonAvailableGamesArray = JSON.parse(nonAvailableGames)

export async function handleNonAvailableGames(appName: string, runner: Runner) {
  const gameAvailable = await window.api.isGameAvailable({
    appName,
    runner
  })

  if (!gameAvailable) {
    if (!nonAvailableGamesArray.includes(appName)) {
      nonAvailableGamesArray.push(appName)
      libraryState.nonAvailableGames = nonAvailableGamesArray
    }
  } else {
    if (nonAvailableGamesArray.includes(appName)) {
      nonAvailableGamesArray.splice(nonAvailableGamesArray.indexOf(appName), 1)
      libraryState.nonAvailableGames = nonAvailableGamesArray
    }
  }
  return gameAvailable
}
