import { makeAutoObservable } from 'mobx'

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

  handleMint = () => {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.achievementsToBeMinted = []
    }, 3000)
  }

  handleUpdate = () => {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.achievementsToBeUpdated = []
    }, 3000)
  }
}

export default new MintAchievementsState()
