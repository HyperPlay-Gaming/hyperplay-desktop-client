import React from 'react'
import updateState from 'frontend/state/UpdateState'
import { observer } from 'mobx-react-lite'
import GameUpdateDialog from '../GameUpdateDialog'

export const UpdateModalController = observer(() => {
  if (!updateState.showUpdateModal) {
    return null
  }
  return (
    <GameUpdateDialog
      onClose={() => {
        updateState.showUpdateModal = false
      }}
    ></GameUpdateDialog>
  )
})
