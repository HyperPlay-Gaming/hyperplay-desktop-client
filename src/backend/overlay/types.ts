import { ToastKey } from '@hyperplay/utils'
import { TransactionToastProps } from '@hyperplay/ui'

export interface Toast extends TransactionToastProps {
  isOpen: boolean
  key: ToastKey
}
