import React from 'react'
import gameUpdateState from 'frontend/state/GameUpdateState'
import { observer } from 'mobx-react-lite'
import GameUpdateDialog from '../GameUpdateDialog'

export const UpdateModalController = observer(() => {
  if (!gameUpdateState.showUpdateModal) {
    return null
  }
  return (
    <GameUpdateDialog
      onClose={() => {
        gameUpdateState.showUpdateModal = false
      }}
    ></GameUpdateDialog>
  )
})
