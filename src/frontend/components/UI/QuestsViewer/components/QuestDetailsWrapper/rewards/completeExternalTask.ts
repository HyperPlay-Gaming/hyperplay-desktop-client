import { Reward } from 'common/types'

export async function completeExternalTask(reward: Reward) {
  const result = await window.api.completeExternalTask(reward.id.toString())
  console.log('completeExternalTask result ', result)
}

export async function resyncExternalTasks(rewards: Reward[]) {
  for (const reward of rewards) {
    if (reward.reward_type === 'EXTERNAL-TASKS') {
      const result = await window.api.resyncExternalTask(reward.id.toString())
      console.log('completeExternalTask result ', result)
    }
  }
}
