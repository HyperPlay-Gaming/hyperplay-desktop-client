import './index.css'
import React from 'react'

interface WalletOptionProps {
  title: string
  subtext: string
  icon: string
  onClick: () => void
}

const WalletOption: React.FC<WalletOptionProps> = function (props) {
  return (
    <button className="walletOption" onClick={() => props.onClick()}>
      <div className="optionContent">
        <div className="walletOptionIcon">
          <img className="walletOptionIcon" src={props.icon}></img>
        </div>
        <div className="walletOptionContent">
          <div className="subtitle walletOptionTitleText">{props.title}</div>
          <div className="content-s walletOptionSubtext">{props.subtext}</div>
        </div>
      </div>
      <img
        className="walletOptionArrow"
        src="/src/frontend/assets/hyperplay/forward_arrow.svg"
      ></img>
    </button>
  )
}

export default WalletOption
