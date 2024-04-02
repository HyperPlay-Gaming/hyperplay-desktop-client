import { makeAutoObservable, runInAction } from 'mobx'
import { GameInfo } from 'common/types'
import gameRequiresAccessCodes from 'frontend/helpers/gameRequiresAccessCodes'

class UpdateState {
  showUpdateModal = false
  gameInfo: GameInfo | undefined

  constructor() {
    makeAutoObservable(this)
  }

  init() {}

  async updateGame(gameInfo: GameInfo) {
    if (gameInfo.runner !== 'hyperplay') {
      return
    }

    // check if the cached code has more reuses and if so, use that one without prompting the user
    async function cachedAccessCodeCanBeReused() {
      if (
        gameInfo.channels !== undefined &&
        gameInfo.install.channelName !== undefined &&
        gameInfo.channels[gameInfo.install.channelName] !== undefined
      ) {
        const channelIdOfCurrentInstall =
          gameInfo.channels[gameInfo.install.channelName].channel_id
        if (
          gameInfo.accessCodesCache !== undefined &&
          Object.hasOwn(gameInfo.accessCodesCache, channelIdOfCurrentInstall)
        ) {
          const cachedAccessCodeForInstalledGame =
            gameInfo.accessCodesCache[channelIdOfCurrentInstall]
          const licenseId =
            gameInfo.channels[gameInfo.install.channelName].license_config.id
          const cachedCodeCanBeUsedAgain =
            await window.api.checkHyperPlayAccessCode(
              licenseId,
              cachedAccessCodeForInstalledGame
            )

          const valid = cachedCodeCanBeUsedAgain.valid
          if (valid) {
            window.api.updateGame(gameInfo, cachedAccessCodeForInstalledGame)
          }
          return valid
        }
        return false
      }
    }

    // check if this channel is access code gated
    if (
      gameInfo.install.channelName &&
      gameRequiresAccessCodes(gameInfo, gameInfo.install.channelName)
    ) {
      if (await cachedAccessCodeCanBeReused()) {
        return
      }

      // update both atomically
      runInAction(() => {
        this.gameInfo = gameInfo
        this.showUpdateModal = true
      })
    } else {
      window.api.updateGame(gameInfo)
    }
  }
}

export default new UpdateState()
