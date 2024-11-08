import { Reward } from '@hyperplay/utils'
import { makeAutoObservable } from 'mobx'

class ClaimedRewardToastState {
  private reward: Reward | null = null

  constructor() {
    makeAutoObservable(this)
  }

  showClaimedReward(reward: Reward) {
    this.reward = reward
  }

  get claimedReward() {
    return this.reward
  }

  clearReward() {
    this.reward = null
  }
}

const claimedRewardToastState = new ClaimedRewardToastState()

export default claimedRewardToastState
