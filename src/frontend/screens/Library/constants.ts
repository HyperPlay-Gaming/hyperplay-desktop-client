import { Category } from 'frontend/types'
import { TFunction } from 'i18next'

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
    case 'nile':
      return t('Amazon Games', 'Amazon Games')
    default:
      return t('Other', 'Other')
  }
}

export function translateChannelName(
  channelNameEnglish: string,
  t: TFunction<'translation'>
) {
  switch (channelNameEnglish) {
    case 'demo':
      return t('gameRelease.demo', 'Demo')
    case 'prototype':
      return t('gameRelease.prototype', 'Prototype')
    case 'alpha':
      return t('gameRelease.alpha', 'Alpha')
    case 'beta':
      return t('gameRelease.beta', 'Beta')
    case 'main':
      return t('gameRelease.main', 'Main')
    default:
      return channelNameEnglish
  }
}

export function getMessage(
  t: TFunction<'translation'>,
  status:
    | 'extracting'
    | 'paused'
    | 'installing'
    | 'installed'
    | 'distributables'
): string | undefined {
  switch (status) {
    case 'distributables':
      return t(
        'hyperplay.gamecard.distributables',
        'Installing Distributables...'
      )
    case 'extracting':
      return t('hyperplay.gamecard.extracting', 'Extracting...')
    case 'paused':
      return t('hyperplay.gamecard.paused', 'Paused')
    case 'installing':
      return t('hyperplay.gamecard.installing', 'Downloading...')
    case 'installed':
      return t('hyperplay.gamecard.installed', 'Ready to play')
  }
}
