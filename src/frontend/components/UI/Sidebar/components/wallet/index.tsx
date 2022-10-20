import './index.css'
import React, { useState } from 'react'
import Blockies from 'react-blockies'
import classNames from 'classnames'
import { Disconnected } from 'frontend/assets/hyperplay'

interface WalletProps {
  onClick: () => void
}

const Wallet: React.FC<WalletProps> = function (props) {
  const disconnectedText = '???'
  const [walletText, setWalletText] = useState(disconnectedText)
  const [account, setAccount] = useState('')

  window.api.handleAccountsChanged((e, accounts: string[]) => {
    setWalletText(
      accounts[0].substring(0, 6) +
        '..' +
        accounts[0].substring(accounts[0].length - 4)
    )
    setAccount(accounts[0])
  })

  window.api.handleDisconnected(() => {
    setWalletText(disconnectedText)
  })

  const getProfilePic = function () {
    if (walletText === disconnectedText) {
      return <Disconnected className="Sidebar__itemIcon disconnectedImg" />
    }
    const itemIconCssClass = 'Sidebar__itemIcon'
    const itemElem = document.querySelector('.' + itemIconCssClass)
    let itemIconWidth = 34
    if (itemElem !== null) {
      itemIconWidth = (parseInt(getComputedStyle(itemElem).width) * 34) / 24
    }
    const iconColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary')

    const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
      '--secondary'
    )

    const spotColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--tertiary')

    const iconScale = 4
    return (
      <div className={itemIconCssClass}>
        <Blockies
          seed={account}
          size={itemIconWidth / iconScale}
          scale={iconScale}
          color={iconColor}
          bgColor={bgColor}
          spotColor={spotColor}
          className="identicon"
        />
      </div>
    )
  }

  const isConnected = walletText !== disconnectedText
  return (
    <button
      onClick={props.onClick}
      className="Sidebar__item centerSidebarItem wallet"
    >
      {getProfilePic()}
      <span>
        <div className="walletAccountText">{walletText}</div>
        <div
          className={classNames('subtitle-sm', {
            disconnectedStatus: !isConnected,
            connectedStatus: isConnected
          })}
        >
          {walletText === disconnectedText ? 'Not connected' : 'Connected'}
        </div>
      </span>
    </button>
  )
}

export default Wallet
