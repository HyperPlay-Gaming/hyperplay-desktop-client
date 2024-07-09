import { Reward } from 'common/types'

export async function completeExternalTask(reward: Reward) {
  const result = await window.api.completeExternalTask(reward.id.toString())
  console.log('completeExternalTask result ', result)
}
