import { TFunction } from 'i18next'

export function getAchievementNavTranslations(
  t: TFunction<'translation', undefined, 'translation'>
) {
  return {
    addThisGameText: t('hyperplay.achievements.addThisGame', 'Add this game'),
    gamesToMintLabelText: t(
      'hyperplay.achievements.gamesToMint',
      'Games to mint'
    ),
    freeMintsLabel: t('hyperplay.achievements.freeMints', 'Free Mints')
  }
}
