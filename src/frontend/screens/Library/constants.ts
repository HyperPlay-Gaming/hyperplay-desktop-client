import { Category } from 'frontend/types'
import { TFunction } from 'react-i18next'

export function getLibraryTitle(
  category: Category,
  t: TFunction<'translation'>
) {
  switch (category) {
    case 'all':
      return t('title.allGames', 'All Games')
    case 'legendary':
      return t('Epic Games', 'Epic Games')
    case 'gog':
      return t('GOG', 'GOG')
    case 'hyperplay':
      return 'HyperPlay'
    default:
      return t('Other', 'Other')
  }
}

export function translateChannelName(
  channelNameEnglish: string,
  t: TFunction<'translation'>
) {
  switch (channelNameEnglish) {
    case 'Demo':
      return t('gameRelease.demo', 'Demo')
    case 'Prototype':
      return t('gameRelease.prototype', 'Prototype')
    case 'Alpha':
      return t('gameRelease.alpha', 'Alpha')
    case 'Beta':
      return t('gameRelease.beta', 'Beta')
    case 'Current Release':
      return t('gameRelease.currentRelease', 'Current Release')
    case 'Latest':
      return t('gameRelease.latest', 'Latest')
    default:
      return channelNameEnglish
  }
}
