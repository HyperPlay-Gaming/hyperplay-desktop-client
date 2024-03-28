import { makeAutoObservable, runInAction } from 'mobx'

class MintAchievementsState {
  achievementsToBeMinted = [] as string[]
  achievementsToBeUpdated = [] as string[]
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleAchievementToBeMinted = (id: string) => {
    if (this.achievementsToBeMinted.includes(id)) {
      this.achievementsToBeMinted = this.achievementsToBeMinted.filter(
        (item) => item !== id
      )
    } else {
      this.achievementsToBeMinted = [...this.achievementsToBeMinted, id]
    }
  }

  toggleAchievementToBeUpdated = (id: string) => {
    if (this.achievementsToBeUpdated.includes(id)) {
      this.achievementsToBeUpdated = this.achievementsToBeUpdated.filter(
        (item) => item !== id
      )
    } else {
      this.achievementsToBeUpdated = [...this.achievementsToBeUpdated, id]
    }
  }

  testLoad = (ms: number) => {
    this.isLoading = true
    setTimeout(() => {
      runInAction(() => {
        this.isLoading = false
        this.achievementsToBeMinted = []
      })
    }, ms)
  }

  handleMint = async () => {
    await window.api.freeBatchMintGameSummaries(this.achievementsToBeMinted)
  }

  handleUpdate = () => this.testLoad(3000)
}

export default new MintAchievementsState()
