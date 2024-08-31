import { getChainMetadataSync } from '@hyperplay/chains'
import { Reward } from 'common/types'
import { TFunction } from 'i18next'

export function getRewardCategory(reward: Reward, t: TFunction) {
  if (
    reward.reward_type === 'POINTS' ||
    reward.reward_type === 'EXTERNAL-TASKS'
  ) {
    return t('quest.points', 'Points')
  }
  if (reward.chain_id === null) {
    return ''
  }
  return getChainMetadataSync(reward.chain_id.toString())?.chain.name ?? ''
}
