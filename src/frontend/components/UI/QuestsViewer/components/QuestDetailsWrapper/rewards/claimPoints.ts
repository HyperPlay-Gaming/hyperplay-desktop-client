import { Reward } from 'common/types'

export async function claimPoints(reward: Reward) {
  const result = await window.api.claimQuestPointsReward(reward.id.toString())
  console.log('for reward id ', reward.id, ' claim points result ', result)
}
