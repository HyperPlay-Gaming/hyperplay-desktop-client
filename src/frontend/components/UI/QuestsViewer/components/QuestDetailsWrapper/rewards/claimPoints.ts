import { Reward } from 'common/types'

export async function claimPoints(reward: Reward) {
  return window.api.claimQuestPointsReward(reward.id.toString())
}
