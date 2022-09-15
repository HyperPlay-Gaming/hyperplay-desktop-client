import './index.css'
import React, { useState } from 'react'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = function (props) {
  const disconnectedText = 'Connect'
  const [walletText, setWalletText] = useState(disconnectedText)

  window.api.handleAccountsChanged((e, accounts: string[]) => {
    setWalletText(
      accounts[0].substring(0, 4) +
        '..' +
        accounts[0].substring(accounts[0].length - 2)
    )
  })

  window.api.handleDisconnected(() => {
    setWalletText(disconnectedText)
  })

  return (
    <button
      onClick={props.onClick}
      className="Sidebar__item centerSidebarItem wallet"
    >
      <img
        src="/src/frontend/assets/hyperplay/hyperplay_logo.svg"
        className="Sidebar__itemIcon"
      ></img>
      <span className="sidebarConnectText">{walletText}</span>
    </button>
  )
}

export default Wallet
