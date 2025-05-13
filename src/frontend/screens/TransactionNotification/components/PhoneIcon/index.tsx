import React from 'react'

import {
  PhoneErrorIcon,
  PhoneCompletedIcon,
  PhoneWaitingConfimationSpinner
} from 'frontend/assets/hyperplay'
import Loading from './Loading'
import { statusType } from '@hyperplay/ui/dist/components/TransactionToasts'

interface PhoneIconProps {
  status: statusType
}

const PhoneIcon = ({ status }: PhoneIconProps) => {
  switch (status) {
    case 'submitted':
      return <Loading />
    case 'pending':
      return <PhoneWaitingConfimationSpinner />
    case 'success':
      return <PhoneCompletedIcon />
    case 'error':
      return <PhoneErrorIcon />
  }
  return <PhoneErrorIcon />
}

export default PhoneIcon
