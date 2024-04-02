import React from 'react'
import GameUpdateDialog from 'frontend/components/UI/GameUpdateDialog'
import { makeAutoObservable, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { GameInfo } from 'common/types'
import gameRequiresAccessCodes from 'frontend/helpers/gameRequiresAccessCodes'

class UpdateState {
  showUpdateModal = false
  gameInfo: GameInfo | undefined

  constructor() {
    makeAutoObservable(this)
  }

  init() {
    //
  }

  async updateGame(gameInfo: GameInfo) {
    if (gameInfo.runner !== 'hyperplay') {
      return
    }

    // TODO: try the cached access code first before prompting
    // Object.hasOwn(gameInfo.accessCodesCache, channelIdOfCurrentInstall)

    // check if this channel is access code gated
    if (
      gameInfo.install.channelName &&
      gameRequiresAccessCodes(gameInfo, gameInfo.install.channelName)
    ) {
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

const updateState = new UpdateState()
export default updateState

export const UpdateModalController = observer(() => {
  if (!updateState.showUpdateModal) {
    return null
  }
  return <GameUpdateDialog onClose={() => {}}></GameUpdateDialog>
})
