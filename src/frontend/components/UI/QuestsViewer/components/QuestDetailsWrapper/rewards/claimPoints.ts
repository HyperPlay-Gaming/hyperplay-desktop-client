import { Reward } from 'common/types'

export async function claimPoints(reward: Reward) {
  const result = await window.api.claimQuestPointsReward(reward.id.toString())
  console.log('claim points result ', result)
}
