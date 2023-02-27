import React from 'react'
import { RejectedIcon, SuccessIcon } from 'frontend/assets/hyperplay'
import StatusStyles from './index.module.scss'
import { Button } from '@hyperplay/ui'

export enum CONNECTION_STATUS {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CONNECTED = 'CONNECTED'
}

interface StatusScreenProps {
  status: CONNECTION_STATUS
  actionButtonText?: string
  onActionButtonClick?: () => void
  title: string
  description: string
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
    <>
      <div className={`title ${StatusStyles.title}`}>{props.title}</div>
      <div className={`body ${StatusStyles.description}`}>
        {props.description}
      </div>
      <div className={StatusStyles.statusImg}>{getIcon()}</div>
      <div className={StatusStyles.actionButton}>
        {props.actionButtonText !== undefined ? (
          <Button onClick={props.onActionButtonClick}>
            {props.actionButtonText}
          </Button>
        ) : null}
      </div>
    </>
  )
}

export default StatusScreen
