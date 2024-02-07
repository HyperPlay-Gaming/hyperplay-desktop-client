import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './index.module.scss'
import useAuthSession from '../../../hooks/useAuthSession'
import { AccountAvatar } from '@hyperplay/ui'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = observer((props) => {
  const { data: session } = useAuthSession()

  return (
    <button
      onClick={props.onClick}
      className={styles.walletButton}
      id="accountWalletContainer"
    >
      <AccountAvatar userId={session?.user?.id} />
    </button>
  )
})

export default Wallet
