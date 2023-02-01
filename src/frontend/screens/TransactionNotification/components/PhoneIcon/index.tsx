import React from 'react'

import {
  PhoneErrorIcon,
  PhoneCompletedIcon,
  PhoneWaitingConfimationSpinner
} from 'frontend/assets/hyperplay'
import { TransactionState } from 'frontend/store/types'
import Loading from './Loading'

interface PhoneIconProps {
  status: TransactionState
}

const PhoneIcon = ({ status }: PhoneIconProps) => {
  switch (status) {
    case TransactionState.INITIATED:
      return <Loading />
    case TransactionState.PENDING:
      return <PhoneWaitingConfimationSpinner />
    case TransactionState.CONFIRMED:
      return <PhoneCompletedIcon />
    case TransactionState.FAILED:
      return <PhoneErrorIcon />
  }
}

export default PhoneIcon
