import { Reward } from 'common/types'

export async function completeExternalTask(reward: Reward) {
  return window.api.completeExternalTask(reward.id.toString())
}

export async function resyncExternalTasks(rewards: Reward[]) {
  for (const reward of rewards) {
    if (reward.reward_type === 'EXTERNAL-TASKS') {
      await window.api.resyncExternalTask(reward.id.toString())
    }
  }
}
