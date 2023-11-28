import React from 'react'
import classNames from 'classnames'
import getWalletText from './helpers/getWalletText'
import walletStore from 'frontend/state/WalletState'
import ProfilePicture from './ProfilePicture'
import { observer } from 'mobx-react-lite'
import { t } from 'i18next'
import styles from './index.module.scss'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = observer((props) => {
  const walletText = getWalletText(walletStore.address)

  const connectedText = t('hyperplay.wallet.connected', 'Connected')
  const notConnectedText = t('hyperplay.wallet.notConnected', 'Not connected')

  const classNamesObject = {}
  classNamesObject[styles.disconnectedStatus] = !walletStore.isConnected
  classNamesObject[styles.connectedStatus] = walletStore.isConnected

  return (
    <button
      onClick={props.onClick}
      className={styles.walletButton}
      id="accountWalletContainer"
    >
      <ProfilePicture
        isConnected={walletStore.isConnected}
        address={walletStore.address}
      />
      <span>
        <div className={styles.walletAccountText}>{walletText}</div>
        <div className={classNames('caption-sm', classNamesObject)}>
          {walletStore.isConnected ? connectedText : notConnectedText}
        </div>
      </span>
    </button>
  )
})

export default Wallet
