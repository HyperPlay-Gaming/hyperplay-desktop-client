import React, { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './index.module.scss'
import useAuthSession from '../../../hooks/useAuthSession'
import { AccountAvatar, Images } from '@hyperplay/ui'
import { PROVIDERS } from 'common/types/proxy-types'
import walletState from '../../../state/WalletState'

interface WalletProps {
  onClick: () => void
}

const WalletProviderIcons: Record<PROVIDERS, ReactNode> = {
  [PROVIDERS.METAMASK_EXTENSION]: <Images.MetaMaskColored />,
  [PROVIDERS.METAMASK_MOBILE]: <Images.MetaMaskColored />,
  [PROVIDERS.WALLET_CONNECT]: <Images.WalletConnectLogo />,
  [PROVIDERS.UNCONNECTED]: null
}

const Wallet: React.FC<WalletProps> = observer((props) => {
  const { data: session } = useAuthSession()

  return (
    <button
      onClick={props.onClick}
      className={styles.walletButton}
      id="accountWalletContainer"
    >
      <AccountAvatar
        userId={session?.user?.id}
        WalletIcon={
          walletState.isConnected
            ? WalletProviderIcons[walletState.provider]
            : null
        }
      />
    </button>
  )
})

export default Wallet
