import React from 'react'
import { RejectedIcon, SuccessIcon } from 'frontend/assets/hyperplay'
import PendingStyles from './index.module.scss'

export enum CONNECTION_STATUS {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CONNECTED = 'CONNECTED'
}

interface StatusScreenProps {
  status: CONNECTION_STATUS
  actionButtonText?: string
  onActionButtonClick?: () => void
}

const StatusScreen = (props: StatusScreenProps) => {
  const getIcon = () => {
    switch (props.status) {
      case CONNECTION_STATUS.PENDING:
        return <SuccessIcon />
      case CONNECTION_STATUS.REJECTED:
        return <RejectedIcon />
      case CONNECTION_STATUS.CONNECTED:
        return <SuccessIcon />

      default:
        return <></>
    }
  }
  return (
    <div>
      <div className={PendingStyles.rejectedImgContainer}>
        <div className={PendingStyles.statusImg}></div>
        {getIcon()}
      </div>
    </div>
  )
}

export default StatusScreen
