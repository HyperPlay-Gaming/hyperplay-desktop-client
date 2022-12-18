import './index.css'
import React from 'react'
import classNames from 'classnames'
import walletTextAtom from './helpers/walletTextAtom'
import { useAtomValue } from 'jotai'
import { addressAtom } from 'frontend/store/Wallet'
import ProfilePicture from './ProfilePicture'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = function (props) {
  const walletText = useAtomValue(walletTextAtom)
  const address = useAtomValue(addressAtom)

  const isConnected = !!address

  return (
    <button
      onClick={props.onClick}
      className="Sidebar__item centerSidebarItem wallet"
    >
      <ProfilePicture isConnected={isConnected} address={walletText} />
      <span>
        <div className="walletAccountText">{walletText}</div>
        <div
          className={classNames('subtitle-sm', {
            disconnectedStatus: !isConnected,
            connectedStatus: isConnected
          })}
        >
          {isConnected ? 'Connected' : 'Not connected'}
        </div>
      </span>
    </button>
  )
}

export default Wallet
