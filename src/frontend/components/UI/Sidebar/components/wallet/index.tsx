import './index.css'
import React from 'react'
import classNames from 'classnames'
import getWalletText from './helpers/getWalletText'
import walletStore from 'frontend/store/WalletStore'
import ProfilePicture from './ProfilePicture'
import { observer } from 'mobx-react-lite'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = observer((props) => {
  const walletText = getWalletText(walletStore.address)

  return (
    <button
      onClick={props.onClick}
      className="Sidebar__item centerSidebarItem wallet"
    >
      <ProfilePicture
        isConnected={walletStore.isConnected}
        address={walletStore.address}
      />
      <span>
        <div className="walletAccountText">{walletText}</div>
        <div
          className={classNames('subtitle-sm', {
            disconnectedStatus: !walletStore.isConnected,
            connectedStatus: walletStore.isConnected
          })}
        >
          {walletStore.isConnected ? 'Connected' : 'Not connected'}
        </div>
      </span>
    </button>
  )
})

export default Wallet
